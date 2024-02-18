// /* 
//  * Author: Sithu Khant
//  * GitHub: https://github.com/sithu-khant 
//  * Last Updated: Fri Feb 16, 2024
//  * Description: Adds daily motivation quote to the home page
//  */ 

// // Send the checkbox status to the active tab and current window
// var sendCheckStatusMessage = (checkboxStatus) => {
//     // Get the active tab and current window
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         // Send the checkbox status 
//         chrome.tabs.sendMessage(tabs[0].id, checkboxStatus);
//     })
// };

// document.addEventListener('DOMContentLoaded', () => {
//     let ztmDailyMotivationCheckbox = document.getElementById('ztmDailyMotivationCheckbox');

//     const ztmFavoriteCoursesIsEnabled = localStorage.getItem('ztmDailyMotivation') === 'true'
//     ztmDailyMotivationCheckbox.checked = ztmFavoriteCoursesIsEnabled

//     ztmDailyMotivationCheckbox.addEventListener('change', () => {
//         // Get the checkbox status
//         let checkboxStatus = { 'ztmDailyMotivationCheckboxIsChecked' : ztmDailyMotivationCheckbox.checked }

//         // Set the initial checkbox status
//         chrome.storage.sync.set(checkboxStatus, () => {
//             // Send the checkbox status dynamically (callback function)
//             sendCheckStatusMessage(checkboxStatus);
//         })

//         localStorage.setItem('ztmDailyMotivation', ztmDailyMotivationCheckbox.checked)
//     })
// });
