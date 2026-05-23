import { O as useActor, Q as useQuery, u as useAuth, S as useQueryClient, T as useMutation, a4 as ExternalBlob, V as createActor } from "./index-D8jmrdk6.js";
const GENRES = [
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
  "Other"
];
const CONDITION_LABELS = {
  new_: "Like New",
  good: "Good",
  fair: "Fair",
  poor: "Poor"
};
const CONDITION_COLORS = {
  new_: "bg-secondary/20 text-secondary-foreground border-secondary/40",
  good: "bg-primary/15 text-foreground border-primary/30",
  fair: "bg-accent/15 text-foreground border-accent/30",
  poor: "bg-destructive/10 text-foreground border-destructive/30"
};
const MOCK_BOOKS = [
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
    description: "Between life and death there is a library with infinite books — each representing a different life you could have lived."
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
    description: "A memoir about a woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University."
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
    description: "A lone astronaut must save the earth from disaster in this race-against-time sci-fi adventure."
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
    description: "Piranesi's house is no ordinary building: its halls are infinite, its corridors great, its statues alive."
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
    description: "Tiny changes, remarkable results — an easy and proven way to build good habits and break bad ones."
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
    description: "A moving novel from the Nobel laureate, told from the perspective of an Artificial Friend."
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
    description: "Greece in the age of heroes. A reimagining of the legendary Trojan War through the friendship of Achilles and Patroclus."
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
    description: "A brief history of humankind — from the Stone Age to the political revolutions of the modern era."
  }
];
function useAllAvailableBooks() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["allAvailableBooks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAvailableBooks();
    },
    enabled: !!actor && !actorFetching
  });
}
function useMyBooks() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { sessionToken } = useAuth();
  return useQuery({
    queryKey: ["myBooks", sessionToken],
    queryFn: async () => {
      if (!actor || !sessionToken) return [];
      return actor.getMyBooks(sessionToken);
    },
    enabled: !!actor && !actorFetching && !!sessionToken
  });
}
function useSearchGoogleBooks() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (query) => {
      if (!actor) throw new Error("Service unavailable");
      const result = await actor.searchGoogleBooks(query);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    }
  });
}
function useAddBook() {
  const { actor } = useActor(createActor);
  const { sessionToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (book) => {
      if (!actor || !sessionToken) throw new Error("Not authenticated");
      let coverBlob;
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
        condition: book.condition,
        coverImage: coverBlob
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allAvailableBooks"] });
    }
  });
}
function useEditBook() {
  const { actor } = useActor(createActor);
  const { sessionToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor || !sessionToken) throw new Error("Not authenticated");
      return actor.editBook(sessionToken, params.id, {
        title: params.title,
        author: params.author,
        genre: params.genre,
        condition: params.condition
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allAvailableBooks"] });
    }
  });
}
function useDeleteBook() {
  const { actor } = useActor(createActor);
  const { sessionToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookId) => {
      if (!actor || !sessionToken) throw new Error("Not authenticated");
      return actor.deleteBook(sessionToken, bookId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allAvailableBooks"] });
    }
  });
}
function useSetBookAvailability() {
  const { actor } = useActor(createActor);
  const { sessionToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor || !sessionToken) throw new Error("Not authenticated");
      return actor.setBookAvailability(
        sessionToken,
        params.bookId,
        params.status
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allAvailableBooks"] });
    }
  });
}
export {
  CONDITION_LABELS as C,
  GENRES as G,
  MOCK_BOOKS as M,
  useSearchGoogleBooks as a,
  useMyBooks as b,
  useAddBook as c,
  useEditBook as d,
  useDeleteBook as e,
  useSetBookAvailability as f,
  CONDITION_COLORS as g,
  useAllAvailableBooks as u
};
