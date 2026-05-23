import type { ExternalBlob } from "../backend";

// ── Enums (matching backend variants) ─────────────────────────────────────────

export type BookCondition = "new_" | "good" | "fair" | "poor";
export type AvailabilityStatus = "available" | "unavailable";
export type RequestStatus = "pending" | "accepted" | "declined";

// ── Core domain types ──────────────────────────────────────────────────────────

export interface UserProfile {
  name: string;
  bio?: string;
  location?: string;
  joinedAt: bigint;
}

export interface Book {
  id: bigint;
  title: string;
  author: string;
  genre: string;
  condition: BookCondition;
  coverImage?: ExternalBlob;
  availability: AvailabilityStatus;
  ownerId: string;
  ownerName?: string;
  description?: string;
  createdAt: bigint;
}

export interface BookRequest {
  id: bigint;
  bookId: bigint;
  bookTitle: string;
  requesterId: string;
  requesterName?: string;
  ownerId: string;
  ownerName?: string;
  status: RequestStatus;
  createdAt: bigint;
}

export interface ChatThread {
  id: bigint;
  bookId: bigint;
  bookTitle: string;
  requestId: bigint;
  participantA: string;
  participantB: string;
  otherUserName?: string;
  lastMessage?: string;
  lastMessageAt?: bigint;
  unreadCount?: number;
}

export interface Message {
  id: bigint;
  threadId: bigint;
  senderId: string;
  senderName?: string;
  content: string;
  sentAt: bigint;
}

// ── UI / mock-only helpers ─────────────────────────────────────────────────────

export interface MockBook {
  id: number;
  title: string;
  author: string;
  genre: string;
  condition: BookCondition;
  coverUrl: string;
  availability: AvailabilityStatus;
  ownerName: string;
  ownerId: string;
  description: string;
}

export const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Self-Help",
  "Science",
  "Philosophy",
  "Children",
  "Young Adult",
  "Poetry",
  "Other",
] as const;

export type Genre = (typeof GENRES)[number];

export const CONDITION_LABELS: Record<BookCondition, string> = {
  new_: "Like New",
  good: "Good",
  fair: "Fair",
  poor: "Poor",
};

export const CONDITION_COLORS: Record<BookCondition, string> = {
  new_: "bg-secondary/20 text-secondary-foreground border-secondary/40",
  good: "bg-primary/15 text-foreground border-primary/30",
  fair: "bg-accent/15 text-foreground border-accent/30",
  poor: "bg-destructive/10 text-foreground border-destructive/30",
};
