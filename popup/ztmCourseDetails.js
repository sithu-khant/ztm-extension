/*
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant
 * Last Updated: Fri May 3, 2024
 * Description: Adds course deatils toggle to the popup
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
    let ztmCourseDetailsCheckbox = document.getElementById('ztmCourseDetailsCheckbox');

    const ztmFavoriteCoursesIsEnabled = localStorage.getItem('ztmCourseDetails') === 'true'
    ztmCourseDetailsCheckbox.checked = ztmFavoriteCoursesIsEnabled

    ztmCourseDetailsCheckbox.addEventListener('change', () => {
        // Get the checkbox status
        let checkboxStatus = { 'ztmCourseDetailsCheckboxIsChecked' : ztmCourseDetailsCheckbox.checked }

        // Set the initial checkbox status
        chrome.storage.sync.set(checkboxStatus, () => {
            // Send the checkbox status dynamically (callback function)
            sendCheckStatusMessage(checkboxStatus);
        })

        localStorage.setItem('ztmCourseDetails', ztmCourseDetailsCheckbox.checked)
    })
});
