import Map "mo:core/Map";
import AuthLib "../lib/auth";
import AuthTypes "../types/auth";
import ProfileTypes "../types/profile";
import Common "../types/common";

mixin (
  credentials : Map.Map<Text, AuthTypes.Credential>,
  sessions : Map.Map<Text, AuthTypes.Session>,
  profiles : Map.Map<Common.UserId, ProfileTypes.ProfileInternal>,
  seedCounter : Common.Counter,
) {
  /// Register a new user with email and password
  public shared func register(email : Text, password : Text) : async AuthTypes.AuthResult {
    let result = AuthLib.register(credentials, sessions, profiles, email, password, seedCounter.value);
    switch (result) {
      case (#ok(_)) { seedCounter.value += 1 };
      case (#err(_)) {};
    };
    result;
  };

  /// Login with email and password — returns a session token on success
  public shared func login(email : Text, password : Text) : async AuthTypes.AuthResult {
    AuthLib.login(credentials, sessions, email, password);
  };

  /// Sign out — invalidates the given session token
  public shared func signOut(token : Text) : async () {
    AuthLib.signOut(sessions, token);
  };

  /// Get the userId for a valid session token (for client-side identity check)
  public query func getSession(token : Text) : async ?Common.UserId {
    AuthLib.resolveToken(sessions, token);
  };
};
