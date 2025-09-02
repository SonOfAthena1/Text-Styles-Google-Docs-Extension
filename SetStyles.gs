/**
 * Core logic: finds text between delimiters and applies style settings.
 * 
 * @param {string} fontFamily  Font family to apply.
 * @param {string} textColor  Foreground color in HEX.
 * @param {string} highlightColor  Background color in HEX.
 * @param {number} fontSize  Font size in points.
 * @param {boolean} bold  Whether to apply bold.
 * @param {boolean} italic  Whether to apply italic.
 * @param {boolean} underline  Whether to apply underline.
 * @param {string} startChar  Start delimiter string.
 * @param {string} endChar  End delimiter string.
 * @param {boolean} includeDelims  Whether to include delimiters in styled range.
 * @param {boolean} deleteDelims  Whether to delete delimiters after styling.
 * @return {number} Number of matches updated.
 */
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
 * Escapes regex metacharacters in a string (by adding '\') so it can be used literally.
 * 
 * @param {string} str  String to escape.
 * @return {string} Escaped string for safe regex use.
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}