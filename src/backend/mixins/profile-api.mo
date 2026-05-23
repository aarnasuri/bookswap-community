import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AuthLib "../lib/auth";
import AuthTypes "../types/auth";
import ProfileLib "../lib/profile";
import Types "../types/profile";
import Common "../types/common";

mixin (
  sessions : Map.Map<Text, AuthTypes.Session>,
  profiles : Map.Map<Common.UserId, Types.ProfileInternal>,
) {
  /// Get the profile for the session owner
  public query func getCallerUserProfile(token : Text) : async ?Types.Profile {
    switch (AuthLib.resolveToken(sessions, token)) {
      case null null;
      case (?uid) ProfileLib.getProfile(profiles, uid);
    };
  };

  /// Save (create or update) the profile for the session owner
  public shared func saveCallerUserProfile(token : Text, input : Types.SaveProfileInput) : async () {
    let uid = AuthLib.requireAuth(sessions, token);
    ignore ProfileLib.updateProfile(profiles, uid, input);
  };

  /// Get a public profile by user id (email)
  public query func getUserProfile(userId : Common.UserId) : async ?Types.Profile {
    ProfileLib.getProfile(profiles, userId);
  };
};
