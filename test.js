function getDomainUsersList() {
  
  var users = [];
  var options = {
    domain: "stopnarcos.club",
    customer: "my_customer",
    maxResults: 100,
    projection: "basic", 
    viewType: "domain_public",
    orderBy: "email"
  }
  
  do {
    var response = AdminDirectory.Users.list(options);
    response.users.forEach(function(user) {
      users.push([user.name.fullName, user.primaryEmail]);
    });
    
    // For domains with many users, the results are paged
    if (response.nextPageToken) {
      options.pageToken = response.nextPageToken;
    }
  } while (response.nextPageToken);
  
  // Insert data in a spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Users") || ss.insertSheet("Users", 1);
  sheet.getRange(1,1,users.length, users[0].length).setValues(users);
  
}
