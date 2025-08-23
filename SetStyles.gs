// Core logic: style <...> (including empty <>) with font + highlight color
function setFontAndHighlightForAnglePlaceholders(
  fontFamily, textColor, highlightColor, fontSize, bold, italic, underline,
  startChar, endChar, includeDelims, deleteDelims
) {
  var body = DocumentApp.getActiveDocument().getBody();
  var safeStart = escapeRegex(startChar);
  var safeEnd = escapeRegex(endChar);

  var pattern = safeStart + "[\\s\\S]*?" + safeEnd;

  var updated = 0;
  var match = body.findText(pattern);

  while (match) {
    var el = match.getElement();
    if (el.editAsText) {
      var t = el.asText();
      var start = match.getStartOffset();
      var end = match.getEndOffsetInclusive();

      var styleStart = includeDelims ? start : start + startChar.length;
      var styleEnd   = includeDelims ? end   : end - endChar.length;

      if (styleStart <= styleEnd) {
        t.setFontFamily(styleStart, styleEnd, fontFamily);
        t.setFontSize(styleStart, styleEnd, fontSize);
        t.setForegroundColor(styleStart, styleEnd, textColor);
        t.setBackgroundColor(styleStart, styleEnd, highlightColor);
        t.setBold(styleStart, styleEnd, bold);
        t.setItalic(styleStart, styleEnd, italic);
        t.setUnderline(styleStart, styleEnd, underline);
      }

      if (deleteDelims) {
        // delete right first, then left; refresh after each mutation
        t.deleteText(end - endChar.length + 1, end);
        t = match.getElement().asText();

        t.deleteText(start, start + startChar.length - 1);
        t = match.getElement().asText();
      }

      updated++;
    }

    match = body.findText(pattern, match);
  }
  return updated;
}

/**
 * Adds a '\' before any characters that might need it to be used in a regex pattern
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
