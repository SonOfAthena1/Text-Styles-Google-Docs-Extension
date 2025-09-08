/**
 * @module ButtonClickEventHandlers
 * Functions that handle button clicks and other similar events.
 */


/**
 * Saves a new style configuration provided by the user through the form.
 *
 * - Extracts the style name from the form input.
 * - Validates that the name is not empty and not already in use.
 * - Collects configuration settings from the form and saves them.
 * - Returns a notification with success or error status.
 *
 * @param {GoogleAppsScript.Events.EventObject} e  The event object containing form inputs.
 * @returns {GoogleAppsScript.Card_Service.ActionResponse} An action response with a notification result.
 */
function saveStyle_(e) {
  const form = e?.commonEventObject?.formInputs;
  const name = String(form?.style_name?.stringInputs?.value?.[0] || '').trim();
  if (!name) return createResultNotification({ message: 'Please enter a style name.' });
  if(getStyle(name)) return createResultNotification({ message: 'That style name already exists, please try something else.'})

  const cfg = collectConfigFromForm(form);
  try {
    addStyleAndSave(name, cfg);
    return createResultNotification({ message: `Saved style "${name}".` });
  } catch (err) {
    return createResultNotification({ message: `Failed to save: ${err.message}` });
  }
}

/**
 * Deletes a previously saved style by its name.
 *
 * - Extracts the style name from the form input.
 * - Validates that a name was provided.
 * - Removes the style from storage.
 * - Returns a notification with the deletion result.
 *
 * @param {GoogleAppsScript.Events.EventObject} e  The event object containing form inputs.
 * @returns {GoogleAppsScript.Card_Service.ActionResponse} An action response with a notification result.
 */
function deleteSavedStyle_(e) {
  const form = e?.commonEventObject?.formInputs;
  const name = String(form?.style_name?.stringInputs?.value?.[0] || '').trim();
  if (!name) return createResultNotification({ message: 'Select a saved style first.' });
  deleteStyle(name);
  return createResultNotification({ message: `Deleted style "${name}".` });
}

/**
 * Opens the style editor card for the given style.
 *
 * - Reads style name, data, and advanced toggle state from parameters.
 * - Builds a new style card with the provided data.
 * - Navigates to the new card in the UI.
 *
 * @param {GoogleAppsScript.Events.EventObject} e  The event object containing parameters.
 * @returns {GoogleAppsScript.Card_Service.ActionResponse} An action response updating the navigation stack.
 */
function onEditStyle_(e) {
  let styleName = e?.parameters?.name || "";
  let styleData = e?.parameters?.data ? JSON.parse(e.parameters.data) : {};
  let showAdv = e?.parameters?.showAdvanced === '1';

  let nav = CardService.newNavigation().updateCard(styleCard(styleName, styleData, showAdv));
  return (
    CardService.newActionResponseBuilder().setNavigation(nav).build()
  );
}

/**
 * Applies current style options to document.
 * 
 * - Reads style options from current form
 * - Uses applyStyleToDoc method, which returns a count of times style was applied
 * - Creates notification if there is no current text with the given delimeters
 * - Creates notification for the number of times the given style was applied on the doc
 * 
 * @param {GoogleAppsScript.Events.EventObject} e  The event object containing form inputs.
 * @returns {GoogleAppsScript.Card_Service.ActionResponse} An action response with a notification result.
 */
function applyStyle_(e) {
  const form = e?.commonEventObject?.formInputs;
  const name = String(form?.style_name?.stringInputs?.value?.[0] || 'Untitled').trim();
  const cfg = collectConfigFromForm(form);

  let count = applyStyleToDoc(cfg);

  if (count === 0) {
    return createResultNotification({
      message: 'No text found between your delimiters in the current selection/document.'
    });
  }

  // Show result message
  let msg = 'Updated ' + count + ' occurrence' + (count === 1 ? '' : 's') +
            ' with the styling options set for ' + name + '.';

  return createResultNotification({message: msg});
}

/**
 * Creates a standardized notification action response.
 *
 * - Accepts an object with a message property.
 * - If no message is provided, shows a default error message.
 * - Returns an action response that displays the notification in the UI.
 *
 * @param {Object} e  An object containing a `parameters` property with a `message` string.
 * @param {Object} e.parameters  Parameters object containing the message.
 * @param {string} [e.parameters.message]  The message to display in the notification.
 * @returns {GoogleAppsScript.Card_Service.ActionResponse} An action response with a notification.
 */
function createResultNotification(e) {
  var params = (e && e.parameters) ? e.parameters : (e || {});

  // Safely read values with fallbacks
  var msg = params.message ?? 'Sorry an error occured. Please refresh and try again';

  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification().setText(msg))
    .build();
}

/**
 * Event handler for returning to the home page
 * 
 * @return {CardService.ActionResponse} Navigation response with updated card.
 */
function goBackToHome_() {
  var nav = CardService.newNavigation().updateCard(buildCard_());
  return CardService.newActionResponseBuilder().setNavigation(nav).build();
}

