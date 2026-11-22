import { NextResponse } from "next/server";
import { sourceLabel, validateLead, type LeadInput } from "@/lib/leads";

/**
 * POST /api/lead — receives a website form and sends it to the CRM.
 *
 * Two ways to connect (set in .env.local, see .env.example):
 *  A) CRM_WEBHOOK_URL  — the CRM's "Inbound Webhook" workflow trigger (simplest, recommended).
 *  B) CRM_API_TOKEN + CRM_LOCATION_ID — private integration token; creates/updates the contact
 *     and, if CRM_PIPELINE_ID + CRM_STAGE_ID are set, an opportunity at the "New lead" stage.
 * With neither set, the lead is only logged on the server (handy for local development).
 */

const API = "https://services.leadconnectorhq.com";
const API_VERSION = "2021-07-28";

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  return { firstName: parts[0] ?? "", lastName: parts.slice(1).join(" ") };
}

function tagsFor(l: LeadInput) {
  const formTag = { "free-audit-page": "free audit", "homepage-cta": "homepage form", "contact-page": "contact form", popup: "popup form" }[l.form];
  return ["website lead", formTag, l.businessType && `type: ${l.businessType}`, l.goal && `goal: ${l.goal}`, l.topic && `topic: ${l.topic}`].filter(
    Boolean,
  ) as string[];
}

async function sendToWebhook(url: string, l: LeadInput) {
  const { firstName, lastName } = splitName(l.name);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...l,
      company: undefined,
      first_name: firstName,
      last_name: lastName,
      full_name: l.name,
      source: sourceLabel(l),
      tags: tagsFor(l).join(", "),
      submitted_at: new Date().toISOString(),
    }),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

async function sendToApi(token: string, locationId: string, l: LeadInput) {
  const headers = { Authorization: `Bearer ${token}`, Version: API_VERSION, "Content-Type": "application/json", Accept: "application/json" };
  const { firstName, lastName } = splitName(l.name);

  const upsert = await fetch(`${API}/contacts/upsert`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      locationId,
      firstName,
      lastName,
      name: l.name,
      phone: l.phone,
      email: l.email || undefined,
      website: l.website || undefined,
      source: sourceLabel(l),
      tags: tagsFor(l),
    }),
  });
  if (!upsert.ok) throw new Error(`Contact upsert responded ${upsert.status}: ${(await upsert.text()).slice(0, 200)}`);
  const contactId: string | undefined = (await upsert.json())?.contact?.id;

  const pipelineId = process.env.CRM_PIPELINE_ID;
  const stageId = process.env.CRM_STAGE_ID;
  if (contactId && pipelineId && stageId) {
    const opp = await fetch(`${API}/opportunities/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        pipelineId,
        pipelineStageId: stageId,
        contactId,
        name: `${l.name}${l.website ? ` · ${l.website}` : ""}`,
        status: "open",
        source: sourceLabel(l),
      }),
    });
    // A duplicate opportunity is not a failure for the visitor; just log it.
    if (!opp.ok) console.warn(`[lead] opportunity not created (${opp.status}): ${(await opp.text()).slice(0, 200)}`);
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const v = validateLead(body);
  if (!v.ok) {
    // Pretend success to bots so they don't retry.
    if (v.spam) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: v.error }, { status: 422 });
  }
  const lead = v.lead;

  const webhook = process.env.CRM_WEBHOOK_URL;
  const token = process.env.CRM_API_TOKEN;
  const locationId = process.env.CRM_LOCATION_ID;

  try {
    if (webhook) await sendToWebhook(webhook, lead);
    else if (token && locationId) await sendToApi(token, locationId, lead);
    else {
      console.info("[lead] CRM not configured; lead received:", { ...lead, phone: "***", email: lead.email ? "***" : undefined });
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[lead] failed to deliver to CRM:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our side. Please call us or try again in a minute." },
      { status: 502 },
    );
  }
}
