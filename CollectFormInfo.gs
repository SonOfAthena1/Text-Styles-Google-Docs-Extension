

/**
 * Collects and normalizes style configuration values from a form input.
 *
 * - Reads user-provided values from the form (font, colors, switches, etc.).
 * - Falls back to default style values if a field is missing.
 * - Converts and trims values to the proper types (string, number, boolean).
 * - Normalizes color strings to valid hex codes.
 * - If method is being used to apply a style, it will check whether bold_switch, italic_switch, and underline_switch exist. If not (likely because \'View more styling options\' isn't clicked), will use their saved values if the style has been saved previously.
 *
 * @param {Object} form  The form input object from the event (`e.commonEventObject.formInputs`).
 * @param {Object} form.font - Font name input.
 * @param {Object} form.text_color - Text color input.
 * @param {Object} form.color - Highlight color input.
 * @param {Object} form.font_size - Font size input.
 * @param {Object} form.character1 - Starting delimiter input.
 * @param {Object} form.character2 - Ending delimiter input.
 * @param {Object} form.bold_switch - Switch control for bold styling.
 * @param {Object} form.italic_switch - Switch control for italic styling.
 * @param {Object} form.underline_switch - Switch control for underline styling.
 * @param {Object} form.include_switch - Switch control for including delimiters.
 * @param {Object} form.delete_switch - Switch control for deleting delimiters.
 * @param {boolean} applyingStyle  Whether or not this method is being called to apply a style or save one.
 *
 * @returns {Object} A style configuration object with the following properties:
 * @returns {string} return.font - Selected font name.
 * @returns {string} return.textColor - Normalized hex text color (e.g. "#000000").
 * @returns {string} return.highlightColor - Normalized hex highlight color (e.g. "#efefef").
 * @returns {number} return.fontSize - Font size in points.
 * @returns {boolean} return.bold - Whether bold is enabled.
 * @returns {boolean} return.italic - Whether italic is enabled.
 * @returns {boolean} return.underline - Whether underline is enabled.
 * @returns {string} return.startChar - Starting delimiter character(s).
 * @returns {string} return.endChar - Ending delimiter character(s).
 * @returns {boolean} return.includeDelims - Whether to include delimiters in styling.
 * @returns {boolean} return.deleteDelims - Whether to delete delimiters after applying.
 *
 */
function collectConfigFromForm(form, applyingStyle) {
  let defaults = DEFAULT_STYLE_JSON_OBJ["default"];

  let styleName, font, textColor, highlightColor, fontSize, bold, italic, underline,
      startChar, endChar, includeDelims, deleteDelims;
  let styleData;

  if (form) {
    styleName = String(form.style_name?.stringInputs.value[0] || "default").trim();
    font = String(form.font?.stringInputs.value[0] || defaults.font).trim();
    textColor = String(form.text_color?.stringInputs.value[0] || defaults.textColor).trim();
    highlightColor = String(form.color?.stringInputs.value[0] || defaults.highlightColor).trim();
    startChar = String(form.character1?.stringInputs.value[0] || defaults.startChar).trim();
    endChar = String(form.character2?.stringInputs.value[0] || defaults.endChar).trim();
    fontSize = Number(String(form.font_size?.stringInputs.value[0] || defaults.fontSize).trim()) || 11;

    if (!Number.isFinite(fontSize) || fontSize <= 0) {
      fontSize = 11; // fallback
    } else {
      fontSize = Math.min(Math.max(fontSize, 2), 200);
    }

    if(applyingStyle && !form.bold_switch && !form.italic_switch && !form.underline_switch) {
      styleData = getStyle(styleName) ?? defaults;
      bold = styleData.bold;
      italic = styleData.italic;
      underline = styleData.underline;
    } 
    else {
      bold = !!form.bold_switch;
      italic = !!form.italic_switch;
      underline = !!form.underline_switch;
    }
    includeDelims = !!form.include_switch;
    deleteDelims = !!form.delete_switch;
  }

  // normalize colors (reuse helper)
  textColor = normalizeHexColor(textColor, '#000000');
  highlightColor = normalizeHexColor(highlightColor, '#efefef');

  // Automatically maps variable names to variable values.
  return { font, textColor, highlightColor, fontSize, bold, italic, underline,
           startChar, endChar, includeDelims, deleteDelims };
}
