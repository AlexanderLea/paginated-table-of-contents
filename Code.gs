/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Create table of contents', 'scanDocument')
      .addToUi();
}

/**
 * Runs when the add-on is installed.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen(e);
}

function scanDocument() { 
  var headingsArr = [];
  //var map = new Map();
  
  var body = DocumentApp.getActiveDocument().getBody();
  var numChildren = body.getNumChildren();
  
  var pars = body.getParagraphs();
  Logger.log('# Paragraphs: ' + pars.length);
  
  for(var i=0; i<pars.length; i++){
    var paragraph = pars[i];
    var parentHeading = null; //store heading's parent
    
     // Retrieve the paragraph's attributes.
     var paragraphHeading = paragraph.getHeading();
       
     //check value of heading attribute, and add to map accordingly
     if(paragraphHeading != DocumentApp.ParagraphHeading.NORMAL){
     
       if(paragraphHeading === DocumentApp.ParagraphHeading.HEADING2 
         || paragraphHeading === DocumentApp.ParagraphHeading.HEADING3){
           parentHeading = i-2;
         }
         
         headingsArr.push(
           {
             id: i, 
             text: paragraph.getText(), 
             level: paragraphHeading, 
             parentHeading: parentHeading, 
             page: 1, 
             url: paragraph.getLinkUrl()
           });
     }
  }
  for (var h in headingsArr) {
    Logger.log('id: %s, text: %s, level: %s, parentHeading: %s, page: %s, url: %s ', 
      h, 
      headingsArr[h].text,
      headingsArr[h].level,
      headingsArr[h].parentHeading,
      headingsArr[h].page,
      headingsArr[h].url
   );
  }
}