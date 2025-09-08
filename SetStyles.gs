/**
 * Core logic: finds text between delimiters and applies style settings.
 *
 * - Uses regex to find all text enclosed between the given delimiters.
 * - Applies font, size, color, and formatting options to each match.
 * - Optionally includes or deletes delimiters after applying styles.
 *
 * @param {Object} styleConfig  The style configuration object.
 * @param {string} styleConfig.font - Font family to apply.
 * @param {string} styleConfig.textColor - Foreground (text) color in HEX (e.g. "#000000").
 * @param {string} styleConfig.highlightColor - Background (highlight) color in HEX (e.g. "#efefef").
 * @param {number} styleConfig.fontSize - Font size in points.
 * @param {boolean} styleConfig.bold - Whether to apply bold formatting.
 * @param {boolean} styleConfig.italic - Whether to apply italic formatting.
 * @param {boolean} styleConfig.underline - Whether to apply underline formatting.
 * @param {string} styleConfig.startChar - Starting delimiter string.
 * @param {string} styleConfig.endChar - Ending delimiter string.
 * @param {boolean} styleConfig.includeDelims - Whether to include delimiters in the styled range.
 * @param {boolean} styleConfig.deleteDelims - Whether to delete delimiters after styling.
 * 
 * @return {number} The number of text matches updated in the document.
 */
function applyStyleToDoc(styleConfig) {
  let body = DocumentApp.getActiveDocument().getBody();
  let safeStart = escapeRegex(styleConfig.startChar);
  let safeEnd = escapeRegex(styleConfig.endChar);

  let pattern = safeStart + "[\\s\\S]*?" + safeEnd;

  let updated = 0;
  let match = body.findText(pattern);

  while (match) {
    let el = match.getElement();
    if (el.editAsText) {
      let t = el.asText();
      let start = match.getStartOffset();
      let end = match.getEndOffsetInclusive();

      let styleStart = styleConfig.includeDelims ? start : start + styleConfig.startChar.length;
      let styleEnd   = styleConfig.includeDelims ? end   : end - styleConfig.endChar.length;

      if (styleStart <= styleEnd) {
        t.setFontFamily(styleStart, styleEnd, styleConfig.font);
        t.setFontSize(styleStart, styleEnd, styleConfig.fontSize);
        t.setForegroundColor(styleStart, styleEnd, styleConfig.textColor);
        t.setBackgroundColor(styleStart, styleEnd, styleConfig.highlightColor);
        t.setBold(styleStart, styleEnd, styleConfig.bold);
        t.setItalic(styleStart, styleEnd, styleConfig.italic);
        t.setUnderline(styleStart, styleEnd, styleConfig.underline);
      }

      if (styleConfig.deleteDelims) {
        // delete right first, then left; refresh after each mutation
        t.deleteText(end - styleConfig.endChar.length + 1, end);
        t = match.getElement().asText();

        t.deleteText(start, start + styleConfig.startChar.length - 1);
        t = match.getElement().asText();
      }

      updated++;
    }

    match = body.findText(pattern, match);
  }
  return updated;
}


