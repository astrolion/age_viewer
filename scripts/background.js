
import calculateAge from '/scripts/common.js';

/**
 * Initializes the background script.
 */
function init() {
    chrome.storage.local.get(['dateOfBirth'], (result) => {
        if (result.dateOfBirth) {
            console.log('Date of birth retrieved from storage:', result.dateOfBirth);
            const age = calculateAge(result.dateOfBirth);
            console.log('Calculated age:', age);
            viewAgeInBadgeAndTitle(age);
        } else {
            console.log('Date of birth not saved in storage.');
        }
    });
}

// Initialize the background script
init();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "updateAge") {
      console.log(request.message);
      viewAgeInBadgeAndTitle(request.message);
    }
});


function viewAgeInBadgeAndTitle(age){
    chrome.action.setBadgeText({
        text: ""+ age.years
    });
    chrome.action.setTitle({
        title: age.ageInTextFormat
    }); 
}
