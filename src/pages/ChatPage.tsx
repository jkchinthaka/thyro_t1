import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Send, Mic, Paperclip, Plus, Trash2 } from "lucide-react";
import { Card, Btn, LoadingState, ErrorState } from "@/components/common";
import { ChatBubble, TypingIndicator, ChatSafetyBanner } from "@/components/chat";
import { BLUE, TEAL } from "@/constants/colors";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useToast } from "@/hooks/useToast";
import {
  createSession,
  deleteSession,
  getSession,
  listSessions,
  sendMessage,
} from "@/services/chatService";
import type { ChatMessage, ChatMsg, ChatSession } from "@/types/chat";
import type { AppError } from "@/types/api";

const QUICK_ACTIONS = [
  "Medication Help",
  "Symptom Check",
  "Low-Iodine Diet",
  "Follow-up Care",
  "Emotional Support",
];

const SUGGESTIONS = [
  "What is general education about fatigue after thyroidectomy?",
  "Where can I learn about low-iodine diet basics?",
  "When should I use the symptom safety check?",
];

const DISCLAIMER =
  "ThyroCare AI provides general educational information based on approved sources. It does not provide a diagnosis, interpret medical results, or replace advice from your healthcare team.";

function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function toBubble(message: ChatMessage): ChatMsg {
  return {
    id: message.id,
    from: message.role === "user" ? "user" : "ai",
    text: message.content,
    time: formatTime(message.created_at),
    response_mode: message.response_mode,
    citations: message.citations,
    safety_notice: message.safety_notice,
  };
}

export function ChatPage() {
  useDocumentTitle("AI Chat");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { error: toastError, success } = useToast();
  const userName = user?.full_name || "Patient";

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [redirectNotice, setRedirectNotice] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const refreshSessions = useCallback(async () => {
    const list = await listSessions({ page: 1, page_size: 30 });
    setSessions(list.items);
    return list.items;
  }, []);

  const openSession = useCallback(async (id: string) => {
    const detail = await getSession(id);
    setSessionId(detail.session.id);
    setMsgs(detail.messages.map(toBubble));
    setRedirectNotice(null);
  }, []);

  const bootstrap = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const items = await refreshSessions();
      if (items.length > 0) {
        await openSession(items[0].id);
      } else {
        const created = await createSession("New conversation");
        await refreshSessions();
        await openSession(created.id);
      }
    } catch (err) {
      const appErr = err as AppError;
      setLoadError(appErr?.message || "Chat could not be loaded. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [openSession, refreshSessions]);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  const ensureSession = async (): Promise<string> => {
    if (sessionId) return sessionId;
    const created = await createSession("New conversation");
    await refreshSessions();
    setSessionId(created.id);
    return created.id;
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    setTyping(true);
    setRedirectNotice(null);
    const optimistic: ChatMsg = {
      id: `local-${Date.now()}`,
      from: "user",
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMsgs((prev) => [...prev, optimistic]);
    setInput("");
    try {
      const id = await ensureSession();
      const result = await sendMessage(id, trimmed);
      setMsgs((prev) => {
        const withoutOptimistic = prev.filter((m) => m.id !== optimistic.id);
        return [
          ...withoutOptimistic,
          toBubble(result.user_message),
          toBubble(result.assistant_message),
        ];
      });
      if (result.response_mode === "safety_redirect") {
        setRedirectNotice(result.assistant_message.content);
      }
      await refreshSessions();
    } catch (err) {
      const appErr = err as AppError;
      setMsgs((prev) => prev.filter((m) => m.id !== optimistic.id));
      setInput(trimmed);
      if (appErr?.status === 429) {
        toastError("Too many messages. Please wait a moment and try again.");
      } else {
        toastError(appErr?.message || "Message could not be sent. Please try again.");
      }
    } finally {
      setTyping(false);
      setSending(false);
    }
  };

  const handleNewChat = async () => {
    try {
      const created = await createSession("New conversation");
      await refreshSessions();
      await openSession(created.id);
      success("New chat started");
    } catch (err) {
      const appErr = err as AppError;
      toastError(appErr?.message || "Could not create chat");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this conversation?")) return;
    try {
      await deleteSession(id);
      const items = await refreshSessions();
      if (items[0]) {
        await openSession(items[0].id);
      } else {
        await handleNewChat();
      }
      success("Conversation deleted");
    } catch (err) {
      const appErr = err as AppError;
      toastError(appErr?.message || "Could not delete conversation");
    }
  };

  if (loading) return <LoadingState message="Loading chat…" />;
  if (loadError) {
    return (
      <ErrorState
        title="Unable to load chat"
        message={loadError}
        onRetry={() => void bootstrap()}
      />
    );
  }

  return (
    <>
      <div className="flex gap-4 h-[calc(100vh-130px)] min-h-[420px]">
        <Card className="w-56 flex-shrink-0 hidden lg:flex flex-col p-3 gap-2">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-1">
            Recent Chats
          </h4>
          {sessions.length === 0 ? (
            <p className="text-xs text-muted-foreground px-2">No conversations yet.</p>
          ) : (
            sessions.map((c) => (
              <div key={c.id} className="flex items-start gap-1">
                <button
                  type="button"
                  onClick={() => void openSession(c.id)}
                  className={`flex-1 text-left px-2 py-2 rounded-xl hover:bg-accent transition text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                    sessionId === c.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="font-medium text-foreground truncate">{c.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {c.last_message_at
                      ? new Date(c.last_message_at).toLocaleDateString()
                      : new Date(c.created_at).toLocaleDateString()}
                  </div>
                </button>
                <button
                  type="button"
                  aria-label="Delete conversation"
                  className="p-1.5 text-muted-foreground hover:text-red-600 cursor-pointer"
                  onClick={() => void handleDelete(c.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
          <Btn
            variant="ghost"
            size="sm"
            className="mt-auto w-full justify-center"
            type="button"
            onClick={() => void handleNewChat()}
          >
            <Plus className="w-4 h-4" aria-hidden="true" /> New Chat
          </Btn>
        </Card>

        <Card className="flex-1 flex flex-col p-0 overflow-hidden min-w-0">
          <ChatSafetyBanner />
          <p className="px-4 py-2 text-[11px] text-muted-foreground border-b border-border leading-relaxed">
            {DISCLAIMER}
          </p>

          {redirectNotice ? (
            <div
              className="mx-4 mt-3 rounded-2xl border border-red-300 bg-red-50 p-3 text-sm text-red-800"
              role="alert"
            >
              <p className="font-semibold">Safety check recommended</p>
              <p className="mt-1 text-xs">{redirectNotice}</p>
              <p className="mt-1 text-xs">
                This application cannot contact emergency services. Chat text is not used to
                classify emergency severity.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="text-xs font-bold text-red-700 hover:underline cursor-pointer"
                  onClick={() => navigate(ROUTES.SYMPTOMS)}
                >
                  Open symptom safety check →
                </button>
                <button
                  type="button"
                  className="text-xs font-bold text-red-700 hover:underline cursor-pointer"
                  onClick={() => navigate(ROUTES.EMERGENCY)}
                >
                  Emergency Support →
                </button>
              </div>
            </div>
          ) : null}

          <div
            className="px-4 py-2.5 border-b border-border flex gap-2 overflow-x-auto scrollbar-hide"
            role="group"
            aria-label="Quick actions"
          >
            {QUICK_ACTIONS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => void send(a)}
                disabled={sending}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50"
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
            {msgs.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Ask an educational question. Answers use approved sources only when available.
              </p>
            ) : (
              msgs.map((m) => <ChatBubble key={m.id} message={m} userName={userName} />)
            )}
            {typing && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          <div
            className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide border-t border-border"
            role="group"
            aria-label="Suggestions"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void send(s)}
                disabled={sending}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs border border-border text-muted-foreground hover:border-primary hover:text-primary transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50"
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
              disabled
              title="File uploads are not available"
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
                if (e.key === "Enter") void send(input);
              }}
              placeholder="Ask about your symptoms, medications, diet..."
              className="flex-1 min-w-0 py-2.5 px-4 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              disabled={sending}
              maxLength={4000}
            />
            <button
              type="button"
              className="p-2 rounded-xl hover:bg-accent transition text-muted-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="Voice input"
              disabled
              title="Voice input is not available"
            >
              <Mic className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => void send(input)}
              disabled={!input.trim() || sending}
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
