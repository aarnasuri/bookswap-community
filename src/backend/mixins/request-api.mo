import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AuthLib "../lib/auth";
import AuthTypes "../types/auth";
import RequestLib "../lib/request";
import RequestTypes "../types/request";
import BookTypes "../types/book";
import Common "../types/common";

mixin (
  sessions : Map.Map<Text, AuthTypes.Session>,
  requests : List.List<RequestTypes.BookRequestInternal>,
  books : List.List<BookTypes.BookInternal>,
  nextRequestId : Common.Counter,
) {
  /// Send a book request (requester → owner)
  public shared func sendBookRequest(token : Text, bookId : Common.BookId) : async RequestTypes.BookRequest {
    let uid = AuthLib.requireAuth(sessions, token);
    let (req, newId) = RequestLib.sendRequest(requests, books, nextRequestId.value, uid, bookId);
    nextRequestId.value := newId;
    req;
  };

  /// Accept a pending request (owner only) — book becomes Unavailable
  public shared func acceptBookRequest(token : Text, requestId : Common.RequestId) : async ?RequestTypes.BookRequest {
    let uid = AuthLib.requireAuth(sessions, token);
    RequestLib.acceptRequest(requests, books, requestId, uid);
  };

  /// Decline a pending request (owner only)
  public shared func declineBookRequest(token : Text, requestId : Common.RequestId) : async ?RequestTypes.BookRequest {
    let uid = AuthLib.requireAuth(sessions, token);
    RequestLib.declineRequest(requests, requestId, uid);
  };

  /// Get requests sent by the caller (My Requests page)
  public query func getMyRequests(token : Text) : async [RequestTypes.BookRequest] {
    switch (AuthLib.resolveToken(sessions, token)) {
      case null [];
      case (?uid) RequestLib.getRequestsByRequester(requests, uid);
    };
  };

  /// Get requests received by the caller as owner (inbox)
  public query func getMyRequestInbox(token : Text) : async [RequestTypes.BookRequest] {
    switch (AuthLib.resolveToken(sessions, token)) {
      case null [];
      case (?uid) RequestLib.getRequestsByOwner(requests, uid);
    };
  };
};
