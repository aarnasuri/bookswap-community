import Common "common";

module {
  public type ChatId = Common.ChatId;
  public type MessageId = Common.MessageId;
  public type RequestId = Common.RequestId;
  public type UserId = Common.UserId;

  // Internal mutable chat thread stored in state
  public type ChatThreadInternal = {
    id : ChatId;
    requestId : RequestId;
    participant1 : UserId;
    participant2 : UserId;
    createdAt : Common.Timestamp;
  };

  // Shared (immutable) chat thread for API boundary
  public type ChatThread = {
    id : ChatId;
    requestId : RequestId;
    participant1 : UserId;
    participant2 : UserId;
    createdAt : Common.Timestamp;
  };

  // Internal mutable message stored in state
  public type MessageInternal = {
    id : MessageId;
    chatId : ChatId;
    senderId : UserId;
    var text : Text;
    sentAt : Common.Timestamp;
  };

  // Shared (immutable) message for API boundary
  public type Message = {
    id : MessageId;
    chatId : ChatId;
    senderId : UserId;
    text : Text;
    sentAt : Common.Timestamp;
  };
};
