import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@tanstack/react-router";
import { BookOpen, Check, Eye, EyeOff, Loader2, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface PasswordRule {
  label: string;
  test: (p: string) => boolean;
}

const PASSWORD_RULES: PasswordRule[] = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "One number", test: (p) => /[0-9]/.test(p) },
];

function validateEmail(val: string) {
  if (!val) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Enter a valid email.";
  return "";
}

function validatePassword(val: string) {
  if (!val) return "Password is required.";
  if (PASSWORD_RULES.some((r) => !r.test(val)))
    return "Password doesn't meet the requirements.";
  return "";
}

function validateConfirm(password: string, confirm: string) {
  if (!confirm) return "Please confirm your password.";
  if (password !== confirm) return "Passwords do not match.";
  return "";
}

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
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
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const allRulesMet = PASSWORD_RULES.every((r) => r.test(password));

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-warm p-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-center">
              <h1 className="font-display text-2xl font-semibold text-foreground">
                Create your account
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Join the BookBank.bh community — free forever
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Global error */}
            {formError && (
              <div
                className="rounded-lg bg-destructive border border-border px-4 py-3 text-sm text-destructive-foreground"
                data-ocid="signup-error"
              >
                {formError}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(validateEmail(e.target.value));
                }}
                onBlur={() => setEmailError(validateEmail(email))}
                autoComplete="email"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "signup-email-err" : undefined}
                className={
                  emailError
                    ? "border-destructive focus-visible:ring-destructive/30"
                    : ""
                }
                data-ocid="signup-email"
              />
              {emailError && (
                <p
                  id="signup-email-err"
                  className="text-xs text-destructive mt-1"
                >
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setShowRules(true);
                    if (passwordError)
                      setPasswordError(validatePassword(e.target.value));
                    if (confirmError && confirm)
                      setConfirmError(validateConfirm(e.target.value, confirm));
                  }}
                  onBlur={() => setPasswordError(validatePassword(password))}
                  onFocus={() => setShowRules(true)}
                  autoComplete="new-password"
                  aria-invalid={!!passwordError}
                  aria-describedby={
                    passwordError ? "signup-password-err" : undefined
                  }
                  className={`pr-10 ${passwordError ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                  data-ocid="signup-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  data-ocid="signup-toggle-password"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p
                  id="signup-password-err"
                  className="text-xs text-destructive mt-1"
                >
                  {passwordError}
                </p>
              )}

              {/* Password rules */}
              {showRules && password.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {PASSWORD_RULES.map((rule) => {
                    const met = rule.test(password);
                    return (
                      <li
                        key={rule.label}
                        className={`flex items-center gap-1.5 text-xs ${met ? "text-secondary" : "text-muted-foreground"}`}
                      >
                        {met ? (
                          <Check className="w-3 h-3 text-secondary flex-shrink-0" />
                        ) : (
                          <X className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        )}
                        {rule.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirm" className="text-sm font-medium">
                Confirm password
              </Label>
              <div className="relative">
                <Input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    if (confirmError)
                      setConfirmError(
                        validateConfirm(password, e.target.value),
                      );
                  }}
                  onBlur={() =>
                    setConfirmError(validateConfirm(password, confirm))
                  }
                  autoComplete="new-password"
                  aria-invalid={!!confirmError}
                  aria-describedby={
                    confirmError ? "signup-confirm-err" : undefined
                  }
                  className={`pr-10 ${confirmError ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                  data-ocid="signup-confirm-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {confirmError && (
                <p
                  id="signup-confirm-err"
                  className="text-xs text-destructive mt-1"
                >
                  {confirmError}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isLoading || (!allRulesMet && password.length > 0)}
              data-ocid="signup-submit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          {/* Footer link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-primary font-medium hover:underline"
              data-ocid="signup-goto-signin"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Community note */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Free to use, forever. Community-powered. 📖
        </p>
      </div>
    </div>
  );
}
