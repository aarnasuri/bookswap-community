import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Types "../types/auth";
import ProfileTypes "../types/profile";
import ProfileLib "../lib/profile";
import Common "../types/common";

module {
  public type CredentialState = Map.Map<Text, Types.Credential>;
  public type SessionState = Map.Map<Text, Types.Session>;
  public type ProfileState = Map.Map<Common.UserId, ProfileTypes.ProfileInternal>;

  /// Polynomial hash over UTF-8 bytes of a text (no bitwise ops)
  func polyHash(t : Text) : Nat {
    let PRIME : Nat = 31;
    let MOD : Nat = 1000000007;
    var hash : Nat = 5381;
    for (b in t.encodeUtf8().vals()) {
      hash := (hash * PRIME + Nat.fromNat8(b)) % MOD;
    };
    hash;
  };

  /// Derive a salt from userId + a counter seed
  func makeSalt(userId : Text, seed : Nat) : Text {
    userId # "_" # seed.toText() # "_bkbh";
  };

  /// Hash a password with a given salt using polynomial hash
  public func hashPassword(password : Text, salt : Text) : Text {
    let combined = salt # ":" # password # ":bookbank";
    polyHash(combined).toText();
  };

  /// Generate a session token from userId + timestamp
  func makeToken(userId : Text, now : Int) : Text {
    let combined = userId # "_" # debug_show(now) # "_tok";
    "bb_" # polyHash(combined).toText() # "_" # polyHash(userId).toText();
  };

  /// Validate email format — must contain @
  func isValidEmail(email : Text) : Bool {
    email.contains(#char '@') and email.size() > 3;
  };

  /// Register a new user with email + password
  public func register(
    credentials : CredentialState,
    sessions : SessionState,
    profiles : ProfileState,
    emailRaw : Text,
    password : Text,
    seedCounter : Nat,
  ) : Types.AuthResult {
    let email = emailRaw.toLower();
    if (not isValidEmail(email)) return #err("Invalid email address");
    if (password.size() < 6) return #err("Password must be at least 6 characters");
    if (credentials.containsKey(email)) return #err("Email already registered");

    let salt = makeSalt(email, seedCounter);
    let hash = hashPassword(password, salt);
    let cred : Types.Credential = {
      userId = email;
      var passwordHash = hash;
      var salt = salt;
    };
    credentials.add(email, cred);

    // Create profile — default name is text before @
    let defaultName = switch (email.split(#char '@').next()) {
      case (?n) n;
      case null email;
    };
    ignore ProfileLib.createProfile(profiles, email, {
      name = defaultName;
      bio = "";
      avatarUrl = null;
    });

    // Create session
    let now = Time.now();
    let token = makeToken(email, now);
    let session : Types.Session = {
      userId = email;
      token = token;
      createdAt = now;
    };
    sessions.add(token, session);
    #ok(token);
  };

  /// Login with email + password — returns session token
  public func login(
    credentials : CredentialState,
    sessions : SessionState,
    emailRaw : Text,
    password : Text,
  ) : Types.AuthResult {
    let email = emailRaw.toLower();
    switch (credentials.get(email)) {
      case null #err("Invalid email or password");
      case (?cred) {
        let hash = hashPassword(password, cred.salt);
        if (hash != cred.passwordHash) return #err("Invalid email or password");
        let now = Time.now();
        let token = makeToken(email, now);
        let session : Types.Session = {
          userId = email;
          token = token;
          createdAt = now;
        };
        sessions.add(token, session);
        #ok(token);
      };
    };
  };

  /// Sign out — removes the session token
  public func signOut(
    sessions : SessionState,
    token : Text,
  ) {
    sessions.remove(token);
  };

  /// Resolve a session token to a userId; returns null if invalid
  public func resolveToken(
    sessions : SessionState,
    token : Text,
  ) : ?Common.UserId {
    switch (sessions.get(token)) {
      case (?s) ?s.userId;
      case null null;
    };
  };

  /// Require a valid session — traps if invalid
  public func requireAuth(
    sessions : SessionState,
    token : Text,
  ) : Common.UserId {
    switch (resolveToken(sessions, token)) {
      case (?uid) uid;
      case null Runtime.trap("Unauthorized: invalid or expired session");
    };
  };
};
