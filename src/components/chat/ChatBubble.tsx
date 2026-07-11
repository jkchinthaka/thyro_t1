import { BLUE, TEAL } from "@/constants/colors";
import { Avatar } from "@/components/common";
import type { ChatMsg } from "@/types/chat";
import { Heart } from "lucide-react";

export function ChatBubble({ message, userName }: { message: ChatMsg; userName: string }) {
  const m = message;
  return (
    <div className={`flex gap-3 ${m.from === "user" ? "flex-row-reverse" : ""}`}>
      {m.from === "ai" ? (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 self-end"
          style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}
        >
          <Heart className="w-4 h-4 text-white" />
        </div>
      ) : (
        <Avatar name={userName} size={8} />
      )}
      <div
        className={`max-w-lg ${m.from === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}
      >
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
            m.from === "ai" ? "bg-muted text-foreground rounded-tl-sm" : "text-white rounded-tr-sm"
          }`}
          style={
            m.from === "user" ? { background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` } : {}
          }
        >
          {m.text}
        </div>
        {m.from === "ai" && m.citations && m.citations.length > 0 ? (
          <ol className="text-[10px] text-muted-foreground space-y-1 mt-1 list-decimal pl-4">
            {m.citations.map((c, idx) => (
              <li key={c.citation_id}>
                <span className="font-semibold text-foreground">
                  [{idx + 1}] {c.title}
                </span>
                {" · "}
                {c.source_name} · v{c.document_version}
                {c.source_url ? (
                  <>
                    {" · "}
                    <a
                      href={c.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Source
                    </a>
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        ) : null}
        {m.from === "ai" && m.response_mode && m.response_mode !== "grounded_answer" ? (
          <span className="text-[10px] uppercase tracking-wide text-amber-700">
            {m.response_mode.replaceAll("_", " ")}
          </span>
        ) : null}
        <span className="text-[10px] text-muted-foreground">{m.time}</span>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}
      >
        <Heart className="w-4 h-4 text-white" />
      </div>
      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        <div
          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
