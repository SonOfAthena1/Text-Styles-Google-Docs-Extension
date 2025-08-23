
function descriptionCard() {
  return (
    CardService.newTextParagraph().setText(
      'Enter a font family, text color, highlight color (hex, e.g., #d9d9d9), and start/end characters to mark what should be styled then click Run.'
    )
  );
}

function tipsButtonCard() {
  var thisTitle = 'Tips';
  var msg = 'If you want the markers to work across new lines (enters), press shift enter when entering, otherwise an end marker is needed for the end of every paragraph.';

  return (
    CardService.newTextButton()
      .setText(thisTitle)
      .setOnClickAction(
        CardService.newAction()
          .setFunctionName('createResultCard')
          .setParameters({title: thisTitle, message: msg})
      )
      // .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
  );
}

function fontInputCard() {
  return (
    CardService.newTextInput()
    .setTitle('Font family')
    .setFieldName('font')
    .setValue('Consolas')
  );
}

function textColorCard() {
  return (
    CardService.newTextInput()
      .setTitle('Text color (HEX)')
      .setFieldName('text_color')
      .setValue('#000000') // default Light gray 2
  );
}

function highlightColorCard() {
  return (
    CardService.newTextInput()
      .setTitle('Highlight color (HEX)')
      .setFieldName('color')
      .setValue('#efefef') // default Light gray 2
  );
}

function startCharCard() {
  return (
    CardService.newTextInput()
      .setTitle('The start character(s) to use for enclosing')
      .setFieldName('character1')
      .setValue('<')
  );
}

function endCharCard() {
  return (
    CardService.newTextInput()
      .setTitle('The end character(s) to use for enclosing')
      .setFieldName('character2')
      .setValue('>')
  );
}

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

function fontSizeCard() {
  return (
    CardService.newTextInput()
      .setTitle('Font Size')
      .setFieldName('font_size')
      .setValue('11')
  );
}

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

// Buttons row
function runButtonCard() {
  return (
    CardService.newTextButton()
      .setText('Apply Styles')
      .setOnClickAction(CardService.newAction().setFunctionName('runOnDoc_'))
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
  );
}

function continueStylingButtonCard() {
  return (
    CardService.newTextButton()
      .setText('Continue Styling')
      .setOnClickAction(CardService.newAction().setFunctionName('goBackToMain_'))
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
  );
}








