import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { BookOpen, User } from "lucide-react";
import type { MockBook } from "../types";
import { CONDITION_COLORS, CONDITION_LABELS } from "../types";

interface BookCardProps {
  book: MockBook;
  showOwner?: boolean;
  onRequest?: (book: MockBook) => void;
  isOwner?: boolean;
  onEdit?: (book: MockBook) => void;
  onToggleAvailability?: (book: MockBook) => void;
  onDelete?: (book: MockBook) => void;
}

export function BookCard({
  book,
  showOwner = true,
  onRequest,
  isOwner = false,
  onEdit,
  onToggleAvailability,
  onDelete,
}: BookCardProps) {
  const isAvailable = book.availability === "available";

  return (
    <article
      className="bg-card rounded-xl border border-border shadow-warm-sm hover:shadow-candlelit transition-smooth overflow-hidden flex flex-col group"
      data-ocid="book-card"
    >
      {/* Cover */}
      <Link
        to="/book/$id"
        params={{ id: String(book.id) }}
        className="block relative aspect-[2/3] overflow-hidden bg-muted"
      >
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`${book.title} cover`}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-secondary">
            <BookOpen className="w-10 h-10 text-secondary-foreground" />
            <span className="text-[10px] text-secondary-foreground font-display tracking-wide">
              No Cover
            </span>
          </div>
        )}

        {/* Availability badge overlay — parchment ribbon style */}
        <div className="absolute top-2 left-2">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold font-display tracking-wide border shadow-warm-sm ${
              isAvailable
                ? "bg-secondary text-secondary-foreground border-border"
                : "bg-muted text-muted-foreground border-border"
            }`}
          >
            {isAvailable ? "Available" : "Taken"}
          </span>
        </div>

        {/* Warm overlay on hover */}
        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-smooth pointer-events-none" />
      </Link>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        <div className="flex-1 min-w-0">
          <Link to="/book/$id" params={{ id: String(book.id) }}>
            <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 hover:text-primary transition-colors">
              {book.title}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5 truncate italic">
            {book.author}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            className="text-xs px-1.5 py-0 border-border text-foreground bg-secondary font-body"
          >
            {book.genre}
          </Badge>
          <span
            className={`inline-flex items-center px-1.5 py-0 rounded text-xs border ${CONDITION_COLORS[book.condition]}`}
          >
            {CONDITION_LABELS[book.condition]}
          </span>
        </div>

        {showOwner && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted rounded-md px-2 py-1">
            <User className="w-3 h-3 shrink-0 text-primary" />
            <span className="truncate">{book.ownerName}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-1.5 mt-auto pt-1">
          {isOwner ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-7 text-xs border-border hover:bg-secondary"
                onClick={() => onEdit?.(book)}
                data-ocid="book-card-edit-btn"
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-7 text-xs border-border hover:bg-secondary"
                onClick={() => onToggleAvailability?.(book)}
                data-ocid="book-card-availability-btn"
              >
                {isAvailable ? "Mark Taken" : "Mark Free"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive"
                onClick={() => onDelete?.(book)}
                data-ocid="book-card-delete-btn"
              >
                Remove
              </Button>
            </>
          ) : (
            isAvailable &&
            onRequest && (
              <Button
                size="sm"
                className="w-full h-7 text-xs shadow-warm-sm"
                onClick={() => onRequest(book)}
                data-ocid="book-card-request-btn"
              >
                Request Book
              </Button>
            )
          )}
        </div>
      </div>
    </article>
  );
}
