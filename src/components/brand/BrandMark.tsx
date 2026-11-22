import { useId } from "react";

/**
 * The Permanent SEO mark: two rising bars and a P with a growth arrow cut through it.
 * Same artwork as brand-kit/logo (brand-studio/svg.mjs). Drawn in its original 1280-px artboard units.
 */
const BAR1 = "M237 940V833A141 141 0 0 1 378 692V940Z";
const BAR2 = "M419 940V650A140 140 0 0 1 559 510V940Z";
const P = "M610 940V401A60 60 0 0 1 670 341H825A215.5 215.5 0 0 1 825 772H748L612 940Z";
const SHAFT = "M566 780 657 668H740L887 487";
const HEAD = "M744 443H914A16 16 0 0 1 930 459V616A16 16 0 0 1 914 632H886A16 16 0 0 1 870 616V503H760A16 16 0 0 1 744 487V459A16 16 0 0 1 760 443Z";

/** `onDark`: white bars + bright green P. Otherwise ink bars + deeper green P for white backgrounds. */
export function BrandMark({ height = 28, onDark = false, className }: { height?: number; onDark?: boolean; className?: string }) {
  const id = useId().replace(/:/g, "");
  const fg = onDark ? "#ffffff" : "#0a0b0a";
  const pc = onDark ? "#3ddc6e" : "#1fae55";
  return (
    <svg viewBox="237 341 804 599" height={height} width={(height * 804) / 599} className={className} aria-hidden="true">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="1400" height="1400">
          <rect width="1400" height="1400" fill="#fff" />
          <path d={SHAFT} fill="none" stroke="#000" strokeWidth="62" strokeLinejoin="round" />
          <path d={HEAD} />
        </mask>
      </defs>
      <path d={BAR1} fill={fg} className="transition-colors duration-300" />
      <path d={BAR2} fill={fg} className="transition-colors duration-300" />
      <path d={P} fill={pc} mask={`url(#${id})`} className="transition-colors duration-300" />
    </svg>
  );
}
