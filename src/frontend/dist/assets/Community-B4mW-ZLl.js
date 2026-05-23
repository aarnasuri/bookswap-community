import { c as createLucideIcon, a as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, X, b as BookOpen } from "./index-D8jmrdk6.js";
import { B as Badge } from "./badge-BPmLb5Yh.js";
import { I as Input } from "./input-DUqn7Vqm.js";
import { S as Search, a as Select, b as SelectTrigger, c as SelectValue, d as SelectContent, e as SelectItem } from "./select-D7vgyVyq.js";
import { S as Skeleton } from "./skeleton--Aja5vZl.js";
import { B as BookCard } from "./BookCard-Cocbpf-C.js";
import { u as useAllAvailableBooks, M as MOCK_BOOKS, G as GENRES } from "./useBooks-BQNiJGU1.js";
import "./check-BttumTMa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function BookCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden border border-border bg-card shadow-warm-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-12 rounded-full" })
      ] })
    ] })
  ] });
}
function bookToMock(b) {
  return {
    id: Number(b.book.id),
    title: b.book.title,
    author: b.book.author,
    genre: b.book.genre,
    condition: b.book.condition,
    coverUrl: b.book.coverImage ? b.book.coverImage.getDirectURL() : "",
    availability: b.book.availability,
    ownerName: b.ownerName ?? "Community Member",
    ownerId: b.book.owner.toString(),
    description: ""
  };
}
function CommunityPage() {
  const navigate = useNavigate();
  const [search, setSearch] = reactExports.useState("");
  const [genre, setGenre] = reactExports.useState("all");
  const [availability, setAvailability] = reactExports.useState(
    "all"
  );
  const { data: backendBooks, isLoading } = useAllAvailableBooks();
  const allBooks = reactExports.useMemo(() => {
    const backendMocked = (backendBooks ?? []).map(bookToMock);
    const backendIds = new Set(backendMocked.map((b) => b.id));
    const mockOnly = MOCK_BOOKS.filter((b) => !backendIds.has(b.id));
    return [...backendMocked, ...mockOnly];
  }, [backendBooks]);
  const filtered = reactExports.useMemo(() => {
    const q = search.toLowerCase().trim();
    return allBooks.filter((book) => {
      const matchesSearch = !q || book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q) || book.ownerName.toLowerCase().includes(q);
      const matchesGenre = genre === "all" || book.genre === genre;
      const matchesAvail = availability === "all" || book.availability === availability;
      return matchesSearch && matchesGenre && matchesAvail;
    });
  }, [allBooks, search, genre, availability]);
  const hasFilters = search || genre !== "all" || availability !== "all";
  const clearFilters = () => {
    setSearch("");
    setGenre("all");
    setAvailability("all");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-semibold text-foreground", children: "Community Library" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
        allBooks.length,
        " books shared by your community — all free to borrow"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by title, author, or owner…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            "data-ocid": "community-search-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: genre, onValueChange: setGenre, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full sm:w-40",
            "data-ocid": "community-genre-filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Genre" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Genres" }),
          GENRES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: availability,
          onValueChange: (v) => setAvailability(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-full sm:w-40",
                "data-ocid": "community-availability-filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Availability" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Books" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "available", children: "Available" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "unavailable", children: "Already Taken" })
            ] })
          ]
        }
      ),
      hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: clearFilters,
          "aria-label": "Clear all filters",
          "data-ocid": "community-clear-filters",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
      search && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 text-xs", children: [
        '"',
        search,
        '"',
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSearch(""),
            className: "hover:opacity-70 ml-0.5",
            "aria-label": "Remove search filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
          }
        )
      ] }),
      genre !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 text-xs", children: [
        genre,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setGenre("all"),
            className: "hover:opacity-70 ml-0.5",
            "aria-label": "Remove genre filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
          }
        )
      ] }),
      availability !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 text-xs", children: [
        availability === "available" ? "Available" : "Already Taken",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setAvailability("all"),
            className: "hover:opacity-70 ml-0.5",
            "aria-label": "Remove availability filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: isLoading ? "Loading books…" : `Showing ${filtered.length} ${filtered.length === 1 ? "book" : "books"}${hasFilters ? " matching your filters" : ""}` }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4", children: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"].map(
      (k) => /* @__PURE__ */ jsxRuntimeExports.jsx(BookCardSkeleton, {}, k)
    ) }) : filtered.length === 0 ? (
      /* Empty state */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-4 py-16 text-center",
          "data-ocid": "community-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-7 h-7 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No books found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: hasFilters ? "Try adjusting your search or removing some filters" : "The community library is empty — be the first to add a book!" })
            ] }),
            hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: clearFilters,
                "data-ocid": "community-no-results-clear",
                children: "Clear filters"
              }
            )
          ]
        }
      )
    ) : (
      /* Book grid */
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4", children: filtered.map((book) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        BookCard,
        {
          book,
          showOwner: true
        },
        `${book.ownerId}-${book.id}`
      )) })
    ),
    !isLoading && allBooks.length > 0 && !hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-xl bg-secondary border border-border px-5 py-4 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-7 h-7 text-secondary-foreground flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-secondary-foreground", children: "Have books gathering dust?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-secondary-foreground mt-0.5", children: "Add them to the community library and share the love of reading." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "flex-shrink-0 border-border text-foreground hover:bg-primary hover:text-primary-foreground",
          onClick: () => navigate({ to: "/library" }),
          "data-ocid": "community-add-book-cta",
          children: "Add a book"
        }
      )
    ] })
  ] });
}
export {
  CommunityPage as default
};
