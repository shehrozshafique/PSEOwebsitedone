import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

// ⚠ Template only, not legal advice. Wording follows common U.S. carrier (A2P 10DLC) requirements;
// keep it in line with the campaign you register in your CRM's Trust Center.
export const metadata: Metadata = {
  title: `SMS Terms | ${site.name}`,
  description: `How ${site.name} uses text messages, and how to opt out.`,
  alternates: { canonical: "/sms-terms" },
};

const UPDATED = "November 22, 2026"; // TODO

const sections: LegalSection[] = [
  {
    id: "program",
    title: "What you’ll receive",
    body: (
      <p>
        <strong>{site.name}</strong> sends text messages to people who give us their mobile number through our website forms, by calling or texting us,
        or in person. Messages include replies to your enquiry, free audit updates, appointment confirmations and reminders, account and project
        updates, and, if you agreed, occasional offers.
      </p>
    ),
  },
  {
    id: "consent",
    title: "Consent",
    body: (
      <p>
        By providing your mobile number and submitting a form, you agree to receive text messages from {site.name} at that number. Consent is not a
        condition of purchase. You can opt out at any time.
      </p>
    ),
  },
  {
    id: "frequency",
    title: "Message frequency and cost",
    body: <p>Message frequency varies based on your enquiry and appointments. <strong>Message and data rates may apply</strong> according to your mobile plan.</p>,
  },
  {
    id: "stop",
    title: "How to opt out",
    body: (
      <p>
        Reply <strong>STOP</strong> to any message to stop receiving texts. You’ll get one confirmation message, and then no more texts unless you
        sign up again. You can also contact us to opt out.
      </p>
    ),
  },
  {
    id: "help",
    title: "Help",
    body: (
      <p>
        Reply <strong>HELP</strong> for help, or contact us at {site.email} or {site.phone}.
      </p>
    ),
  },
  {
    id: "carriers",
    title: "Carriers",
    body: <p>Mobile carriers are not liable for delayed or undelivered messages.</p>,
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in
        data and consent will not be shared with any third parties. Read our full <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
];

export default function SmsTermsPage() {
  return (
    <LegalPage
      title="SMS Terms"
      intro="How we use text messages, how often, and how to stop them any time with one word: STOP."
      updated={UPDATED}
      current="/sms-terms"
      sections={sections}
    />
  );
}
