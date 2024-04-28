/**
 * Executes when the DOM content is fully loaded.
 * Sets up the options page by displaying extension information.
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log('Options HTML loaded!');
    
    // Get the DOM elements for version and description
    const versionElement = document.getElementById('version');
    const descriptionElement = document.getElementById('description');

    // Get extension version from the manifest and display it
    const extensionVersion = chrome.runtime.getManifest().version;
    versionElement.innerHTML = extensionVersion;

    // Get extension description from the manifest and display it
    const extensionDescription = chrome.runtime.getManifest().description;
    descriptionElement.innerHTML = extensionDescription;
});
