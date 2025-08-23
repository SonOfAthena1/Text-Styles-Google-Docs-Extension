/**
 * Action handler for "Run" button.
 * Reads form values, applies styling, and shows result card.
 * 
 * @param {Object} e  Event object containing formInputs.
 * @return {CardService.ActionResponse} Response showing result card.
 */
function runOnDoc_(e) {
  var font = 'Consolas';
  var textColor = '#000000';
  var highlightColor = '#efefef';
  var fontSize = 11;
  var bold = false;
  var italic = false;
  var underline = false;
  var startChar = '<';
  var endChar = '>';
  var includeDelims = true;
  var deleteDelims = false;

  try {
    var form = e && e.commonEventObject && e.commonEventObject.formInputs;
    if (form) {
      font = String(form.font?.stringInputs.value[0] || font).trim();

      textColor = String(form.text_color?.stringInputs.value[0] || textColor).trim();
      
      highlightColor = String(form.color?.stringInputs.value[0] || highlightColor).trim();

      startChar = String(form.character1?.stringInputs.value[0] || startChar).trim();
  
      endChar = String(form.character2?.stringInputs.value[0] || endChar).trim();

      fontSize = Number(String(form.font_size?.stringInputs.value[0] || fontSize).trim());
      if (!Number.isFinite(fontSize) || fontSize <= 0) {
        fontSize = 11; // fallback
      }

      if (form.bold_switch) bold = true;
      if (form.italic_switch) italic = true;
      if (form.underline_switch) underline = true;
      
      if (!form.include_switch) includeDelims = false;

      if (form.delete_switch) deleteDelims = true;
    }
  } catch (error) {
    console.error("There was an error with the try", error);
  }

  console.log(`font: ${font}, textColor: ${textColor}, highlight color: ${highlightColor}, start char: ${startChar}, end char: ${endChar}, include delims: ${includeDelims}, deleteDelims: ${deleteDelims}`);

  textColor = normalizeHexColor(textColor, '#000000');
  highlightColor = normalizeHexColor(highlightColor, '#efefef');

  var count = setFontAndHighlightForAnglePlaceholders(
    font, textColor, highlightColor, fontSize, bold, italic, underline, startChar, endChar, includeDelims, deleteDelims
  );

  if (count === 0) {
    return createResultCard({
      title: 'No matches',
      message: 'No text found between your delimiters in the current selection/document.'
    });
  }

  // Show result message
  var msg = 'Updated ' + count + ' occurrence' + (count === 1 ? '' : 's') +
            ' with font "' + font + '" and highlight ' + highlightColor + '.';

  return createResultCard({title: 'Styled', message: msg});
}

/**
 * Builds a result card for any event with a title and message.
 * 
 * @param {Object} e  Event or plain object containing title and message.
 * @param {Object} [e.parameters]  Parameters when invoked as Action.
 * @param {string} [e.title]  Title of the card.
 * @param {string} [e.message]  Body text of the card.
 * @return {CardService.ActionResponse} Navigation response with result card.
 */
function createResultCard(e) {
  var params = (e && e.parameters) ? e.parameters : (e || {});

  // Safely read values with fallbacks
  var thisTitle = params.title ?? 'Error';
  var msg = params.message ?? 'Sorry an error occured. Please refresh and try again';

  var resultCard = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle(thisTitle))
    .addSection(
      CardService.newCardSection()
        .addWidget(CardService.newTextParagraph().setText(msg))
        .addWidget(
          continueStylingButtonCard()
        )
    )
  .build();
  
  return(
    CardService.newActionResponseBuilder()
      .setNavigation(CardService.newNavigation().updateCard(resultCard))
      .build()
  );
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


