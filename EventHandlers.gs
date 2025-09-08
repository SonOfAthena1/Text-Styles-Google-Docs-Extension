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
 * Builds a result notification for an event with an input message.
 * 
 * @param {Object} e  Event or plain object containing title and message.
 * @param {Object} [e.parameters]  Parameters when invoked as Action.
 * @param {string} [e.message]  Body text of the card.
 * @return {CardService.ActionResponse} Navigation response with result card.
 */
function createResultNotification(e) {
  var params = (e && e.parameters) ? e.parameters : (e || {});

  // Safely read values with fallbacks
  var msg = params.message ?? 'Sorry an error occured. Please refresh and try again';

  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification().setText(msg))
    .build();
}


