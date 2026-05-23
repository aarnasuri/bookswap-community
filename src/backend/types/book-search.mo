module {
  /// A single result returned from the Google Books API
  public type GoogleBookResult = {
    id : Text;
    title : Text;
    authors : [Text];
    publisher : Text;
    publishedDate : Text;
    description : Text;
    thumbnail : Text;
    isbn : Text;
    printType : Text;
  };
};
