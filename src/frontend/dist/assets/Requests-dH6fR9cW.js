import { c as createLucideIcon, r as reactExports, w as useDirection, d as useControllableState, j as jsxRuntimeExports, f as Primitive, e as useId, K as Root, M as Item, g as composeEventHandlers, P as Presence, N as createRovingFocusGroupScope, m as createContextScope, q as cn, b as BookOpen, a as useNavigate, B as Button } from "./index-D8jmrdk6.js";
import { B as Badge } from "./badge-BPmLb5Yh.js";
import { S as Skeleton } from "./skeleton--Aja5vZl.js";
import { u as ue } from "./index-BFeTiHk3.js";
import { E as EmptyState } from "./EmptyState-DvZHV3jP.js";
import { u as useMyRequests, a as useMyRequestInbox, b as useAcceptBookRequest, c as useDeclineBookRequest } from "./useRequests-DLpE6mXP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
];
const Inbox = createLucideIcon("inbox", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className: "bg-primary text-primary-foreground border-border",
    icon: Clock
  },
  accepted: {
    label: "Accepted",
    className: "bg-secondary text-secondary-foreground border-border",
    icon: CircleCheckBig
  },
  declined: {
    label: "Declined",
    className: "bg-destructive text-destructive-foreground border-border",
    icon: CircleX
  }
};
function formatDate(ts) {
  const ms = Number(ts) / 1e6;
  const diff = Date.now() - ms;
  if (diff < 6e4) return "Just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  if (diff < 6048e5) return `${Math.floor(diff / 864e5)}d ago`;
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });
}
function RequestSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-lg border border-border p-4 flex items-start gap-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-lg shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-40" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
      ]
    },
    i
  )) });
}
function SentRequestCard({ request }) {
  const navigate = useNavigate();
  const cfg = STATUS_CONFIG[request.status];
  const StatusIcon = cfg.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-lg border border-border p-4 flex items-start gap-3 shadow-warm-sm transition-colors hover:border-border",
      "data-ocid": "sent-request-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm leading-snug truncate", children: request.bookTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            "Owner:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: request.ownerName ?? "Community member" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Requested · ",
            formatDate(request.createdAt)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${cfg.className}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "w-3 h-3" }),
                cfg.label
              ]
            }
          ),
          request.status === "accepted" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-6 text-xs px-2 gap-1 border-border text-primary hover:bg-primary hover:text-primary-foreground",
              onClick: () => navigate({ to: "/messages" }),
              "data-ocid": "sent-request-open-chat-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3" }),
                "Open Chat"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function IncomingRequestCard({ request }) {
  const navigate = useNavigate();
  const acceptMutation = useAcceptBookRequest();
  const declineMutation = useDeclineBookRequest();
  const cfg = STATUS_CONFIG[request.status];
  const StatusIcon = cfg.icon;
  const handleAccept = async () => {
    try {
      await acceptMutation.mutateAsync(request.id);
      ue.success("Request accepted! A chat thread has been opened.");
    } catch {
      ue.error("Couldn't accept the request. Please try again.");
    }
  };
  const handleDecline = async () => {
    try {
      await declineMutation.mutateAsync(request.id);
      ue.info("Request declined.");
    } catch {
      ue.error("Couldn't decline the request. Please try again.");
    }
  };
  const isActing = acceptMutation.isPending || declineMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-lg border border-border p-4 flex items-start gap-3 shadow-warm-sm transition-colors hover:border-border",
      "data-ocid": "incoming-request-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-4 h-4 text-accent-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm leading-snug truncate", children: request.bookTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            "From:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: request.requesterName ?? "A reader" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: formatDate(request.createdAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${cfg.className}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "w-3 h-3" }),
                cfg.label
              ]
            }
          ),
          request.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "h-6 text-xs px-2",
                onClick: handleAccept,
                disabled: isActing,
                "data-ocid": "incoming-request-accept-btn",
                children: "Accept"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "h-6 text-xs px-2",
                onClick: handleDecline,
                disabled: isActing,
                "data-ocid": "incoming-request-decline-btn",
                children: "Decline"
              }
            )
          ] }),
          request.status === "accepted" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-6 text-xs px-2 gap-1 border-border text-primary hover:bg-primary hover:text-primary-foreground",
              onClick: () => navigate({ to: "/messages" }),
              "data-ocid": "incoming-request-open-chat-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3" }),
                "Open Chat"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function RequestsPage() {
  const {
    data: sentRequests = [],
    isLoading: sentLoading,
    isError: sentError
  } = useMyRequests();
  const {
    data: incomingRequests = [],
    isLoading: incomingLoading,
    isError: incomingError
  } = useMyRequestInbox();
  const pendingInboxCount = incomingRequests.filter(
    (r) => r.status === "pending"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-semibold text-foreground", children: "My Requests" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Books you've requested and requests received for your books" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "sent", "data-ocid": "requests-tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "sent",
            className: "gap-1.5 flex-1 sm:flex-none",
            "data-ocid": "requests-tab-sent",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
              "Sent Requests",
              sentRequests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1 h-4 px-1.5 text-[10px] bg-primary text-primary-foreground border-0 rounded-full", children: sentRequests.length })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "incoming",
            className: "gap-1.5 flex-1 sm:flex-none",
            "data-ocid": "requests-tab-incoming",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-3.5 h-3.5" }),
              "Incoming",
              pendingInboxCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1 h-4 px-1.5 text-[10px] bg-accent text-accent-foreground border-0 rounded-full", children: pendingInboxCount })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "sent", "data-ocid": "requests-sent-list", children: sentLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(RequestSkeleton, {}) : sentError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive" }),
          title: "Couldn't load your requests",
          description: "Something went wrong. Please refresh the page to try again."
        }
      ) : sentRequests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8" }),
          title: "No requests sent yet",
          description: "Browse the community library and request books you'd like to borrow."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: sentRequests.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SentRequestCard, { request: r }, String(r.id))) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "incoming", "data-ocid": "requests-incoming-list", children: incomingLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(RequestSkeleton, {}) : incomingError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive" }),
          title: "Couldn't load incoming requests",
          description: "Something went wrong. Please refresh the page to try again."
        }
      ) : incomingRequests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-8 h-8" }),
          title: "No incoming requests",
          description: "When someone requests one of your books, it will appear here."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: incomingRequests.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(IncomingRequestCard, { request: r }, String(r.id))) }) })
    ] })
  ] });
}
export {
  RequestsPage as default
};
