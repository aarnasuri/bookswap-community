import { j as jsxRuntimeExports, B as Button } from "./index-D8jmrdk6.js";
function EmptyState({
  icon,
  title,
  description,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center gap-4 py-16 text-center animate-fade-in",
      "data-ocid": "empty-state",
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: description })
        ] }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: action.onClick, "data-ocid": "empty-state-cta", children: action.label })
      ]
    }
  );
}
export {
  EmptyState as E
};
