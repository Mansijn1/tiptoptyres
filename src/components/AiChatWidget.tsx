import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { BUSINESS, HOURS, fmtHour } from "@/lib/business";

type ChatAction = {
  label: string;
  href: string;
};

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
  action?: ChatAction;
};

const greeting =
  "👋 G'day! Welcome to TipTop Tyres & Wheels. How can I help you find the right tyres or alloy wheels today?";

const quickReplies = [
  "🚗 Which tyres fit my Toyota / Ford?",
  "🔍 How does the Rego plate lookup work?",
  "🛞 Show me Starcorp & SC Racing wheels",
  "📍 What are your Mount Druitt workshop hours?",
];

const weekdayHours = HOURS[1]!;
const saturdayHours = HOURS[6]!;

function answerQuestion(query: string): Omit<ChatMessage, "id"> {
  const normalized = query.toLowerCase();

  if (/\b(hours?|open|opening|close|closing|weekend|saturday|sunday)\b/.test(normalized)) {
    return {
      role: "assistant",
      text: `Our Mount Druitt workshop is open Monday to Friday, ${fmtHour(weekdayHours[0])} to ${fmtHour(weekdayHours[1])}, and Saturday, ${fmtHour(saturdayHours[0])} to ${fmtHour(saturdayHours[1])}. We’re closed Sunday.`,
      action: { label: "View workshop location", href: "/#location" },
    };
  }

  if (/\brego\b|registration|number plate|plate lookup/.test(normalized)) {
    return {
      role: "assistant",
      text: "Choose “By Rego” in our tyre finder, select the state or territory, and enter the registration plate. If the lookup can’t find your vehicle, try searching by vehicle or tyre size instead.",
      action: { label: "Open the tyre finder", href: "/#quick-tyre-finder" },
    };
  }

  if (/\bwheel(s)?\b|alloy|starcorp|sc racing|bronze|satin|rim/.test(normalized)) {
    return {
      role: "assistant",
      text: "We feature Starcorp Racing L2018 Chaos and SR05, plus SC Racing DX136 and 508 styles. Finishes include satin black, matte bronze, and silver machine lip. Our team can help confirm vehicle fitment.",
      action: { label: "Browse the wheels", href: "/wheels" },
    };
  }

  if (/\btyre(s)?\b|tire(s)?\b|fit|vehicle|toyota|ford|hilux|ranger/.test(normalized)) {
    return {
      role: "assistant",
      text: "Tyre fitment depends on your vehicle’s exact make, model, year, and variant. Check the tyre placard or owner’s manual, then search by vehicle or Rego. Our team can confirm the fitment before you book.",
      action: { label: "Find tyres for your vehicle", href: "/#quick-tyre-finder" },
    };
  }

  if (/\bprice(s)?\b|cost|quote|how much/.test(normalized)) {
    return {
      role: "assistant",
      text: `Pricing depends on your vehicle and the tyre or wheel setup. Share your vehicle details in the booking enquiry, or call us on ${BUSINESS.phone} for help.`,
      action: { label: "Make a booking enquiry", href: "/#booking" },
    };
  }

  if (/\bservice(s)?\b|alignment|puncture|repair|balancing/.test(normalized)) {
    return {
      role: "assistant",
      text: "We offer tyre fitting and balancing, wheel alignment, puncture and tyre repairs, 4WD wheel services, and safety inspections. Contact our Mount Druitt team to discuss what your vehicle needs.",
      action: { label: "Explore services", href: "/#services" },
    };
  }

  return {
    role: "assistant",
    text: `I can help with tyre fitment, Rego lookup, alloy wheels, services, and workshop hours. Tell me your vehicle make, model and year, or call our team on ${BUSINESS.phone} for a hand.`,
    action: { label: "Contact TipTop Tyres", href: BUSINESS.phoneHref },
  };
}

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const nextMessageId = useRef(0);
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages]);

  function sendMessage(text: string) {
    const question = text.trim();
    if (!question) return;

    nextMessageId.current += 1;
    const userMessage: ChatMessage = {
      id: nextMessageId.current,
      role: "user",
      text: question,
    };
    nextMessageId.current += 1;
    const answer: ChatMessage = {
      ...answerQuestion(question),
      id: nextMessageId.current,
    };

    setMessages((current) => [...current, userMessage, answer]);
    setDraft("");
  }

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(draft);
  }

  return (
    <div
      className="fixed bottom-20 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      {isOpen && (
        <section
          id="tiptop-ai-chat"
          role="dialog"
          aria-label="TipTop AI Assistant"
          className="flex h-[min(74vh,620px)] max-h-[calc(100dvh-7rem)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-yellow-500/30 bg-zinc-900 text-white shadow-[0_24px_90px_rgba(0,0,0,0.65)] sm:w-[380px]"
        >
          <header className="flex shrink-0 items-center gap-3 border-b border-yellow-500/20 bg-black/40 px-4 py-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-yellow-500/40 bg-white p-1">
              <img src="/tiptop-tyres-logo.png" alt="" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-extrabold text-white">TipTop AI Assistant</h2>
              <p className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-zinc-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                Online · Here to help
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close TipTop AI Assistant"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </header>

          <div
            ref={conversationRef}
            className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
            aria-live="polite"
          >
            <div className="flex items-start gap-2.5">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-400">
                <Bot className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="max-w-[88%] rounded-2xl rounded-tl-sm border border-zinc-700 bg-zinc-800 px-3.5 py-3 text-sm leading-6 text-gray-200">
                {greeting}
              </p>
            </div>

            {messages.length === 0 && (
              <div className="space-y-2 pl-9">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                  Popular questions
                </p>
                {quickReplies.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    className="block w-full cursor-pointer rounded-xl border border-zinc-700 bg-zinc-800 p-2.5 text-left text-sm text-gray-200 transition-colors hover:border-yellow-500/40 hover:text-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2.5 ${message.role === "user" ? "justify-end" : ""}`}
              >
                {message.role === "assistant" && (
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-400">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                )}
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-tr-sm bg-yellow-500 font-medium text-black"
                      : "rounded-tl-sm border border-zinc-700 bg-zinc-800 text-gray-200"
                  }`}
                >
                  <p>{message.text}</p>
                  {message.action && (
                    <a
                      href={message.action.href}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-yellow-400 underline decoration-yellow-500/40 underline-offset-4 transition-colors hover:text-yellow-300"
                    >
                      {message.action.label}
                      <MessageCircle className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={submitMessage}
            className="flex shrink-0 items-center gap-2 border-t border-zinc-800 bg-black/40 p-3"
          >
            <label htmlFor="tiptop-ai-message" className="sr-only">
              Ask TipTop AI Assistant a question
            </label>
            <input
              id="tiptop-ai-message"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about tyres, wheels or fitment..."
              autoComplete="off"
              className="h-11 min-w-0 flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-yellow-500/70 focus:ring-1 focus:ring-yellow-500/30"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-500 text-black transition-colors hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        aria-label={isOpen ? "Close TipTop AI Assistant" : "Open TipTop AI Assistant"}
        aria-expanded={isOpen}
        aria-controls="tiptop-ai-chat"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-14 items-center justify-center gap-2.5 rounded-full bg-yellow-500 px-5 text-sm font-bold text-black shadow-[0_8px_32px_rgba(234,179,8,0.3)] transition-all hover:scale-[1.03] hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span>{isOpen ? "Chat open" : "Ask TipTop AI"}</span>
      </button>
    </div>
  );
}
