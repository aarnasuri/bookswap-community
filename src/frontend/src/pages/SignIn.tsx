import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@tanstack/react-router";
import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const validateEmail = (val: string) => {
    if (!val) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Enter a valid email.";
    return "";
  };

  const validatePassword = (val: string) => {
    if (!val) return "Password is required.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        err instanceof Error ? err.message : "Email or password is incorrect.",
      );
    } finally {
      setIsLoading(false);
    }
  };

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
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Sign in to your BookBank.bh account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Global error */}
            {formError && (
              <div
                className="rounded-lg bg-destructive border border-border px-4 py-3 text-sm text-destructive-foreground"
                data-ocid="signin-error"
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
                aria-describedby={emailError ? "email-err" : undefined}
                className={
                  emailError
                    ? "border-destructive focus-visible:ring-destructive/30"
                    : ""
                }
                data-ocid="signin-email"
              />
              {emailError && (
                <p id="email-err" className="text-xs text-destructive mt-1">
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError)
                      setPasswordError(validatePassword(e.target.value));
                  }}
                  onBlur={() => setPasswordError(validatePassword(password))}
                  autoComplete="current-password"
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? "password-err" : undefined}
                  className={`pr-10 ${passwordError ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                  data-ocid="signin-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  data-ocid="signin-toggle-password"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p id="password-err" className="text-xs text-destructive mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isLoading}
              data-ocid="signin-submit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* Footer link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline"
              data-ocid="signin-goto-signup"
            >
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Community note */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Join thousands of book lovers sharing stories across Bahrain 📚
        </p>
      </div>
    </div>
  );
}
