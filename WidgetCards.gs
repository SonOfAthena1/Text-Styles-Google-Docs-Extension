// SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0
// © 2025 Leland Cuellar — Commercial use requires a separate license.

/**
 * @module UIWidgets
 * Helper functions that build reusable CardService widgets
 * for the Google Docs add-on interface.
 */

/**
 * Style data used to build form widgets and actions.
 * @typedef {Object} StyleData
 * @property {string} [font]
 * @property {string} [textColor]          // HEX like "#000000"
 * @property {string} [highlightColor]     // HEX like "#d9d9d9"
 * @property {string} [startChar]
 * @property {string} [endChar]
 * @property {boolean} [deleteDelims]
 * @property {boolean} [includeDelims]
 * @property {string|number} [fontSize]
 * @property {boolean} [bold]
 * @property {boolean} [italic]
 * @property {boolean} [underline]
 */

/**
 * Builds a decorated text widget showing a style name with an "Edit" button.
 * The button passes the style data to the `onEditStyle_` handler.
 *
 * @param {string} styleName  The name of the style.
 * @param {StyleData} styleData  The style configuration object.
 * @return {CardService.DecoratedText} Decorated text widget with edit button.
 */
function styleNameAndEditCard(styleName, styleData) {
  // console.log(JSON.stringify(styleData));
  return (
    CardService.newDecoratedText()
      .setText(styleName)
      .setButton(
        CardService.newTextButton()
          .setText("Edit")
          .setOnClickAction(
            CardService.newAction()
              .setFunctionName("onEditStyle_")
              .setParameters({
                name: String(styleName),
                data: JSON.stringify(styleData),
                showAdvanced: '0'
              })
          )
      )
  );
}

/**
 * Builds a "+" button for creating a new style.
 * Opens the edit form with default style data.
 *
 * @return {CardService.TextButton} New style button widget.
 */
function createNewStyleButton() {
  return (
    CardService.newTextButton()
      .setText('+')
      .setOnClickAction(
        CardService.newAction()
          .setFunctionName('onEditStyle_')
          .setParameters({
            name: "default",
            data: JSON.stringify(DEFAULT_STYLE_JSON_OBJ["default"]),
            showAdvanced: '0'
          })
      )
  );
}

/**
 * Builds a text input for entering or editing a style name.
 *
 * @param {string} styleName  The current style name.
 * @return {CardService.TextInput} Style name input widget.
 */
function styleNameInputCard(styleName) {
  return (
    CardService.newTextInput()
      .setTitle('Style Name')
      .setFieldName('style_name')
      .setValue(styleName)
  );
}

/**
 * Builds a paragraph with a short description of how to use the add-on.
 *
 * @return {CardService.TextParagraph} Description paragraph widget.
 */
function descriptionCard() {
  return (
    CardService.newTextParagraph().setText(
      'Enter styling options like: font, text color, highlight color (hex, e.g., #d9d9d9), and start/end characters which mark what text should be styled. For example < this text will be styled >. Save your style, then click \'Apply Style\' to use it.'
    )
  );
}

/**
 * Builds a "Tips" button that shows a pop-up notification about usage.
 *
 * @return {CardService.TextButton} Tips button widget.
 */
function tipsButtonCard() {
  let thisTitle = 'Tips';
  let msg = 'If you want the markers to work across new lines (enters), press shift enter when entering, otherwise an end marker is needed for the end of every paragraph.';

  return (
    CardService.newTextButton()
      .setText(thisTitle)
      .setOnClickAction(
        CardService.newAction()
          .setFunctionName('createResultNotification')
          .setParameters({ message: msg })
      )
  );
}

/**
 * Builds a text input for font family.
 *
 * @param {StyleData} styleData  The style configuration.
 * @return {CardService.TextInput} Font input widget.
 */
function fontInputCard(styleData) {
  return (
    CardService.newTextInput()
      .setTitle('Font family')
      .setFieldName('font')
      .setValue(styleData.font)
  );
}

/**
 * Builds a text input for text (foreground) color.
 *
 * @param {StyleData} styleData  The style configuration.
 * @return {CardService.TextInput} Text color input widget.
 */
function textColorCard(styleData) {
  return (
    CardService.newTextInput()
      .setTitle('Text color (HEX)')
      .setFieldName('text_color')
      .setValue(styleData.textColor)
  );
}

/**
 * Builds a text input for highlight (background) color.
 *
 * @param {StyleData} styleData  The style configuration.
 * @return {CardService.TextInput} Highlight color input widget.
 */
function highlightColorCard(styleData) {
  return (
    CardService.newTextInput()
      .setTitle('Highlight color (HEX)')
      .setFieldName('color')
      .setValue(styleData.highlightColor)
  );
}

/**
 * Builds a text input for the start delimiter character(s).
 *
 * @param {StyleData} styleData  The style configuration.
 * @return {CardService.TextInput} Start delimiter input widget.
 */
function startCharCard(styleData) {
  return (
    CardService.newTextInput()
      .setTitle('The start character(s) to use for enclosing')
      .setFieldName('character1')
      .setValue(styleData.startChar)
  );
}

/**
 * Builds a text input for the end delimiter character(s).
 *
 * @param {StyleData} styleData  The style configuration.
 * @return {CardService.TextInput} End delimiter input widget.
 */
function endCharCard(styleData) {
  return (
    CardService.newTextInput()
      .setTitle('The end character(s) to use for enclosing')
      .setFieldName('character2')
      .setValue(styleData.endChar)
  );
}

/**
 * Builds a switch for deleting delimiters after styling.
 *
 * @param {StyleData} styleData  The style configuration.
 * @return {CardService.DecoratedText} Switch widget.
 */
function deleteSwitchCard(styleData) {
  return (
    CardService.newDecoratedText()
      .setText('Delete delimiter characters with run')
      .setSwitchControl(
        CardService.newSwitch()
          .setFieldName('delete_switch')       // form key
          .setValue('true')                    // value sent when ON
          .setSelected(styleData.deleteDelims) // start value
      )
  );
}

/**
 * Builds a switch for including delimiters in the styling.
 *
 * @param {StyleData} styleData  The style configuration.
 * @return {CardService.DecoratedText} Switch widget.
 */
function includeSwitchCard(styleData) {
  return (
    CardService.newDecoratedText()
      .setText('Include delimiter characters in style')
      .setSwitchControl(
        CardService.newSwitch()
          .setFieldName('include_switch')
          .setValue('true')
          .setSelected(styleData.includeDelims)
      )
  );
}

/**
 * Builds a button to toggle advanced styling options.
 *
 * @param {string} styleName  The style name.
 * @param {StyleData} styleData  The style configuration object.
 * @param {boolean} showAdv  Whether advanced options are currently shown.
 * @return {CardService.TextButton} Toggle button widget.
 */
function viewMoreCard(styleName, styleData, showAdv) {
  return (
    CardService.newTextButton()
      .setText(showAdv ? 'View less options' : 'View more text styling options')
      .setOnClickAction(
        CardService.newAction()
          .setFunctionName('onEditStyle_')
          .setParameters({
            name: String(styleName),
            data: JSON.stringify(styleData),
            showAdvanced: showAdv ? '0' : '1',
            clickedViewMore: '1'
          })
      )
  );
}

/**
 * Builds a paragraph with a short warning to users to click SAVE before clicking VIEW LESS.
 *
 * @return {CardService.TextParagraph} Description paragraph widget.
 */
function advOptionsSavingInstructions() {
  return (
    CardService.newTextParagraph().setText(
      'CLICK \'Save\' BEFORE clicking \'View Less\''
    )
  )
}

/**
 * Builds a text input for font size.
 *
 * @param {StyleData} styleData  The style configuration.
 * @return {CardService.TextInput} Font size input widget.
 */
function fontSizeCard(styleData) {
  return (
    CardService.newTextInput()
      .setTitle('Font Size')
      .setFieldName('font_size')
      .setValue(styleData.fontSize)
  );
}

/**
 * Builds a switch for toggling bold style.
 *
 * @param {StyleData} styleData  The style configuration.
 * @return {CardService.DecoratedText} Bold switch widget.
 */
function boldSwitchCard(styleData) {
  return (
    CardService.newDecoratedText()
      .setText('Bold')
      .setSwitchControl(
        CardService.newSwitch()
          .setFieldName('bold_switch')
          .setValue('true')
          .setSelected(styleData.bold)
      )
  );
}

/**
 * Builds a switch for toggling italic style.
 *
 * @param {StyleData} styleData  The style configuration.
 * @return {CardService.DecoratedText} Italic switch widget.
 */
function italicSwitchCard(styleData) {
  return (
    CardService.newDecoratedText()
      .setText('Italic')
      .setSwitchControl(
        CardService.newSwitch()
          .setFieldName('italic_switch')
          .setValue('true')
          .setSelected(styleData.italic)
      )
  );
}

/**
 * Builds a switch for toggling underline style.
 *
 * @param {StyleData} styleData  The style configuration.
 * @return {CardService.DecoratedText} Underline switch widget.
 */
function underlineSwitchCard(styleData) {
  return (
    CardService.newDecoratedText()
      .setText('Underline')
      .setSwitchControl(
        CardService.newSwitch()
          .setFieldName('underline_switch')
          .setValue('true')
          .setSelected(styleData.underline)
      )
  );
}

/**
 * Builds the main "Apply Style" button.
 * Runs the document styling function.
 *
 * @return {CardService.TextButton} Run button widget.
 */
function runButtonCard() {
  return (
    CardService.newTextButton()
      .setText('Apply Style')
      .setOnClickAction(CardService.newAction().setFunctionName('applyStyle_'))
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
  );
}

/**
 * Builds a "Save Style" button.
 * Triggers saving the current style configuration.
 *
 * @return {CardService.TextButton} Save button widget.
 */
function saveStyleButton() {
  return (
    CardService.newTextButton()
      .setText('Save Style')
      .setOnClickAction(CardService.newAction().setFunctionName('saveStyle_'))
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
  );
}

/**
 * Builds a "Delete Style" button.
 * Triggers deletion of the current saved style.
 *
 * @return {CardService.TextButton} Delete button widget.
 */
function deleteStyleButton() {
  return (
    CardService.newTextButton()
      .setText('Delete Style')
      .setOnClickAction(CardService.newAction().setFunctionName('showConfirmCard_'))
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED_TONAL)
  );
}

/**
 * Builds a "Back to Home" button.
 *
 * @return {CardService.TextButton} Back to Home button widget.
 */
function goBackToHomeButton() {
  return (
    CardService.newTextButton()
      .setText('Back to Home')
      .setOnClickAction(CardService.newAction().setFunctionName('goBackToHome_'))
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED_TONAL)
  );
}

/**
 * Builds a confirmation message paragraph for deleting a saved style.
 *
 * @param {string} name  The style name to display in the confirmation prompt.
 * @return {CardService.TextParagraph} Confirmation message widget.
 */
function confirmDeleteMessageCard(name) {
  return(
    CardService.newTextParagraph()
      .setText(`Are you sure you want to delete ${name}?`)
  )
}

/**
 * Builds a ButtonSet with "No" and "Yes" actions for delete confirmation.
 * "No" reopens the edit view; "Yes" deletes the saved style.
 *
 * @param {string} name  The style name of the style to be deleted.
 * @return {CardService.ButtonSet} Button set widget.
 */
function yesAndNoConfirmDeleteButtons(name) {
  return(
    CardService.newButtonSet()
      .addButton(
        CardService.newTextButton()
          .setText('No, don\'t delete')
          .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
          .setOnClickAction(
            CardService.newAction()
              .setFunctionName('onEditStyle_')
              .setParameters({
                name: String(name),
                data: JSON.stringify(getStyle(name)),
                showAdvanced: '0'
              })
          )
      )
      .addButton(
        CardService.newTextButton()
          .setText('Yes, delete it')
          .setTextButtonStyle(CardService.TextButtonStyle.FILLED_TONAL)
          .setOnClickAction(
            CardService.newAction()
              .setFunctionName('deleteSavedStyle_')
              .setParameters({styleName: name})
          )
      )
  )
}

/**
 * Utility to build a single-section Card with a header title.
 *
 * @param {string} title  Card header title.
 * @param {CardService.CardSection} section  Section to add to the card.
 * @return {CardService.Card} Built card.
 */
function cardPage(title, section) {
  return (
    CardService.newCardBuilder()
      .setHeader(CardService.newCardHeader().setTitle(title))
      .addSection(section)
      .build()
    );
}





