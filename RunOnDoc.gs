// Runs when you click Run in the sidebar
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


function normalizeHexColor(val, fallback) {
  if (!val) return fallback;
  // add leading # if user omitted it, then validate 3/6 hex form
  var withHash = val.startsWith('#') ? val : ('#' + val);
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(withHash) ? withHash : fallback;
}



