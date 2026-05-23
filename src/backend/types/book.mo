import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type BookId = Common.BookId;
  public type UserId = Common.UserId;

  public type BookCondition = {
    #new_;
    #good;
    #fair;
    #poor;
  };

  public type AvailabilityStatus = {
    #available;
    #unavailable;
  };

  // Internal mutable book stored in state
  public type BookInternal = {
    id : BookId;
    owner : UserId;
    var title : Text;
    var author : Text;
    var genre : Text;
    var condition : BookCondition;
    var coverImage : ?Storage.ExternalBlob;
    var availability : AvailabilityStatus;
    createdAt : Common.Timestamp;
  };

  // Shared (immutable) book for API boundary
  public type Book = {
    id : BookId;
    owner : UserId;
    title : Text;
    author : Text;
    genre : Text;
    condition : BookCondition;
    coverImage : ?Storage.ExternalBlob;
    availability : AvailabilityStatus;
    createdAt : Common.Timestamp;
  };

  // Input for adding a new book
  public type AddBookInput = {
    title : Text;
    author : Text;
    genre : Text;
    condition : BookCondition;
    coverImage : ?Storage.ExternalBlob;
  };

  // Input for editing an existing book
  public type EditBookInput = {
    title : Text;
    author : Text;
    genre : Text;
    condition : BookCondition;
    coverImage : ?Storage.ExternalBlob;
  };

  // Book with owner profile embedded (for community browser)
  public type BookWithOwner = {
    book : Book;
    ownerName : Text;
  };
};
