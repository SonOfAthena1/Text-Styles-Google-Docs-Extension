/*** Workspace Editor Add-on: Text Styles ***/


/**
 * Homepage entry point for the Docs add-on.
 * Builds and displays the main styles list card.
 * 
 * @return {CardService.Card} The initial UI card.
 */
function onHomepage(e) {
  return buildCard_();
}

const VERSION = '1.1.0';

/**
 * Builds the main style selection card with all saved styles.
 * 
 * - Loads stored style configurations.
 * - Lists each style with an "Edit" button.
 * - Provides a button to create a new style.
 * 
 * @return {CardService.Card} The constructed card.
 */
function buildCard_() {
  const jsonObject = loadStylesData();

  let section = CardService.newCardSection();

  Object.entries(jsonObject).forEach(([styleName, styleData]) => {
    section.addWidget(
      styleNameAndEditCard(styleName, styleData)
    );
  });

  section.addWidget(
    createNewStyleButton()
  );

  return cardPage(`Version ${VERSION}`, section);
}


