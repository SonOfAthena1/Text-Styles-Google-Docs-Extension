/**
 * Builds a descriptive text paragraph about how to use the tool.
 * 
 * @return {CardService.TextParagraph} A widget with instructions.
 */
function descriptionCard() {
  return (
    CardService.newTextParagraph().setText(
      'Enter a font family, text color, highlight color (hex, e.g., #d9d9d9), and start/end characters to mark what should be styled then click Run.'
    )
  );
}

/**
 * Builds a "Tips" button that provides a pop-up notification with a tip about usage.
 * 
 * @return {CardService.TextButton} A button widget.
 */
function tipsButtonCard() {
  var thisTitle = 'Tips';
  var msg = 'If you want the markers to work across new lines (enters), press shift enter when entering, otherwise an end marker is needed for the end of every paragraph.';

  return (
    CardService.newTextButton()
      .setText(thisTitle)
      .setOnClickAction(
        CardService.newAction()
          .setFunctionName('createResultNotification')
          .setParameters({message: msg})
      )
      // .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
  );
}

/**
 * Builds a text input for font family.
 * 
 * @return {CardService.TextInput} Font input widget.
 */
function fontInputCard() {
  return (
    CardService.newTextInput()
    .setTitle('Font family')
    .setFieldName('font')
    .setValue('Consolas')
  );
}

/**
 * Builds a text input for text (foreground) color.
 * 
 * @return {CardService.TextInput} Text color input widget.
 */
function textColorCard() {
  return (
    CardService.newTextInput()
      .setTitle('Text color (HEX)')
      .setFieldName('text_color')
      .setValue('#000000') // default Light gray 2
  );
}

/**
 * Builds a text input for highlight (background) color.
 * 
 * @return {CardService.TextInput} Highlight color input widget.
 */
function highlightColorCard() {
  return (
    CardService.newTextInput()
      .setTitle('Highlight color (HEX)')
      .setFieldName('color')
      .setValue('#efefef') // default Light gray 2
  );
}

/**
 * Builds a text input for the start delimiter character(s).
 * 
 * @return {CardService.TextInput} Start delimiter input.
 */
function startCharCard() {
  return (
    CardService.newTextInput()
      .setTitle('The start character(s) to use for enclosing')
      .setFieldName('character1')
      .setValue('<')
  );
}

/**
 * Builds a text input for the end delimiter character(s).
 * 
 * @return {CardService.TextInput} End delimiter input.
 */
function endCharCard() {
  return (
    CardService.newTextInput()
      .setTitle('The end character(s) to use for enclosing')
      .setFieldName('character2')
      .setValue('>')
  );
}

/**
 * Builds a switch for deleting delimiters after styling.
 * 
 * @return {CardService.DecoratedText} Switch widget.
 */
function deleteSwitchCard() {
  // Switch must be used as a control on a DecoratedText/KeyValue row
  return(
    CardService.newDecoratedText()
      .setText('Delete delimiter characters with run')
      .setSwitchControl(
        CardService.newSwitch()
          .setFieldName('delete_switch')   // form key
          .setValue('true')            // value sent when ON
          .setSelected(false)           // default off
      )
  );
}

/**
 * Builds a switch for including delimiters in the styling.
 * 
 * @return {CardService.DecoratedText} Switch widget.
 */
function includeSwitchCard() {
  // Switch must be used as a control on a DecoratedText/KeyValue row
  return (
    CardService.newDecoratedText()
      .setText('Include delimiter characters in style')
      .setSwitchControl(
        CardService.newSwitch()
          .setFieldName('include_switch')   // form key
          .setValue('true')            // value sent when ON
          .setSelected(true)           // default ON
      )
  );
}

/**
 * Builds a button that toggles advanced styling options visibility.
 * 
 * @param {boolean} showAdv - Whether advanced options are shown.
 * @return {CardService.TextButton} Toggle button.
 */
function viewMoreCard(showAdv) {
  return (
    CardService.newTextButton()
      .setText(showAdv ? 'View less options' : 'View more text styling options')
      .setOnClickAction(
        CardService.newAction()
          .setFunctionName('toggleAdvanced_')
          .setParameters({ showAdvanced: showAdv ? '0' : '1' })
      )
  );
}

/**
 * Builds a text input for font size.
 * 
 * @return {CardService.TextInput} Font size input widget.
 */
function fontSizeCard() {
  return (
    CardService.newTextInput()
      .setTitle('Font Size')
      .setFieldName('font_size')
      .setValue('11')
  );
}

/**
 * Builds a bold toggle switch.
 * 
 * @return {CardService.DecoratedText} Bold switch widget.
 */
function boldSwitchCard() {
  return (
    CardService.newDecoratedText()
      .setText('Bold')
      .setSwitchControl(
        CardService.newSwitch()
          .setFieldName('bold_switch')
          .setValue('true')
          .setSelected(false)
      )
  );
}

/**
 * Builds an italic toggle switch.
 * 
 * @return {CardService.DecoratedText} Italic switch widget.
 */
function italicSwitchCard() {
  return (
    CardService.newDecoratedText()
      .setText('Italic')
      .setSwitchControl(
        CardService.newSwitch()
          .setFieldName('italic_switch')
          .setValue('true')
          .setSelected(false)
      )
  );
}

/**
 * Builds an underline toggle switch.
 * 
 * @return {CardService.DecoratedText} Underline switch widget.
 */
function underlineSwitchCard() {
  return(
    CardService.newDecoratedText()
      .setText('Underline')
      .setSwitchControl(
        CardService.newSwitch()
          .setFieldName('underline_switch')
          .setValue('true')
          .setSelected(false)
      )
  );
}

/**
 * Builds the main "Run" button.
 * Executes the document styling operation.
 * 
 * @return {CardService.TextButton} Run button widget.
 */
function runButtonCard() {
  return (
    CardService.newTextButton()
      .setText('Apply Styles')
      .setOnClickAction(CardService.newAction().setFunctionName('runOnDoc_'))
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
  );
}



