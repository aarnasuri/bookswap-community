import { c as createLucideIcon, O as useActor, Q as useQuery, S as useQueryClient, T as useMutation, V as createActor, r as reactExports, j as jsxRuntimeExports, W as MessageSquare, Y as Avatar, Z as AvatarFallback, b as BookOpen, B as Button } from "./index-D8jmrdk6.js";
import { I as Input } from "./input-DUqn7Vqm.js";
import { S as Skeleton } from "./skeleton--Aja5vZl.js";
import { E as EmptyState } from "./EmptyState-DvZHV3jP.js";
import { A as ArrowLeft } from "./arrow-left-cQrRAEc_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function useMyChatThreads() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myChatThreads"],
    queryFn: async () => {
      var _a;
      if (!actor) return [];
      try {
        const result = await ((_a = actor.getMyChatThreads) == null ? void 0 : _a.call(actor));
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 8e3
  });
}
function useChatMessages(threadId) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const tid = threadId ? BigInt(threadId.toString()) : void 0;
  return useQuery({
    queryKey: ["chatMessages", tid == null ? void 0 : tid.toString()],
    queryFn: async () => {
      var _a;
      if (!actor || tid === void 0) return [];
      try {
        const result = await ((_a = actor.getChatMessages) == null ? void 0 : _a.call(actor, tid));
        return result ?? [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching && tid !== void 0,
    refetchInterval: 3e3
  });
}
function useSendMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      var _a;
      if (!actor) throw new Error("Actor not available");
      return (_a = actor.sendMessage) == null ? void 0 : _a.call(
        actor,
        params.threadId,
        params.content
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chatMessages", variables.threadId.toString()]
      });
      queryClient.invalidateQueries({ queryKey: ["myChatThreads"] });
    }
  });
}
function formatTime(ts) {
  if (!ts) return "";
  const date = new Date(Number(ts) / 1e6);
  const now = /* @__PURE__ */ new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 864e5);
  if (diffDays === 0)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return date.toLocaleDateString([], { weekday: "short" });
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}
function initials(name) {
  if (!name) return "??";
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}
function ThreadItem({ thread, active, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: `w-full text-left p-3.5 flex items-start gap-3 border-b border-border transition-smooth hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${active ? "bg-primary hover:bg-primary" : ""}`,
      onClick,
      "data-ocid": "message-thread-item",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-9 h-9 shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-secondary text-secondary-foreground text-xs font-medium", children: initials(thread.otherUserName) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: thread.otherUserName ?? "Unknown Reader" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: formatTime(thread.lastMessageAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: thread.bookTitle })
          ] }),
          thread.lastMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: thread.lastMessage })
        ] }),
        (thread.unreadCount ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary shrink-0 mt-2" })
      ]
    }
  );
}
function ThreadList({
  threads,
  isLoading,
  activeId,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden flex flex-col shadow-warm-sm h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border bg-muted flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Conversations" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", "data-ocid": "thread-list", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-full shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-40" })
      ] })
    ] }, i)) }) : threads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "No active exchanges yet — requests must be accepted to unlock chat" }) }) : threads.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ThreadItem,
      {
        thread: t,
        active: activeId === t.id,
        onClick: () => onSelect(t)
      },
      t.id.toString()
    )) })
  ] });
}
function ChatView({ thread, currentPrincipal, onBack }) {
  var _a;
  const { data: messages = [], isLoading } = useChatMessages(thread.id);
  const sendMessage = useSendMessage();
  const [text, setText] = reactExports.useState("");
  const bottomRef = reactExports.useRef(null);
  const prevCountRef = reactExports.useRef(0);
  if (messages.length !== prevCountRef.current) {
    prevCountRef.current = messages.length;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }
  const handleSend = () => {
    const content = text.trim();
    if (!content) return;
    setText("");
    sendMessage.mutate({ threadId: thread.id, content });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl flex flex-col overflow-hidden shadow-warm-sm h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border bg-muted flex items-center gap-3", children: [
      onBack && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          "aria-label": "Back to conversations",
          className: "p-1 -ml-1 rounded-lg hover:bg-muted transition-smooth text-muted-foreground",
          "data-ocid": "chat-back-btn",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-8 h-8 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-secondary text-secondary-foreground text-xs font-medium", children: initials(thread.otherUserName) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-tight", children: thread.otherUserName ?? "Unknown Reader" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: thread.bookTitle })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-1 overflow-y-auto p-4 flex flex-col gap-3",
        "data-ocid": "messages-list",
        children: [
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Skeleton,
                {
                  className: `h-12 rounded-2xl ${i % 2 === 0 ? "w-44" : "w-52"}`
                }
              )
            },
            i
          )) }) : messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No messages yet — say hello! 👋" }) }) : messages.map((msg) => {
            const isMe = msg.senderId.toString() === currentPrincipal;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex flex-col gap-0.5 ${isMe ? "items-end" : "items-start"}`,
                children: [
                  msg.senderName && !isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground px-1", children: msg.senderName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `max-w-[72%] rounded-2xl px-4 py-2.5 text-sm shadow-warm-sm ${isMe ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-foreground border border-border rounded-bl-sm"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed break-words", children: msg.content }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `text-xs mt-1 ${isMe ? "text-primary-foreground" : "text-muted-foreground"}`,
                            children: formatTime(msg.sentAt)
                          }
                        )
                      ]
                    }
                  )
                ]
              },
              msg.id.toString()
            );
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-t border-border flex gap-2 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Type a message…",
          value: text,
          onChange: (e) => setText(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && !e.shiftKey && handleSend(),
          className: "flex-1",
          "data-ocid": "message-input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "icon",
          onClick: handleSend,
          disabled: !text.trim() || sendMessage.isPending,
          "aria-label": "Send message",
          "data-ocid": "message-send-btn",
          className: "shrink-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
        }
      )
    ] })
  ] });
}
function DesktopPlaceholder() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl flex flex-col items-center justify-center gap-3 h-full shadow-warm-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-6 h-6 text-muted-foreground" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display", children: "Select a conversation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-[180px] leading-relaxed", children: "Choose a thread on the left to start reading the story" })
    ] })
  ] });
}
function MessagesPage() {
  const { data: threads = [], isLoading } = useMyChatThreads();
  const [activeThread, setActiveThread] = reactExports.useState(null);
  const [mobileView, setMobileView] = reactExports.useState("list");
  const handleSelectThread = (thread) => {
    setActiveThread(thread);
    setMobileView("chat");
  };
  const handleBack = () => {
    setMobileView("list");
  };
  const currentPrincipal = void 0;
  reactExports.useEffect(() => {
    if (!activeThread && threads.length > 0) {
      setActiveThread(threads[0]);
    }
  }, [threads, activeThread]);
  if (!isLoading && threads.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground mb-6", children: "Messages" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-8 h-8" }),
          title: "No active exchanges yet",
          description: "Requests must be accepted to unlock chat. Once a book owner accepts your request, your conversation will appear here."
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground", children: "Messages" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "hidden md:grid md:grid-cols-[300px_1fr] gap-4",
        style: { height: "calc(100vh - 200px)", minHeight: "480px" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ThreadList,
            {
              threads,
              isLoading,
              activeId: (activeThread == null ? void 0 : activeThread.id) ?? null,
              onSelect: handleSelectThread
            }
          ),
          activeThread ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChatView,
            {
              thread: activeThread,
              currentPrincipal
            },
            activeThread.id.toString()
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(DesktopPlaceholder, {})
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex md:hidden flex-col",
        style: { height: "calc(100vh - 180px)", minHeight: "440px" },
        children: mobileView === "list" || !activeThread ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          ThreadList,
          {
            threads,
            isLoading,
            activeId: (activeThread == null ? void 0 : activeThread.id) ?? null,
            onSelect: handleSelectThread
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChatView,
          {
            thread: activeThread,
            currentPrincipal,
            onBack: handleBack
          },
          activeThread.id.toString()
        )
      }
    )
  ] });
}
export {
  MessagesPage as default
};
