"use client";

import type { LeadInput } from "./leads";

const KEY = "lead_attribution_v1";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

type Attribution = Partial<Record<(typeof PARAMS)[number] | "landing_page" | "referrer", string>>;

/** Save where the visitor first came from (ads, UTM link, Google, another site). Runs once per visit. */
export function captureAttribution() {
  try {
    const url = new URL(window.location.href);
    const fromUrl: Attribution = {};
    PARAMS.forEach((p) => {
      const v = url.searchParams.get(p);
      if (v) fromUrl[p] = v;
    });
    const existing = localStorage.getItem(KEY);
    // A new campaign click overwrites; otherwise keep the first touch.
    if (!existing || Object.keys(fromUrl).length) {
      const data: Attribution = { ...fromUrl, landing_page: url.pathname + url.search, referrer: document.referrer || undefined };
      localStorage.setItem(KEY, JSON.stringify(data));
    }
  } catch {
    /* storage blocked: attribution is optional */
  }
}

function readAttribution(): Attribution {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

/** Send a form to /api/lead. Returns an error message for the visitor, or null on success. */
export async function submitLead(fields: Omit<LeadInput, keyof Attribution | "page">): Promise<string | null> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...readAttribution(), ...fields, page: window.location.pathname }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.ok) return json.error || "Something went wrong. Please try again.";
    return null;
  } catch {
    return "No connection. Please check your internet and try again.";
  }
}
