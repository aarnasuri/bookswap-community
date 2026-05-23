import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Types "../types/chat";
import RequestTypes "../types/request";
import Common "../types/common";

module {
  public type ThreadState = List.List<Types.ChatThreadInternal>;
  public type MessageState = List.List<Types.MessageInternal>;
  public type RequestState = List.List<RequestTypes.BookRequestInternal>;

  /// Convert internal thread to shared thread
  public func toPublicThread(self : Types.ChatThreadInternal) : Types.ChatThread {
    {
      id = self.id;
      requestId = self.requestId;
      participant1 = self.participant1;
      participant2 = self.participant2;
      createdAt = self.createdAt;
    };
  };

  /// Convert internal message to shared message
  public func toPublicMessage(self : Types.MessageInternal) : Types.Message {
    {
      id = self.id;
      chatId = self.chatId;
      senderId = self.senderId;
      text = self.text;
      sentAt = self.sentAt;
    };
  };

  /// Get or create a chat thread for an accepted request (caller must be a participant)
  public func getOrCreateThread(
    threadState : ThreadState,
    requestState : RequestState,
    nextId : Nat,
    caller : Common.UserId,
    requestId : Common.RequestId,
  ) : (Types.ChatThread, Nat) {
    // Look up the request
    let req = switch (requestState.find(func(r : RequestTypes.BookRequestInternal) : Bool { r.id == requestId })) {
      case (?r) r;
      case null Runtime.trap("Request not found");
    };
    // Only accepted requests can have a thread
    if (req.status != #accepted) Runtime.trap("Chat is only available for accepted requests");
    // Caller must be a participant
    if (req.requesterId != caller and req.bookOwnerId != caller) Runtime.trap("Not a participant");

    // Check if thread already exists
    switch (threadState.find(func(t : Types.ChatThreadInternal) : Bool { t.requestId == requestId })) {
      case (?existing) (toPublicThread(existing), nextId);
      case null {
        let thread : Types.ChatThreadInternal = {
          id = nextId;
          requestId = requestId;
          participant1 = req.bookOwnerId;
          participant2 = req.requesterId;
          createdAt = Time.now();
        };
        threadState.add(thread);
        (toPublicThread(thread), nextId + 1);
      };
    };
  };

  /// Get thread by id (only accessible to participants)
  public func getThread(
    threadState : ThreadState,
    caller : Common.UserId,
    chatId : Common.ChatId,
  ) : ?Types.ChatThread {
    switch (threadState.find(func(t : Types.ChatThreadInternal) : Bool { t.id == chatId })) {
      case null null;
      case (?t) {
        if (t.participant1 != caller and t.participant2 != caller) return null;
        ?toPublicThread(t);
      };
    };
  };

  /// Get all threads for a user
  public func getThreadsForUser(
    threadState : ThreadState,
    userId : Common.UserId,
  ) : [Types.ChatThread] {
    threadState.filter(func(t : Types.ChatThreadInternal) : Bool {
      t.participant1 == userId or t.participant2 == userId
    })
    .map<Types.ChatThreadInternal, Types.ChatThread>(func(t) { toPublicThread(t) })
    .toArray();
  };

  /// Send a message in a chat thread (caller must be participant)
  public func sendMessage(
    threadState : ThreadState,
    messageState : MessageState,
    nextId : Nat,
    caller : Common.UserId,
    chatId : Common.ChatId,
    text : Text,
  ) : (Types.Message, Nat) {
    let thread = switch (threadState.find(func(t : Types.ChatThreadInternal) : Bool { t.id == chatId })) {
      case (?t) t;
      case null Runtime.trap("Chat thread not found");
    };
    if (thread.participant1 != caller and thread.participant2 != caller) {
      Runtime.trap("Not a participant in this chat");
    };
    let msg : Types.MessageInternal = {
      id = nextId;
      chatId = chatId;
      senderId = caller;
      var text = text;
      sentAt = Time.now();
    };
    messageState.add(msg);
    (toPublicMessage(msg), nextId + 1);
  };

  /// Get all messages for a chat thread (polling — caller must be participant)
  public func getMessages(
    threadState : ThreadState,
    messageState : MessageState,
    caller : Common.UserId,
    chatId : Common.ChatId,
  ) : [Types.Message] {
    let thread = switch (threadState.find(func(t : Types.ChatThreadInternal) : Bool { t.id == chatId })) {
      case (?t) t;
      case null Runtime.trap("Chat thread not found");
    };
    if (thread.participant1 != caller and thread.participant2 != caller) {
      Runtime.trap("Not a participant in this chat");
    };
    messageState.filter(func(m : Types.MessageInternal) : Bool { m.chatId == chatId })
                .map<Types.MessageInternal, Types.Message>(func(m) { toPublicMessage(m) })
                .toArray();
  };

  /// Seed sample chat threads and messages for demo data
  public func seedSampleChats(
    threadState : ThreadState,
    messageState : MessageState,
    nextThreadId : Nat,
    nextMessageId : Nat,
    acceptedRequests : [RequestTypes.BookRequestInternal],
  ) : (Nat, Nat) {
    var tid = nextThreadId;
    var mid = nextMessageId;

    // Canned messages for each thread
    let chatScripts : [[Text]] = [
      [
        "Hi! I'd love to borrow this book.",
        "Sure! When can you pick it up?",
        "How about this weekend?",
        "Saturday works perfectly for me!",
      ],
      [
        "Hey, thanks for accepting my request!",
        "Of course! The book is in great condition.",
        "Amazing, I've been wanting to read it for a while.",
        "Enjoy it! Let me know what you think.",
      ],
      [
        "Is the book still available to collect?",
        "Yes, I'll hold it for you until Friday.",
        "Perfect, I'll swing by after work.",
      ],
    ];

    var scriptIdx = 0;
    for (req in acceptedRequests.vals()) {
      // Create thread
      let thread : Types.ChatThreadInternal = {
        id = tid;
        requestId = req.id;
        participant1 = req.bookOwnerId;
        participant2 = req.requesterId;
        createdAt = Time.now();
      };
      threadState.add(thread);

      // Seed messages alternating between participants
      let script = chatScripts[scriptIdx % chatScripts.size()];
      var senderToggle = true;
      for (msgText in script.vals()) {
        let sender = if (senderToggle) req.requesterId else req.bookOwnerId;
        let msg : Types.MessageInternal = {
          id = mid;
          chatId = tid;
          senderId = sender;
          var text = msgText;
          sentAt = Time.now();
        };
        messageState.add(msg);
        mid += 1;
        senderToggle := not senderToggle;
      };

      tid += 1;
      scriptIdx += 1;
    };

    (tid, mid);
  };
};
