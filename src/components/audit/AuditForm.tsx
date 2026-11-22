"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { submitLead } from "@/lib/attribution";
import FormConsent from "@/components/FormConsent";

const businessTypes = ["Online store / Ecommerce", "Home services", "Roofing / Contractor", "Dental / Medical", "Law firm", "Med spa / Beauty", "Real estate", "Other"];
const goals = ["More calls from Google", "More online sales", "Better website or store", "Stop missing leads", "More reviews", "Not sure yet"];

const input =
  "w-full rounded-xl border border-ink/15 bg-paper px-4 py-3.5 text-[15px] outline-none transition-colors placeholder:text-ink/40 hover:border-ink/30 focus:border-ink focus:bg-white";

/**
 * Two short steps: about the business, then contact details.
 * Sends to /api/lead, which creates the contact in the CRM at "New lead" with source + tags.
 */
export default function AuditForm({ id = "audit-form" }: { id?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ website: "", type: "", goal: "", name: "", phone: "", email: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honey, setHoney] = useState("");
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setData({ ...data, [k]: e.target.value });

  return (
    <form
      id={id}
      onSubmit={async (e) => {
        e.preventDefault();
        if (step === 0) return setStep(1);
        setBusy(true);
        setError(null);
        const err = await submitLead({ form: "free-audit-page", ...data, businessType: data.type, company: honey });
        if (err) {
          setError(err);
          setBusy(false);
          return;
        }
        router.push("/thank-you");
      }}
      className="glass-light relative rounded-2xl p-6 sm:p-8"
    >
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" value={honey} onChange={(e) => setHoney(e.target.value)} />
      <div className="flex items-center justify-between gap-4">
        <p className="font-display text-2xl font-bold">Get my free audit</p>
        <p className="font-semibold text-xs text-slate">Step {step + 1} of 2</p>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink/8" aria-hidden="true">
        <motion.div className="h-full rounded-full bg-green" animate={{ width: step === 0 ? "50%" : "100%" }} transition={{ duration: 0.4 }} />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="mt-6 grid gap-4">
            <label className="grid gap-1.5 text-sm font-medium">
              Your website
              <input id="website" name="website" className={input} placeholder="yourbusiness.com or yourstore.com" value={data.website} onChange={set("website")} required autoComplete="url" inputMode="url" autoCapitalize="none" autoCorrect="off" spellCheck={false} />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Type of business
              <select id="type" name="type" className={input} value={data.type} onChange={set("type")} required>
                <option value="" disabled>Choose one</option>
                {businessTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <fieldset className="grid gap-2">
              <legend className="mb-1.5 text-sm font-medium">What do you want most?</legend>
              <div className="flex flex-wrap gap-2">
                {goals.map((g) => (
                  <label key={g} className={`cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors ${data.goal === g ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/30"}`}>
                    <input type="radio" name="goal" value={g} className="sr-only" checked={data.goal === g} onChange={set("goal")} required />
                    {g}
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="submit" className="btn-ink mt-2 w-full">Next: where should we send it? →</button>
          </motion.div>
        ) : (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="mt-6 grid gap-4">
            <label className="grid gap-1.5 text-sm font-medium">
              Your name
              <input id="name" name="name" className={input} value={data.name} onChange={set("name")} required autoComplete="name" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Mobile number <span className="font-normal text-slate">(we text you when it’s ready)</span>
              <input id="phone" name="phone" type="tel" className={input} value={data.phone} onChange={set("phone")} required autoComplete="tel" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Email
              <input id="email" name="email" type="email" className={input} value={data.email} onChange={set("email")} required autoComplete="email" />
            </label>
            {error && <p role="alert" className="rounded-xl bg-coral/10 px-4 py-3 text-sm text-[#c2391b]">{error}</p>}
            <button type="submit" disabled={busy} className="btn-green mt-2 w-full disabled:opacity-70">{busy ? "Sending…" : "Send me my free audit →"}</button>
            <FormConsent />
            <button type="button" onClick={() => setStep(0)} className="text-sm text-slate underline-offset-4 hover:underline">← Back</button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-xs text-slate">
        <span>✓ 100% free</span><span>✓ No sales pressure</span><span>✓ Ready in 48 hours</span>
      </p>
    </form>
  );
}
