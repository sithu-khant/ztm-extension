/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Thu Feb 16, 2024
 * Description: Adds favorite course feature to the home page
 */ 

// Send the checkbox status to the active tab and current window
var sendCheckStatusMessage = (checkboxStatus) => {
    // Get the active tab and current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Send the checkbox status 
        chrome.tabs.sendMessage(tabs[0].id, checkboxStatus);
    })
};

document.addEventListener('DOMContentLoaded', () => {
    let ztmFavoriteCoursesCheckbox = document.getElementById('ztmFavoriteCoursesCheckbox');

    const ztmFavoriteCoursesIsEnabled = localStorage.getItem('ztmFavoriteCourses') === 'true'
    ztmFavoriteCoursesCheckbox.checked = ztmFavoriteCoursesIsEnabled

    ztmFavoriteCoursesCheckbox.addEventListener('change', () => {
        // Get the checkbox status
        let checkboxStatus = { 'ztmFavoriteCoursesCheckboxIsChecked' : ztmFavoriteCoursesCheckbox.checked }

        // Set the initial checkbox status
        chrome.storage.sync.set(checkboxStatus, () => {
            // Send the checkbox status dynamically (callback function)
            sendCheckStatusMessage(checkboxStatus);
        })

        localStorage.setItem('ztmFavoriteCourses', ztmFavoriteCoursesCheckbox.checked)
    })
});
