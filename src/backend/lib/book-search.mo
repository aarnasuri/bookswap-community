import Text "mo:core/Text";
import List "mo:core/List";
import Iter "mo:core/Iter";
import BookSearchTypes "../types/book-search";

module {
  let DQUOTE : Char = '\"';

  /// Consume the iterator, collecting characters until `stopChar` is encountered.
  /// Returns the collected text (not including stopChar).
  func readUntilChar(iter : Iter.Iter<Char>, stopChar : Char) : Text {
    var result = "";
    label collecting loop {
      switch (iter.next()) {
        case null { break collecting };
        case (?c) {
          if (c == stopChar) { break collecting };
          result := result # Text.fromChar(c);
        };
      };
    };
    result;
  };

  /// Extract the first occurrence of `"key":"<value>"` from json. Returns "".
  func extractString(json : Text, key : Text) : Text {
    let needle = "\"" # key # "\":\"";
    let parts = json.split(#text needle);
    var count = 0;
    var result = "";
    for (part in parts) {
      if (count == 1) {
        // part starts right after the opening quote -- read until closing quote
        result := readUntilChar(part.toIter(), DQUOTE);
      };
      count += 1;
    };
    result;
  };

  /// Extract an array of quoted strings for `"key":["a","b",...]`. Returns [].
  func extractStringArray(json : Text, key : Text) : [Text] {
    let needle = "\"" # key # "\":[";
    let parts = json.split(#text needle);
    var count = 0;
    var arrayContent = "";
    for (part in parts) {
      if (count == 1) {
        // read until the closing ]
        arrayContent := readUntilChar(part.toIter(), ']');
      };
      count += 1;
    };
    if (arrayContent.isEmpty()) return [];
    // Split by comma and strip quotes
    let items = List.empty<Text>();
    for (raw in arrayContent.split(#char ',')) {
      let trimmed = raw.trim(#char ' ').trim(#text "\"");
      if (not trimmed.isEmpty()) {
        items.add(trimmed);
      };
    };
    items.toArray();
  };

  /// Extract the best ISBN from industryIdentifiers array.
  func extractIsbn(json : Text) : Text {
    // Look for ISBN_13 first, then ISBN_10
    let isbn13Needle = "ISBN_13";
    let isbn10Needle = "ISBN_10";
    if (json.contains(#text isbn13Needle)) {
      let parts = json.split(#text isbn13Needle);
      var count = 0;
      var afterType = "";
      for (part in parts) {
        if (count == 1) { afterType := part };
        count += 1;
      };
      extractString(afterType, "identifier");
    } else if (json.contains(#text isbn10Needle)) {
      let parts = json.split(#text isbn10Needle);
      var count = 0;
      var afterType = "";
      for (part in parts) {
        if (count == 1) { afterType := part };
        count += 1;
      };
      extractString(afterType, "identifier");
    } else {
      "";
    };
  };

  /// Extract thumbnail from `"imageLinks":{"thumbnail":"..."}`.
  func extractThumbnail(json : Text) : Text {
    let needle = "\"imageLinks\":{";
    let parts = json.split(#text needle);
    var count = 0;
    var afterKey = "";
    for (part in parts) {
      if (count == 1) { afterKey := part };
      count += 1;
    };
    if (afterKey.isEmpty()) return "";
    extractString(afterKey, "thumbnail");
  };

  /// Extract volumeInfo object text (the substring starting after `"volumeInfo":{`).
  func extractVolumeInfo(itemJson : Text) : Text {
    let needle = "\"volumeInfo\":{";
    let parts = itemJson.split(#text needle);
    var count = 0;
    var afterKey = "";
    for (part in parts) {
      if (count == 1) { afterKey := part };
      count += 1;
    };
    afterKey;
  };

  /// Parse a single raw item string into a GoogleBookResult.
  func parseItem(itemJson : Text) : BookSearchTypes.GoogleBookResult {
    let volumeInfo = extractVolumeInfo(itemJson);
    {
      id          = extractString(itemJson, "id");
      title       = extractString(volumeInfo, "title");
      authors     = extractStringArray(volumeInfo, "authors");
      publisher   = extractString(volumeInfo, "publisher");
      publishedDate = extractString(volumeInfo, "publishedDate");
      description = extractString(volumeInfo, "description");
      thumbnail   = extractThumbnail(volumeInfo);
      isbn        = extractIsbn(volumeInfo);
      printType   = extractString(volumeInfo, "printType");
    };
  };

  /// Parse the raw Google Books API JSON response into an array of GoogleBookResult.
  /// Returns an empty array if the response has no items or cannot be parsed.
  public func parseGoogleBooksResponse(json : Text) : [BookSearchTypes.GoogleBookResult] {
    if (not json.contains(#text "\"items\"")) return [];

    // Extract everything after "items":[
    let needle = "\"items\":[";
    let parts = json.split(#text needle);
    var count = 0;
    var itemsContent = "";
    for (part in parts) {
      if (count == 1) { itemsContent := part };
      count += 1;
    };
    if (itemsContent.isEmpty()) return [];

    // Split individual items on },{ boundary
    let rawItems = itemsContent.split(#text "},{");
    let results = List.empty<BookSearchTypes.GoogleBookResult>();
    for (raw in rawItems) {
      let parsed = parseItem(raw);
      if (not parsed.title.isEmpty()) {
        results.add(parsed);
      };
    };
    results.toArray();
  };
};
