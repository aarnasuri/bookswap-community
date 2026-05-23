import { c as createLucideIcon, u as useAuth, a as useNavigate, j as jsxRuntimeExports, L as Link, B as Button, b as BookOpen, U as Users, H as HandHeart } from "./index-D8jmrdk6.js";
import { B as Badge } from "./badge-BPmLb5Yh.js";
import { B as BookCard } from "./BookCard-Cocbpf-C.js";
import { M as MOCK_BOOKS } from "./useBooks-BQNiJGU1.js";
import { m as motion } from "./proxy-Bo2ka163.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m2 9 3-3 3 3", key: "1ltn5i" }],
  ["path", { d: "M13 18H7a2 2 0 0 1-2-2V6", key: "1r6tfw" }],
  ["path", { d: "m22 15-3 3-3-3", key: "4rnwn2" }],
  ["path", { d: "M11 6h6a2 2 0 0 1 2 2v10", key: "2f72bc" }]
];
const Repeat2 = createLucideIcon("repeat-2", __iconNode$1);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const STATS = [
  { label: "Books Available", value: "240+", icon: BookOpen },
  { label: "Community Readers", value: "180+", icon: Users },
  { label: "Exchanges Made", value: "310+", icon: Repeat2 }
];
const HOW_IT_WORKS = [
  {
    step: "I",
    icon: BookOpen,
    title: "List Your Books",
    description: "Add books from your shelf that are ready for a new home. Set condition, genre, and availability in seconds."
  },
  {
    step: "II",
    icon: Heart,
    title: "Browse & Request",
    description: "Explore what your community is sharing. Find your next read and send a request to the owner."
  },
  {
    step: "III",
    icon: RefreshCw,
    title: "Chat & Exchange",
    description: "Once accepted, a private chat opens so you can coordinate the handover at your convenience."
  }
];
const CHARITY_INITIATIVES = [
  {
    name: "Charity Partner 1",
    description: "Coming soon — charity details will be announced.",
    color: "bg-accent border-border",
    iconColor: "text-accent-foreground"
  },
  {
    name: "Charity Partner 2",
    description: "Coming soon — charity details will be announced.",
    color: "bg-primary border-border",
    iconColor: "text-primary-foreground"
  },
  {
    name: "Charity Partner 3",
    description: "Coming soon — charity details will be announced.",
    color: "bg-secondary border-border",
    iconColor: "text-secondary-foreground"
  }
];
const DONATE_BENEFITS = [
  "Your book finds a new home with someone who truly needs it",
  "Every donation supports our partner charities across Bahrain",
  "Together we make reading accessible to all"
];
const FOOTER_CHARITIES = [
  "• Partner Charity 1 — Coming Soon",
  "• Partner Charity 2 — Coming Soon",
  "• Partner Charity 3 — Coming Soon"
];
function HomePage() {
  const { isLoggedIn } = useAuth();
  const isAuthenticated = isLoggedIn;
  const navigate = useNavigate();
  const featuredBooks = MOCK_BOOKS.filter(
    (b) => b.availability === "available"
  ).slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative bg-card border-b border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        className: "max-w-2xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5, delay: 0.1 },
              className: "inline-flex items-center gap-2 bg-primary text-primary-foreground border border-border rounded-full px-4 py-1.5 text-xs font-medium mb-6 shadow-warm-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary-foreground inline-block animate-pulse" }),
                "Bahrain's Free Book Sharing Community"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5 tracking-tight", children: [
            "Books deserve",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: "second lives." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed font-body", children: "Share books you love, discover new ones, and build connections with readers in your community — all completely free. And together, we give back." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/community", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                className: "gap-2 w-full sm:w-auto shadow-candlelit",
                "data-ocid": "hero-browse-btn",
                children: [
                  "Browse Community Library",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            ) }),
            !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "lg",
                className: "gap-2 w-full sm:w-auto border-border hover:bg-primary hover:text-primary-foreground shadow-warm-sm",
                "data-ocid": "hero-signin-btn",
                children: "Sign up to Share Books"
              }
            ) }),
            isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/library", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "lg",
                className: "gap-2 w-full sm:w-auto border-border hover:bg-primary hover:text-primary-foreground shadow-warm-sm",
                "data-ocid": "hero-library-btn",
                children: "My Library"
              }
            ) })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 sm:gap-8", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.1, duration: 0.4 },
        className: "flex flex-col items-center text-center gap-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center mb-1 shadow-warm-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl sm:text-3xl font-bold text-secondary-foreground", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-secondary-foreground font-body", children: stat.label })
        ]
      },
      stat.label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted border-b border-border py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 text-xs font-medium mb-4 shadow-warm-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5 text-primary" }),
          "Simple as turning a page"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-foreground", children: "How BookBank.bh Works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm max-w-md mx-auto font-body", children: "Simple steps to start sharing and borrowing books with your community." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto", children: HOW_IT_WORKS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.14, duration: 0.45 },
          className: "bg-card rounded-2xl p-6 border border-border shadow-warm text-center relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-4 right-5 font-display text-sm font-bold text-primary italic", children: step.step }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary border border-border flex items-center justify-center mx-auto mb-4 shadow-warm-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "w-5 h-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base mb-2", children: step.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed font-body", children: step.description })
          ]
        },
        step.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-accent border-b border-border py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 text-xs font-medium mb-5 shadow-warm-sm text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: "w-3.5 h-3.5 text-accent" }),
              "Make a Difference"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl md:text-3xl font-bold text-accent-foreground mb-4 leading-snug", children: [
              "Donate Books to ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "Those in Need" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-accent-foreground leading-relaxed mb-6 font-body", children: "A book passed on is a life touched. When you donate through BookBank.bh, your story travels further than you imagine — reaching hands that truly need it most." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 mb-8", children: DONATE_BENEFITS.map((benefit, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.li,
              {
                initial: { opacity: 0, x: -10 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { delay: 0.1 + i * 0.1, duration: 0.4 },
                className: "flex items-start gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0 mt-0.5 shadow-warm-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-2.5 h-2.5 text-accent" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-accent-foreground leading-relaxed font-body", children: benefit })
                ]
              },
              benefit
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-3", children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                className: "gap-2 w-full sm:w-auto shadow-candlelit",
                onClick: () => navigate({ to: "/library" }),
                "data-ocid": "donate-section-donate-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: "w-4 h-4" }),
                  "Donate a Book"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "gap-2 w-full sm:w-auto shadow-candlelit",
                  "data-ocid": "donate-section-signin-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: "w-4 h-4" }),
                    "Sign up to Donate"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "self-center text-xs text-accent-foreground font-body", children: "Free account · No strings attached" })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: 0.15 },
          className: "relative",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-8 shadow-warm-md text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-accent border border-border flex items-center justify-center mx-auto mb-5 shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: "w-8 h-8 text-accent-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: "Every Book Counts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 leading-relaxed font-body", children: "We coordinate with trusted charity partners to get your donated books into the hands of those who need them most across Bahrain." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 text-center", children: [
              { value: "500+", label: "Books Donated" },
              { value: "3", label: "Charity Partners" },
              { value: "100%", label: "Goes to Charity" }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-accent rounded-xl p-3 border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold text-accent-foreground", children: item.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-accent-foreground mt-0.5 leading-tight font-body", children: item.label })
                ]
              },
              item.label
            )) })
          ] })
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 text-xs font-medium mb-5 shadow-warm-sm text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: "w-3.5 h-3.5 text-accent" }),
              "Giving Back Together"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-foreground mb-3", children: "Books That Do More Good" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed font-body", children: "When you donate a book through BookBank.bh, you're not just sharing a story — you're helping someone in need. We partner with trusted charities to ensure donated books reach those who need them most." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10", children: CHARITY_INITIATIVES.map((charity, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.12, duration: 0.4 },
          className: `rounded-2xl p-5 border ${charity.color} shadow-warm-sm`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0 mt-0.5 shadow-warm-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: `w-4 h-4 ${charity.iconColor}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm mb-1 leading-snug", children: charity.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed font-body", children: charity.description })
            ] })
          ] })
        },
        charity.name
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { duration: 0.4 },
          className: "bg-card border border-border rounded-2xl p-8 text-center shadow-warm-md",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-accent border border-border flex items-center justify-center mx-auto mb-4 shadow-warm-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-accent-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: "Want to donate books directly?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 max-w-md mx-auto font-body", children: "Mark any book as a charitable donation when listing it. We'll coordinate with our partner charities to get it to someone who'll truly benefit from it." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
              !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "gap-2 shadow-candlelit",
                  "data-ocid": "charity-donate-signin-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: "w-4 h-4" }),
                    "Sign up to Donate"
                  ]
                }
              ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => navigate({ to: "/library" }),
                  className: "gap-2 shadow-candlelit",
                  "data-ocid": "charity-donate-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: "w-4 h-4" }),
                    "Donate a Book"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "self-center text-xs px-3 py-1.5 border-border text-foreground font-body",
                  children: "100% of donations go to charity"
                }
              )
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted border-t border-border py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-foreground", children: "Available in Your Community" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm font-body", children: "Recently shared books waiting to be borrowed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/community", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "gap-1 hidden sm:flex hover:bg-secondary",
            "data-ocid": "home-view-all-btn",
            children: [
              "View all ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4", children: featuredBooks.map((book, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.08, duration: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookCard, { book, showOwner: true })
        },
        book.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/community", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "gap-1 border-border hover:bg-primary hover:text-primary-foreground",
          "data-ocid": "home-mobile-view-all-btn",
          children: [
            "View all books ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
          ]
        }
      ) }) })
    ] }) }),
    !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-t border-border py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary border border-border flex items-center justify-center mx-auto mb-5 shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-7 h-7 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Ready to share your bookshelf?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 font-body", children: "Join our growing community of readers in Bahrain. Sign in to list your books, request others, and help those in need." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              onClick: () => navigate({ to: "/signup" }),
              className: "gap-2 shadow-candlelit",
              "data-ocid": "cta-signin-btn",
              children: [
                "Get Started — It's Free",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted border-t border-border py-14",
        "data-ocid": "charity-footer-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center mx-auto mb-5 shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-6 h-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-foreground mb-4", children: "Actively Helping Charities & Those in Need" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed mb-8 font-body", children: "BookBank.bh is committed to supporting charities and communities in need. Our charity partners will be announced soon — we are working to connect book donations with those who need them most." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex flex-col items-start gap-3 bg-card border border-border rounded-2xl px-8 py-6 mb-8 shadow-warm text-left", children: FOOTER_CHARITIES.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  initial: { opacity: 0, x: -8 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { delay: 0.1 + i * 0.1, duration: 0.4 },
                  className: "text-sm font-medium text-foreground font-display",
                  children: entry
                },
                entry
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-accent flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body", children: "Charity partners to be announced. Stay tuned!" })
              ] })
            ]
          }
        ) })
      }
    )
  ] });
}
export {
  HomePage as default
};
