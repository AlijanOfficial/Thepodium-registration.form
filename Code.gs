// Google Sheet > Extensions > Apps Script me paste karein. Deploy > Web app > Anyone.
var HEADERS=['Timestamp','Full Name','Class','Section','Areas of Interest','Why It Appeals','Prior Experience','Experience Details','Motivation','Most Interesting Area','Describe Yourself','Status','Remarks','Reviewed By','Date'];
function doPost(e){
  var d=JSON.parse(e.postData.contents);
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var sh=ss.getSheetByName('Applications')||ss.insertSheet('Applications');
  if(sh.getLastRow()===0){sh.appendRow(HEADERS);sh.getRange(1,1,1,HEADERS.length).setFontWeight('bold');sh.setFrozenRows(1);}
  sh.appendRow([new Date(),d.name,d.cls,d.section,d.interests,d.why,d.experience,d.expDetails,d.motivation,d.area,d.describe,'','','','']);
  return ContentService.createTextOutput('ok');
}
