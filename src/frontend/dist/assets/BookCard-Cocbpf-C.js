import { j as jsxRuntimeExports, L as Link, b as BookOpen, $ as User, B as Button } from "./index-D8jmrdk6.js";
import { B as Badge } from "./badge-BPmLb5Yh.js";
import { C as CONDITION_LABELS, g as CONDITION_COLORS } from "./useBooks-BQNiJGU1.js";
function BookCard({
  book,
  showOwner = true,
  onRequest,
  isOwner = false,
  onEdit,
  onToggleAvailability,
  onDelete
}) {
  const isAvailable = book.availability === "available";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "bg-card rounded-xl border border-border shadow-warm-sm hover:shadow-candlelit transition-smooth overflow-hidden flex flex-col group",
      "data-ocid": "book-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/book/$id",
            params: { id: String(book.id) },
            className: "block relative aspect-[2/3] overflow-hidden bg-muted",
            children: [
              book.coverUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: book.coverUrl,
                  alt: `${book.title} cover`,
                  className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
                  loading: "lazy",
                  onError: (e) => {
                    e.target.src = "/assets/images/placeholder.svg";
                  }
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center gap-2 bg-secondary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-secondary-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-secondary-foreground font-display tracking-wide", children: "No Cover" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold font-display tracking-wide border shadow-warm-sm ${isAvailable ? "bg-secondary text-secondary-foreground border-border" : "bg-muted text-muted-foreground border-border"}`,
                  children: isAvailable ? "Available" : "Taken"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-smooth pointer-events-none" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col flex-1 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book/$id", params: { id: String(book.id) }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 hover:text-primary transition-colors", children: book.title }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate italic", children: book.author })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs px-1.5 py-0 border-border text-foreground bg-secondary font-body",
                children: book.genre
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-flex items-center px-1.5 py-0 rounded text-xs border ${CONDITION_COLORS[book.condition]}`,
                children: CONDITION_LABELS[book.condition]
              }
            )
          ] }),
          showOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground bg-muted rounded-md px-2 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 shrink-0 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: book.ownerName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 mt-auto pt-1", children: isOwner ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "flex-1 h-7 text-xs border-border hover:bg-secondary",
                onClick: () => onEdit == null ? void 0 : onEdit(book),
                "data-ocid": "book-card-edit-btn",
                children: "Edit"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "flex-1 h-7 text-xs border-border hover:bg-secondary",
                onClick: () => onToggleAvailability == null ? void 0 : onToggleAvailability(book),
                "data-ocid": "book-card-availability-btn",
                children: isAvailable ? "Mark Taken" : "Mark Free"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive",
                onClick: () => onDelete == null ? void 0 : onDelete(book),
                "data-ocid": "book-card-delete-btn",
                children: "Remove"
              }
            )
          ] }) : isAvailable && onRequest && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "w-full h-7 text-xs shadow-warm-sm",
              onClick: () => onRequest(book),
              "data-ocid": "book-card-request-btn",
              children: "Request Book"
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  BookCard as B
};
