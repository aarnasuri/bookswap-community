import Common "common";

module {
  public type UserId = Common.UserId;

  // Internal mutable profile stored in state
  public type ProfileInternal = {
    id : UserId;
    var name : Text;
    var bio : Text;
    var avatarUrl : ?Text;
    joinedAt : Common.Timestamp;
  };

  // Shared (immutable) profile for API boundary
  public type Profile = {
    id : UserId;
    name : Text;
    bio : Text;
    avatarUrl : ?Text;
    joinedAt : Common.Timestamp;
  };

  // Input for saving a profile
  public type SaveProfileInput = {
    name : Text;
    bio : Text;
    avatarUrl : ?Text;
  };
};
