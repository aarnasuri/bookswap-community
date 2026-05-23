module {
  /// Email address used as the primary user identifier
  public type UserId = Text;
  public type BookId = Nat;
  public type RequestId = Nat;
  public type ChatId = Nat;
  public type MessageId = Nat;
  public type Timestamp = Int;

  /// Mutable counter — passed by reference so mixins can increment it
  public type Counter = { var value : Nat };
  public func newCounter(initial : Nat) : Counter { { var value = initial } };
};
