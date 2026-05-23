import HttpOutcall "mo:caffeineai-http-outcalls/outcall";
import BookSearchLib "../lib/book-search";
import BookSearchTypes "../types/book-search";

mixin () {
  /// Transform function required by the http-outcalls extension.
  /// Strips non-deterministic headers so all replicas agree on the response.
  public query func transformGoogleBooksResponse(
    input : HttpOutcall.TransformationInput
  ) : async HttpOutcall.TransformationOutput {
    HttpOutcall.transform(input);
  };

  /// Search Google Books API by query string.
  /// Returns up to 10 matching GoogleBookResult records, or an error message on failure.
  public shared func searchGoogleBooks(
    searchQuery : Text
  ) : async { #ok : [BookSearchTypes.GoogleBookResult]; #err : Text } {
    if (searchQuery.isEmpty()) {
      return #ok([]);
    };
    let encoded = searchQuery.replace(#text " ", "+");
    let url = "https://www.googleapis.com/books/v1/volumes?q=" # encoded # "&maxResults=10";
    try {
      let responseText = await HttpOutcall.httpGetRequest(url, [], transformGoogleBooksResponse);
      let results = BookSearchLib.parseGoogleBooksResponse(responseText);
      #ok(results);
    } catch (err) {
      #err("Google Books API request failed");
    };
  };
};
