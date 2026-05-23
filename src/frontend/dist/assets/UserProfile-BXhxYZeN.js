import { a0 as useParams, a3 as useGetUserProfile, j as jsxRuntimeExports, $ as User, L as Link, B as Button, Y as Avatar, Z as AvatarFallback, b as BookOpen } from "./index-D8jmrdk6.js";
import { B as Badge } from "./badge-BPmLb5Yh.js";
import { S as Skeleton } from "./skeleton--Aja5vZl.js";
import { B as BookCard } from "./BookCard-Cocbpf-C.js";
import { E as EmptyState } from "./EmptyState-DvZHV3jP.js";
import { M as MOCK_BOOKS } from "./useBooks-BQNiJGU1.js";
import { A as ArrowLeft } from "./arrow-left-cQrRAEc_.js";
import { m as motion } from "./proxy-Bo2ka163.js";
import { C as Calendar, M as MapPin } from "./map-pin-PpYtSeRP.js";
const MOCK_USERS = {
  "mock-user-1": {
    name: "Sophie Andersson",
    bio: "Literary fiction lover, occasional poet, and café regular. Always hunting for a good character-driven novel.",
    location: "Stockholm",
    joinedYear: "January 2024"
  },
  "mock-user-2": {
    name: "Marcus Chen",
    bio: "Non-fiction enthusiast and avid traveler. I believe every book is a ticket to somewhere new.",
    location: "Singapore",
    joinedYear: "March 2024"
  },
  "mock-user-3": {
    name: "Lena Müller",
    bio: "Sci-fi devotee. If it has spaceships, robots, or first contact — I've read it twice.",
    location: "Berlin",
    joinedYear: "February 2024"
  },
  "mock-user-4": {
    name: "Tom Rivera",
    bio: "Fantasy and mystery reader. Afternoon sun and a good thriller is my idea of perfection.",
    location: "Barcelona",
    joinedYear: "April 2024"
  },
  "mock-user-5": {
    name: "Amara Okafor",
    bio: "Self-help and philosophy reader. Exploring how ideas can change the way we live.",
    location: "Lagos",
    joinedYear: "January 2024"
  }
};
function UserProfileSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 w-full rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] rounded-lg" }, i)) })
  ] });
}
function UserProfilePage() {
  const { id } = useParams({ from: "/user/$id" });
  const profileQuery = useGetUserProfile(id);
  const mockUser = MOCK_USERS[id];
  const backendProfile = profileQuery.data;
  const isLoading = profileQuery.isLoading;
  const displayName = (backendProfile == null ? void 0 : backendProfile.name) ?? (mockUser == null ? void 0 : mockUser.name) ?? "Unknown Reader";
  const displayBio = (backendProfile == null ? void 0 : backendProfile.bio) ?? (mockUser == null ? void 0 : mockUser.bio) ?? null;
  const displayLocation = (backendProfile == null ? void 0 : backendProfile.location) ?? (mockUser == null ? void 0 : mockUser.location) ?? null;
  const joinedDisplay = (backendProfile == null ? void 0 : backendProfile.joinedAt) ? new Date(Number(backendProfile.joinedAt)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long"
  }) : (mockUser == null ? void 0 : mockUser.joinedYear) ?? null;
  const initials = displayName.slice(0, 2).toUpperCase();
  const userBooks = MOCK_BOOKS.filter(
    (b) => b.ownerId === id && b.availability === "available"
  );
  const notFound = !isLoading && !backendProfile && !mockUser;
  if (notFound) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex w-16 h-16 items-center justify-center rounded-full bg-muted mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "User not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "This profile doesn't exist or may have been removed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/community", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
        " Back to Library"
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/community", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: "gap-1.5 -ml-2",
        "data-ocid": "user-profile-back-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Community Library"
        ]
      }
    ) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserProfileSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35 },
          className: "bg-card rounded-xl border border-border shadow-warm-sm overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 bg-gradient-to-r from-secondary via-primary to-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 -mt-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-16 h-16 ring-4 ring-card shadow-warm-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-secondary text-secondary-foreground text-xl font-display font-semibold", children: initials }) }),
                joinedDisplay && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                  "Joined ",
                  joinedDisplay
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-semibold text-foreground", children: displayName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Community Reader" })
                ] }),
                displayLocation && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 shrink-0" }),
                  displayLocation
                ] }),
                displayBio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-prose", children: displayBio })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.1 },
          className: "grid grid-cols-2 gap-3",
          children: [
            { label: "Books Available", value: userBooks.length },
            { label: "Exchange Status", value: "Active" }
          ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-muted rounded-lg border border-border px-4 py-3 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-semibold text-foreground", children: stat.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: stat.label })
              ]
            },
            stat.label
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
          "Available Books",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal text-base", children: [
            "(",
            userBooks.length,
            ")"
          ] })
        ] }),
        userBooks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8" }),
            title: "No available books right now",
            description: `${displayName} hasn't listed any books yet, or all their books are currently taken.`
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: userBooks.map((book, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.25, delay: i * 0.05 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookCard, { book, showOwner: false })
          },
          book.id
        )) })
      ] })
    ] })
  ] });
}
export {
  UserProfilePage as default
};
