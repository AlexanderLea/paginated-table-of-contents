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
    var par = pars[i];
    
     // Retrieve the paragraph's attributes.
     var atts = par.getAttributes();
       
     //check value of heading attribute, and add to map accordingly
     if(atts['HEADING'] != DocumentApp.ParagraphHeading.NORMAL){
       var p; //store heading's parent
       if(atts['HEADING'] === DocumentApp.ParagraphHeading.HEADING2 
         || atts['HEADING'] === DocumentApp.ParagraphHeading.HEADING3){
           parent = i - 1;
         }
         
         headingsArr.push({id: i, text: par.getText(), level: atts['HEADING'], parent: p, page: 1});
     }
  }
     /*
     switch(atts['HEADING']){
       case DocumentApp.ParagraphHeading.HEADING1:
         headingsArr.push({id: i, text: par.getText(), level: atts['HEADING'], parent: null, page: 1});
         break;
       case DocumentApp.ParagraphHeading.HEADING2:
         var p = i-1;
         headingsArr.push({id: i, text: par.getText(), level: atts['HEADING'], parent: p, page: 1});
         break;
       case DocumentApp.ParagraphHeading.HEADING3:
         var p = i-1;
         headingsArr.push({id: i, text: par.getText(), level: atts['HEADING'], parent: p, page: 1});
         break;
       default:
         break;
     }     
  }
  */
  for (var h in headingsArr) {
    Logger.log('id: %s, text: %s, heading level: %s, parent: %s, page: %s, ', 
      h, 
      headingsArr[h].text,
      headingsArr[h].level,
      headingsArr[h].parent,
      headingsArr[h].page
   );
  }
}
  
  
  //foreach paragraph
  //for(var par in pars){
    //body.appendParagraph('found a child');
    
    //for atts = par.getAttributes();
    
    //for(var att in atts){
    //  body.appendParagraph(att + ":" + atts[att]);
    //}
  //}