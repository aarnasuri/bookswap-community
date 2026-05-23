import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, BookOpen, MessageSquare, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import {
  useChatMessages,
  useMyChatThreads,
  useSendMessage,
} from "../hooks/useChats";
import type { ChatThread } from "../types";

function formatTime(ts: bigint | undefined): string {
  if (!ts) return "";
  const date = new Date(Number(ts) / 1_000_000);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000);
  if (diffDays === 0)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return date.toLocaleDateString([], { weekday: "short" });
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function initials(name: string | undefined) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// ── Thread List Item ─────────────────────────────────────────────────────────

interface ThreadItemProps {
  thread: ChatThread;
  active: boolean;
  onClick: () => void;
}

function ThreadItem({ thread, active, onClick }: ThreadItemProps) {
  return (
    <button
      type="button"
      className={`w-full text-left p-3.5 flex items-start gap-3 border-b border-border transition-smooth hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
        active ? "bg-primary hover:bg-primary" : ""
      }`}
      onClick={onClick}
      data-ocid="message-thread-item"
    >
      <Avatar className="w-9 h-9 shrink-0 mt-0.5">
        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
          {initials(thread.otherUserName)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-1">
          <p className="text-sm font-semibold text-foreground truncate">
            {thread.otherUserName ?? "Unknown Reader"}
          </p>
          <span className="text-xs text-muted-foreground shrink-0">
            {formatTime(thread.lastMessageAt)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
          <BookOpen className="w-3 h-3 shrink-0" />
          <span className="truncate">{thread.bookTitle}</span>
        </p>
        {thread.lastMessage && (
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {thread.lastMessage}
          </p>
        )}
      </div>
      {(thread.unreadCount ?? 0) > 0 && (
        <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
      )}
    </button>
  );
}

// ── Thread List Panel ────────────────────────────────────────────────────────

interface ThreadListProps {
  threads: ChatThread[];
  isLoading: boolean;
  activeId: bigint | null;
  onSelect: (thread: ChatThread) => void;
}

function ThreadList({
  threads,
  isLoading,
  activeId,
  onSelect,
}: ThreadListProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col shadow-warm-sm h-full">
      <div className="px-4 py-3 border-b border-border bg-muted flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-muted-foreground" />
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Conversations
        </p>
      </div>
      <div className="flex-1 overflow-y-auto" data-ocid="thread-list">
        {isLoading ? (
          <div className="p-3 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 items-start">
                <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>
            ))}
          </div>
        ) : threads.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              No active exchanges yet — requests must be accepted to unlock chat
            </p>
          </div>
        ) : (
          threads.map((t) => (
            <ThreadItem
              key={t.id.toString()}
              thread={t}
              active={activeId === t.id}
              onClick={() => onSelect(t)}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ── Chat View ────────────────────────────────────────────────────────────────

interface ChatViewProps {
  thread: ChatThread;
  currentPrincipal: string | undefined;
  onBack?: () => void;
}

function ChatView({ thread, currentPrincipal, onBack }: ChatViewProps) {
  const { data: messages = [], isLoading } = useChatMessages(thread.id);
  const sendMessage = useSendMessage();
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(0);

  if (messages.length !== prevCountRef.current) {
    prevCountRef.current = messages.length;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const handleSend = () => {
    const content = text.trim();
    if (!content) return;
    setText("");
    sendMessage.mutate({ threadId: thread.id, content });
  };

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col overflow-hidden shadow-warm-sm h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-muted flex items-center gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to conversations"
            className="p-1 -ml-1 rounded-lg hover:bg-muted transition-smooth text-muted-foreground"
            data-ocid="chat-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
            {initials(thread.otherUserName)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight">
            {thread.otherUserName ?? "Unknown Reader"}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <BookOpen className="w-3 h-3 shrink-0" />
            <span className="truncate">{thread.bookTitle}</span>
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
        data-ocid="messages-list"
      >
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
              >
                <Skeleton
                  className={`h-12 rounded-2xl ${i % 2 === 0 ? "w-44" : "w-52"}`}
                />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-muted-foreground italic">
              No messages yet — say hello! 👋
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId.toString() === currentPrincipal;
            return (
              <div
                key={msg.id.toString()}
                className={`flex flex-col gap-0.5 ${isMe ? "items-end" : "items-start"}`}
              >
                {msg.senderName && !isMe && (
                  <span className="text-xs text-muted-foreground px-1">
                    {msg.senderName}
                  </span>
                )}
                <div
                  className={`max-w-[72%] rounded-2xl px-4 py-2.5 text-sm shadow-warm-sm ${
                    isMe
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground border border-border rounded-bl-sm"
                  }`}
                >
                  <p className="leading-relaxed break-words">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isMe ? "text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {formatTime(msg.sentAt)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border flex gap-2 bg-card">
        <Input
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          className="flex-1"
          data-ocid="message-input"
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!text.trim() || sendMessage.isPending}
          aria-label="Send message"
          data-ocid="message-send-btn"
          className="shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// ── Desktop Placeholder ──────────────────────────────────────────────────────

function DesktopPlaceholder() {
  return (
    <div className="bg-card border border-border rounded-xl flex flex-col items-center justify-center gap-3 h-full shadow-warm-sm">
      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
        <MessageSquare className="w-6 h-6 text-muted-foreground" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-foreground font-display">
          Select a conversation
        </p>
        <p className="text-xs text-muted-foreground max-w-[180px] leading-relaxed">
          Choose a thread on the left to start reading the story
        </p>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function MessagesPage() {
  const { data: threads = [], isLoading } = useMyChatThreads();
  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);
  // mobile: "list" | "chat"
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const handleSelectThread = (thread: ChatThread) => {
    setActiveThread(thread);
    setMobileView("chat");
  };

  const handleBack = () => {
    setMobileView("list");
  };

  const currentPrincipal: string | undefined = undefined; // identity resolved via session token server-side

  // If threads load and none active yet, default-select first (desktop)
  useEffect(() => {
    if (!activeThread && threads.length > 0) {
      setActiveThread(threads[0]);
    }
  }, [threads, activeThread]);

  if (!isLoading && threads.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-2xl font-semibold text-foreground mb-6">
          Messages
        </h1>
        <EmptyState
          icon={<MessageSquare className="w-8 h-8" />}
          title="No active exchanges yet"
          description="Requests must be accepted to unlock chat. Once a book owner accepts your request, your conversation will appear here."
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4">
      <h1 className="font-display text-2xl font-semibold text-foreground">
        Messages
      </h1>

      {/* Desktop: two-panel */}
      <div
        className="hidden md:grid md:grid-cols-[300px_1fr] gap-4"
        style={{ height: "calc(100vh - 200px)", minHeight: "480px" }}
      >
        <ThreadList
          threads={threads}
          isLoading={isLoading}
          activeId={activeThread?.id ?? null}
          onSelect={handleSelectThread}
        />
        {activeThread ? (
          <ChatView
            key={activeThread.id.toString()}
            thread={activeThread}
            currentPrincipal={currentPrincipal}
          />
        ) : (
          <DesktopPlaceholder />
        )}
      </div>

      {/* Mobile: single-panel */}
      <div
        className="flex md:hidden flex-col"
        style={{ height: "calc(100vh - 180px)", minHeight: "440px" }}
      >
        {mobileView === "list" || !activeThread ? (
          <ThreadList
            threads={threads}
            isLoading={isLoading}
            activeId={activeThread?.id ?? null}
            onSelect={handleSelectThread}
          />
        ) : (
          <ChatView
            key={activeThread.id.toString()}
            thread={activeThread}
            currentPrincipal={currentPrincipal}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
