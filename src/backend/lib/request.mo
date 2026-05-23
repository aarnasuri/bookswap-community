import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Types "../types/request";
import BookTypes "../types/book";
import Common "../types/common";

module {
  public type State = List.List<Types.BookRequestInternal>;
  public type BookState = List.List<BookTypes.BookInternal>;

  /// Convert internal request to shared request
  public func toPublic(self : Types.BookRequestInternal) : Types.BookRequest {
    {
      id = self.id;
      bookId = self.bookId;
      bookOwnerId = self.bookOwnerId;
      requesterId = self.requesterId;
      status = self.status;
      createdAt = self.createdAt;
      updatedAt = self.updatedAt;
    };
  };

  /// Send a book request
  public func sendRequest(
    state : State,
    bookState : BookState,
    nextId : Nat,
    requester : Common.UserId,
    bookId : Common.BookId,
  ) : (Types.BookRequest, Nat) {
    let book = switch (bookState.find(func(b : BookTypes.BookInternal) : Bool { b.id == bookId })) {
      case (?b) b;
      case null Runtime.trap("Book not found");
    };
    if (book.availability != #available) Runtime.trap("Book is not available");
    if (book.owner == requester) Runtime.trap("Cannot request your own book");

    // Check no existing pending request from this user for this book
    switch (state.find(func(r : Types.BookRequestInternal) : Bool {
      r.bookId == bookId and r.requesterId == requester and r.status == #pending
    })) {
      case (?_) Runtime.trap("You already have a pending request for this book");
      case null {};
    };

    let now = Time.now();
    let internal : Types.BookRequestInternal = {
      id = nextId;
      bookId = bookId;
      bookOwnerId = book.owner;
      requesterId = requester;
      var status = #pending;
      createdAt = now;
      var updatedAt = now;
    };
    state.add(internal);
    (toPublic(internal), nextId + 1);
  };

  /// Accept a book request (owner only) — also marks book unavailable
  public func acceptRequest(
    state : State,
    bookState : BookState,
    requestId : Common.RequestId,
    caller : Common.UserId,
  ) : ?Types.BookRequest {
    switch (state.find(func(r : Types.BookRequestInternal) : Bool { r.id == requestId })) {
      case null null;
      case (?req) {
        if (req.bookOwnerId != caller) return null;
        if (req.status != #pending) return null;
        req.status := #accepted;
        req.updatedAt := Time.now();
        // Mark the book unavailable
        switch (bookState.find(func(b : BookTypes.BookInternal) : Bool { b.id == req.bookId })) {
          case (?book) { book.availability := #unavailable };
          case null {};
        };
        ?toPublic(req);
      };
    };
  };

  /// Decline a book request (owner only)
  public func declineRequest(
    state : State,
    requestId : Common.RequestId,
    caller : Common.UserId,
  ) : ?Types.BookRequest {
    switch (state.find(func(r : Types.BookRequestInternal) : Bool { r.id == requestId })) {
      case null null;
      case (?req) {
        if (req.bookOwnerId != caller) return null;
        if (req.status != #pending) return null;
        req.status := #declined;
        req.updatedAt := Time.now();
        ?toPublic(req);
      };
    };
  };

  /// Get all requests sent by a user (requester inbox)
  public func getRequestsByRequester(
    state : State,
    requester : Common.UserId,
  ) : [Types.BookRequest] {
    state.filter(func(r : Types.BookRequestInternal) : Bool { r.requesterId == requester })
         .map<Types.BookRequestInternal, Types.BookRequest>(func(r) { toPublic(r) })
         .toArray();
  };

  /// Get all requests received by an owner (owner inbox)
  public func getRequestsByOwner(
    state : State,
    owner : Common.UserId,
  ) : [Types.BookRequest] {
    state.filter(func(r : Types.BookRequestInternal) : Bool { r.bookOwnerId == owner })
         .map<Types.BookRequestInternal, Types.BookRequest>(func(r) { toPublic(r) })
         .toArray();
  };

  /// Get a single request by id
  public func getRequest(
    state : State,
    requestId : Common.RequestId,
  ) : ?Types.BookRequest {
    switch (state.find(func(r : Types.BookRequestInternal) : Bool { r.id == requestId })) {
      case (?r) ?toPublic(r);
      case null null;
    };
  };

  /// Seed sample requests for demo data — returns updated nextId
  public func seedSampleRequests(
    state : State,
    nextId : Nat,
    bookState : BookState,
    samplePairs : [(Common.UserId, Common.BookId)],
  ) : Nat {
    var id = nextId;
    for ((requester, bookId) in samplePairs.vals()) {
      switch (bookState.find(func(b : BookTypes.BookInternal) : Bool { b.id == bookId })) {
        case null {};
        case (?book) {
          if (book.owner != requester) {
            let now = Time.now();
            let internal : Types.BookRequestInternal = {
              id = id;
              bookId = bookId;
              bookOwnerId = book.owner;
              requesterId = requester;
              var status = #pending;
              createdAt = now;
              var updatedAt = now;
            };
            state.add(internal);
            id += 1;
          };
        };
      };
    };
    id;
  };
};
