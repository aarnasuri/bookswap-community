import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { BookWithOwner } from "../backend.d";
import { BookCard } from "../components/BookCard";
import { MOCK_BOOKS, useAllAvailableBooks } from "../hooks/useBooks";
import { GENRES } from "../types";
import type { AvailabilityStatus, MockBook } from "../types";

function BookCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card shadow-warm-sm">
      <Skeleton className="aspect-[2/3] w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-1.5 pt-1">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Normalize a backend BookWithOwner to MockBook shape for display
function bookToMock(b: BookWithOwner): MockBook {
  return {
    id: Number(b.book.id),
    title: b.book.title,
    author: b.book.author,
    genre: b.book.genre,
    condition: b.book.condition as MockBook["condition"],
    coverUrl: b.book.coverImage ? b.book.coverImage.getDirectURL() : "",
    availability: b.book.availability as MockBook["availability"],
    ownerName: b.ownerName ?? "Community Member",
    ownerId: b.book.owner.toString(),
    description: "",
  };
}

export default function CommunityPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState<string>("all");
  const [availability, setAvailability] = useState<AvailabilityStatus | "all">(
    "all",
  );

  const { data: backendBooks, isLoading } = useAllAvailableBooks();

  // Merge mock books + real backend books (deduplicate by id)
  const allBooks = useMemo<MockBook[]>(() => {
    const backendMocked = (backendBooks ?? []).map(bookToMock);
    const backendIds = new Set(backendMocked.map((b) => b.id));
    const mockOnly = MOCK_BOOKS.filter((b) => !backendIds.has(b.id));
    return [...backendMocked, ...mockOnly];
  }, [backendBooks]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allBooks.filter((book) => {
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.ownerName.toLowerCase().includes(q);
      const matchesGenre = genre === "all" || book.genre === genre;
      const matchesAvail =
        availability === "all" || book.availability === availability;
      return matchesSearch && matchesGenre && matchesAvail;
    });
  }, [allBooks, search, genre, availability]);

  const hasFilters = search || genre !== "all" || availability !== "all";

  const clearFilters = () => {
    setSearch("");
    setGenre("all");
    setAvailability("all");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
          Community Library
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {allBooks.length} books shared by your community — all free to borrow
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by title, author, or owner…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="community-search-input"
          />
        </div>

        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger
            className="w-full sm:w-40"
            data-ocid="community-genre-filter"
          >
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {GENRES.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={availability}
          onValueChange={(v) =>
            setAvailability(v as AvailabilityStatus | "all")
          }
        >
          <SelectTrigger
            className="w-full sm:w-40"
            data-ocid="community-availability-filter"
          >
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Books</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="unavailable">Already Taken</SelectItem>
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearFilters}
            aria-label="Clear all filters"
            data-ocid="community-clear-filters"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {search && (
            <Badge variant="secondary" className="gap-1 text-xs">
              "{search}"
              <button
                type="button"
                onClick={() => setSearch("")}
                className="hover:opacity-70 ml-0.5"
                aria-label="Remove search filter"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {genre !== "all" && (
            <Badge variant="secondary" className="gap-1 text-xs">
              {genre}
              <button
                type="button"
                onClick={() => setGenre("all")}
                className="hover:opacity-70 ml-0.5"
                aria-label="Remove genre filter"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {availability !== "all" && (
            <Badge variant="secondary" className="gap-1 text-xs">
              {availability === "available" ? "Available" : "Already Taken"}
              <button
                type="button"
                onClick={() => setAvailability("all")}
                className="hover:opacity-70 ml-0.5"
                aria-label="Remove availability filter"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Results count */}
      <p className="text-xs text-muted-foreground mb-4">
        {isLoading
          ? "Loading books…"
          : `Showing ${filtered.length} ${filtered.length === 1 ? "book" : "books"}${hasFilters ? " matching your filters" : ""}`}
      </p>

      {/* Loading skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"].map(
            (k) => (
              <BookCardSkeleton key={k} />
            ),
          )}
        </div>
      ) : filtered.length === 0 ? (
        /* Empty state */
        <div
          className="flex flex-col items-center gap-4 py-16 text-center"
          data-ocid="community-empty-state"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <SlidersHorizontal className="w-7 h-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-display font-semibold text-foreground">
              No books found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {hasFilters
                ? "Try adjusting your search or removing some filters"
                : "The community library is empty — be the first to add a book!"}
            </p>
          </div>
          {hasFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              data-ocid="community-no-results-clear"
            >
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        /* Book grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((book: MockBook) => (
            <BookCard
              key={`${book.ownerId}-${book.id}`}
              book={book}
              showOwner
            />
          ))}
        </div>
      )}

      {/* Community invite callout */}
      {!isLoading && allBooks.length > 0 && !hasFilters && (
        <div className="mt-10 rounded-xl bg-secondary border border-border px-5 py-4 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <BookOpen className="w-7 h-7 text-secondary-foreground flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-secondary-foreground">
              Have books gathering dust?
            </p>
            <p className="text-xs text-secondary-foreground mt-0.5">
              Add them to the community library and share the love of reading.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="flex-shrink-0 border-border text-foreground hover:bg-primary hover:text-primary-foreground"
            onClick={() => navigate({ to: "/library" })}
            data-ocid="community-add-book-cta"
          >
            Add a book
          </Button>
        </div>
      )}
    </div>
  );
}
