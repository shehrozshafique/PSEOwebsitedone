import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

// ⚠ Template only, not legal advice. Have a lawyer review before launch.
export const metadata: Metadata = {
  title: `Terms of Service | ${site.name}`,
  description: `The terms for using the ${site.name} website and free audit.`,
  alternates: { canonical: "/terms" },
};

const UPDATED = "November 22, 2026"; // TODO

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement",
    body: (
      <p>
        These terms apply to your use of this website, operated by <strong>{site.legalName}</strong>. By using the site you agree to them. Paid
        services are covered by a separate written agreement or proposal, which takes priority if anything conflicts with these terms.
      </p>
    ),
  },
  {
    id: "use",
    title: "Using the website",
    body: (
      <ul>
        <li>Use the site only for lawful purposes and give accurate information in forms.</li>
        <li>Don’t try to break, overload, scrape or gain unauthorised access to the site or its systems.</li>
        <li>Don’t submit spam, malicious code, or anyone else’s personal information without permission.</li>
      </ul>
    ),
  },
  {
    id: "audit",
    title: "Free audit and information",
    body: (
      <>
        <p>
          The free audit and other content on this site are general information based on what we can see publicly. They are not a guarantee of
          rankings, leads or revenue. Search engines, ad platforms and markets change, and results vary by business.
        </p>
        <p>Examples, case studies and figures shown on the site may be illustrative and are not a promise of specific results.</p>
      </>
    ),
  },
  {
    id: "ip",
    title: "Our content",
    body: (
      <p>
        The website’s design, text, graphics and code belong to {site.name} or its licensors. You may view and share pages for personal or internal
        business use, but not copy, resell or republish them without permission. Third-party brand names and logos belong to their owners and are
        shown only to describe integrations.
      </p>
    ),
  },
  {
    id: "third",
    title: "Third-party links and tools",
    body: <p>The site may link to or use third-party services (for example scheduling, payments or video). We are not responsible for their content or practices, and their own terms apply.</p>,
  },
  {
    id: "sms",
    title: "Calls, texts and emails",
    body: (
      <p>
        By submitting a form with your phone number, you agree that we may contact you about your enquiry by call, text or email, as described in our{" "}
        <Link href="/sms-terms">SMS Terms</Link> and <Link href="/privacy">Privacy Policy</Link>. You can opt out at any time.
      </p>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: <p>The site is provided “as is” and “as available”. To the fullest extent allowed by law, we make no warranties of any kind about the site or its content.</p>,
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the fullest extent allowed by law, {site.legalName} is not liable for any indirect, incidental or consequential damages, or lost profits,
        arising from your use of the website. Our total liability for any claim related to the website is limited to one hundred U.S. dollars (US$100).
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: <p>These terms are governed by the laws of the State of {site.governingState}, USA, without regard to conflict-of-law rules. Courts in that state have jurisdiction over any dispute.</p>,
  },
  {
    id: "changes",
    title: "Changes and contact",
    body: (
      <p>
        We may update these terms. The date at the top shows the latest version. Questions? Contact {site.legalName}, {site.address}, email {site.email},
        phone {site.phone}.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="The rules for using this website and our free audit. Paid work is covered by its own written agreement."
      updated={UPDATED}
      current="/terms"
      sections={sections}
    />
  );
}
