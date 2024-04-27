
import calculateAge from '/scripts/common.js';


document.getElementById("saveButton").addEventListener("click", function () {
    let dateOfBirth = document.getElementById("birthdayInput").value;
    let age = calculateAge(dateOfBirth);
    console.log('age', age);
    if (age.error) {
        console.log(age.message);
        alert(age.message);
    } else {
        document.getElementById("age").innerHTML = age.ageInTextFormat;
        chrome.storage.local.set({'dateOfBirth' : dateOfBirth}, ()=>{
            console.log("date of brith value saved in local storage : ", dateOfBirth);
        });
        chrome.runtime.sendMessage({ type: "updateAge", message: age });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    console.log('popup html loaded!');
    chrome.storage.local.get(['dateOfBirth'], (result) => {
        if (result.dateOfBirth) {
            console.log('date of birth found on local storatge: ', result.dateOfBirth);
            let age = calculateAge(result.dateOfBirth)
            if (age.error) {
                console.log(age.message);
                alert(age.message);
            }
            else {
                document.getElementById("age").innerHTML = age.ageInTextFormat;
                document.getElementById("birthdayInput").value = result.dateOfBirth;
            }
        }
        else {
            console.log('date of birth not found on local storagte');
            document.getElementById("age").innerHTML = 'Enter a valid brithday !';
        }
    });

    const birthdayInput = document.getElementById('birthdayInput');
    const clearButton = document.getElementById('clearButton');

    clearButton.addEventListener('click', function () {
        birthdayInput.value = ''; // Clear the input field
    });
    const version = document.getElementById('version');
    const extensionVersion = chrome.runtime.getManifest().version;
    version.innerHTML = extensionVersion;
});



/*

document.getElementById("saveButton").addEventListener("click", function () {
  let birthday = document.getElementById("birthdayInput").value;
  let age = calculateAge(birthday);
  chrome.runtime.sendMessage({ type: "logToConsole", message: age });
  chrome.runtime.sendMessage({ type: "viewAndSaveAge", message: { 'age': age, 'birthday': birthday } });
  viewAge(birthday);
});

document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.sendMessage({ type: "logToConsole", message: 'popup html loaded' });
  chrome.storage.local.get(['birthday'], (result) => {
    if (result.birthday) {
      chrome.runtime.sendMessage({ type: "logToConsole", message: result.birthday });
      viewAge(result.birthday);
    }
  });

  let res = sentMessageBackground('logToConsole', "this is a test");
  sentMessageBackground('logToConsole', res.response);
  
});


function viewAge(birthdate) {
  document.getElementById("birthdayInput").value = birthdate;
  document.getElementById("age").innerHTML = calculateAge(birthdate).textFormet;
}

function sentMessageBackground(type, message){
  return chrome.runtime.sendMessage({type:type, message: message});
}

document.onload = function() {
  alert("hello world!");
};

*/