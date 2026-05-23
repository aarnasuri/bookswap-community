import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  HandHeart,
  Heart,
  RefreshCw,
  Repeat2,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { BookCard } from "../components/BookCard";
import { useAuth } from "../hooks/useAuth";
import { MOCK_BOOKS } from "../hooks/useBooks";

const STATS = [
  { label: "Books Available", value: "240+", icon: BookOpen },
  { label: "Community Readers", value: "180+", icon: Users },
  { label: "Exchanges Made", value: "310+", icon: Repeat2 },
];

const HOW_IT_WORKS = [
  {
    step: "I",
    icon: BookOpen,
    title: "List Your Books",
    description:
      "Add books from your shelf that are ready for a new home. Set condition, genre, and availability in seconds.",
  },
  {
    step: "II",
    icon: Heart,
    title: "Browse & Request",
    description:
      "Explore what your community is sharing. Find your next read and send a request to the owner.",
  },
  {
    step: "III",
    icon: RefreshCw,
    title: "Chat & Exchange",
    description:
      "Once accepted, a private chat opens so you can coordinate the handover at your convenience.",
  },
];

const CHARITY_INITIATIVES = [
  {
    name: "Charity Partner 1",
    description: "Coming soon — charity details will be announced.",
    color: "bg-accent border-border",
    iconColor: "text-accent-foreground",
  },
  {
    name: "Charity Partner 2",
    description: "Coming soon — charity details will be announced.",
    color: "bg-primary border-border",
    iconColor: "text-primary-foreground",
  },
  {
    name: "Charity Partner 3",
    description: "Coming soon — charity details will be announced.",
    color: "bg-secondary border-border",
    iconColor: "text-secondary-foreground",
  },
];

const DONATE_BENEFITS = [
  "Your book finds a new home with someone who truly needs it",
  "Every donation supports our partner charities across Bahrain",
  "Together we make reading accessible to all",
];

const FOOTER_CHARITIES = [
  "• Partner Charity 1 — Coming Soon",
  "• Partner Charity 2 — Coming Soon",
  "• Partner Charity 3 — Coming Soon",
];

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  const isAuthenticated = isLoggedIn;
  const navigate = useNavigate();
  const featuredBooks = MOCK_BOOKS.filter(
    (b) => b.availability === "available",
  ).slice(0, 6);

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative bg-card border-b border-border overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground border border-border rounded-full px-4 py-1.5 text-xs font-medium mb-6 shadow-warm-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground inline-block animate-pulse" />
              Bahrain's Free Book Sharing Community
            </motion.div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5 tracking-tight">
              Books deserve
              <br />
              <span className="text-primary italic">second lives.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed font-body">
              Share books you love, discover new ones, and build connections
              with readers in your community — all completely free. And
              together, we give back.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/community">
                <Button
                  size="lg"
                  className="gap-2 w-full sm:w-auto shadow-candlelit"
                  data-ocid="hero-browse-btn"
                >
                  Browse Community Library
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link to="/signup">
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 w-full sm:w-auto border-border hover:bg-primary hover:text-primary-foreground shadow-warm-sm"
                    data-ocid="hero-signin-btn"
                  >
                    Sign up to Share Books
                  </Button>
                </Link>
              )}
              {isAuthenticated && (
                <Link to="/library">
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 w-full sm:w-auto border-border hover:bg-primary hover:text-primary-foreground shadow-warm-sm"
                    data-ocid="hero-library-btn"
                  >
                    My Library
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────── */}
      <section className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex flex-col items-center text-center gap-1"
              >
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center mb-1 shadow-warm-sm">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="font-display text-2xl sm:text-3xl font-bold text-secondary-foreground">
                  {stat.value}
                </span>
                <span className="text-xs text-secondary-foreground font-body">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────── */}
      <section className="bg-muted border-b border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 text-xs font-medium mb-4 shadow-warm-sm text-foreground">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              Simple as turning a page
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              How BookBank.bh Works
            </h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-md mx-auto font-body">
              Simple steps to start sharing and borrowing books with your
              community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.14, duration: 0.45 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-warm text-center relative"
              >
                {/* Roman numeral step */}
                <span className="absolute top-4 right-5 font-display text-sm font-bold text-primary italic">
                  {step.step}
                </span>
                <div className="w-12 h-12 rounded-full bg-primary border border-border flex items-center justify-center mx-auto mb-4 shadow-warm-sm">
                  <step.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-foreground text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-body">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donate to Charity ───────────────────────────────────── */}
      <section className="bg-accent border-b border-border py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 text-xs font-medium mb-5 shadow-warm-sm text-foreground">
                <HandHeart className="w-3.5 h-3.5 text-accent" />
                Make a Difference
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-accent-foreground mb-4 leading-snug">
                Donate Books to <span className="italic">Those in Need</span>
              </h2>
              <p className="text-sm text-accent-foreground leading-relaxed mb-6 font-body">
                A book passed on is a life touched. When you donate through
                BookBank.bh, your story travels further than you imagine —
                reaching hands that truly need it most.
              </p>

              <ul className="space-y-3 mb-8">
                {DONATE_BENEFITS.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0 mt-0.5 shadow-warm-sm">
                      <Heart className="w-2.5 h-2.5 text-accent" />
                    </span>
                    <span className="text-sm text-accent-foreground leading-relaxed font-body">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                {isAuthenticated ? (
                  <Button
                    size="lg"
                    className="gap-2 w-full sm:w-auto shadow-candlelit"
                    onClick={() => navigate({ to: "/library" })}
                    data-ocid="donate-section-donate-btn"
                  >
                    <HandHeart className="w-4 h-4" />
                    Donate a Book
                  </Button>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button
                        size="lg"
                        className="gap-2 w-full sm:w-auto shadow-candlelit"
                        data-ocid="donate-section-signin-btn"
                      >
                        <HandHeart className="w-4 h-4" />
                        Sign up to Donate
                      </Button>
                    </Link>
                    <p className="self-center text-xs text-accent-foreground font-body">
                      Free account · No strings attached
                    </p>
                  </>
                )}
              </div>
            </motion.div>

            {/* Right — visual card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative"
            >
              <div className="bg-card border border-border rounded-2xl p-8 shadow-warm-md text-center">
                <div className="w-16 h-16 rounded-full bg-accent border border-border flex items-center justify-center mx-auto mb-5 shadow-warm">
                  <HandHeart className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Every Book Counts
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed font-body">
                  We coordinate with trusted charity partners to get your
                  donated books into the hands of those who need them most
                  across Bahrain.
                </p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { value: "500+", label: "Books Donated" },
                    { value: "3", label: "Charity Partners" },
                    { value: "100%", label: "Goes to Charity" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-accent rounded-xl p-3 border border-border"
                    >
                      <div className="font-display text-lg font-bold text-accent-foreground">
                        {item.value}
                      </div>
                      <div className="text-xs text-accent-foreground mt-0.5 leading-tight font-body">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Charity Partners ────────────────────────────────────── */}
      <section className="bg-background py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 text-xs font-medium mb-5 shadow-warm-sm text-foreground">
              <HandHeart className="w-3.5 h-3.5 text-accent" />
              Giving Back Together
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Books That Do More Good
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed font-body">
              When you donate a book through BookBank.bh, you're not just
              sharing a story — you're helping someone in need. We partner with
              trusted charities to ensure donated books reach those who need
              them most.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {CHARITY_INITIATIVES.map((charity, i) => (
              <motion.div
                key={charity.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                className={`rounded-2xl p-5 border ${charity.color} shadow-warm-sm`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0 mt-0.5 shadow-warm-sm">
                    <HandHeart className={`w-4 h-4 ${charity.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-sm mb-1 leading-snug">
                      {charity.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-body">
                      {charity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-2xl p-8 text-center shadow-warm-md"
          >
            <div className="w-12 h-12 rounded-full bg-accent border border-border flex items-center justify-center mx-auto mb-4 shadow-warm-sm">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Want to donate books directly?
            </h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto font-body">
              Mark any book as a charitable donation when listing it. We'll
              coordinate with our partner charities to get it to someone who'll
              truly benefit from it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!isAuthenticated ? (
                <Link to="/signup">
                  <Button
                    className="gap-2 shadow-candlelit"
                    data-ocid="charity-donate-signin-btn"
                  >
                    <HandHeart className="w-4 h-4" />
                    Sign up to Donate
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={() => navigate({ to: "/library" })}
                  className="gap-2 shadow-candlelit"
                  data-ocid="charity-donate-btn"
                >
                  <HandHeart className="w-4 h-4" />
                  Donate a Book
                </Button>
              )}
              <Badge
                variant="outline"
                className="self-center text-xs px-3 py-1.5 border-border text-foreground font-body"
              >
                100% of donations go to charity
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Books ──────────────────────────────────────── */}
      <section className="bg-muted border-t border-border py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Available in Your Community
              </h2>
              <p className="text-muted-foreground mt-1 text-sm font-body">
                Recently shared books waiting to be borrowed
              </p>
            </div>
            <Link to="/community">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 hidden sm:flex hover:bg-secondary"
                data-ocid="home-view-all-btn"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredBooks.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <BookCard book={book} showOwner />
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link to="/community">
              <Button
                variant="outline"
                size="sm"
                className="gap-1 border-border hover:bg-primary hover:text-primary-foreground"
                data-ocid="home-mobile-view-all-btn"
              >
                View all books <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      {!isAuthenticated && (
        <section className="bg-card border-t border-border py-16">
          <div className="max-w-lg mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary border border-border flex items-center justify-center mx-auto mb-5 shadow-warm">
                <BookOpen className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Ready to share your bookshelf?
              </h2>
              <p className="text-muted-foreground text-sm mb-6 font-body">
                Join our growing community of readers in Bahrain. Sign in to
                list your books, request others, and help those in need.
              </p>
              <Button
                size="lg"
                onClick={() => navigate({ to: "/signup" })}
                className="gap-2 shadow-candlelit"
                data-ocid="cta-signin-btn"
              >
                Get Started — It's Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Charity Footer Section ──────────────────────────────── */}
      <section
        className="bg-muted border-t border-border py-14"
        data-ocid="charity-footer-section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center mx-auto mb-5 shadow-warm">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Actively Helping Charities &amp; Those in Need
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed mb-8 font-body">
              BookBank.bh is committed to supporting charities and communities
              in need. Our charity partners will be announced soon — we are
              working to connect book donations with those who need them most.
            </p>

            <div className="inline-flex flex-col items-start gap-3 bg-card border border-border rounded-2xl px-8 py-6 mb-8 shadow-warm text-left">
              {FOOTER_CHARITIES.map((entry, i) => (
                <motion.span
                  key={entry}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                  className="text-sm font-medium text-foreground font-display"
                >
                  {entry}
                </motion.span>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="font-body">
                Charity partners to be announced. Stay tuned!
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
