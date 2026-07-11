import { useState, useRef, useEffect } from "react";
import { Send, Mic, Paperclip, Plus } from "lucide-react";
import { Card, Btn } from "@/components/common";
import { ChatBubble, TypingIndicator, ChatSafetyBanner } from "@/components/chat";
import { DashboardLayout } from "@/layouts";
import { BLUE, TEAL } from "@/constants/colors";
import type { ChatMsg, SetScreen } from "@/types";
import {
  mockUser,
  mockInitialMessages,
  mockQuickActions,
  mockSuggestions,
  mockRecentChats,
  mockChatReply,
} from "@/data/mock";

export function ChatPage({ setScreen }: { setScreen: SetScreen }) {
  const [msgs, setMsgs] = useState<ChatMsg[]>(mockInitialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMsg = { id: Date.now(), from: "user", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMsgs(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply: ChatMsg = {
        id: Date.now() + 1, from: "ai",
        text: mockChatReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMsgs(prev => [...prev, reply]);
    }, 1800);
  };

  return (
    <DashboardLayout screen="chat" setScreen={setScreen} title="AI Health Assistant">
      <div className="flex gap-4 h-[calc(100vh-130px)]">
        {/* Chat history sidebar */}
        <Card className="w-56 flex-shrink-0 hidden lg:flex flex-col p-3 gap-2">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-1">Recent Chats</h4>
          {mockRecentChats.map(c => (
            <button key={c.label} className="text-left px-2 py-2 rounded-xl hover:bg-accent transition text-sm cursor-pointer">
              <div className="font-medium text-foreground truncate">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.date}</div>
            </button>
          ))}
          <Btn variant="ghost" size="sm" className="mt-auto w-full justify-center">
            <Plus className="w-4 h-4" /> New Chat
          </Btn>
        </Card>

        {/* Main chat */}
        <Card className="flex-1 flex flex-col p-0 overflow-hidden">
          <ChatSafetyBanner setScreen={setScreen} />

          {/* Quick actions */}
          <div className="px-4 py-2.5 border-b border-border flex gap-2 overflow-x-auto scrollbar-hide">
            {mockQuickActions.map(a => (
              <button
                key={a}
                onClick={() => send(a)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer"
              >
                {a}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {msgs.map(m => (
              <ChatBubble key={m.id} message={m} userName={mockUser.name} />
            ))}
            {typing && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide border-t border-border">
            {mockSuggestions.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs border border-border text-muted-foreground hover:border-primary hover:text-primary transition cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border flex items-center gap-2">
            <button className="p-2 rounded-xl hover:bg-accent transition text-muted-foreground cursor-pointer"><Paperclip className="w-5 h-5" /></button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Ask about your symptoms, medications, diet..."
              className="flex-1 py-2.5 px-4 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button className="p-2 rounded-xl hover:bg-accent transition text-muted-foreground cursor-pointer"><Mic className="w-5 h-5" /></button>
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition disabled:opacity-40 cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
