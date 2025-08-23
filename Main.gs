/*** Workspace Editor Add-on: Placeholder Tools ***/

// Sidebar card shown when you open the add-on
function onHomepage(e) {
  return buildCard_();
}


function buildCard_({ showAdvanced } = {}) {
  var showAdv = showAdvanced === true || showAdvanced === '1';

  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('Choose Style'));

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

/** Action handler toggles the advanced section by updating the current card */
function toggleAdvanced_(e) {
  var show = e && e.parameters && e.parameters.showAdvanced === '1';
  var nav = CardService.newNavigation().updateCard(buildCard_({ showAdvanced: show }));
  return (
    CardService.newActionResponseBuilder().setNavigation(nav).build()
  );
}

function goBackToMain_() {
  var nav = CardService.newNavigation().updateCard(buildCard_());
  return CardService.newActionResponseBuilder().setNavigation(nav).build();
}




