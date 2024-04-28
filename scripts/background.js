import calculateAge from '/scripts/common.js';

/**
 * Initializes the extension by retrieving the date of birth from storage and updating age information.
 */
function initializeExtension() {
    chrome.storage.local.get(['dateOfBirth'], (result) => {
        if (result.dateOfBirth) {
            console.log('Date of birth retrieved from storage:', result.dateOfBirth);
            const age = calculateAge(result.dateOfBirth);
            console.log('Calculated age:', age);
            updateAgeDisplay(age);
        } else {
            console.log('Date of birth not saved in storage.');
        }
    });
}

/**
 * Updates the age display in the badge and title of the extension.
 * @param {Object} age - Age object containing years, months, days and age in text format.
 */
function updateAgeDisplay(age) {
    chrome.action.setBadgeText({
        text: "" + age.years
    });
    chrome.action.setTitle({
        title: age.ageInTextFormat
    });
}

// Event listeners

/**
 * Event listener for when the extension is started.
 * Initializes the extension.
 */
chrome.runtime.onStartup.addListener(() => {
    console.log('Browser started');
    initializeExtension();
});

/**
 * Event listener for when the extension is installed or updated.
 * Initializes the extension.
 * @param {Object} details - Details about the installation or update event.
 */
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Extension installed');
    } else if (details.reason === 'update') {
        console.log('Extension updated');
    }
    initializeExtension();
});

/**
 * Event listener for messages sent to the extension.
 * Updates age display when requested.
 * @param {Object} request - Request object containing message type and data.
 * @param {Object} sender - Sender of the message.
 * @param {Function} sendResponse - Callback function to send response.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "updateAge") {
        console.log(request.message);
        updateAgeDisplay(request.message);
    }
});
