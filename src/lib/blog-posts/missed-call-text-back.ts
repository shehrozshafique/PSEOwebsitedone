import type { Post } from "../blog";

export const missedCallTextBack: Post = {
  slug: "missed-call-text-back",
  title: "Missed-call text back: the simplest automation that saves lost leads",
  description:
    "Every missed call is a customer about to call your competitor. Here’s how missed-call text back works, what to say, and how to set it up the right way.",
  category: "automation",
  date: "2026-11-11",
  services: ["ai-automation"],
  takeaways: [
    "Most people who reach voicemail don’t leave a message. They call the next business on the list.",
    "A text that arrives within seconds keeps the conversation going while you’re busy.",
    "The best messages are short, personal and ask one easy question.",
    "Texting customers needs their consent and a clear way to opt out.",
  ],
  blocks: [
    { type: "p", text: "You’re on a roof, with a patient, or driving between jobs. The phone rings and you can’t answer. To you it’s one missed call. To the caller it’s a reason to try the next business on Google, and that business picks up." },
    { type: "p", text: "Missed-call text back fixes this with one simple rule: **if a call isn’t answered, the caller gets a friendly text within seconds.** The conversation keeps going, and you reply when you’re free." },
    { type: "h2", text: "How it works" },
    { type: "list", ordered: true, items: [
      "A customer calls your business number and you don’t pick up.",
      "Within a few seconds, they get a text from the same number.",
      "They reply with what they need, and the message lands in one inbox on your phone.",
      "You (or an AI assistant you approve) reply, answer questions and book the job.",
    ] },
    { type: "h2", text: "What the first text should say" },
    { type: "p", text: "Keep it short, sound like a person, and ask one question that’s easy to answer. Avoid sounding like a robot or a sales pitch." },
    { type: "quote", text: "Hi, this is Mike from Example Roofing. Sorry I missed your call, I’m on a job right now. What can I help you with?" },
    { type: "callout", tone: "tip", title: "Make it local and personal", text: "Use a real first name and your business name. People reply to people, not to “Our team will get back to you shortly”." },
    { type: "h2", text: "Add a follow-up for people who don’t reply" },
    { type: "p", text: "Some callers won’t answer the first text. One gentle follow-up an hour later, and one the next morning, catches many of them. After that, stop: more messages start to feel pushy." },
    { type: "cta" },
    { type: "h2", text: "Doing it the right way: consent and opt-outs" },
    { type: "p", text: "Business texting in the US runs through carrier registration (often called **A2P 10DLC**). Your number needs to be registered, every message should identify your business, and people must be able to reply **STOP** to opt out. Your website forms should say clearly that people may get texts about their request. We set all of this up as part of our [automation service](/services/ai-automation)." },
    { type: "checklist", title: "Before you switch it on", items: [
      "Register your texting number with the carriers (A2P 10DLC)",
      "Add SMS consent wording under every form on your website",
      "Include your business name in the first message",
      "Make sure STOP and HELP replies work",
      "Route replies to an inbox someone actually checks",
    ] },
    { type: "h2", text: "Where to go next" },
    { type: "p", text: "Missed-call text back is usually the first automation we switch on, because it pays for itself fastest. After it, the natural next steps are instant replies to website forms, appointment reminders that cut no-shows, and [review requests](/blog/rank-higher-on-google-maps) after every job." },
  ],
  faqs: [
    { q: "Do I need a new phone number?", a: "Usually not. Most setups keep your existing number by forwarding or porting it, so customers call the same number they always have." },
    { q: "Can AI reply for me?", a: "Yes. An AI assistant can answer common questions and offer booking times, and hand the conversation to you when it needs a person. You decide what it’s allowed to say." },
    { q: "Will it text people who call me for personal reasons?", a: "You can exclude saved contacts or specific numbers, so friends and family never get an automated text." },
  ],
};
