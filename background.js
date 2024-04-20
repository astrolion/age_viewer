chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "calculateAge") {
      calculateAge();
    }
  });
  
  function calculateAge() {
    chrome.storage.sync.get("birthday", function(data) {
      if (data.birthday) {
        let birthday = new Date(data.birthday);
        let today = new Date();
  
        let ageInYears = today.getFullYear() - birthday.getFullYear();
        let ageInMonths = today.getMonth() - birthday.getMonth();
        let ageInDays = today.getDate() - birthday.getDate();
  
        if (ageInDays < 0) {
          ageInMonths--;
          ageInDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
  
        if (ageInMonths < 0) {
          ageInYears--;
          ageInMonths = 12 + ageInMonths;
        }
  
        createAgeNotification(ageInYears, ageInMonths, ageInDays);
      }
    });
  }
  
  function createAgeNotification(years, months, days) {
    let notificationTitle = "Your Current Age";
    let notificationMessage = years + " years, " + months + " months, " + days + " days";
  
    chrome.notifications.create({
      type: "basic",
      //iconUrl: "icon.png", // Replace with your icon path (optional)
      title: notificationTitle,
      message: notificationMessage
    });
  }
  