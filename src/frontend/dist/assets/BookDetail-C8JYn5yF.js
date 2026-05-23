import { a0 as useParams, u as useAuth, j as jsxRuntimeExports, b as BookOpen, L as Link, B as Button, W as MessageSquare, $ as User } from "./index-D8jmrdk6.js";
import { B as Badge } from "./badge-BPmLb5Yh.js";
import { S as Skeleton } from "./skeleton--Aja5vZl.js";
import { u as ue } from "./index-BFeTiHk3.js";
import { M as MOCK_BOOKS, C as CONDITION_LABELS, g as CONDITION_COLORS } from "./useBooks-BQNiJGU1.js";
import { u as useMyRequests, d as useSendBookRequest } from "./useRequests-DLpE6mXP.js";
import { A as ArrowLeft } from "./arrow-left-cQrRAEc_.js";
function BookDetailPage() {
  const { id } = useParams({ from: "/book/$id" });
  const { isLoggedIn } = useAuth();
  const isAuthenticated = isLoggedIn;
  const { data: myRequests, isLoading: requestsLoading } = useMyRequests();
  const sendRequest = useSendBookRequest();
  const book = MOCK_BOOKS.find((b) => String(b.id) === id);
  const existingRequest = myRequests == null ? void 0 : myRequests.find((r) => String(r.bookId) === id);
  if (!book) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "Book not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "This book may have been removed from the community library." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/community", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "gap-1.5",
          "data-ocid": "book-not-found-back",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Library"
          ]
        }
      ) })
    ] });
  }
  const isAvailable = book.availability === "available";
  const handleRequest = async () => {
    try {
      await sendRequest.mutateAsync(BigInt(book.id));
      ue.success("Request sent!", {
        description: `Your request for "${book.title}" has been sent to ${book.ownerName}.`
      });
    } catch {
      ue.error("Couldn't send request", {
        description: "Please try again in a moment."
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/community", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: "gap-1.5 mb-6 -ml-2 text-muted-foreground hover:text-foreground transition-colors",
        "data-ocid": "book-detail-back",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Community Library"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[220px_1fr] gap-8 lg:gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] rounded-xl overflow-hidden bg-muted shadow-warm-md border border-border", children: book.coverUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: book.coverUrl,
            alt: `${book.title} cover`,
            className: "w-full h-full object-cover transition-smooth hover:scale-105"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-16 h-16 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "No cover" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `rounded-lg p-3 text-center border ${isAvailable ? "bg-secondary border-border" : "bg-muted border-border"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `text-sm font-medium ${isAvailable ? "text-secondary-foreground" : "text-muted-foreground"}`,
                children: isAvailable ? "✓ Available to borrow" : "✗ Currently unavailable"
              }
            )
          }
        ),
        isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: isAvailable ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: requestsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full rounded-md" }) : (existingRequest == null ? void 0 : existingRequest.status) === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border border-border bg-primary px-3 py-2.5 text-center",
            "data-ocid": "book-detail-request-pending",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary-foreground", children: "⏳ Request pending" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary-foreground mt-0.5", children: [
                "Waiting for ",
                book.ownerName,
                " to respond"
              ] })
            ]
          }
        ) : (existingRequest == null ? void 0 : existingRequest.status) === "accepted" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "space-y-2",
            "data-ocid": "book-detail-request-accepted",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-secondary px-3 py-2.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-secondary-foreground", children: "✓ Request accepted!" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/messages", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "w-full gap-1.5",
                  "data-ocid": "book-detail-go-to-chat",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
                    "Go to chat"
                  ]
                }
              ) })
            ]
          }
        ) : (existingRequest == null ? void 0 : existingRequest.status) === "declined" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-destructive px-3 py-2.5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive-foreground", children: "Request declined" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive-foreground mt-0.5", children: "The owner has declined your request" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full",
            onClick: handleRequest,
            disabled: sendRequest.isPending,
            "data-ocid": "book-detail-request-btn",
            children: sendRequest.isPending ? "Sending…" : "Request This Book"
          }
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center rounded-lg bg-muted border border-border px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This book is currently unavailable" }) }) }) : isAvailable ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/signin",
              className: "text-primary hover:underline font-medium",
              children: "Sign in"
            }
          ),
          " ",
          "to request this book from ",
          book.ownerName
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-semibold text-foreground leading-tight mb-1.5", children: book.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: book.author })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: book.genre }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border font-medium ${CONDITION_COLORS[book.condition]}`,
              children: [
                "Condition: ",
                CONDITION_LABELS[book.condition]
              ]
            }
          )
        ] }),
        book.description && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-lg border border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm mb-2", children: "About this book" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: book.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4 shadow-warm-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm mb-3", children: "Listed by" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/user/$id",
              params: { id: book.ownerId },
              className: "block group",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 group-hover:bg-secondary transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-primary-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate", children: book.ownerName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Community member · view profile →" })
                ] })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Added to the community library" })
      ] })
    ] })
  ] });
}
export {
  BookDetailPage as default
};
