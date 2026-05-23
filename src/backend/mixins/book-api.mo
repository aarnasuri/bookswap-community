import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AuthLib "../lib/auth";
import AuthTypes "../types/auth";
import BookLib "../lib/book";
import BookTypes "../types/book";
import ProfileTypes "../types/profile";
import Common "../types/common";

mixin (
  sessions : Map.Map<Text, AuthTypes.Session>,
  books : List.List<BookTypes.BookInternal>,
  profiles : Map.Map<Common.UserId, ProfileTypes.ProfileInternal>,
  nextBookId : Common.Counter,
) {
  /// Add a book to the caller's library
  public shared func addBook(token : Text, input : BookTypes.AddBookInput) : async BookTypes.Book {
    let uid = AuthLib.requireAuth(sessions, token);
    let (book, newId) = BookLib.addBook(books, nextBookId.value, uid, input);
    nextBookId.value := newId;
    book;
  };

  /// Edit one of the caller's books
  public shared func editBook(token : Text, bookId : Common.BookId, input : BookTypes.EditBookInput) : async ?BookTypes.Book {
    let uid = AuthLib.requireAuth(sessions, token);
    BookLib.editBook(books, bookId, uid, input);
  };

  /// Delete one of the caller's books
  public shared func deleteBook(token : Text, bookId : Common.BookId) : async Bool {
    let uid = AuthLib.requireAuth(sessions, token);
    BookLib.deleteBook(books, bookId, uid);
  };

  /// Toggle availability of one of the caller's books
  public shared func setBookAvailability(token : Text, bookId : Common.BookId, status : BookTypes.AvailabilityStatus) : async ?BookTypes.Book {
    let uid = AuthLib.requireAuth(sessions, token);
    BookLib.setAvailability(books, bookId, uid, status);
  };

  /// Get all books in the caller's personal library
  public query func getMyBooks(token : Text) : async [BookTypes.Book] {
    switch (AuthLib.resolveToken(sessions, token)) {
      case null [];
      case (?uid) BookLib.getBooksByOwner(books, uid);
    };
  };

  /// Get all available books in the community (for browser page)
  public query func getAllAvailableBooks() : async [BookTypes.BookWithOwner] {
    BookLib.getAllAvailableBooksWithOwner(books, profiles);
  };

  /// Search community books by title or author
  public query func searchBooks(searchTerm : Text) : async [BookTypes.BookWithOwner] {
    let matchingBooks = BookLib.searchBooks(books, searchTerm);
    matchingBooks.map<BookTypes.Book, BookTypes.BookWithOwner>(func(b) {
      let ownerName = switch (profiles.get(b.owner)) {
        case (?p) p.name;
        case null "Unknown";
      };
      { book = b; ownerName = ownerName };
    });
  };

  /// Get full detail for a single book with owner info
  public query func getBookDetail(bookId : Common.BookId) : async ?BookTypes.BookWithOwner {
    BookLib.getBookWithOwner(books, profiles, bookId);
  };
};
