import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

// ⚠ Template only, not legal advice. Have a lawyer review before launch.
export const metadata: Metadata = {
  title: `Privacy Policy | ${site.name}`,
  description: `How ${site.name} collects, uses and protects your information.`,
  alternates: { canonical: "/privacy" },
};

const UPDATED = "November 22, 2026"; // TODO: update when the policy changes

const sections: LegalSection[] = [
  {
    id: "who",
    title: "Who we are",
    body: (
      <p>
        This website is operated by <strong>{site.legalName}</strong> (“{site.name}”, “we”, “us”). This policy explains what information we collect
        through this website, forms, phone and text messages, and how we use and protect it.
      </p>
    ),
  },
  {
    id: "collect",
    title: "Information we collect",
    body: (
      <>
        <p><strong>Information you give us</strong> when you fill in a form, call, text or email us:</p>
        <ul>
          <li>Name, phone number, email address and business website</li>
          <li>Your business type, goals, and anything you write in a message</li>
        </ul>
        <p><strong>Information collected automatically</strong> when you visit the site:</p>
        <ul>
          <li>Pages visited, the page you arrived on and the site that referred you</li>
          <li>Campaign details in links (for example UTM tags or ad click IDs), so we know which ads or posts brought you</li>
          <li>Device and browser type, approximate location from your IP address, and cookies or similar technologies (see below)</li>
        </ul>
      </>
    ),
  },
  {
    id: "use",
    title: "How we use your information",
    body: (
      <ul>
        <li>To reply to you, prepare your free audit, and schedule calls</li>
        <li>To provide and improve our services, and to send you information you asked for</li>
        <li>To send service and appointment messages by text or email, and marketing messages if you agreed to receive them</li>
        <li>To understand which marketing brings us customers, and to improve the website</li>
        <li>To prevent spam and fraud, and to meet legal obligations</li>
      </ul>
    ),
  },
  {
    id: "sms",
    title: "Text messages (SMS)",
    body: (
      <>
        <p>
          If you give us your mobile number and agree to receive texts, we use it to send messages about your enquiry, appointments and our services.
          Message frequency varies. Message and data rates may apply. Reply <strong>STOP</strong> to opt out or <strong>HELP</strong> for help at any time.
          See our <Link href="/sms-terms">SMS Terms</Link>.
        </p>
        <p>
          <strong>
            No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator
            opt-in data and consent will not be shared with any third parties.
          </strong>{" "}
          This does not include service providers that help us send messages, who may only use it to provide that service.
        </p>
      </>
    ),
  },
  {
    id: "share",
    title: "When we share information",
    body: (
      <>
        <p>We do not sell your personal information. We share it only with:</p>
        <ul>
          <li><strong>Service providers</strong> that help us run our business, such as website hosting, our customer platform (CRM), email and text messaging, analytics and scheduling. They may only use it to provide services to us.</li>
          <li><strong>Advertising platforms</strong> (such as Google and Meta) to measure ad results, where allowed by law and your settings.</li>
          <li><strong>Authorities</strong> when required by law, or to protect our rights and safety.</li>
          <li>A buyer or successor if our business is sold or merged.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and tracking",
    body: (
      <>
        <p>
          We use cookies and similar tools (including browser storage) to remember where you came from, measure how the site is used, and measure our
          advertising. Your browser lets you block or delete cookies. Blocking them may affect parts of the site.
        </p>
        <p>
          Analytics and ad tools we may use include Google Analytics, Google Ads and Meta Pixel. You can opt out of Google Analytics with Google’s
          browser add-on, and adjust ad settings in your Google and Meta accounts.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    body: <p>We keep information for as long as needed to respond to you, provide services, and meet legal, tax and accounting requirements. Then we delete or anonymise it.</p>,
  },
  {
    id: "rights",
    title: "Your choices and rights",
    body: (
      <>
        <p>
          You can ask us to access, correct or delete your personal information, or to stop sending you marketing. Depending on where you live (for
          example California and other U.S. states, or the EU/UK), you may have additional rights, such as knowing what we collect and opting out of
          “sharing” for targeted advertising.
        </p>
        <p>To make a request, contact us using the details on our <Link href="/contact">contact page</Link>. We will not treat you differently for using your rights.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: <p>We use reasonable technical and organisational measures to protect your information. No method of sending or storing data online is 100% secure.</p>,
  },
  {
    id: "children",
    title: "Children",
    body: <p>Our website and services are for businesses and are not directed to children under 16. We do not knowingly collect their information.</p>,
  },
  {
    id: "changes",
    title: "Changes and contact",
    body: (
      <p>
        We may update this policy. The date at the top shows the latest version. Questions? Contact {site.legalName}, {site.address}, email{" "}
        {site.email}, phone {site.phone}.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Plain-English summary: we collect what you send us and basic website usage, use it to help your business, never sell it, and never share your mobile number for marketing."
      updated={UPDATED}
      current="/privacy"
      sections={sections}
    />
  );
}
