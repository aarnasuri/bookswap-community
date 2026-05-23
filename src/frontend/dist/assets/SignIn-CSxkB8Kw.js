import { r as reactExports, u as useAuth, a7 as useRouter, j as jsxRuntimeExports, b as BookOpen, B as Button, L as Link } from "./index-D8jmrdk6.js";
import { I as Input } from "./input-DUqn7Vqm.js";
import { L as Label } from "./label-DWGktHmM.js";
import { E as EyeOff, a as Eye, L as LoaderCircle } from "./loader-circle-BAjrB8QH.js";
function SignInPage() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [emailError, setEmailError] = reactExports.useState("");
  const [passwordError, setPasswordError] = reactExports.useState("");
  const [formError, setFormError] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const validateEmail = (val) => {
    if (!val) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Enter a valid email.";
    return "";
  };
  const validatePassword = (val) => {
    if (!val) return "Password is required.";
    return "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setEmailError(eErr);
    setPasswordError(pErr);
    if (eErr || pErr) return;
    setIsLoading(true);
    try {
      await login(email, password);
      router.navigate({ to: "/" });
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Email or password is incorrect."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-warm p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground", children: "Welcome back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Sign in to your BookBank.bh account" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-5", children: [
        formError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-lg bg-destructive border border-border px-4 py-3 text-sm text-destructive-foreground",
            "data-ocid": "signin-error",
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
              "aria-describedby": emailError ? "email-err" : void 0,
              className: emailError ? "border-destructive focus-visible:ring-destructive/30" : "",
              "data-ocid": "signin-email"
            }
          ),
          emailError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "email-err", className: "text-xs text-destructive mt-1", children: emailError })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "password",
                type: showPassword ? "text" : "password",
                placeholder: "Enter your password",
                value: password,
                onChange: (e) => {
                  setPassword(e.target.value);
                  if (passwordError)
                    setPasswordError(validatePassword(e.target.value));
                },
                onBlur: () => setPasswordError(validatePassword(password)),
                autoComplete: "current-password",
                "aria-invalid": !!passwordError,
                "aria-describedby": passwordError ? "password-err" : void 0,
                className: `pr-10 ${passwordError ? "border-destructive focus-visible:ring-destructive/30" : ""}`,
                "data-ocid": "signin-password"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword((s) => !s),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                "aria-label": showPassword ? "Hide password" : "Show password",
                "data-ocid": "signin-toggle-password",
                children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
              }
            )
          ] }),
          passwordError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "password-err", className: "text-xs text-destructive mt-1", children: passwordError })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full mt-2",
            disabled: isLoading,
            "data-ocid": "signin-submit",
            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
              "Signing in…"
            ] }) : "Sign in"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-6", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/signup",
            className: "text-primary font-medium hover:underline",
            "data-ocid": "signin-goto-signup",
            children: "Sign up for free"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-4", children: "Join thousands of book lovers sharing stories across Bahrain 📚" })
  ] }) });
}
export {
  SignInPage as default
};
