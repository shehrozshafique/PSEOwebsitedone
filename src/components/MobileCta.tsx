"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/site";

export const telHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

// Pages that are already a form or a confirmation don't need the bar.
const HIDDEN_ON = ["/free-audit", "/thank-you", "/contact"];

/**
 * Phones only: a bottom bar with "Call" and "Free audit" that slides in after the hero,
 * and gets out of the way when a form or the footer is on screen.
 */
export default function MobileCta() {
  const path = usePathname();
  const [past, setPast] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // hide while any form or the footer is visible
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setBlocked(seen.size > 0);
    });
    const watch = () => document.querySelectorAll("form, footer").forEach((el) => io.observe(el));
    watch();
    const t = setTimeout(watch, 1200); // forms that mount a little later

    // hide while the keyboard is open
    const onFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (el.matches("input, textarea, select")) setBlocked(true);
    };
    document.addEventListener("focusin", onFocus);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onFocus);
      io.disconnect();
      clearTimeout(t);
    };
  }, [path]);

  if (HIDDEN_ON.some((p) => path.startsWith(p))) return null;
  const show = past && !blocked;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden"
        >
          <div className="mx-auto flex max-w-md gap-2 rounded-2xl bg-white/95 p-2 shadow-[0_18px_50px_-12px_rgba(10,12,11,.45)] backdrop-blur-md">
            <a href={telHref} className="btn-outline flex-1 !rounded-xl !px-3 !py-3 text-[15px]" aria-label={`Call us at ${site.phone}`}>
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1l-2.2 2.2Z" />
              </svg>
              Call
            </a>
            <Link href="/free-audit" className="btn-green flex-[1.6] !rounded-xl !px-3 !py-3 text-[15px] whitespace-nowrap">
              <span className="min-[360px]:hidden">Free audit →</span>
              <span className="hidden min-[360px]:inline">Get my free audit →</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
