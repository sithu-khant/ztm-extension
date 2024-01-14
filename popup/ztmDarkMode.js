/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Sat Jan 13, 2024
 * Description: Adds dark mode to the popup and the academy page
 */ 

// Send the checkbox status to the active tab and current window
const sendCheckStatusMessage = (checkboxStatus) => {
    // Get the active tab and current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Send the checkbox status 
        chrome.tabs.sendMessage(tabs[0].id, checkboxStatus);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const ztmCheckbox = document.getElementById('ztmDarkModeCheckbox');

    ztmCheckbox.addEventListener('change', () => {
        // Get the checkbox status
        const checkboxStatus = { 'ztmDarkModeCheckboxIsChecked' : ztmCheckbox.checked }

        // Set the initial checkbox status
        chrome.storage.sync.set(checkboxStatus, () => {
            // Send the checkbox status dynamically (callback function)
            sendCheckStatusMessage(checkboxStatus);
        })
    })
})

const ztmPopupContainer = document.querySelector('.ztm-container');
const ztmDarkModeCheckbox = document.getElementById('ztmDarkModeCheckbox');

// Get the checkbox status from the local storage for the popup
const ztmPopupDarkModeIsEnabled = localStorage.getItem('ztmPopupDarkMode') === 'true';
ztmDarkModeCheckbox.checked = ztmPopupDarkModeIsEnabled

const popupDarkMode = () => {
    // Get the class list of the popup container
    const containerClassList = ztmPopupContainer.classList
    // If dark mode is enabled, add dark mode class
    ztmDarkModeCheckbox.checked ? containerClassList.add('popup-darkmode') : containerClassList.remove('popup-darkmode');

    // Store the check status in local storage for popup dark mode
    localStorage.setItem('ztmPopupDarkMode', ztmDarkModeCheckbox.checked);
};

ztmDarkModeCheckbox.addEventListener('change', popupDarkMode);
popupDarkMode();
