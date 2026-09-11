import { useState, useRef, useEffect } from "react";
import { chatbotKnowledge } from "../data";
import { useData } from "../context/DataContext";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

let msgId = 0;

export default function Chatbot({ isOpen, onToggle }: ChatbotProps) {
  const { kbItems, developerInfo } = useData();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: ++msgId,
      role: "ai",
      text: "Halo! Saya asisten AI Arya Yusufa Agnil Fikri. Tanya apapun tentang pengalaman, proyek, atau cara berkolaborasi. Ada yang bisa saya bantu?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getDynamicResponse = (query: string): string => {
    const lower = query.toLowerCase();
    // 1. Check dynamic kbItems from Supabase DataContext
    if (kbItems && kbItems.length > 0) {
      for (const item of kbItems) {
        if (item.active && item.triggers.some((t) => lower.includes(t.toLowerCase()))) {
          return item.response;
        }
      }
    }
    // 2. Fallback to static chatbotKnowledge
    for (const item of chatbotKnowledge) {
      if (item.trigger.some((t) => lower.includes(t.toLowerCase()))) {
        return item.response;
      }
    }
    // 3. Default reply with dynamic name & email
    return `Pertanyaan menarik! Untuk jawaban yang lebih spesifik, silakan hubungi ${developerInfo.name || "Arya"} langsung melalui form kontak atau email ke ${developerInfo.email || "arya@agnilfikri.dev"}.`;
  };

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: ++msgId, role: "user", text }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [...m, { id: ++msgId, role: "ai", text: getDynamicResponse(text) }]);
    }, 900 + Math.random() * 600);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        id="chatbot-toggle"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-sm flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: isOpen ? "var(--muted)" : "var(--primary)",
          color: isOpen ? "var(--foreground)" : "var(--primary-foreground)",
          boxShadow: isOpen ? "none" : "0 0 24px rgba(200,241,53,0.3)",
        }}
        title="Tanya AI"
        aria-label={isOpen ? "Tutup chatbot" : "Buka chatbot"}
      >
        {isOpen ? (
          /* Close / X icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          /* Chat bubble with dots icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H6l-2 2V4h16v10z"/>
            <circle cx="8.5" cy="9.5" r="1.5"/>
            <circle cx="12" cy="9.5" r="1.5"/>
            <circle cx="15.5" cy="9.5" r="1.5"/>
          </svg>
        )}
      </button>

      {/* Chat panel — original positioning */}
      {isOpen && (
        <div
          id="chatbot-panel"
          className="fixed bottom-22 right-6 z-50 w-80 md:w-96 rounded-sm border overflow-hidden animate-slide-top"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            height: "420px",
            bottom: "80px",
          }}
        >
          <div
            className="h-[2px]"
            style={{ background: "var(--primary)" }}
          />
          <div
            className="px-4 py-3 border-b flex items-center gap-3"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="w-7 h-7 rounded-sm flex items-center justify-center"
              style={{ background: "rgba(200,241,53,0.15)", color: "var(--primary)" }}
            >
              {/* Robot / bot icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h3a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h3V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2zm-4 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm8 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-4 3c-1.5 0-2.77.77-3.46 1.93L8.27 16h7.46l-.27-.07A4 4 0 0 0 12 14z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-mono text-xs font-semibold text-foreground">Asisten Arya</p>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#4ade80" }}
                />
                <span className="font-sans text-[10px] text-muted-foreground">Online</span>
              </div>
            </div>
            <span className="font-mono text-[9px] text-muted-foreground">AI-powered</span>
          </div>

          <div
            className="overflow-y-auto p-4 space-y-3"
            style={{ height: "calc(420px - 48px - 56px)" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[80%] rounded-sm px-3 py-2 font-sans text-xs leading-relaxed"
                  style={
                    msg.role === "user"
                      ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                      : { background: "var(--muted)", color: "var(--foreground)" }
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="px-3 py-2 rounded-sm font-mono text-xs"
                  style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                >
                  <span>●</span>
                  <span className="mx-0.5">●</span>
                  <span>●</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div
            className="border-t flex gap-0 h-14"
            style={{ borderColor: "var(--border)" }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Tanya sesuatu..."
              className="flex-1 bg-transparent font-sans text-xs text-foreground px-4 outline-none placeholder:text-muted-foreground"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            />
            <button
              onClick={send}
              className="w-12 h-full flex items-center justify-center transition-colors hover:text-primary"
              style={{ color: "var(--muted-foreground)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
