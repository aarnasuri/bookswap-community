import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Calendar, MapPin, User } from "lucide-react";
import { motion } from "motion/react";
import { BookCard } from "../components/BookCard";
import { EmptyState } from "../components/EmptyState";
import { MOCK_BOOKS } from "../hooks/useBooks";
import { useGetUserProfile } from "../hooks/useCurrentUser";
import type { MockBook } from "../types";

// ── Mock users kept as demo content ───────────────────────────────────────────

const MOCK_USERS: Record<
  string,
  { name: string; bio: string; location: string; joinedYear: string }
> = {
  "mock-user-1": {
    name: "Sophie Andersson",
    bio: "Literary fiction lover, occasional poet, and café regular. Always hunting for a good character-driven novel.",
    location: "Stockholm",
    joinedYear: "January 2024",
  },
  "mock-user-2": {
    name: "Marcus Chen",
    bio: "Non-fiction enthusiast and avid traveler. I believe every book is a ticket to somewhere new.",
    location: "Singapore",
    joinedYear: "March 2024",
  },
  "mock-user-3": {
    name: "Lena Müller",
    bio: "Sci-fi devotee. If it has spaceships, robots, or first contact — I've read it twice.",
    location: "Berlin",
    joinedYear: "February 2024",
  },
  "mock-user-4": {
    name: "Tom Rivera",
    bio: "Fantasy and mystery reader. Afternoon sun and a good thriller is my idea of perfection.",
    location: "Barcelona",
    joinedYear: "April 2024",
  },
  "mock-user-5": {
    name: "Amara Okafor",
    bio: "Self-help and philosophy reader. Exploring how ideas can change the way we live.",
    location: "Lagos",
    joinedYear: "January 2024",
  },
};

// ── Skeleton ──────────────────────────────────────────────────────────────────

function UserProfileSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-36 w-full rounded-xl" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UserProfilePage() {
  const { id } = useParams({ from: "/user/$id" });
  const profileQuery = useGetUserProfile(id);

  // Resolve display data: prefer real backend data, fall back to mock
  const mockUser = MOCK_USERS[id];
  const backendProfile = profileQuery.data;

  const isLoading = profileQuery.isLoading;

  // Merge: real profile wins, mock fills gaps
  const displayName =
    backendProfile?.name ?? mockUser?.name ?? "Unknown Reader";
  const displayBio = backendProfile?.bio ?? mockUser?.bio ?? null;
  const displayLocation =
    (backendProfile as unknown as { location?: string })?.location ??
    mockUser?.location ??
    null;
  const joinedDisplay = backendProfile?.joinedAt
    ? new Date(Number(backendProfile.joinedAt)).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : (mockUser?.joinedYear ?? null);

  const initials = displayName.slice(0, 2).toUpperCase();

  // Books: filter mock books for this user
  const userBooks: MockBook[] = MOCK_BOOKS.filter(
    (b) => b.ownerId === id && b.availability === "available",
  );

  // 404 if no mock user and no real profile
  const notFound = !isLoading && !backendProfile && !mockUser;

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex w-16 h-16 items-center justify-center rounded-full bg-muted mb-4">
          <User className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-foreground mb-2">
          User not found
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          This profile doesn't exist or may have been removed.
        </p>
        <Link to="/community">
          <Button variant="outline" size="sm" className="gap-1.5">
            <ArrowLeft className="w-4 h-4" /> Back to Library
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button */}
      <Link to="/community">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 -ml-2"
          data-ocid="user-profile-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Community Library
        </Button>
      </Link>

      {isLoading ? (
        <UserProfileSkeleton />
      ) : (
        <>
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-card rounded-xl border border-border shadow-warm-sm overflow-hidden"
          >
            {/* Decorative header strip */}
            <div className="h-20 bg-gradient-to-r from-secondary via-primary to-accent" />

            <div className="px-6 pb-6 -mt-8">
              <div className="flex items-end justify-between gap-4 mb-4">
                <Avatar className="w-16 h-16 ring-4 ring-card shadow-warm-sm">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xl font-display font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {joinedDisplay && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3" />
                    Joined {joinedDisplay}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display text-xl font-semibold text-foreground">
                    {displayName}
                  </h1>
                  <Badge variant="outline" className="text-xs">
                    Community Reader
                  </Badge>
                </div>

                {displayLocation && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {displayLocation}
                  </p>
                )}

                {displayBio && (
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
                    {displayBio}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="grid grid-cols-2 gap-3"
          >
            {[
              { label: "Books Available", value: userBooks.length },
              { label: "Exchange Status", value: "Active" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-muted rounded-lg border border-border px-4 py-3 text-center"
              >
                <p className="text-xl font-display font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Available books */}
          <section>
            <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Available Books{" "}
              <span className="text-muted-foreground font-normal text-base">
                ({userBooks.length})
              </span>
            </h2>

            {userBooks.length === 0 ? (
              <EmptyState
                icon={<BookOpen className="w-8 h-8" />}
                title="No available books right now"
                description={`${displayName} hasn't listed any books yet, or all their books are currently taken.`}
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {userBooks.map((book, i) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                  >
                    <BookCard book={book} showOwner={false} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
