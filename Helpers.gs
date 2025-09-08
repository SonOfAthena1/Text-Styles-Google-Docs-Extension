/**
 * Escapes regex metacharacters in a string (by adding '\') so it can be used literally.
 * 
 * @param {string} str  String to escape.
 * @return {string} Escaped string for safe regex use.
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Checks HEX code colors and normalizes them if need be.
 * If they are too messed up, returns a fallback color.
 * 
 * @param {string} val  The input hex color code
 * @param {string} fallback  The hex color code to fallback on
 * @return {string} A proper HEX color code
 */
function normalizeHexColor(val, fallback) {
  if (!val) return fallback;
  // add leading # if user omitted it, then validate 3/6 hex form
  var withHash = val.startsWith('#') ? val : ('#' + val);
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(withHash) ? withHash : fallback;
}