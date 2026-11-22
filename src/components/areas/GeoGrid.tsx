/**
 * Map-rank grid: how a business ranks in Google Maps at points across a city.
 * Shown as an illustration of the report clients get (example numbers).
 */
const SIZE = 5;
const rankAt = (r: number, c: number) => {
  if (r === 2 && c === 2) return 1; // the business location itself
  const d = Math.max(Math.abs(r - 2), Math.abs(c - 2)); // ring distance from centre
  const base = [1, 2, 5][d];
  return base + ((r * 3 + c * 7) % 3); // small variation so it looks real
};
const tone = (n: number) => (n <= 3 ? "bg-green text-[#03150a]" : n <= 6 ? "bg-amber text-[#2a1800]" : "bg-coral text-white");

export default function GeoGrid({ city }: { city: string }) {
  return (
    <figure className="glass-light relative mx-auto w-full max-w-[440px] rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[13px] text-slate">Maps rank · {city}</p>
        <span className="text-xs text-slate">Example</span>
      </div>
      <div className="relative mt-5 aspect-square overflow-hidden rounded-2xl bg-[#e9efe6]">
        {/* simple “map” texture: roads and a river */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
          <path d="M0 62 C 25 55, 40 75, 62 66 S 90 52, 100 58" stroke="#bcd6f5" strokeWidth="6" fill="none" />
          <path d="M0 30 H100 M0 80 H100 M28 0 V100 M72 0 V100" stroke="#fff" strokeWidth="2.2" />
          <path d="M0 10 L100 95" stroke="#fff" strokeWidth="1.4" />
          <rect x="44" y="18" width="16" height="10" rx="2" fill="#d6e7cf" />
          <rect x="10" y="86" width="12" height="9" rx="2" fill="#d6e7cf" />
        </svg>
        <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 place-items-center p-3">
          {Array.from({ length: SIZE * SIZE }, (_, i) => {
            const r = Math.floor(i / SIZE);
            const c = i % SIZE;
            const n = rankAt(r, c);
            const centre = r === 2 && c === 2;
            return (
              <span
                key={i}
                className={`grid size-[clamp(28px,8vw,40px)] place-items-center rounded-full text-sm font-bold shadow-md ${tone(n)} ${centre ? "ring-4 ring-white" : ""}`}
              >
                {n}
              </span>
            );
          })}
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate">
        <span><i className="mr-1.5 inline-block size-2.5 rounded-full bg-green align-middle" />Top 3</span>
        <span><i className="mr-1.5 inline-block size-2.5 rounded-full bg-amber align-middle" />4–6</span>
        <span><i className="mr-1.5 inline-block size-2.5 rounded-full bg-coral align-middle" />7+</span>
        <span className="ml-auto">Your position at 25 points across the city</span>
      </figcaption>
    </figure>
  );
}
