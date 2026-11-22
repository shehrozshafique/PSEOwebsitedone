"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import FormConsent from "@/components/FormConsent";
import { LEAD_SENT_KEY, submitLead } from "@/lib/attribution";
import { PeelSticker } from "@/components/brand/Stickers";

const SNOOZE_KEY = "ps_popup_until";
const SNOOZE_DAYS = 7;
const DELAY_MS = 25000; // show after 25 s on the site…
const SCROLL_SHARE = 0.6; // …or once a phone visitor has scrolled 60% of a page
const HIDDEN_ON = ["/free-audit", "/contact", "/thank-you", "/privacy", "/terms", "/sms-terms"];

function blocked() {
  try {
    if (localStorage.getItem(LEAD_SENT_KEY)) return true;
    return Number(localStorage.getItem(SNOOZE_KEY) || 0) > Date.now();
  } catch {
    return false;
  }
}
function snooze() {
  try {
    localStorage.setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_DAYS * 864e5));
  } catch {
    /* private mode */
  }
}

/**
 * Free-audit popup. Shows once (after 25 s, on exit intent, or at 60% scroll on phones),
 * then stays away for 7 days, and never again after someone sends any form.
 */
export default function LeadPopup() {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honey, setHoney] = useState("");
  const shown = useRef(false);
  const first = useRef<HTMLInputElement>(null);
  const hidden = HIDDEN_ON.some((p) => path.startsWith(p));

  useEffect(() => {
    if (hidden || blocked()) return;
    const show = () => {
      if (shown.current || blocked()) return;
      shown.current = true;
      setOpen(true);
    };
    const timer = setTimeout(show, DELAY_MS);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) show(); // desktop: pointer leaves through the top
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (window.matchMedia("(pointer: coarse)").matches && max > 0 && window.scrollY / max > SCROLL_SHARE) show();
    };
    document.addEventListener("mouseout", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hidden, path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        snooze();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => first.current?.focus({ preventScroll: true }), 350);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  function close() {
    snooze();
    setOpen(false);
  }

  if (hidden) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            className="relative w-full max-w-[880px] overflow-hidden rounded-t-[20px] bg-white text-ink shadow-2xl sm:rounded-[20px]"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button type="button" onClick={close} aria-label="Close" className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full bg-paper text-lg hover:bg-paper-2">
              ✕
            </button>

            <div className="grid md:grid-cols-[.9fr_1.1fr]">
              {/* offer (dark side) */}
              <div className="relative hidden overflow-hidden bg-ink p-8 text-white md:block">
                <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-70" />
                <div className="relative">
                  <p className="font-display text-3xl leading-tight font-extrabold">See what’s costing you calls and sales</p>
                  <ul className="mt-6 grid gap-2.5 text-[15px] text-mist">
                    {["A short video walkthrough of your site", "Your Google ranking vs your top 3 competitors", "The 5 fixes that will bring the most leads"].map((t) => (
                      <li key={t} className="flex gap-2.5">
                        <span className="mt-1 size-2 flex-none rounded-full bg-green" aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <PeelSticker title="Free" sub="in 48 hours" delay={0.3} className="absolute right-4 bottom-5 size-[118px]" />
              </div>

              {/* form */}
              <form
                className="p-6 pb-[max(24px,env(safe-area-inset-bottom))] sm:p-8"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const f = new FormData(e.currentTarget);
                  setBusy(true);
                  setError(null);
                  const err = await submitLead({
                    form: "popup",
                    name: String(f.get("name") ?? ""),
                    phone: String(f.get("phone") ?? ""),
                    email: String(f.get("email") ?? "") || undefined,
                    website: String(f.get("website") ?? ""),
                    company: honey,
                  });
                  setBusy(false);
                  if (err) return setError(err);
                  setOpen(false);
                  router.push("/thank-you");
                }}
              >
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" value={honey} onChange={(e) => setHoney(e.target.value)} />
                <h2 id="popup-title" className="pr-10 font-display text-2xl font-extrabold">Get your free growth audit</h2>
                <p className="mt-1 text-[15px] text-slate">Takes 30 seconds. Reviewed by a real person, not a bot.</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Field label="Your name" name="name" autoComplete="name" required inputRef={first} />
                  <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
                  <Field label="Email" name="email" type="email" autoComplete="email" />
                  <Field label="Website or business name" name="website" autoComplete="url" required />
                </div>
                {error && <p role="alert" className="mt-3 rounded-xl bg-coral/15 px-4 py-3 text-sm text-[#c2391b]">{error}</p>}
                <button type="submit" disabled={busy} className="btn-green mt-5 w-full disabled:opacity-70">{busy ? "Sending…" : "Send me my free audit →"}</button>
                <button type="button" onClick={close} className="mt-3 w-full text-center text-sm text-slate hover:text-ink">No thanks</button>
                <FormConsent />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, name, type = "text", autoComplete, required, inputRef }: { label: string; name: string; type?: string; autoComplete?: string; required?: boolean; inputRef?: React.Ref<HTMLInputElement> }) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      <input
        ref={inputRef}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-[15px] font-normal outline-none transition-colors hover:border-ink/30 focus:border-ink focus:bg-white"
      />
    </label>
  );
}
