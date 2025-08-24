/*** Workspace Editor Add-on: Text Styles ***/


/**
 * Homepage entry point for the Docs add-on.
 * Builds and displays the main style configuration card.
 * 
 * @param {Object} e Add-on homepage event object (unused).
 * @return {CardService.Card} The initial UI card.
 */
function onHomepage(e) {
  return buildCard_();
}

const VERSION = '0.1.2';

/**
 * Builds the main style selection card, optionally with advanced options.
 * 
 * @param {Object} [options] Options for building the card.
 * @param {boolean|string} [options.showAdvanced] - Whether to show advanced controls (true or '1').
 * @return {CardService.Card} The constructed card.
 */
function buildCard_({ showAdvanced } = {}) {
  var showAdv = showAdvanced === true || showAdvanced === '1';

  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('Choose Style (v' + VERSION + ')'));

  var section = CardService.newCardSection()
    .addWidget(
      descriptionCard()
    )
    .addWidget(
      tipsButtonCard()
    )
    .addWidget(
      fontInputCard()
    )
    .addWidget(
      textColorCard()
    )
    .addWidget(
      highlightColorCard()
    );
  
  if (!showAdv){
    section
      .addWidget(
        viewMoreCard(showAdv)
      );
  }
    
  if (showAdv) {
    section
      .addWidget(
        fontSizeCard()
      )
      .addWidget(
        boldSwitchCard()
      )
      .addWidget(
        italicSwitchCard()
      )
      .addWidget(
        underlineSwitchCard()
      )
      .addWidget(
        viewMoreCard(showAdv)
      );
  }

  // Buttons row
  section
    .addWidget(
      startCharCard()
    )
    .addWidget(
      endCharCard()
    )
    .addWidget(
      deleteSwitchCard()
    )
    .addWidget(
      includeSwitchCard()
    )
    .addWidget(
      runButtonCard()
    );

  card.addSection(section);
  return card.build();
}

/**
 * Action handler for toggling advanced styling options.
 * Updates the current card to show or hide advanced styling widgets.
 * 
 * @param {Object} e The event object containing parameters.
 * @return {CardService.ActionResponse} Navigation response with updated card.
 */
function toggleAdvanced_(e) {
  var show = e && e.parameters && e.parameters.showAdvanced === '1';
  var nav = CardService.newNavigation().updateCard(buildCard_({ showAdvanced: show }));
  return (
    CardService.newActionResponseBuilder().setNavigation(nav).build()
  );
}

/**
 * Action handler for returning to the main styling page
 * 
 * @return {CardService.ActionResponse} Navigation response with updated card.
 */
function goBackToMain_() {
  var nav = CardService.newNavigation().updateCard(buildCard_());
  return CardService.newActionResponseBuilder().setNavigation(nav).build();
}



