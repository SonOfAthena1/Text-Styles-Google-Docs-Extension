// SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0
// © 2025 Leland Cuellar — Commercial use requires a separate license.

const KEY = 'SAVED_STYLES_V1';
const DEFAULT_STYLE_KEY = 'default';
const DEFAULT_STYLE_DISPLAY_NAME = 'Default Settings';

const DEFAULT_STYLE_JSON_OBJ = {
  [DEFAULT_STYLE_KEY]: {
    font: "Consolas",
    textColor: "#000000",
    highlightColor: '#efefef',
    fontSize: 11,
    bold: false,
    italic: false,
    underline: false,
    startChar: '<',
    endChar: '>',
    includeDelims: true,
    deleteDelims: false,
    transparentHighlight: false
  }
}

/**
 * Loads the styles object from UserProperties.
 * Falls back to an empty object if nothing is stored or parsing fails.
 *
 * @returns {Object} A mapping of style names to their configuration objects.
 */
function loadStylesData() {
  const localStorage = PropertiesService.getUserProperties();
  const raw = localStorage.getProperty(KEY);          // string or null
  
  let parsedJSON;
  try {
    parsedJSON = raw ? JSON.parse(raw) : {}; // {} if nothing saved yet
  } catch(e) {
    console.error(e);
    parsedJSON = {};
  }

  // Ensure a default style always exists in storage.
  if (!parsedJSON[DEFAULT_STYLE_KEY]) {
    parsedJSON[DEFAULT_STYLE_KEY] = DEFAULT_STYLE_JSON_OBJ[DEFAULT_STYLE_KEY];
    saveStylesObjToLocal(parsedJSON);
  }

  // console.log("Local storage is: " + JSON.stringify(parsedJSON));

  /*
    if(Object.keys(parsedJSON).length === 0){
      console.log('Didnt find styles');
      localStorage.setProperty(KEY, JSON.stringify(DEFAULT_STYLE_JSON_OBJ));
      console.log("JSON stored in local storage")
    }
  */

  return parsedJSON;
}

/**
 * Saves the provided styles object to UserProperties,
 * overwriting any previously stored data.
 *
 * @param {Object} stylesObj  The full styles dictionary to persist.
 */
function saveStylesObjToLocal(stylesObj) {
  const props = PropertiesService.getUserProperties();
  props.setProperty(KEY, JSON.stringify(stylesObj));
}

/**
 * Adds or updates a style in local storage and persists it.
 *
 * @param {string} name  The name of the style. Must not be empty.
 * @param {Object} config  The style configuration object (font, colors, etc.).
 * @throws {Error} If the name is empty or only whitespace.
 */
function addStyleAndSave(name, config) {
  name = normalizeStyleNameForStorage(name);
  if (!name) throw new Error('Style name is required.');
  const styles = loadStylesData();
  styles[name] = config;
  saveStylesObjToLocal(styles);
}

/**
 * Deletes a style from local storage if it exists.
 *
 * @param {string} name  The style name to remove.
 */
function deleteStyle(name) {
  name = normalizeStyleNameForStorage(name);
  if (name === DEFAULT_STYLE_KEY) return;
  const styles = loadStylesData();
  if (styles[name]) {
    delete styles[name];
    saveStylesObjToLocal(styles);
  }
}

/**
 * Retrieves a style configuration by name.
 *
 * @param {string} name  The style name.
 * @returns {Object|null} The style configuration if found, otherwise null.
 */
function getStyle(name) {
  return loadStylesData()[normalizeStyleNameForStorage(name)] || null;
}

/**
 * Converts user-facing style names into storage keys.
 *
 * @param {string} name
 * @returns {string}
 */
function normalizeStyleNameForStorage(name) {
  const normalized = String(name || '').trim();
  if (!normalized) return '';

  const lowered = normalized.toLowerCase();
  if (lowered === DEFAULT_STYLE_KEY || lowered === DEFAULT_STYLE_DISPLAY_NAME.toLowerCase()) {
    return DEFAULT_STYLE_KEY;
  }

  return normalized;
}

/**
 * Returns the UI label for a style key.
 *
 * @param {string} styleKey
 * @returns {string}
 */
function getStyleDisplayName(styleKey) {
  return styleKey === DEFAULT_STYLE_KEY ? DEFAULT_STYLE_DISPLAY_NAME : styleKey;
}
