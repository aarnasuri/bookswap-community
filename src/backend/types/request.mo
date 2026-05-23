import Common "common";

module {
  public type RequestId = Common.RequestId;
  public type BookId = Common.BookId;
  public type UserId = Common.UserId;

  public type RequestStatus = {
    #pending;
    #accepted;
    #declined;
  };

  // Internal mutable request stored in state
  public type BookRequestInternal = {
    id : RequestId;
    bookId : BookId;
    bookOwnerId : UserId;
    requesterId : UserId;
    var status : RequestStatus;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  // Shared (immutable) request for API boundary
  public type BookRequest = {
    id : RequestId;
    bookId : BookId;
    bookOwnerId : UserId;
    requesterId : UserId;
    status : RequestStatus;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
