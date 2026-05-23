import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/profile";
import Common "../types/common";

module {
  public type State = Map.Map<Common.UserId, Types.ProfileInternal>;

  /// Convert internal profile to shared profile
  public func toPublic(self : Types.ProfileInternal) : Types.Profile {
    {
      id = self.id;
      name = self.name;
      bio = self.bio;
      avatarUrl = self.avatarUrl;
      joinedAt = self.joinedAt;
    };
  };

  /// Create a new profile for a user
  public func createProfile(
    state : State,
    userId : Common.UserId,
    input : Types.SaveProfileInput,
  ) : Types.Profile {
    let internal : Types.ProfileInternal = {
      id = userId;
      var name = input.name;
      var bio = input.bio;
      var avatarUrl = input.avatarUrl;
      joinedAt = Time.now();
    };
    state.add(userId, internal);
    toPublic(internal);
  };

  /// Get a profile by user id
  public func getProfile(
    state : State,
    userId : Common.UserId,
  ) : ?Types.Profile {
    switch (state.get(userId)) {
      case (?p) ?toPublic(p);
      case null null;
    };
  };

  /// Update an existing profile (creates if not found)
  public func updateProfile(
    state : State,
    userId : Common.UserId,
    input : Types.SaveProfileInput,
  ) : Types.Profile {
    switch (state.get(userId)) {
      case (?existing) {
        existing.name := input.name;
        existing.bio := input.bio;
        existing.avatarUrl := input.avatarUrl;
        toPublic(existing);
      };
      case null {
        createProfile(state, userId, input);
      };
    };
  };

  /// Returns deterministic fake email-based user IDs used for sample data
  public func sampleUserIds() : [Common.UserId] {
    [
      "alice@bookbank.bh",
      "bob@bookbank.bh",
      "carol@bookbank.bh",
      "dave@bookbank.bh",
      "emma@bookbank.bh",
      "frank@bookbank.bh",
      "grace@bookbank.bh",
    ];
  };

  /// Seed sample profiles for demo data — returns count added
  public func seedSampleProfiles(state : State, _nextId : Nat) : Nat {
    let ids = sampleUserIds();
    let data : [(Text, Text, ?Text)] = [
      ("Alice Nguyen",   "Avid reader and book lover. Passionate about literary fiction.",                ?"https://api.dicebear.com/7.x/avataaars/svg?seed=alice"),
      ("Bob Marley",     "History buff who devours nonfiction. Always happy to share a good read.",       ?"https://api.dicebear.com/7.x/avataaars/svg?seed=bob"),
      ("Carol Smith",    "Fantasy and sci-fi enthusiast. My shelves are overflowing!",                    ?"https://api.dicebear.com/7.x/avataaars/svg?seed=carol"),
      ("Dave Okonkwo",   "Classic literature aficionado. I believe in the magic of old books.",           ?"https://api.dicebear.com/7.x/avataaars/svg?seed=dave"),
      ("Emma Wilson",    "Romance reader and aspiring writer. Love cozy mysteries too.",                  ?"https://api.dicebear.com/7.x/avataaars/svg?seed=emma"),
      ("Frank Torres",   "Tech and science nonfiction fan. Sometimes venture into thrillers.",            ?"https://api.dicebear.com/7.x/avataaars/svg?seed=frank"),
      ("Grace Kim",      "Young adult and coming-of-age stories are my jam. Big Tolkien fan.",            ?"https://api.dicebear.com/7.x/avataaars/svg?seed=grace"),
    ];
    var count = 0;
    var i = 0;
    for ((name, bio, avatar) in data.vals()) {
      let userId = ids[i];
      if (not state.containsKey(userId)) {
        let internal : Types.ProfileInternal = {
          id = userId;
          var name = name;
          var bio = bio;
          var avatarUrl = avatar;
          joinedAt = Time.now();
        };
        state.add(userId, internal);
        count += 1;
      };
      i += 1;
    };
    count;
  };
};
