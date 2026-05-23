import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import {
  BookMarked,
  BookOpen,
  HandHeart,
  Library,
  LogIn,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Sun,
  User,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useTheme } from "../hooks/useTheme";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: BookOpen },
  { href: "/community", label: "Community Library", icon: Library },
  { href: "/library", label: "My Library", icon: BookMarked, protected: true },
  { href: "/requests", label: "My Requests", icon: Users, protected: true },
  {
    href: "/messages",
    label: "Messages",
    icon: MessageSquare,
    protected: true,
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const { profile } = useCurrentUser();
  const { isDark, toggle: toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    router.navigate({ to: "/" });
  };

  const displayName = profile?.name ?? user?.email?.split("@")[0] ?? "Account";
  const initials = profile?.name
    ? profile.name.slice(0, 2).toUpperCase()
    : displayName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header — parchment shelf feel */}
      <header
        className="sticky top-0 z-50 bg-card border-b border-border shadow-warm"
        data-ocid="nav"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              data-ocid="nav-logo"
            >
              <div className="w-9 h-9 rounded-lg bg-primary border border-border flex items-center justify-center transition-smooth group-hover:bg-secondary shadow-warm-sm">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-bold text-foreground tracking-tight">
                  Book<span className="text-primary">Bank</span>
                  <span className="text-muted-foreground text-sm font-normal">
                    .bh
                  </span>
                </span>
                <span className="text-[10px] text-muted-foreground font-body tracking-wide hidden sm:block">
                  Bahrain's Book Community
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.filter((l) => !l.protected || isLoggedIn).map(
                (link) => {
                  const active = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                        active
                          ? "bg-primary text-primary-foreground border border-border shadow-warm-sm"
                          : "text-foreground hover:text-primary-foreground hover:bg-primary"
                      }`}
                      data-ocid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                },
              )}
            </nav>

            {/* User menu / Auth links */}
            <div className="flex items-center gap-2">
              {/* Dark mode toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-muted"
                onClick={toggleTheme}
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
                data-ocid="nav-theme-toggle"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-foreground" />
                ) : (
                  <Moon className="w-4 h-4 text-foreground" />
                )}
              </Button>
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 h-9 px-3 hover:bg-muted"
                      data-ocid="nav-user-menu"
                    >
                      <Avatar className="w-7 h-7 border border-border shadow-warm-sm">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold font-display">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">
                        {displayName}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 shadow-warm-md border-border"
                  >
                    <Link to="/profile">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        data-ocid="nav-profile-link"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-destructive focus:text-destructive"
                      onClick={handleLogout}
                      data-ocid="nav-logout-btn"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/signin">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 hover:bg-muted"
                      data-ocid="nav-signin-btn"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      size="sm"
                      className="gap-1.5 shadow-warm-sm"
                      data-ocid="nav-signup-btn"
                    >
                      <UserPlus className="w-4 h-4" />
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-muted"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle menu"
                data-ocid="nav-mobile-toggle"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <nav className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.filter((l) => !l.protected || isLoggedIn).map(
                (link) => {
                  const active = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth ${
                        active
                          ? "bg-primary text-primary-foreground border border-border"
                          : "text-foreground hover:text-primary-foreground hover:bg-primary"
                      }`}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                },
              )}
              {!isLoggedIn && (
                <div className="pt-2 mt-1 border-t border-border flex flex-col gap-1">
                  <Link to="/signin" onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)}>
                    <Button size="sm" className="w-full justify-start gap-2">
                      <UserPlus className="w-4 h-4" />
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer — warm old-paper tone */}
      <footer className="bg-card border-t border-border shadow-warm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-primary border border-border flex items-center justify-center shadow-warm-sm">
                  <BookOpen className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-display text-base font-bold text-foreground">
                    Book<span className="text-primary">Bank</span>.bh
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed font-body">
                Bahrain's free community book-sharing platform — where every
                book finds a new home and stories live on.
              </p>
            </div>

            {/* Charity notice */}
            <div className="flex items-start gap-3 bg-accent border border-border rounded-xl px-5 py-4 max-w-sm shadow-warm-sm">
              <HandHeart className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-accent-foreground leading-relaxed">
                <span className="font-semibold font-display">
                  We actively support charities and those in need.
                </span>{" "}
                Donated books and proceeds go to partner organisations across
                Bahrain helping underserved communities.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} BookBank.bh. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              📚 Sharing books, changing lives
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
