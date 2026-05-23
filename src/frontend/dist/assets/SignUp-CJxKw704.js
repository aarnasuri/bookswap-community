import { r as reactExports, u as useAuth, a7 as useRouter, j as jsxRuntimeExports, b as BookOpen, X, B as Button, L as Link } from "./index-D8jmrdk6.js";
import { I as Input } from "./input-DUqn7Vqm.js";
import { L as Label } from "./label-DWGktHmM.js";
import { E as EyeOff, a as Eye, L as LoaderCircle } from "./loader-circle-BAjrB8QH.js";
import { C as Check } from "./check-BttumTMa.js";
const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "One number", test: (p) => /[0-9]/.test(p) }
];
function validateEmail(val) {
  if (!val) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Enter a valid email.";
  return "";
}
function validatePassword(val) {
  if (!val) return "Password is required.";
  if (PASSWORD_RULES.some((r) => !r.test(val)))
    return "Password doesn't meet the requirements.";
  return "";
}
function validateConfirm(password, confirm) {
  if (!confirm) return "Please confirm your password.";
  if (password !== confirm) return "Passwords do not match.";
  return "";
}
function SignUpPage() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [showRules, setShowRules] = reactExports.useState(false);
  const [emailError, setEmailError] = reactExports.useState("");
  const [passwordError, setPasswordError] = reactExports.useState("");
  const [confirmError, setConfirmError] = reactExports.useState("");
  const [formError, setFormError] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const { register } = useAuth();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    const cErr = validateConfirm(password, confirm);
    setEmailError(eErr);
    setPasswordError(pErr);
    setConfirmError(cErr);
    if (eErr || pErr || cErr) return;
    setIsLoading(true);
    try {
      await register(email, password);
      router.navigate({ to: "/" });
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const allRulesMet = PASSWORD_RULES.every((r) => r.test(password));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-warm p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground", children: "Create your account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Join the BookBank.bh community — free forever" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-5", children: [
        formError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-lg bg-destructive border border-border px-4 py-3 text-sm text-destructive-foreground",
            "data-ocid": "signup-error",
            children: formError
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-sm font-medium", children: "Email address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              type: "email",
              placeholder: "you@example.com",
              value: email,
              onChange: (e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(validateEmail(e.target.value));
              },
              onBlur: () => setEmailError(validateEmail(email)),
              autoComplete: "email",
              "aria-invalid": !!emailError,
              "aria-describedby": emailError ? "signup-email-err" : void 0,
              className: emailError ? "border-destructive focus-visible:ring-destructive/30" : "",
              "data-ocid": "signup-email"
            }
          ),
          emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              id: "signup-email-err",
              className: "text-xs text-destructive mt-1",
              children: emailError
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "password",
                type: showPassword ? "text" : "password",
                placeholder: "Create a strong password",
                value: password,
                onChange: (e) => {
                  setPassword(e.target.value);
                  setShowRules(true);
                  if (passwordError)
                    setPasswordError(validatePassword(e.target.value));
                  if (confirmError && confirm)
                    setConfirmError(validateConfirm(e.target.value, confirm));
                },
                onBlur: () => setPasswordError(validatePassword(password)),
                onFocus: () => setShowRules(true),
                autoComplete: "new-password",
                "aria-invalid": !!passwordError,
                "aria-describedby": passwordError ? "signup-password-err" : void 0,
                className: `pr-10 ${passwordError ? "border-destructive focus-visible:ring-destructive/30" : ""}`,
                "data-ocid": "signup-password"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword((s) => !s),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                "aria-label": showPassword ? "Hide password" : "Show password",
                "data-ocid": "signup-toggle-password",
                children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
              }
            )
          ] }),
          passwordError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              id: "signup-password-err",
              className: "text-xs text-destructive mt-1",
              children: passwordError
            }
          ),
          showRules && password.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1", children: PASSWORD_RULES.map((rule) => {
            const met = rule.test(password);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: `flex items-center gap-1.5 text-xs ${met ? "text-secondary" : "text-muted-foreground"}`,
                children: [
                  met ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-secondary flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
                  rule.label
                ]
              },
              rule.label
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm", className: "text-sm font-medium", children: "Confirm password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "confirm",
                type: showConfirm ? "text" : "password",
                placeholder: "Repeat your password",
                value: confirm,
                onChange: (e) => {
                  setConfirm(e.target.value);
                  if (confirmError)
                    setConfirmError(
                      validateConfirm(password, e.target.value)
                    );
                },
                onBlur: () => setConfirmError(validateConfirm(password, confirm)),
                autoComplete: "new-password",
                "aria-invalid": !!confirmError,
                "aria-describedby": confirmError ? "signup-confirm-err" : void 0,
                className: `pr-10 ${confirmError ? "border-destructive focus-visible:ring-destructive/30" : ""}`,
                "data-ocid": "signup-confirm-password"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowConfirm((s) => !s),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                "aria-label": showConfirm ? "Hide password" : "Show password",
                children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
              }
            )
          ] }),
          confirmError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              id: "signup-confirm-err",
              className: "text-xs text-destructive mt-1",
              children: confirmError
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full mt-2",
            disabled: isLoading || !allRulesMet && password.length > 0,
            "data-ocid": "signup-submit",
            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
              "Creating account…"
            ] }) : "Create account"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-6", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/signin",
            className: "text-primary font-medium hover:underline",
            "data-ocid": "signup-goto-signin",
            children: "Sign in"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-4", children: "Free to use, forever. Community-powered. 📖" })
  ] }) });
}
export {
  SignUpPage as default
};
