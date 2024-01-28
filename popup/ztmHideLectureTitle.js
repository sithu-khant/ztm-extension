/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Sun Jan 14, 2024
 * Description: Hide the video lecture title 
 */ 

// Send the checkbox status to the active tab and current window
var sendCheckStatusMessage = (checkboxStatus) => {
    // Get the active tab and current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Send the checkbox status 
        chrome.tabs.sendMessage(tabs[0].id, checkboxStatus);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let ztmHideLectureTitleCheckbox = document.getElementById('ztmHideLectureTitleCheckbox');

    const ztmHideLectureTitleIsEnabled = localStorage.getItem('ztmHideLectureTitle') === 'true'
    ztmHideLectureTitleCheckbox.checked = ztmHideLectureTitleIsEnabled

    ztmHideLectureTitleCheckbox.addEventListener('change', () => {
        // Get the checkbox status
        let checkboxStatus = { 'ztmHideLectureTitleCheckboxIsChecked' : ztmHideLectureTitleCheckbox.checked }

        // Set the initial checkbox status
        chrome.storage.sync.set(checkboxStatus, () => {
            // Send the checkbox status dynamically (callback function)
            sendCheckStatusMessage(checkboxStatus);
        })

        localStorage.setItem('ztmHideLectureTitle', ztmHideLectureTitleCheckbox.checked)
    })
})
