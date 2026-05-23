import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Calendar, Edit2, MapPin, Save, User, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BookCard } from "../components/BookCard";
import { EmptyState } from "../components/EmptyState";
import { MOCK_BOOKS, useMyBooks } from "../hooks/useBooks";
import { useCurrentUser, useSaveProfile } from "../hooks/useCurrentUser";
import type { AvailabilityStatus, BookCondition, MockBook } from "../types";

function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-24 w-full rounded-lg" />
      <Skeleton className="h-16 w-full rounded-lg" />
    </div>
  );
}

export default function ProfilePage() {
  const { profile, user, isLoadingProfile } = useCurrentUser();
  const saveProfile = useSaveProfile();
  const myBooksQuery = useMyBooks();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, _setLocation] = useState("");

  // Sync form when profile loads
  useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setBio(profile.bio ?? "");
    }
  }, [profile]);

  const principalId = user?.email ?? "";
  const displayName = profile?.name || "Unnamed Reader";
  const initials = displayName.slice(0, 2).toUpperCase();

  // Joined date from profile bigint (ms since epoch)
  const joinedDate = profile?.joinedAt
    ? new Date(Number(profile.joinedAt)).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : null;

  // Real books from backend, fallback to mock books for this user principal
  const realBooks = myBooksQuery.data ?? [];
  const mockUserBooks: MockBook[] = MOCK_BOOKS.filter(
    (b) => b.ownerId === "mock-user-1",
  );
  const hasRealBooks = realBooks.length > 0;
  const booksListed = hasRealBooks ? realBooks.length : mockUserBooks.length;
  const exchangesCount = 0;

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        bio: bio.trim(),
      });
      toast.success("Profile saved!");
      setEditing(false);
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setName(profile?.name ?? "");
    setBio(profile?.bio ?? "");
    setEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
          My Profile
        </h1>
        {!editing && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setEditing(true)}
            data-ocid="profile-edit-btn"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit Profile
          </Button>
        )}
      </div>

      {isLoadingProfile ? (
        <ProfileSkeleton />
      ) : (
        <>
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-card rounded-xl border border-border shadow-warm-sm overflow-hidden"
          >
            {/* Header strip */}
            <div className="h-20 bg-gradient-to-r from-primary via-secondary to-accent" />

            <div className="px-6 pb-6 -mt-8">
              <div className="flex items-end justify-between gap-4 mb-4">
                <Avatar className="w-16 h-16 ring-4 ring-card shadow-warm-sm">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-display font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {!editing && joinedDate && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3" />
                    Joined {joinedDate}
                  </span>
                )}
              </div>

              {editing ? (
                /* Edit form */
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Display Name <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Your name…"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-9"
                        data-ocid="profile-name-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Your city or neighborhood…"
                        value={location}
                        onChange={(e) => _setLocation(e.target.value)}
                        className="pl-9"
                        data-ocid="profile-location-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="bio" className="text-sm font-medium">
                      About You
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell the community about your reading interests…"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      data-ocid="profile-bio-input"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button
                      onClick={handleSave}
                      disabled={saveProfile.isPending}
                      className="gap-1.5 flex-1"
                      data-ocid="profile-save-btn"
                    >
                      <Save className="w-4 h-4" />
                      {saveProfile.isPending ? "Saving…" : "Save Changes"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="gap-1.5"
                      data-ocid="profile-cancel-btn"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                /* View mode */
                <div className="space-y-2">
                  <div className="flex items-start gap-2 flex-wrap">
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      {displayName}
                    </h2>
                    {principalId && (
                      <Badge
                        variant="outline"
                        className="text-xs font-mono mt-0.5"
                      >
                        {principalId.slice(0, 10)}…
                      </Badge>
                    )}
                  </div>

                  {false && profile?.bio && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {location}
                    </p>
                  )}

                  {profile?.bio ? (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {profile.bio}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No bio yet — click Edit Profile to add one.
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { label: "Books Listed", value: String(booksListed) },
              { label: "Exchanges", value: String(exchangesCount) },
              {
                label: "Member Since",
                value: joinedDate ? joinedDate.split(" ")[1] : "—",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-lg border border-border px-4 py-4 text-center shadow-warm-sm"
              >
                <p className="text-2xl font-display font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* My Books */}
          <section>
            <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              My Books ({booksListed})
            </h2>

            {hasRealBooks ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {realBooks.map((book) => {
                  const mock: MockBook = {
                    id: Number(book.id),
                    title: book.title,
                    author: book.author,
                    genre: book.genre,
                    condition: book.condition as unknown as BookCondition,
                    coverUrl: "",
                    availability:
                      book.availability as unknown as AvailabilityStatus,
                    ownerName: displayName,
                    ownerId: book.owner.toString(),
                    description: "",
                  };
                  return (
                    <BookCard
                      key={String(book.id)}
                      book={mock}
                      showOwner={false}
                    />
                  );
                })}
              </div>
            ) : mockUserBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mockUserBooks.map((book) => (
                  <BookCard key={book.id} book={book} showOwner={false} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<BookOpen className="w-8 h-8" />}
                title="No books yet"
                description="Add your first book to start sharing with the community."
                action={{
                  label: "Add a Book",
                  onClick: () => navigate({ to: "/library" }),
                }}
              />
            )}
          </section>
        </>
      )}
    </div>
  );
}
