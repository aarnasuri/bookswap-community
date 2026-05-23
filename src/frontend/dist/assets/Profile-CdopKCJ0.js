import { c as createLucideIcon, v as useCurrentUser, _ as useSaveProfile, a as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, Y as Avatar, Z as AvatarFallback, $ as User, X, b as BookOpen } from "./index-D8jmrdk6.js";
import { B as Badge } from "./badge-BPmLb5Yh.js";
import { I as Input } from "./input-DUqn7Vqm.js";
import { L as Label } from "./label-DWGktHmM.js";
import { S as Skeleton } from "./skeleton--Aja5vZl.js";
import { T as Textarea } from "./textarea-d9LNwZrS.js";
import { u as ue } from "./index-BFeTiHk3.js";
import { B as BookCard } from "./BookCard-Cocbpf-C.js";
import { E as EmptyState } from "./EmptyState-DvZHV3jP.js";
import { b as useMyBooks, M as MOCK_BOOKS } from "./useBooks-BQNiJGU1.js";
import { m as motion } from "./proxy-Bo2ka163.js";
import { C as Calendar, M as MapPin } from "./map-pin-PpYtSeRP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$1);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function ProfileSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-lg" })
  ] });
}
function ProfilePage() {
  const { profile, user, isLoadingProfile } = useCurrentUser();
  const saveProfile = useSaveProfile();
  const myBooksQuery = useMyBooks();
  const navigate = useNavigate();
  const [editing, setEditing] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [bio, setBio] = reactExports.useState("");
  const [location, _setLocation] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setBio(profile.bio ?? "");
    }
  }, [profile]);
  const principalId = (user == null ? void 0 : user.email) ?? "";
  const displayName = (profile == null ? void 0 : profile.name) || "Unnamed Reader";
  const initials = displayName.slice(0, 2).toUpperCase();
  const joinedDate = (profile == null ? void 0 : profile.joinedAt) ? new Date(Number(profile.joinedAt)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long"
  }) : null;
  const realBooks = myBooksQuery.data ?? [];
  const mockUserBooks = MOCK_BOOKS.filter(
    (b) => b.ownerId === "mock-user-1"
  );
  const hasRealBooks = realBooks.length > 0;
  const booksListed = hasRealBooks ? realBooks.length : mockUserBooks.length;
  const exchangesCount = 0;
  const handleSave = async () => {
    if (!name.trim()) {
      ue.error("Please enter your name");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        bio: bio.trim()
      });
      ue.success("Profile saved!");
      setEditing(false);
    } catch {
      ue.error("Failed to save profile. Please try again.");
    }
  };
  const handleCancel = () => {
    setName((profile == null ? void 0 : profile.name) ?? "");
    setBio((profile == null ? void 0 : profile.bio) ?? "");
    setEditing(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-semibold text-foreground", children: "My Profile" }),
      !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "gap-1.5",
          onClick: () => setEditing(true),
          "data-ocid": "profile-edit-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" }),
            "Edit Profile"
          ]
        }
      )
    ] }),
    isLoadingProfile ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35 },
          className: "bg-card rounded-xl border border-border shadow-warm-sm overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 bg-gradient-to-r from-primary via-secondary to-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 -mt-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-16 h-16 ring-4 ring-card shadow-warm-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary text-primary-foreground text-xl font-display font-semibold", children: initials }) }),
                !editing && joinedDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                  "Joined ",
                  joinedDate
                ] })
              ] }),
              editing ? (
                /* Edit form */
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "name", className: "text-sm font-medium", children: [
                      "Display Name ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "name",
                          placeholder: "Your name…",
                          value: name,
                          onChange: (e) => setName(e.target.value),
                          className: "pl-9",
                          "data-ocid": "profile-name-input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "location", className: "text-sm font-medium", children: "Location" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "location",
                          placeholder: "Your city or neighborhood…",
                          value: location,
                          onChange: (e) => _setLocation(e.target.value),
                          className: "pl-9",
                          "data-ocid": "profile-location-input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bio", className: "text-sm font-medium", children: "About You" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "bio",
                        placeholder: "Tell the community about your reading interests…",
                        value: bio,
                        onChange: (e) => setBio(e.target.value),
                        rows: 3,
                        "data-ocid": "profile-bio-input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        onClick: handleSave,
                        disabled: saveProfile.isPending,
                        className: "gap-1.5 flex-1",
                        "data-ocid": "profile-save-btn",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                          saveProfile.isPending ? "Saving…" : "Save Changes"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        onClick: handleCancel,
                        className: "gap-1.5",
                        "data-ocid": "profile-cancel-btn",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                          "Cancel"
                        ]
                      }
                    )
                  ] })
                ] })
              ) : (
                /* View mode */
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: displayName }),
                    principalId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-xs font-mono mt-0.5",
                        children: [
                          principalId.slice(0, 10),
                          "…"
                        ]
                      }
                    )
                  ] }),
                  false,
                  (profile == null ? void 0 : profile.bio) ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: profile.bio }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No bio yet — click Edit Profile to add one." })
                ] })
              )
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
          className: "grid grid-cols-3 gap-3",
          children: [
            { label: "Books Listed", value: String(booksListed) },
            { label: "Exchanges", value: String(exchangesCount) },
            {
              label: "Member Since",
              value: joinedDate ? joinedDate.split(" ")[1] : "—"
            }
          ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-lg border border-border px-4 py-4 text-center shadow-warm-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-semibold text-foreground", children: stat.value }),
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
          "My Books (",
          booksListed,
          ")"
        ] }),
        hasRealBooks ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: realBooks.map((book) => {
          const mock = {
            id: Number(book.id),
            title: book.title,
            author: book.author,
            genre: book.genre,
            condition: book.condition,
            coverUrl: "",
            availability: book.availability,
            ownerName: displayName,
            ownerId: book.owner.toString(),
            description: ""
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            BookCard,
            {
              book: mock,
              showOwner: false
            },
            String(book.id)
          );
        }) }) : mockUserBooks.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: mockUserBooks.map((book) => /* @__PURE__ */ jsxRuntimeExports.jsx(BookCard, { book, showOwner: false }, book.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8" }),
            title: "No books yet",
            description: "Add your first book to start sharing with the community.",
            action: {
              label: "Add a Book",
              onClick: () => navigate({ to: "/library" })
            }
          }
        )
      ] })
    ] })
  ] });
}
export {
  ProfilePage as default
};
