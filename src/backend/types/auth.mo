import Common "common";

module {
  public type UserId = Common.UserId;

  /// Stored credential for an email/password user
  public type Credential = {
    userId : UserId;          // email
    var passwordHash : Text;  // salted hash of password
    var salt : Text;          // unique per user
  };

  /// Active session record
  public type Session = {
    userId : UserId;
    token : Text;
    createdAt : Common.Timestamp;
  };

  /// Result of a register or login call
  public type AuthResult = {
    #ok : Text;     // session token
    #err : Text;    // error message
  };
};
