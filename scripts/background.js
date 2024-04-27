
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

/*

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "logToConsole") {
      console.log(request.message);
      return sendResponse({response: {test : 'test'} });
    }
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "viewAndSaveAge") {
        console.log(request.message);
        chrome.storage.local.set({'birthday' : request.message.birthday}, ()=>{
            console.log("birthday = "+request.message.birthday + " setted!");
        });
        chrome.action.setBadgeText({
            text: ""+ request.message.age.years
        });
        chrome.action.setTitle({
            title: makeAgeString(request.message.age)
        });    
    }
});


function makeAgeString(age){
    return age.years + " Y " + age.months + " M " + age.days + " D "; 
}

function init(){
    console.log("init!");
    
    /*
    chrome.storage.local.set({'birthday' : '01-01-1992'}, ()=>{
        console.log("birthday setted!");
    });
    */

/*
chrome.storage.local.get(['birthday'], (result)=>{
    console.log(result.birthday + " data");
});
*/



/*
chrome.action.setBadgeText({ text: '32' });

chrome.action.setTitle({
    title:'This is the tooltip text upon mouse hover.'
});
*/

