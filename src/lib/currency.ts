"use client";

import { useSyncExternalStore } from "react";
import type { Currency } from "./offers";

/**
 * Which currency to show: a visitor's own choice (saved), otherwise £ for UK visitors
 * (UK time zone or en-GB language) and $ for everyone else. The server renders $ first.
 */
const KEY = "ps_cur";
const EVENT = "ps-currency";

function read(): Currency {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "usd" || saved === "gbp") return saved;
  } catch {
    /* private mode */
  }
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const langs = navigator.languages ?? [navigator.language];
  return tz === "Europe/London" || langs.some((l) => /-GB$/i.test(l)) ? "gbp" : "usd";
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useCurrency(): [Currency, (c: Currency) => void] {
  const cur = useSyncExternalStore(subscribe, read, () => "usd" as Currency);
  const set = (c: Currency) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {
      /* private mode */
    }
    window.dispatchEvent(new Event(EVENT));
  };
  return [cur, set];
}
