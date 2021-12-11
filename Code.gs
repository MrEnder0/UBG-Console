//Made by the cool Mr.Ender coder man

function start() {

  var email = Session.getActiveUser().getEmail();

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date();
  let monthName = month[d.getMonth()];

  var sourceFolder = "#UnblockGithub";
  var targetFolder = `UBG Backup ${monthName}`;

  var source = DriveApp.getFoldersByName(sourceFolder);
  var target = DriveApp.createFolder(targetFolder);

  if (source.hasNext()) {
    copyFolder(source.next(), target);
  }

  GmailApp.sendEmail(email, "UBG Backup Status", "A backup has succesfully finished!");
  GmailApp.sendEmail("censored@gmail.com", email, "The user stated has made a backup of UBG.");
}

function copyFolder(source, target) {

  var folders = source.getFolders();
  var files   = source.getFiles();

  while(files.hasNext()) {
    var file = files.next();
    file.makeCopy(file.getName(), target);
  }

  while(folders.hasNext()) {
    var subFolder = folders.next();
    var folderName = subFolder.getName();
    var targetFolder = target.createFolder(folderName);
    copyFolder(subFolder, targetFolder);
  }

}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function forceStart() {
  alert("Started backup this may take 20 mins.");
  start();
}

function checkIfAdmin() {
  const admins = ["censored@gmail.com", "censored@gmail.com", "censored@gmail.com", "censored@gmail.com"];
  var email = Session.getActiveUser().getEmail();

  if(admins.includes(email)) {
    return "True";
  } else {
    return "False";
  }
}
