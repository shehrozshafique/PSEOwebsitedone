import Link from "next/link";
import { site } from "@/lib/site";

/** Text-message consent shown under every form (needed for SMS carrier registration). */
export default function FormConsent({ dark = false }: { dark?: boolean }) {
  const a = dark ? "text-white/70 underline underline-offset-2 hover:text-white" : "text-ink/70 underline underline-offset-2 hover:text-ink";
  return (
    <p className={`mt-3 text-xs leading-snug ${dark ? "text-white/45" : "text-slate"}`}>
      By submitting, you agree that {site.name} may contact you by call, text and email about your request. Message frequency varies. Msg &amp; data
      rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See our{" "}
      <Link href="/privacy" className={a}>Privacy Policy</Link> and <Link href="/sms-terms" className={a}>SMS Terms</Link>.
    </p>
  );
}
