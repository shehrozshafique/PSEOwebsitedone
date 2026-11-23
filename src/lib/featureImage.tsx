/* eslint-disable @next/next/no-img-element -- ImageResponse (Satori) renders plain <img>; next/image does not work here */
import { ImageResponse } from "next/og";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { categories, readingMinutes, type Post } from "@/lib/blog";

/**
 * Blog feature image template (1200×630): used as each post's cover on the site
 * and as the preview image when the post is shared (Facebook, LinkedIn, WhatsApp, X).
 * Fonts and icons live in src/assets/og (TTF and PNG, the formats the image renderer accepts).
 */
export const featureSize = { width: 1200, height: 630 };

const asset = (f: string) => readFile(join(process.cwd(), "src/assets/og", f));
const bold = asset("Onest-ExtraBold.ttf");
const medium = asset("Onest-Medium.ttf");

const MARK = (fg: string, pc: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="237 341 804 599"><defs><mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="1400" height="1400"><rect width="1400" height="1400" fill="#fff"/><path d="M566 780 657 668H740L887 487" fill="none" stroke="#000" stroke-width="62" stroke-linejoin="round"/><path d="M744 443H914A16 16 0 0 1 930 459V616A16 16 0 0 1 914 632H886A16 16 0 0 1 870 616V503H760A16 16 0 0 1 744 487V459A16 16 0 0 1 760 443Z"/></mask></defs><path d="M237 940V833A141 141 0 0 1 378 692V940Z" fill="${fg}"/><path d="M419 940V650A140 140 0 0 1 559 510V940Z" fill="${fg}"/><path d="M610 940V401A60 60 0 0 1 670 341H825A215.5 215.5 0 0 1 825 772H748L612 940Z" fill="${pc}" mask="url(#a)"/></svg>`;
const logo = `data:image/svg+xml;utf8,${encodeURIComponent(MARK("#ffffff", "#3ddc6e"))}`;
// the folded-back corner of the lime peel sticker (same geometry as the site's sticker)
const FLAP = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="g" x1=".85" y1=".15" x2=".3" y2=".7"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#eef2ea"/><stop offset="1" stop-color="#c9d1c2"/></linearGradient></defs><path d="M195.96 102.62A96 96 0 1 1 97.38 4.04Z" fill="#d2f99a"/><path d="M97.38 4.04A96 96 0 0 0 195.96 102.62Z" fill="url(#g)"/></svg>`,
)}`;

/** Title size steps down for long titles so it always fits. */
const titleSize = (t: string) => (t.length <= 42 ? 66 : t.length <= 62 ? 58 : t.length <= 80 ? 50 : 44);

/** White lead-in + green ending: split at the colon, or keep the last few words green. */
function splitTitle(t: string): [string, string] {
  const i = t.indexOf(":");
  if (i > 8 && i < t.length - 8) return [t.slice(0, i + 1), t.slice(i + 1).trim()];
  const w = t.split(" ");
  const n = w.length > 6 ? 3 : 2;
  return [w.slice(0, -n).join(" "), w.slice(-n).join(" ")];
}

const INK = "#0a0b0a";
// green text that runs from bright at the top to deep green at the bottom
const GREEN_TEXT = { backgroundImage: "linear-gradient(180deg, #c9fbd5 0%, #5ee68a 30%, #3ddc6e 55%, #15873f 100%)", backgroundClip: "text", color: "transparent" } as const;

export async function featureImage(post: Post) {
  const c = categories[post.category];
  // a post's own artwork (src/assets/og/posts/<slug>.png) wins; otherwise the category's 3D icon
  const own = await access(join(process.cwd(), "src/assets/og/posts", `${post.slug}.png`)).then(() => true, () => false);
  const art = `data:image/png;base64,${(await asset(own ? `posts/${post.slug}.png` : `${c.icon}.png`)).toString("base64")}`;
  const [lead, accent] = splitTitle(post.title);
  const size = titleSize(post.title);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: INK, fontFamily: "Onest", color: "#fff" }}>
        {/* green grid, fading out toward the edges */}
        <div
          style={{
            position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex",
            backgroundImage: "linear-gradient(rgba(61,220,110,.2) 2px, transparent 2px), linear-gradient(90deg, rgba(61,220,110,.2) 2px, transparent 2px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", backgroundImage: `linear-gradient(90deg, ${INK} 0%, ${INK} 38%, rgba(10,11,10,.35) 70%, rgba(10,11,10,.6) 100%)` }} />

        {/* left: category, title, brand */}
        <div style={{ display: "flex", flexDirection: "column", width: 720, padding: "60px 32px 56px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 25, fontWeight: 500, color: "#3ddc6e" }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#3ddc6e" }} />
            {c.name}
          </div>
          <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", fontSize: size, lineHeight: 1.06, fontWeight: 800, letterSpacing: "-0.01em" }}>
            <div style={{ display: "flex" }}>{lead}</div>
            <div style={{ display: "flex", ...GREEN_TEXT }}>{accent}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 800 }}>
            <img src={logo} width={52} height={39} alt="" />
            <span style={{ display: "flex" }}>
              Permanent<span style={{ marginLeft: 8, fontWeight: 500, color: "#3ddc6e" }}>SEO</span>
            </span>
            <span style={{ display: "flex", marginLeft: 10, fontSize: 22, fontWeight: 500, color: "#8d948f" }}>{readingMinutes(post)} min read</span>
          </div>
        </div>

        {/* right: the post's own artwork (full height), or the category icon */}
        {own ? (
          <div style={{ display: "flex", position: "absolute", top: 0, right: 0, width: 504, height: 630 }}>
            <img src={art} width={504} height={630} alt="" style={{ objectFit: "cover" }} />
            {/* soft left edge so the artwork melts into the background */}
            <div style={{ position: "absolute", top: 0, left: 0, width: 190, height: 630, display: "flex", backgroundImage: `linear-gradient(90deg, ${INK} 0%, rgba(10,11,10,.85) 30%, rgba(10,11,10,0) 100%)` }} />
          </div>
        ) : (
          <div style={{ display: "flex", flex: 1, alignItems: "flex-start", justifyContent: "center", padding: "64px 40px 0 0" }}>
            <img src={art} width={310} height={310} alt="" style={{ objectFit: "contain" }} />
          </div>
        )}

        {/* lime peel sticker */}
        <div style={{ position: "absolute", right: 56, bottom: 44, width: 140, height: 140, display: "flex", transform: "rotate(-12deg)" }}>
          <img src={FLAP} width={140} height={140} alt="" style={{ position: "absolute", left: 0, top: 0 }} />
          <div style={{ position: "absolute", left: 6, top: 50, width: 114, display: "flex", flexDirection: "column", alignItems: "center", color: INK, transform: "rotate(-6deg)" }}>
            <span style={{ fontSize: 26, fontWeight: 800, lineHeight: 1 }}>Free</span>
            <span style={{ fontSize: 16, fontWeight: 500, marginTop: 4 }}>guide</span>
          </div>
        </div>
      </div>
    ),
    {
      ...featureSize,
      fonts: [
        { name: "Onest", data: await bold, weight: 800, style: "normal" },
        { name: "Onest", data: await medium, weight: 500, style: "normal" },
      ],
    },
  );
}
