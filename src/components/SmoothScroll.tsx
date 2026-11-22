"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // phones and tablets keep their own native (and faster) touch scrolling
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    // Smooth-scroll in-page anchor links
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement | null;
      if (!a) return;
      let href = a.getAttribute("href")!;
      if (href.startsWith("/#")) {
        if (window.location.pathname !== "/") return; // other page: let the browser navigate home
        href = href.slice(1);
      }
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
  return null;
}
