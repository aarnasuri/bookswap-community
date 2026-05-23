import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, BookOpen, Search } from "lucide-react";
import { useRef, useState } from "react";
import type { GoogleBookResult } from "../backend.d";
import { useSearchGoogleBooks } from "../hooks/useBooks";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface GoogleBookSelection {
  title: string;
  author: string;
  coverUrl: string;
  publisher?: string;
  publishedYear?: string;
  printType?: string;
  description?: string;
}

interface BookSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelectBook: (book: GoogleBookSelection) => void;
  onAddManually: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function BookSearchModal({
  open,
  onClose,
  onSelectBook,
  onAddManually,
}: BookSearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const searchMutation = useSearchGoogleBooks();

  const results = searchMutation.data ?? [];
  const hasSearched = searchMutation.isSuccess || searchMutation.isError;

  function handleSearch() {
    if (!query.trim()) return;
    searchMutation.mutate(query.trim());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
  }

  function handleSelect(result: GoogleBookResult) {
    onSelectBook({
      title: result.title,
      author: result.authors.join(", "),
      coverUrl: result.thumbnail,
      publisher: result.publisher || undefined,
      publishedYear: result.publishedDate
        ? result.publishedDate.slice(0, 4)
        : undefined,
      printType: result.printType || undefined,
      description: result.description || undefined,
    });
  }

  function handleOpenChange(v: boolean) {
    if (!v) {
      onClose();
      searchMutation.reset();
      setQuery("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl max-h-[85vh] flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border shrink-0">
          <DialogTitle className="font-display text-xl">
            Find a Book
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-0.5">
            Search Google Books to auto-fill book details
          </p>
        </DialogHeader>

        {/* Search bar */}
        <div className="px-6 py-4 border-b border-border shrink-0">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              placeholder="Search by title, author, or ISBN…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              data-ocid="google-book-search-input"
              autoFocus
            />
            <Button
              onClick={handleSearch}
              disabled={!query.trim() || searchMutation.isPending}
              className="gap-1.5 shrink-0"
              data-ocid="google-book-search-btn"
            >
              <Search className="w-4 h-4" />
              {searchMutation.isPending ? "Searching…" : "Search"}
            </Button>
          </div>
        </div>

        {/* Results area — scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Loading skeletons */}
          {searchMutation.isPending && (
            <div className="px-6 py-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 items-start">
                  <Skeleton className="w-12 h-16 rounded shrink-0" />
                  <div className="flex-1 space-y-2 pt-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {searchMutation.isError && (
            <div className="px-6 py-8 flex flex-col items-center gap-2 text-center">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <p className="text-sm text-destructive font-medium">
                Could not search books. Try again.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-1"
                onClick={() => searchMutation.mutate(query.trim())}
              >
                Retry
              </Button>
            </div>
          )}

          {/* Empty results */}
          {!searchMutation.isPending &&
            searchMutation.isSuccess &&
            results.length === 0 && (
              <div className="px-6 py-8 flex flex-col items-center gap-2 text-center">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No books found. Try a different search or add manually.
                </p>
              </div>
            )}

          {/* Result cards */}
          {!searchMutation.isPending && results.length > 0 && (
            <ul className="px-4 py-3 space-y-1">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    type="button"
                    className="w-full flex gap-3 items-start p-3 rounded-xl hover:bg-muted transition-colors text-left group"
                    onClick={() => handleSelect(result)}
                    data-ocid={`google-book-result-${result.id}`}
                  >
                    {/* Cover thumbnail */}
                    <div className="w-12 h-16 shrink-0 rounded overflow-hidden bg-muted border border-border">
                      {result.thumbnail ? (
                        <img
                          src={result.thumbnail}
                          alt={`Cover for ${result.title}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {result.title}
                      </p>
                      {result.authors.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {result.authors.join(", ")}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-x-2 gap-y-0.5 pt-0.5">
                        {result.publisher && (
                          <span className="text-xs text-muted-foreground">
                            {result.publisher}
                          </span>
                        )}
                        {result.publishedDate && (
                          <span className="text-xs text-muted-foreground">
                            {result.publishedDate.slice(0, 4)}
                          </span>
                        )}
                        {result.printType && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground font-medium border border-border">
                            {result.printType === "BOOK"
                              ? "Print"
                              : result.printType === "MAGAZINE"
                                ? "Magazine"
                                : result.printType}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Initial idle state */}
          {!searchMutation.isPending && !hasSearched && (
            <div className="px-6 py-10 text-center">
              <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Search for a book above to find the exact edition.
              </p>
            </div>
          )}
        </div>

        {/* Footer — add manually CTA */}
        <div className="px-6 py-4 border-t border-border shrink-0 bg-muted flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Can't find the right edition?
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onAddManually();
              handleOpenChange(false);
            }}
            data-ocid="add-manually-btn"
          >
            Book not found? Add manually
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
