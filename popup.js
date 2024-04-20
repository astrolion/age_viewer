document.getElementById("saveButton").addEventListener("click", function() {
    let birthday = document.getElementById("birthdayInput").value;
    chrome.storage.sync.set({ birthday: birthday }, function() {
      console.log("Birthday saved!");
      chrome.runtime.sendMessage({ message: "calculateAge" });
    });
  });
  