"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { submitLead } from "@/lib/attribution";
import FormConsent from "@/components/FormConsent";

const topics = ["New project", "Free audit", "Pricing question", "I’m a current client", "Partnership", "Something else"];

const input =
  "w-full rounded-xl border border-ink/15 bg-paper px-4 py-3.5 text-[15px] outline-none transition-colors placeholder:text-ink/40 hover:border-ink/30 focus:border-ink focus:bg-white";

export default function ContactForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honey, setHoney] = useState("");
  // arriving from a pricing button (?plan=...): pre-fill the message with the chosen plan
  const message = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("plan");
    if (p && message.current && !message.current.value) message.current.value = `I’d like to start: ${p.slice(0, 120)}.

About my business: `;
  }, []);

  return (
    <div className="glass-light relative rounded-2xl p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-12 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-green text-xl text-[#03150a]" aria-hidden="true">✓</span>
            <p className="mt-5 font-display text-3xl font-bold">Message sent!</p>
            <p className="mx-auto mt-2 max-w-[36ch] text-slate">Thanks for reaching out. We reply within one business day, usually much sooner.</p>
            <Link href="/work" className="btn-outline mt-6">See our work while you wait</Link>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -10 }}
            onSubmit={async (e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              setBusy(true);
              setError(null);
              const err = await submitLead({
                form: "contact-page",
                name: String(f.get("name") ?? ""),
                phone: String(f.get("phone") ?? ""),
                email: String(f.get("email") ?? ""),
                website: String(f.get("website") ?? ""),
                topic,
                message: String(f.get("message") ?? ""),
                company: honey,
              });
              setBusy(false);
              if (err) return setError(err);
              setDone(true);
            }}
          >
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" value={honey} onChange={(e) => setHoney(e.target.value)} />
            <p className="font-display text-2xl font-bold">Send us a message</p>

            <fieldset className="mt-5">
              <legend className="mb-2 text-sm font-medium">What’s it about?</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <label key={t} className={`cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors ${topic === t ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/30"}`}>
                    <input type="radio" name="topic" value={t} className="sr-only" checked={topic === t} onChange={() => setTopic(t)} />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">
                Name
                <input id="c-name" name="name" required autoComplete="name" className={input} />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Phone
                <input id="c-phone" name="phone" type="tel" required autoComplete="tel" className={input} />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Email
                <input id="c-email" name="email" type="email" required autoComplete="email" className={input} />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Website <span className="font-normal text-slate">(optional)</span>
                <input id="c-website" name="website" autoComplete="url" inputMode="url" autoCapitalize="none" autoCorrect="off" spellCheck={false} className={input} placeholder="yourbusiness.com" />
              </label>
            </div>
            <label className="mt-4 grid gap-1.5 text-sm font-medium">
              Message
              <textarea ref={message} id="c-message" name="message" rows={5} required maxLength={3000} className={`${input} resize-y`} placeholder="Tell us a bit about your business and what you need help with." />
            </label>

            {error && <p role="alert" className="mt-4 rounded-xl bg-coral/10 px-4 py-3 text-sm text-[#c2391b]">{error}</p>}
            <button type="submit" disabled={busy} className="btn-ink mt-5 w-full disabled:opacity-70">{busy ? "Sending…" : "Send message →"}</button>
            <p className="mt-3 text-center text-xs text-slate">We reply within one business day. No spam, ever.</p>
            <FormConsent />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
