"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  months: string[];
  values: number[];
  launch: number; // index of the first month after go-live
  color: string; // the case's accent
  prefix?: string;
  suffix?: string;
};

const BEFORE = "#cfd4cc"; // recessive neutral for the months before we started
const GRID = "#e6e8e3";
const INK = "#0a0b0a";
const SLATE = "#555c57";

function niceCeil(v: number) {
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  return [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].map((s) => s * mag).find((x) => x >= v) ?? 10 * mag;
}

/** Bar chart of one monthly metric, before vs after the work went live. Single axis, one series. */
export default function GrowthChart({ title, months, values, launch, color, prefix = "", suffix = "" }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(720);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fmt = (v: number) => `${prefix}${v.toLocaleString("en-US")}${suffix}`;
  const H = w < 480 ? 240 : 300;
  const pad = { l: 46, r: 8, t: 28, b: 30 };
  const iw = w - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const max = niceCeil(Math.max(...values) * 1.08);
  const band = iw / values.length;
  const bw = Math.max(10, Math.min(36, band * 0.56));
  const x = (i: number) => pad.l + band * i + (band - bw) / 2;
  const y = (v: number) => pad.t + ih - (v / max) * ih;
  const ticks = [0, max / 2, max];
  const r = 4;
  const bar = (i: number, v: number) => {
    const x0 = x(i), y0 = y(v), h = pad.t + ih - y0, rr = Math.min(r, h);
    return `M${x0} ${y0 + h}V${y0 + rr}Q${x0} ${y0} ${x0 + rr} ${y0}H${x0 + bw - rr}Q${x0 + bw} ${y0} ${x0 + bw} ${y0 + rr}V${y0 + h}Z`;
  };
  const liveX = pad.l + band * launch;
  const last = values.length - 1;

  return (
    <figure>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate">
        <span className="flex items-center gap-2"><span className="size-3 rounded-sm" style={{ background: BEFORE }} aria-hidden="true" />Before</span>
        <span className="flex items-center gap-2"><span className="size-3 rounded-sm" style={{ background: color }} aria-hidden="true" />After we went live</span>
      </div>

      <div ref={box} className="relative mt-4 w-full select-none">
        <svg width={w} height={H} viewBox={`0 0 ${w} ${H}`} role="img" aria-label={`${title}, ${fmt(values[0])} in ${months[0]} to ${fmt(values[last])} in ${months[last]}`} className="block overflow-visible">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={w - pad.r} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#b9bfb7" : GRID} strokeWidth="1" />
              <text x={pad.l - 10} y={y(t) + 4} textAnchor="end" fontSize="12" fill={SLATE}>{fmt(Math.round(t))}</text>
            </g>
          ))}

          {/* go-live marker */}
          <line x1={liveX} x2={liveX} y1={pad.t - 14} y2={pad.t + ih} stroke={INK} strokeWidth="1" strokeDasharray="3 4" />
          <text x={liveX + 6} y={pad.t - 4} fontSize="12" fontWeight="600" fill={INK}>Went live</text>

          {values.map((v, i) => (
            <path key={i} d={bar(i, v)} fill={i < launch ? BEFORE : color} opacity={hover === null || hover === i ? 1 : 0.55} />
          ))}

          {/* selective direct labels: first and last value only */}
          {[0, last].map((i) => (
            <text key={i} x={x(i) + bw / 2} y={y(values[i]) - 8} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>{fmt(values[i])}</text>
          ))}

          {months.map((m, i) => (
            <text key={m + i} x={x(i) + bw / 2} y={H - 8} textAnchor="middle" fontSize="12" fill={SLATE}>
              {w < 420 && values.length > 8 && i % 2 ? "" : m}
            </text>
          ))}

          {/* hit targets: the whole column, bigger than the bar */}
          {values.map((_, i) => (
            <rect key={`h${i}`} x={pad.l + band * i} y={pad.t} width={band} height={ih} fill="transparent"
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onClick={() => setHover(hover === i ? null : i)} />
          ))}
        </svg>

        {hover !== null && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-ink px-3 py-2 text-center text-white shadow-lg"
            style={{ left: x(hover) + bw / 2, top: y(values[hover]) - 10 }}
          >
            <p className="text-xs text-mist">{months[hover]}{hover < launch ? " · before" : ""}</p>
            <p className="font-display text-base font-bold whitespace-nowrap">{fmt(values[hover])}</p>
          </div>
        )}
      </div>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead><tr><th scope="col">Month</th><th scope="col">{title}</th></tr></thead>
        <tbody>{months.map((m, i) => <tr key={m + i}><th scope="row">{m}</th><td>{fmt(values[i])}</td></tr>)}</tbody>
      </table>
    </figure>
  );
}
