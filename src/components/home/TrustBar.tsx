import {
  siShopify, siGoogle, siGoogleads, siMeta, siInstagram, siTiktok, siStripe, siQuickbooks, siWordpress, siWoocommerce, siZapier,
  siGmail, siPaypal, siCalendly, siYoutube, siWhatsapp,
  type SimpleIcon,
} from "simple-icons";

// Official brand marks from Simple Icons (CC0). Brand names and logos belong to their owners;
// shown only to say the platform connects with them.
const logos: SimpleIcon[] = [
  siShopify, siGoogle, siMeta, siStripe, siGoogleads, siInstagram, siQuickbooks, siTiktok, siWordpress, siZapier,
  siWoocommerce, siGmail, siPaypal, siCalendly, siYoutube, siWhatsapp,
];

function Logo({ icon, copy }: { icon: SimpleIcon; copy: boolean }) {
  return (
    <li
      aria-hidden={copy || undefined}
      className="flex flex-none items-center gap-2.5 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <svg role="img" aria-label={icon.title} viewBox="0 0 24 24" className="size-6 flex-none" fill={`#${icon.hex}`}>
        <path d={icon.path} />
      </svg>
      <span className="font-display text-lg font-bold whitespace-nowrap md:text-xl" style={{ color: icon.hex === "000000" ? "#0a0b0a" : `#${icon.hex}` }}>{icon.title}</span>
    </li>
  );
}

/** One clean line under the hero: the tools our platform works with. */
export default function TrustBar() {
  return (
    <section aria-label="Works with the tools you already use" className="border-b border-line bg-white">
      <div className="container-x flex flex-col items-stretch gap-4 py-7 md:flex-row md:items-center md:gap-10 md:py-8">
        <p className="flex-none text-center font-display text-lg leading-snug font-semibold text-ink md:w-52 md:text-left">
          Works with the tools <span className="font-normal text-slate md:block">you already use</span>
        </p>
        <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="animate-marquee flex w-max items-center gap-9 py-2 md:gap-12 hover:[animation-play-state:paused]">
            {[...logos, ...logos].map((ic, i) => (
              <Logo key={`${ic.slug}-${i}`} icon={ic} copy={i >= logos.length} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
