import calculateAge from '/scripts/common.js';

/**
 * Event listener for the Save button click.
 * Calculates the age from the input date of birth, saves it in local storage,
 * and updates the age display.
 */
document.getElementById("saveButton").addEventListener("click", function () {
    // Get the input date of birth
    let dateOfBirth = document.getElementById("birthdayInput").value;
    // Calculate age
    let age = calculateAge(dateOfBirth);
    console.log('age', age);
    // Handle error if any
    if (age.error) {
        console.log(age.message);
        alert(age.message);
    } else {
        // Update age display
        document.getElementById("age").innerHTML = age.ageInTextFormat;
        // Save date of birth in local storage
        chrome.storage.local.set({'dateOfBirth' : dateOfBirth}, ()=>{
            console.log("Date of birth saved in local storage: ", dateOfBirth);
        });
        // Send message to update age across the extension
        chrome.runtime.sendMessage({ type: "updateAge", message: age });
    }
});

/**
 * Executes when the DOM content is fully loaded.
 * Sets up the popup by retrieving date of birth from local storage
 * and displaying the age if available.
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log('Popup HTML loaded!');
    // Retrieve date of birth from local storage
    chrome.storage.local.get(['dateOfBirth'], (result) => {
        if (result.dateOfBirth) {
            console.log('Date of birth found in local storage: ', result.dateOfBirth);
            // Calculate age from date of birth
            let age = calculateAge(result.dateOfBirth)
            if (age.error) {
                console.log(age.message);
                alert(age.message);
            }
            else {
                // Display age and set input field value to date of birth
                document.getElementById("age").innerHTML = age.ageInTextFormat;
                document.getElementById("birthdayInput").value = result.dateOfBirth;
            }
        }
        else {
            console.log('Date of birth not found in local storage');
            // Display message when date of birth is not found
            document.getElementById("age").innerHTML = 'Enter a valid birthday!';
        }
    });

    // Clear button functionality
    const birthdayInput = document.getElementById('birthdayInput');
    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', function () {
        birthdayInput.value = ''; // Clear the input field
    });

    // Display extension version
    const version = document.getElementById('version');
    const extensionVersion = chrome.runtime.getManifest().version;
    version.innerHTML = extensionVersion;
});
