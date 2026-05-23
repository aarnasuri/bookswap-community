import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/book";
import ProfileTypes "../types/profile";
import Common "../types/common";

module {
  public type State = List.List<Types.BookInternal>;
  public type ProfileState = Map.Map<Common.UserId, ProfileTypes.ProfileInternal>;

  /// Convert internal book to shared book
  public func toPublic(self : Types.BookInternal) : Types.Book {
    {
      id = self.id;
      owner = self.owner;
      title = self.title;
      author = self.author;
      genre = self.genre;
      condition = self.condition;
      coverImage = self.coverImage;
      availability = self.availability;
      createdAt = self.createdAt;
    };
  };

  /// Add a book to the library
  public func addBook(
    state : State,
    nextId : Nat,
    owner : Common.UserId,
    input : Types.AddBookInput,
  ) : (Types.Book, Nat) {
    let internal : Types.BookInternal = {
      id = nextId;
      owner = owner;
      var title = input.title;
      var author = input.author;
      var genre = input.genre;
      var condition = input.condition;
      var coverImage = input.coverImage;
      var availability = #available;
      createdAt = Time.now();
    };
    state.add(internal);
    (toPublic(internal), nextId + 1);
  };

  /// Edit a book (owner only)
  public func editBook(
    state : State,
    bookId : Common.BookId,
    caller : Common.UserId,
    input : Types.EditBookInput,
  ) : ?Types.Book {
    switch (state.find(func(b : Types.BookInternal) : Bool { b.id == bookId })) {
      case null null;
      case (?book) {
        if (book.owner != caller) return null;
        book.title := input.title;
        book.author := input.author;
        book.genre := input.genre;
        book.condition := input.condition;
        book.coverImage := input.coverImage;
        ?toPublic(book);
      };
    };
  };

  /// Delete a book (owner only)
  public func deleteBook(
    state : State,
    bookId : Common.BookId,
    caller : Common.UserId,
  ) : Bool {
    switch (state.find(func(b : Types.BookInternal) : Bool { b.id == bookId })) {
      case null false;
      case (?book) {
        if (book.owner != caller) return false;
        let filtered = state.filter(func(b : Types.BookInternal) : Bool { b.id != bookId });
        state.clear();
        state.addAll(filtered.values());
        true;
      };
    };
  };

  /// Toggle availability of a book (owner only)
  public func setAvailability(
    state : State,
    bookId : Common.BookId,
    caller : Common.UserId,
    status : Types.AvailabilityStatus,
  ) : ?Types.Book {
    switch (state.find(func(b : Types.BookInternal) : Bool { b.id == bookId })) {
      case null null;
      case (?book) {
        if (book.owner != caller) return null;
        book.availability := status;
        ?toPublic(book);
      };
    };
  };

  /// Get all books owned by a specific user
  public func getBooksByOwner(
    state : State,
    owner : Common.UserId,
  ) : [Types.Book] {
    state.filter(func(b : Types.BookInternal) : Bool { b.owner == owner })
         .map<Types.BookInternal, Types.Book>(func(b) { toPublic(b) })
         .toArray();
  };

  /// Get a single book by id
  public func getBook(
    state : State,
    bookId : Common.BookId,
  ) : ?Types.Book {
    switch (state.find(func(b : Types.BookInternal) : Bool { b.id == bookId })) {
      case (?b) ?toPublic(b);
      case null null;
    };
  };

  /// Get all available books (community browser)
  public func getAllAvailableBooks(state : State) : [Types.Book] {
    state.filter(func(b : Types.BookInternal) : Bool { b.availability == #available })
         .map<Types.BookInternal, Types.Book>(func(b) { toPublic(b) })
         .toArray();
  };

  /// Search available books by title or author (case-insensitive partial match)
  public func searchBooks(
    state : State,
    searchTerm : Text,
  ) : [Types.Book] {
    let term = searchTerm.toLower();
    state.filter(func(b : Types.BookInternal) : Bool {
      b.availability == #available and
      (b.title.toLower().contains(#text term) or b.author.toLower().contains(#text term))
    })
    .map<Types.BookInternal, Types.Book>(func(b) { toPublic(b) })
    .toArray();
  };

  /// Get book with owner profile info
  public func getBookWithOwner(
    state : State,
    profileState : ProfileState,
    bookId : Common.BookId,
  ) : ?Types.BookWithOwner {
    switch (state.find(func(b : Types.BookInternal) : Bool { b.id == bookId })) {
      case null null;
      case (?book) {
        let ownerName = switch (profileState.get(book.owner)) {
          case (?p) p.name;
          case null "Unknown";
        };
        ?{ book = toPublic(book); ownerName = ownerName };
      };
    };
  };

  /// Get all available books with owner info
  public func getAllAvailableBooksWithOwner(
    state : State,
    profileState : ProfileState,
  ) : [Types.BookWithOwner] {
    state.filter(func(b : Types.BookInternal) : Bool { b.availability == #available })
         .map<Types.BookInternal, Types.BookWithOwner>(func(b) {
           let ownerName = switch (profileState.get(b.owner)) {
             case (?p) p.name;
             case null "Unknown";
           };
           { book = toPublic(b); ownerName = ownerName };
         })
         .toArray();
  };

  /// Seed sample books for demo data — returns updated nextId
  public func seedSampleBooks(
    state : State,
    nextId : Nat,
    users : [(Common.UserId, Text)],
  ) : Nat {
    // (ownerIndex, title, author, genre, condition, coverSeed)
    let samples : [(Nat, Text, Text, Text, Types.BookCondition)] = [
      // Alice's books
      (0, "The Night Circus",           "Erin Morgenstern",   "Fantasy",         #good),
      (0, "Pachinko",                   "Min Jin Lee",        "Historical",      #new_),
      (0, "Piranesi",                   "Susanna Clarke",     "Fantasy",         #good),
      // Bob's books
      (1, "Sapiens",                    "Yuval Noah Harari",  "Nonfiction",      #fair),
      (1, "The Wright Brothers",        "David McCullough",   "History",         #good),
      // Carol's books
      (2, "The Name of the Wind",       "Patrick Rothfuss",   "Fantasy",         #new_),
      (2, "Dune",                       "Frank Herbert",      "Sci-Fi",          #fair),
      (2, "The Hobbit",                 "J.R.R. Tolkien",    "Fantasy",         #good),
      // Dave's books
      (3, "Crime and Punishment",       "Fyodor Dostoevsky",  "Classic",         #fair),
      (3, "Anna Karenina",              "Leo Tolstoy",        "Classic",         #poor),
      // Emma's books
      (4, "The Hating Game",            "Sally Thorne",       "Romance",         #new_),
      (4, "Big Little Lies",            "Liane Moriarty",     "Mystery",         #good),
      // Frank's books
      (5, "The Innovators",             "Walter Isaacson",    "Nonfiction",      #good),
      (5, "Gone Girl",                  "Gillian Flynn",      "Thriller",        #fair),
      // Grace's books
      (6, "The Hunger Games",           "Suzanne Collins",    "Young Adult",     #good),
      (6, "Six of Crows",               "Leigh Bardugo",      "Fantasy",         #new_),
    ];
    var id = nextId;
    for ((ownerIdx, title, author, genre, condition) in samples.vals()) {
      if (ownerIdx < users.size()) {
        let (ownerId, _) = users[ownerIdx];
        let internal : Types.BookInternal = {
          id = id;
          owner = ownerId;
          var title = title;
          var author = author;
          var genre = genre;
          var condition = condition;
          var coverImage = null; // cover images are uploaded by users via object storage
          var availability = #available;
          createdAt = Time.now();
        };
        state.add(internal);
        id += 1;
      };
    };
    id;
  };
};
