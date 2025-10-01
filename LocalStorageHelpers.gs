
const KEY = 'SAVED_STYLES_V1';

const DEFAULT_STYLE_JSON_OBJ = {
  "default": {
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
    deleteDelims: false
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
  name = String(name || '').trim();
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
  return loadStylesData()[name] || null;
}
