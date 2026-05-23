import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AuthLib "../lib/auth";
import AuthTypes "../types/auth";
import ChatLib "../lib/chat";
import ChatTypes "../types/chat";
import RequestTypes "../types/request";
import Common "../types/common";

mixin (
  sessions : Map.Map<Text, AuthTypes.Session>,
  chatThreads : List.List<ChatTypes.ChatThreadInternal>,
  chatMessages : List.List<ChatTypes.MessageInternal>,
  requests : List.List<RequestTypes.BookRequestInternal>,
  nextChatId : Common.Counter,
  nextMessageId : Common.Counter,
) {
  /// Get or create a chat thread for an accepted request
  public shared func getOrCreateChatThread(token : Text, requestId : Common.RequestId) : async ChatTypes.ChatThread {
    let uid = AuthLib.requireAuth(sessions, token);
    let (thread, newId) = ChatLib.getOrCreateThread(chatThreads, requests, nextChatId.value, uid, requestId);
    nextChatId.value := newId;
    thread;
  };

  /// Get all chat threads the caller participates in
  public query func getMyChatThreads(token : Text) : async [ChatTypes.ChatThread] {
    switch (AuthLib.resolveToken(sessions, token)) {
      case null [];
      case (?uid) ChatLib.getThreadsForUser(chatThreads, uid);
    };
  };

  /// Send a message in a chat thread (caller must be a participant)
  public shared func sendMessage(token : Text, chatId : Common.ChatId, text : Text) : async ChatTypes.Message {
    let uid = AuthLib.requireAuth(sessions, token);
    let (msg, newId) = ChatLib.sendMessage(chatThreads, chatMessages, nextMessageId.value, uid, chatId, text);
    nextMessageId.value := newId;
    msg;
  };

  /// Get messages for a chat thread (polling — caller must be a participant)
  public query func getChatMessages(token : Text, chatId : Common.ChatId) : async [ChatTypes.Message] {
    let uid = switch (AuthLib.resolveToken(sessions, token)) {
      case (?u) u;
      case null Runtime.trap("Unauthorized");
    };
    ChatLib.getMessages(chatThreads, chatMessages, uid, chatId);
  };
};
