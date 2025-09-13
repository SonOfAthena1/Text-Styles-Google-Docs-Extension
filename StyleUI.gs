/**
 * Builds a detailed style configuration card for editing or creating a style.
 * 
 * - Displays inputs for style name, font, text color, highlight color, etc.
 * - Includes a "view more" toggle to reveal advanced options such as font size, bold, italic, and underline.
 * - Adds controls for delimiters and switches.
 * - Provides action buttons for running the style, saving, or deleting.
 * 
 * @param {string} styleName - The name of the style being edited.
 * @param {Object} styleData - The style configuration data.
 * @param {boolean} showAdv - Whether to show advanced controls.
 * @return {CardService.Card} The constructed style editor card.
 * @private
 */
function styleCard(styleName, styleData, showAdv) {
  let card = CardService.newCardBuilder()

  let section = CardService.newCardSection()
    .addWidget(
        styleNameInputCard(styleName)
    )
    .addWidget(
        descriptionCard()
    )
    .addWidget(
      tipsButtonCard()
    )
    .addWidget(
      fontInputCard(styleData)
    )
    .addWidget(
      textColorCard(styleData)
    )
    .addWidget(
      highlightColorCard(styleData)
    );
  
  if (!showAdv){
    section
      .addWidget(
        viewMoreCard(styleName, styleData, showAdv)
      );
  } 
  else {
    section
      .addWidget(
        fontSizeCard(styleData)
      )
      .addWidget(
        boldSwitchCard(styleData)
      )
      .addWidget(
        italicSwitchCard(styleData)
      )
      .addWidget(
        underlineSwitchCard(styleData)
      )
      .addWidget(
        viewMoreCard(styleName, styleData, showAdv)
      );
  }

  // Buttons row
  section
    .addWidget(
      startCharCard(styleData)
    )
    .addWidget(
      endCharCard(styleData)
    )
    .addWidget(
      deleteSwitchCard(styleData)
    )
    .addWidget(
      includeSwitchCard(styleData)
    )
    .addWidget(
      saveStyleButton()
    )
    .addWidget(
      runButtonCard()
    )
    .addWidget(
      deleteStyleButton()
    )
    .addWidget(
      goBackToHomeButton()
    );

  card.addSection(section);
  return card.build();
}

