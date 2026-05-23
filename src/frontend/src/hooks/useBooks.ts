import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob, createActor } from "../backend";
import type {
  Book as BackendBook,
  BookWithOwner,
  GoogleBookResult,
} from "../backend.d";
import type { AvailabilityStatus, BookCondition, MockBook } from "../types";
import { useAuth } from "./useAuth";

// ── Mock data for immediate liveliness ────────────────────────────────────────

export const MOCK_BOOKS: MockBook[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    condition: "good",
    coverUrl: "https://covers.openlibrary.org/b/id/10909258-L.jpg",
    availability: "available",
    ownerName: "Sophie Andersson",
    ownerId: "mock-user-1",
    description:
      "Between life and death there is a library with infinite books — each representing a different life you could have lived.",
  },
  {
    id: 2,
    title: "Educated",
    author: "Tara Westover",
    genre: "Biography",
    condition: "good",
    coverUrl: "https://covers.openlibrary.org/b/id/8739161-L.jpg",
    availability: "available",
    ownerName: "Marcus Chen",
    ownerId: "mock-user-2",
    description:
      "A memoir about a woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    condition: "new_",
    coverUrl: "https://covers.openlibrary.org/b/id/12278169-L.jpg",
    availability: "available",
    ownerName: "Lena Müller",
    ownerId: "mock-user-3",
    description:
      "A lone astronaut must save the earth from disaster in this race-against-time sci-fi adventure.",
  },
  {
    id: 4,
    title: "Piranesi",
    author: "Susanna Clarke",
    genre: "Fantasy",
    condition: "fair",
    coverUrl: "https://covers.openlibrary.org/b/id/10386513-L.jpg",
    availability: "available",
    ownerName: "Tom Rivera",
    ownerId: "mock-user-4",
    description:
      "Piranesi's house is no ordinary building: its halls are infinite, its corridors great, its statues alive.",
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    condition: "good",
    coverUrl: "https://covers.openlibrary.org/b/id/10601616-L.jpg",
    availability: "available",
    ownerName: "Amara Okafor",
    ownerId: "mock-user-5",
    description:
      "Tiny changes, remarkable results — an easy and proven way to build good habits and break bad ones.",
  },
  {
    id: 6,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    genre: "Science Fiction",
    condition: "new_",
    coverUrl: "https://covers.openlibrary.org/b/id/10943901-L.jpg",
    availability: "available",
    ownerName: "Sophie Andersson",
    ownerId: "mock-user-1",
    description:
      "A moving novel from the Nobel laureate, told from the perspective of an Artificial Friend.",
  },
  {
    id: 7,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    genre: "Fiction",
    condition: "fair",
    coverUrl: "https://covers.openlibrary.org/b/id/8231632-L.jpg",
    availability: "unavailable",
    ownerName: "Marcus Chen",
    ownerId: "mock-user-2",
    description:
      "Greece in the age of heroes. A reimagining of the legendary Trojan War through the friendship of Achilles and Patroclus.",
  },
  {
    id: 8,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    condition: "good",
    coverUrl: "https://covers.openlibrary.org/b/id/8739178-L.jpg",
    availability: "available",
    ownerName: "Lena Müller",
    ownerId: "mock-user-3",
    description:
      "A brief history of humankind — from the Stone Age to the political revolutions of the modern era.",
  },
];

// ── Backend hooks ─────────────────────────────────────────────────────────────

export function useAllAvailableBooks() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<BookWithOwner[]>({
    queryKey: ["allAvailableBooks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAvailableBooks();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useMyBooks() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { sessionToken } = useAuth();

  return useQuery<BackendBook[]>({
    queryKey: ["myBooks", sessionToken],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      return actor.getMyBooks(sessionToken);
    },
    enabled: !!actor && !actorFetching && !!sessionToken,
  });
}

export function useBookDetail(bookId: string | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<BookWithOwner | null>({
    queryKey: ["bookDetail", bookId],
    queryFn: async () => {
      if (!actor || !bookId) return null;
      return actor.getBookDetail(BigInt(bookId));
    },
    enabled: !!actor && !actorFetching && !!bookId,
  });
}

export function useSearchGoogleBooks() {
  const { actor } = useActor(createActor);

  return useMutation<GoogleBookResult[], Error, string>({
    mutationFn: async (query: string) => {
      if (!actor) throw new Error("Service unavailable");
      const result = await actor.searchGoogleBooks(query);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
  });
}

export function useAddBook() {
  const { actor } = useActor(createActor);
  const { sessionToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (book: {
      title: string;
      author: string;
      genre: string;
      condition: BookCondition;
      description?: string;
      coverImage?: File;
      coverUrl?: string;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not authenticated");

      // Build ExternalBlob from URL or File
      let coverBlob: ExternalBlob | undefined;
      if (book.coverImage) {
        const bytes = new Uint8Array(await book.coverImage.arrayBuffer());
        coverBlob = ExternalBlob.fromBytes(bytes);
      } else if (book.coverUrl) {
        coverBlob = ExternalBlob.fromURL(book.coverUrl);
      }

      return actor.addBook(sessionToken, {
        title: book.title,
        author: book.author,
        genre: book.genre,
        condition: book.condition as never,
        coverImage: coverBlob,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allAvailableBooks"] });
    },
  });
}

export function useEditBook() {
  const { actor } = useActor(createActor);
  const { sessionToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      title: string;
      author: string;
      genre: string;
      condition: BookCondition;
      description?: string;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not authenticated");
      return actor.editBook(sessionToken, params.id, {
        title: params.title,
        author: params.author,
        genre: params.genre,
        condition: params.condition as never,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allAvailableBooks"] });
    },
  });
}

export function useDeleteBook() {
  const { actor } = useActor(createActor);
  const { sessionToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookId: bigint) => {
      if (!actor || !sessionToken) throw new Error("Not authenticated");
      return actor.deleteBook(sessionToken, bookId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allAvailableBooks"] });
    },
  });
}

export function useSetBookAvailability() {
  const { actor } = useActor(createActor);
  const { sessionToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      bookId: bigint;
      status: AvailabilityStatus;
    }) => {
      if (!actor || !sessionToken) throw new Error("Not authenticated");
      return actor.setBookAvailability(
        sessionToken,
        params.bookId,
        params.status as never,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allAvailableBooks"] });
    },
  });
}
