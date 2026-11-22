/** Shared lead shape for every form on the site. */

export type LeadInput = {
  form: "free-audit-page" | "homepage-cta" | "contact-page";
  name: string;
  phone: string;
  email?: string;
  website?: string;
  businessType?: string;
  goal?: string;
  topic?: string;
  message?: string;
  // attribution (first visit)
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
  page?: string;
  // spam trap: real people never fill this hidden field
  company?: string;
};

const MAX = 300;
const clean = (v: unknown, max = MAX) => (typeof v === "string" ? v.trim().slice(0, max) : undefined);
const FORMS = ["free-audit-page", "homepage-cta", "contact-page"] as const;

export type Validated = { ok: true; lead: LeadInput } | { ok: false; error: string; spam?: boolean };

export function validateLead(body: unknown): Validated {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request." };
  const b = body as Record<string, unknown>;
  const lead: LeadInput = {
    form: (FORMS as readonly string[]).includes(b.form as string) ? (b.form as LeadInput["form"]) : "free-audit-page",
    name: clean(b.name) ?? "",
    phone: clean(b.phone) ?? "",
    email: clean(b.email),
    website: clean(b.website),
    businessType: clean(b.businessType),
    goal: clean(b.goal),
    topic: clean(b.topic),
    message: clean(b.message, 3000),
    utm_source: clean(b.utm_source),
    utm_medium: clean(b.utm_medium),
    utm_campaign: clean(b.utm_campaign),
    utm_term: clean(b.utm_term),
    utm_content: clean(b.utm_content),
    gclid: clean(b.gclid),
    fbclid: clean(b.fbclid),
    landing_page: clean(b.landing_page),
    referrer: clean(b.referrer),
    page: clean(b.page),
    company: clean(b.company),
  };

  if (lead.company) return { ok: false, error: "Spam", spam: true };
  if (lead.name.length < 2) return { ok: false, error: "Please enter your name." };
  const digits = lead.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return { ok: false, error: "Please enter a valid phone number." };
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return { ok: false, error: "Please enter a valid email." };
  return { ok: true, lead };
}

/** Where the lead came from, as a short readable label for the CRM. */
export function sourceLabel(l: LeadInput) {
  if (l.gclid) return "Google Ads";
  if (l.fbclid) return "Meta Ads";
  if (l.utm_source) return [l.utm_source, l.utm_medium].filter(Boolean).join(" / ");
  if (l.referrer && !l.referrer.includes("localhost")) {
    try {
      const host = new URL(l.referrer).hostname.replace(/^www\./, "");
      if (/google\./.test(host)) return "Google (organic)";
      return host;
    } catch {
      /* ignore */
    }
  }
  return "Direct / website";
}
