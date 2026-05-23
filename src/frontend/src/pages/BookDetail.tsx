import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, MessageSquare, User } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { MOCK_BOOKS } from "../hooks/useBooks";
import { useMyRequests, useSendBookRequest } from "../hooks/useRequests";
import { CONDITION_COLORS, CONDITION_LABELS } from "../types";

export default function BookDetailPage() {
  const { id } = useParams({ from: "/book/$id" });
  const { isLoggedIn } = useAuth();
  const isAuthenticated = isLoggedIn;
  const { data: myRequests, isLoading: requestsLoading } = useMyRequests();
  const sendRequest = useSendBookRequest();

  const book = MOCK_BOOKS.find((b) => String(b.id) === id);

  // Find any existing request for this book
  const existingRequest = myRequests?.find((r) => String(r.bookId) === id);

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-foreground mb-2">
          Book not found
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          This book may have been removed from the community library.
        </p>
        <Link to="/community">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            data-ocid="book-not-found-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Button>
        </Link>
      </div>
    );
  }

  const isAvailable = book.availability === "available";

  // Determine current user's relation to this book
  const isOwner = isAuthenticated && false; // owner check via backend not applicable with mock data

  const handleRequest = async () => {
    try {
      await sendRequest.mutateAsync(BigInt(book.id));
      toast.success("Request sent!", {
        description: `Your request for "${book.title}" has been sent to ${book.ownerName}.`,
      });
    } catch {
      toast.error("Couldn't send request", {
        description: "Please try again in a moment.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back navigation */}
      <Link to="/community">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 mb-6 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="book-detail-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Community Library
        </Button>
      </Link>

      <div className="grid md:grid-cols-[220px_1fr] gap-8 lg:gap-10">
        {/* Cover column */}
        <div className="space-y-4">
          <div className="aspect-[2/3] rounded-xl overflow-hidden bg-muted shadow-warm-md border border-border">
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover transition-smooth hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <BookOpen className="w-16 h-16 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">No cover</span>
              </div>
            )}
          </div>

          {/* Availability pill */}
          <div
            className={`rounded-lg p-3 text-center border ${
              isAvailable
                ? "bg-secondary border-border"
                : "bg-muted border-border"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                isAvailable
                  ? "text-secondary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {isAvailable
                ? "✓ Available to borrow"
                : "✗ Currently unavailable"}
            </p>
          </div>

          {/* CTA area */}
          {isAuthenticated ? (
            <>
              {isOwner ? (
                <div className="text-center rounded-lg bg-muted border border-border px-3 py-3">
                  <p className="text-xs text-muted-foreground">
                    This is your book
                  </p>
                </div>
              ) : isAvailable ? (
                <>
                  {requestsLoading ? (
                    <Skeleton className="h-9 w-full rounded-md" />
                  ) : existingRequest?.status === "pending" ? (
                    <div
                      className="rounded-lg border border-border bg-primary px-3 py-2.5 text-center"
                      data-ocid="book-detail-request-pending"
                    >
                      <p className="text-sm font-medium text-primary-foreground">
                        ⏳ Request pending
                      </p>
                      <p className="text-xs text-primary-foreground mt-0.5">
                        Waiting for {book.ownerName} to respond
                      </p>
                    </div>
                  ) : existingRequest?.status === "accepted" ? (
                    <div
                      className="space-y-2"
                      data-ocid="book-detail-request-accepted"
                    >
                      <div className="rounded-lg border border-border bg-secondary px-3 py-2.5 text-center">
                        <p className="text-sm font-medium text-secondary-foreground">
                          ✓ Request accepted!
                        </p>
                      </div>
                      <Link to="/messages">
                        <Button
                          className="w-full gap-1.5"
                          data-ocid="book-detail-go-to-chat"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Go to chat
                        </Button>
                      </Link>
                    </div>
                  ) : existingRequest?.status === "declined" ? (
                    <div className="rounded-lg border border-border bg-destructive px-3 py-2.5 text-center">
                      <p className="text-sm font-medium text-destructive-foreground">
                        Request declined
                      </p>
                      <p className="text-xs text-destructive-foreground mt-0.5">
                        The owner has declined your request
                      </p>
                    </div>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={handleRequest}
                      disabled={sendRequest.isPending}
                      data-ocid="book-detail-request-btn"
                    >
                      {sendRequest.isPending ? "Sending…" : "Request This Book"}
                    </Button>
                  )}
                </>
              ) : (
                <div className="text-center rounded-lg bg-muted border border-border px-3 py-3">
                  <p className="text-xs text-muted-foreground">
                    This book is currently unavailable
                  </p>
                </div>
              )}
            </>
          ) : isAvailable ? (
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              <Link
                to="/signin"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>{" "}
              to request this book from {book.ownerName}
            </p>
          ) : null}
        </div>

        {/* Details column */}
        <div className="space-y-6">
          {/* Title + Author */}
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground leading-tight mb-1.5">
              {book.title}
            </h1>
            <p className="text-lg text-muted-foreground">{book.author}</p>
          </div>

          {/* Genre + Condition badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {book.genre}
            </Badge>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border font-medium ${CONDITION_COLORS[book.condition]}`}
            >
              Condition: {CONDITION_LABELS[book.condition]}
            </span>
          </div>

          {/* Description */}
          {book.description && (
            <div className="bg-muted rounded-lg border border-border p-4">
              <h2 className="font-display font-semibold text-foreground text-sm mb-2">
                About this book
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>
          )}

          {/* Owner card */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-warm-sm">
            <h2 className="font-display font-semibold text-foreground text-sm mb-3">
              Listed by
            </h2>
            <Link
              to="/user/$id"
              params={{ id: book.ownerId }}
              className="block group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 group-hover:bg-secondary transition-colors">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {book.ownerName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Community member · view profile →
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Listed date placeholder */}
          <p className="text-xs text-muted-foreground">
            Added to the community library
          </p>
        </div>
      </div>
    </div>
  );
}
