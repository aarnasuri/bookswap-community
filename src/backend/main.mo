import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";

import AuthTypes "types/auth";
import ProfileTypes "types/profile";
import BookTypes "types/book";
import RequestTypes "types/request";
import ChatTypes "types/chat";
import Common "types/common";

import ProfileLib "lib/profile";
import BookLib "lib/book";
import RequestLib "lib/request";
import ChatLib "lib/chat";

import AuthMixin "mixins/auth-api";
import ProfileMixin "mixins/profile-api";
import BookMixin "mixins/book-api";
import RequestMixin "mixins/request-api";
import ChatMixin "mixins/chat-api";
import BookSearchMixin "mixins/book-search-api";
actor {
  // --- Authorization (satisfies platform lint rule) ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Object Storage (from extension) ---
  include MixinObjectStorage();

  // --- Auth state ---
  let credentials = Map.empty<Text, AuthTypes.Credential>();
  let sessions = Map.empty<Text, AuthTypes.Session>();
  let authSeedCounter = Common.newCounter(0);

  // --- Profiles ---
  let profiles = Map.empty<Common.UserId, ProfileTypes.ProfileInternal>();

  // --- Auth endpoints (needs profiles for auto-create on register) ---
  include AuthMixin(credentials, sessions, profiles, authSeedCounter);

  // --- Profile endpoints ---
  include ProfileMixin(sessions, profiles);

  // --- Books ---
  let books = List.empty<BookTypes.BookInternal>();
  let nextBookId = Common.newCounter(0);
  include BookMixin(sessions, books, profiles, nextBookId);

  // --- Requests ---
  let requests = List.empty<RequestTypes.BookRequestInternal>();
  let nextRequestId = Common.newCounter(0);
  include RequestMixin(sessions, requests, books, nextRequestId);

  // --- Chat ---
  let chatThreads = List.empty<ChatTypes.ChatThreadInternal>();
  let chatMessages = List.empty<ChatTypes.MessageInternal>();
  let nextChatId = Common.newCounter(0);
  let nextMessageId = Common.newCounter(0);
  include ChatMixin(sessions, chatThreads, chatMessages, requests, nextChatId, nextMessageId);

  // --- Google Books Search ---
  include BookSearchMixin();

  // --- Sample Data Seeding ---
  var sampleDataSeeded : Bool = false;

  func seedSampleData() {
    if (sampleDataSeeded) return;
    sampleDataSeeded := true;

    // 1. Seed profiles
    ignore ProfileLib.seedSampleProfiles(profiles, 0);

    // 2. Build user list for book seeding (same order as sampleUserIds)
    let userIds = ProfileLib.sampleUserIds();
    let userPairs : [(Common.UserId, Text)] = [
      (userIds[0], "Alice Nguyen"),
      (userIds[1], "Bob Marley"),
      (userIds[2], "Carol Smith"),
      (userIds[3], "Dave Okonkwo"),
      (userIds[4], "Emma Wilson"),
      (userIds[5], "Frank Torres"),
      (userIds[6], "Grace Kim"),
    ];

    // 3. Seed books — nextBookId updated
    nextBookId.value := BookLib.seedSampleBooks(books, nextBookId.value, userPairs);

    // 4. Seed a few pending requests
    let pendingPairs : [(Common.UserId, Common.BookId)] = [
      (userIds[1], 0),  // Bob → Alice's "The Night Circus"
      (userIds[6], 6),  // Grace → Carol's "The Name of the Wind"
      (userIds[4], 3),  // Emma → Bob's "Sapiens"
    ];
    nextRequestId.value := RequestLib.seedSampleRequests(requests, nextRequestId.value, books, pendingPairs);

    // 5. Seed accepted requests
    let acceptedPairs : [(Common.UserId, Common.BookId)] = [
      (userIds[3], 1),  // Dave → Alice's "Pachinko"
      (userIds[4], 7),  // Emma → Carol's "Dune"
      (userIds[0], 5),  // Alice → Frank's "Gone Girl"
    ];
    let acceptedStartId = nextRequestId.value;
    nextRequestId.value := RequestLib.seedSampleRequests(requests, nextRequestId.value, books, acceptedPairs);

    // Accept those requests and collect them for chat seeding
    let acceptedReqs = List.empty<RequestTypes.BookRequestInternal>();
    for (i in Nat.range(0, acceptedPairs.size())) {
      let rid = acceptedStartId + i;
      switch (requests.find(func(r : RequestTypes.BookRequestInternal) : Bool { r.id == rid })) {
        case (?req) {
          req.status := #accepted;
          switch (books.find(func(b : BookTypes.BookInternal) : Bool { b.id == req.bookId })) {
            case (?book) { book.availability := #unavailable };
            case null {};
          };
          acceptedReqs.add(req);
        };
        case null {};
      };
    };

    // 6. Seed chat threads and messages for accepted requests
    let (newChatId, newMsgId) = ChatLib.seedSampleChats(
      chatThreads, chatMessages, nextChatId.value, nextMessageId.value, acceptedReqs.toArray()
    );
    nextChatId.value := newChatId;
    nextMessageId.value := newMsgId;
  };

  // Run seeding once at startup
  seedSampleData();
};
