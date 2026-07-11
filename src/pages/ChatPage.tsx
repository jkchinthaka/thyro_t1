import { useState, useRef, useEffect } from "react";
import { Send, Mic, Paperclip, Plus } from "lucide-react";
import { Card, Btn } from "@/components/common";
import { ChatBubble, TypingIndicator, ChatSafetyBanner } from "@/components/chat";
import { BLUE, TEAL } from "@/constants/colors";
import type { ChatMsg } from "@/types";
import {
  mockUser,
  mockInitialMessages,
  mockQuickActions,
  mockSuggestions,
  mockRecentChats,
  mockChatReply,
} from "@/data/mock";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function ChatPage() {
  useDocumentTitle("AI Chat");
  const [msgs, setMsgs] = useState<ChatMsg[]>(mockInitialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMsg = {
      id: Date.now(),
      from: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMsgs((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setTyping(false);
      const reply: ChatMsg = {
        id: Date.now() + 1,
        from: "ai",
        text: mockChatReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMsgs((prev) => [...prev, reply]);
    }, 1800);
  };

  return (
    <>
      <div className="flex gap-4 h-[calc(100vh-130px)] min-h-[420px]">
        <Card className="w-56 flex-shrink-0 hidden lg:flex flex-col p-3 gap-2">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-1">
            Recent Chats
          </h4>
          {mockRecentChats.map((c) => (
            <button
              key={c.label}
              type="button"
              className="text-left px-2 py-2 rounded-xl hover:bg-accent transition text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <div className="font-medium text-foreground truncate">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.date}</div>
            </button>
          ))}
          <Btn variant="ghost" size="sm" className="mt-auto w-full justify-center" type="button">
            <Plus className="w-4 h-4" aria-hidden="true" /> New Chat
          </Btn>
        </Card>

        <Card className="flex-1 flex flex-col p-0 overflow-hidden min-w-0">
          <ChatSafetyBanner />

          <div
            className="px-4 py-2.5 border-b border-border flex gap-2 overflow-x-auto scrollbar-hide"
            role="group"
            aria-label="Quick actions"
          >
            {mockQuickActions.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => send(a)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                {a}
              </button>
            ))}
          </div>

          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-label="Chat messages"
          >
            {msgs.map((m) => (
              <ChatBubble key={m.id} message={m} userName={mockUser.name} />
            ))}
            {typing && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          <div
            className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide border-t border-border"
            role="group"
            aria-label="Suggestions"
          >
            {mockSuggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs border border-border text-muted-foreground hover:border-primary hover:text-primary transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="px-3 sm:px-4 py-3 border-t border-border flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-xl hover:bg-accent transition text-muted-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="Attach file"
            >
              <Paperclip className="w-5 h-5" aria-hidden="true" />
            </button>
            <label className="sr-only" htmlFor="chat-input">
              Message
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send(input);
              }}
              placeholder="Ask about your symptoms, medications, diet..."
              className="flex-1 min-w-0 py-2.5 px-4 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="button"
              className="p-2 rounded-xl hover:bg-accent transition text-muted-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="Voice input"
            >
              <Mic className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => send(input)}
              disabled={!input.trim()}
              aria-label="Send message"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition disabled:opacity-40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </Card>
      </div>
    </>
  );
}
