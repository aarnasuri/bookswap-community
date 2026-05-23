import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, ImagePlus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Book as BackendBook } from "../backend.d";
import { BookCard } from "../components/BookCard";
import {
  BookSearchModal,
  type GoogleBookSelection,
} from "../components/BookSearchModal";
import { EmptyState } from "../components/EmptyState";
import {
  MOCK_BOOKS,
  useAddBook,
  useDeleteBook,
  useEditBook,
  useMyBooks,
  useSetBookAvailability,
} from "../hooks/useBooks";
import { useCurrentUser } from "../hooks/useCurrentUser";
import {
  type BookCondition,
  CONDITION_LABELS,
  GENRES,
  type MockBook,
} from "../types";

// ── Book form state type ───────────────────────────────────────────────────────

interface BookFormState {
  title: string;
  author: string;
  genre: string;
  condition: BookCondition;
  description: string;
  availability: boolean;
  coverFile: File | null;
  coverPreview: string;
  coverUrl: string; // URL from Google Books (not an uploaded file)
}

const DEFAULT_FORM: BookFormState = {
  title: "",
  author: "",
  genre: "Fiction",
  condition: "good",
  description: "",
  availability: true,
  coverFile: null,
  coverPreview: "",
  coverUrl: "",
};

// ── Book Form Dialog ───────────────────────────────────────────────────────────

interface BookFormDialogProps {
  open: boolean;
  onClose: () => void;
  initial?: MockBook | null;
  prefill?: GoogleBookSelection | null;
  onSubmit: (data: BookFormState) => void;
  isPending: boolean;
}

function BookFormDialog({
  open,
  onClose,
  initial,
  prefill,
  onSubmit,
  isPending,
}: BookFormDialogProps) {
  const [form, setForm] = useState<BookFormState>(DEFAULT_FORM);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!initial;

  useEffect(() => {
    if (open) {
      if (initial) {
        setForm({
          title: initial.title,
          author: initial.author,
          genre: initial.genre,
          condition: initial.condition,
          description: initial.description ?? "",
          availability: initial.availability === "available",
          coverFile: null,
          coverPreview: initial.coverUrl ?? "",
          coverUrl: "",
        });
      } else if (prefill) {
        setForm({
          ...DEFAULT_FORM,
          title: prefill.title,
          author: prefill.author,
          description: prefill.description ?? "",
          coverPreview: prefill.coverUrl,
          coverUrl: prefill.coverUrl,
        });
      } else {
        setForm(DEFAULT_FORM);
      }
    }
  }, [open, initial, prefill]);

  function set<K extends keyof BookFormState>(key: K, value: BookFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    set("coverFile", file);
    set("coverPreview", url);
    set("coverUrl", ""); // clear URL-based cover when user uploads
  }

  function removeCover() {
    set("coverFile", null);
    set("coverPreview", "");
    set("coverUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const canSubmit = form.title.trim() && form.author.trim() && form.genre;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {isEdit ? "Edit Book" : "Add a Book"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Cover image */}
          <div className="flex gap-4 items-start">
            <div className="relative shrink-0">
              <div className="w-20 h-28 rounded-md overflow-hidden bg-muted border border-border flex items-center justify-center">
                {form.coverPreview ? (
                  <img
                    src={form.coverPreview}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BookOpen className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              {form.coverPreview && (
                <button
                  type="button"
                  onClick={removeCover}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Remove cover"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="flex-1 space-y-1.5">
              <Label className="text-sm font-medium">Cover Image</Label>
              {form.coverUrl && !form.coverFile ? (
                <p className="text-xs text-secondary-foreground bg-secondary px-2 py-1 rounded-md border border-border">
                  Filled from Google Books
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Upload a photo of your book cover (optional)
                </p>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={() => fileInputRef.current?.click()}
                data-ocid="cover-upload-btn"
              >
                <ImagePlus className="w-3.5 h-3.5" />
                {form.coverPreview ? "Change Cover" : "Upload Cover"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverChange}
                data-ocid="cover-file-input"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="book-title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="book-title"
              placeholder="e.g. The Midnight Library"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              data-ocid="book-title-input"
            />
          </div>

          {/* Author */}
          <div className="space-y-1.5">
            <Label htmlFor="book-author">
              Author <span className="text-destructive">*</span>
            </Label>
            <Input
              id="book-author"
              placeholder="e.g. Matt Haig"
              value={form.author}
              onChange={(e) => set("author", e.target.value)}
              data-ocid="book-author-input"
            />
          </div>

          {/* Genre + Condition row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="book-genre">Genre</Label>
              <Select value={form.genre} onValueChange={(v) => set("genre", v)}>
                <SelectTrigger id="book-genre" data-ocid="book-genre-select">
                  <SelectValue placeholder="Pick genre" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="book-condition">Condition</Label>
              <Select
                value={form.condition}
                onValueChange={(v) => set("condition", v as BookCondition)}
              >
                <SelectTrigger
                  id="book-condition"
                  data-ocid="book-condition-select"
                >
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  {(
                    Object.entries(CONDITION_LABELS) as [
                      BookCondition,
                      string,
                    ][]
                  ).map(([k, label]) => (
                    <SelectItem key={k} value={k}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="book-desc">Description</Label>
            <Textarea
              id="book-desc"
              placeholder="A short note about this book…"
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="resize-none"
              data-ocid="book-description-input"
            />
          </div>

          {/* Availability toggle */}
          <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted border border-border">
            <div>
              <p className="text-sm font-medium text-foreground">
                Available for sharing
              </p>
              <p className="text-xs text-muted-foreground">
                Others can request this book
              </p>
            </div>
            <Switch
              checked={form.availability}
              onCheckedChange={(v) => set("availability", v)}
              data-ocid="book-availability-toggle"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => onSubmit(form)}
              disabled={!canSubmit || isPending}
              data-ocid="book-form-submit-btn"
            >
              {isPending
                ? isEdit
                  ? "Saving…"
                  : "Adding…"
                : isEdit
                  ? "Save Changes"
                  : "Add Book"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── My Library page ────────────────────────────────────────────────────────────

export default function MyLibraryPage() {
  const navigate = useNavigate();
  const { isLoggedIn, isLoadingProfile } = useCurrentUser();

  // Redirect if unauthenticated
  useEffect(() => {
    if (!isLoadingProfile && !isLoggedIn) {
      navigate({ to: "/" });
    }
  }, [isLoggedIn, isLoadingProfile, navigate]);

  // Backend hooks
  const { data: backendBooks, isLoading, isError } = useMyBooks();
  const addBook = useAddBook();
  const editBook = useEditBook();
  const deleteBook = useDeleteBook();
  const setAvailability = useSetBookAvailability();

  // Determine books to display: use backend data when available, fallback to mock
  const myMockBooks = MOCK_BOOKS.filter((b) => b.ownerId === "mock-user-1");
  const booksArray = backendBooks as BackendBook[] | undefined;
  const books: MockBook[] =
    booksArray && booksArray.length > 0
      ? booksArray.map((b) => ({
          id: Number(b.id),
          title: b.title,
          author: b.author,
          genre: b.genre,
          condition: b.condition as BookCondition,
          coverUrl: "",
          availability: (b.availability === "available"
            ? "available"
            : "unavailable") as "available" | "unavailable",
          ownerName: "You",
          ownerId: "mock-user-1",
          description: "",
        }))
      : myMockBooks;

  // Dialog state
  const [searchOpen, setSearchOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [prefillData, setPrefillData] = useState<GoogleBookSelection | null>(
    null,
  );
  const [editTarget, setEditTarget] = useState<MockBook | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MockBook | null>(null);

  // Local availability overrides (for mock mode)
  const [localAvail, setLocalAvail] = useState<
    Record<number, "available" | "unavailable">
  >({});

  function resolvedBooks(): MockBook[] {
    return books.map((b) => ({
      ...b,
      availability: localAvail[b.id] ?? b.availability,
    }));
  }

  // ── Flow: open search first, then form ───────────────────────────────────────

  function openAddFlow() {
    setSearchOpen(true);
  }

  function handleBookSelected(selection: GoogleBookSelection) {
    setPrefillData(selection);
    setSearchOpen(false);
    setAddOpen(true);
  }

  function handleAddManually() {
    setPrefillData(null);
    setAddOpen(true);
  }

  function handleAddDialogClose() {
    setAddOpen(false);
    setPrefillData(null);
  }

  // ── Handlers ─────────────────────────────────────────────────────────────────

  function handleAddSubmit(data: BookFormState) {
    addBook.mutate(
      {
        title: data.title.trim(),
        author: data.author.trim(),
        genre: data.genre,
        condition: data.condition,
        description: data.description.trim() || undefined,
        coverImage: data.coverFile ?? undefined,
        coverUrl: data.coverUrl || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Book added to your library!");
          handleAddDialogClose();
        },
        onError: () => toast.error("Failed to add book. Please try again."),
      },
    );
  }

  function handleEditSubmit(data: BookFormState) {
    if (!editTarget) return;
    editBook.mutate(
      {
        id: BigInt(editTarget.id),
        title: data.title.trim(),
        author: data.author.trim(),
        genre: data.genre,
        condition: data.condition,
        description: data.description.trim() || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Book updated!");
          setEditTarget(null);
        },
        onError: () => toast.error("Failed to update book."),
      },
    );
  }

  function handleToggleAvailability(book: MockBook) {
    const current = localAvail[book.id] ?? book.availability;
    const next = current === "available" ? "unavailable" : "available";

    setLocalAvail((prev) => ({ ...prev, [book.id]: next }));

    setAvailability.mutate(
      { bookId: BigInt(book.id), status: next },
      {
        onSuccess: () =>
          toast.success(
            next === "available"
              ? "Book is now available!"
              : "Book marked as taken.",
          ),
        onError: () => {
          setLocalAvail((prev) => ({ ...prev, [book.id]: current }));
          toast.error("Failed to update availability.");
        },
      },
    );
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    deleteBook.mutate(BigInt(deleteTarget.id), {
      onSuccess: () => {
        toast.success(`"${deleteTarget.title}" removed from your library.`);
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to delete book."),
    });
  }

  // ── Loading/auth guard ────────────────────────────────────────────────────────

  if (isLoadingProfile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {["a", "b", "c", "d", "e"].map((k) => (
            <div
              key={k}
              className="rounded-lg overflow-hidden border border-border"
            >
              <Skeleton className="aspect-[2/3] w-full" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const displayBooks = resolvedBooks();
  const availableCount = displayBooks.filter(
    (b) => b.availability === "available",
  ).length;
  const takenCount = displayBooks.filter(
    (b) => b.availability === "unavailable",
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            My Library
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Books you've listed for sharing with the community
          </p>
        </div>
        <Button
          className="gap-2 shrink-0"
          size="sm"
          onClick={openAddFlow}
          data-ocid="my-library-add-btn"
        >
          <Plus className="w-4 h-4" />
          Add a Book
        </Button>
      </div>

      {/* Stats bar */}
      {displayBooks.length > 0 && (
        <div className="flex flex-wrap gap-6 mb-6 px-5 py-4 bg-card rounded-xl border border-border shadow-warm-sm">
          <Stat value={displayBooks.length} label="Total Books" />
          <div className="w-px bg-border self-stretch" />
          <Stat
            value={availableCount}
            label="Available"
            badge={
              <Badge
                variant="outline"
                className="text-xs bg-secondary border-border text-secondary-foreground"
              >
                Free
              </Badge>
            }
          />
          <div className="w-px bg-border self-stretch" />
          <Stat
            value={takenCount}
            label="Borrowed Out"
            badge={
              <Badge
                variant="outline"
                className="text-xs bg-muted text-muted-foreground"
              >
                Taken
              </Badge>
            }
          />
        </div>
      )}

      {/* Loading from backend */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {["a", "b", "c", "d"].map((k) => (
            <div
              key={k}
              className="rounded-lg overflow-hidden border border-border"
            >
              <Skeleton className="aspect-[2/3] w-full" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && !isLoading && (
        <div className="py-10 text-center">
          <p className="text-sm text-destructive">
            Couldn't load your books. Please refresh the page.
          </p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && displayBooks.length === 0 && (
        <EmptyState
          icon={<BookOpen className="w-8 h-8" />}
          title="Your shelf is empty"
          description="Start by adding books you'd like to share with your community."
          action={{
            label: "Add Your First Book",
            onClick: openAddFlow,
          }}
        />
      )}

      {/* Book grid */}
      {!isLoading && displayBooks.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {displayBooks.map((book) => (
            <OwnerBookCard
              key={book.id}
              book={book}
              onEdit={() => setEditTarget(book)}
              onToggleAvailability={() => handleToggleAvailability(book)}
              onDelete={() => setDeleteTarget(book)}
            />
          ))}
        </div>
      )}

      {/* Google Books search modal */}
      <BookSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectBook={handleBookSelected}
        onAddManually={handleAddManually}
      />

      {/* Add Book form dialog */}
      <BookFormDialog
        open={addOpen}
        onClose={handleAddDialogClose}
        prefill={prefillData}
        onSubmit={handleAddSubmit}
        isPending={addBook.isPending}
      />

      {/* Edit Book dialog */}
      <BookFormDialog
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        initial={editTarget}
        onSubmit={handleEditSubmit}
        isPending={editBook.isPending}
      />

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Remove this book?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <strong>"{deleteTarget?.title}"</strong> will be removed from your
              library and the community won't be able to find or request it
              anymore. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="delete-cancel-btn">
              Keep it
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-accent"
              data-ocid="delete-confirm-btn"
            >
              {deleteBook.isPending ? "Removing…" : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ── Helper sub-components ──────────────────────────────────────────────────────

function Stat({
  value,
  label,
  badge,
}: {
  value: number;
  label: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-2xl font-display font-semibold text-foreground">
        {value}
      </p>
      <div>
        <p className="text-xs text-muted-foreground leading-tight">{label}</p>
        {badge}
      </div>
    </div>
  );
}

// Owner-specific card with inline availability toggle and action buttons
interface OwnerBookCardProps {
  book: MockBook;
  onEdit: () => void;
  onToggleAvailability: () => void;
  onDelete: () => void;
}

function OwnerBookCard({
  book,
  onEdit,
  onToggleAvailability,
  onDelete,
}: OwnerBookCardProps) {
  return (
    <BookCard
      book={book}
      showOwner={false}
      isOwner
      onEdit={onEdit}
      onToggleAvailability={onToggleAvailability}
      onDelete={onDelete}
    />
  );
}

// Re-export BookFormState for external use
export type { BookFormState };
