/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Fri Jan 12, 2024
 * Description: Adds dark mode to the academy page
 */ 

const cssFile = 'css/ztm-darkmode.css';

// Create dark mode css file
const darkModeCssLink = document.createElement('link');
darkModeCssLink.rel = 'stylesheet';
darkModeCssLink.type = 'text/css';
darkModeCssLink.href = chrome.runtime.getURL(cssFile);

const enableZtmDarkMode = () => {
    // Add dark mode css file to the head tag
    document.head.appendChild(darkModeCssLink);
};

const disableZtmDarkMode = () => {
    const getDarkModeCssLink = document.head.querySelector(`link[rel="stylesheet"][href*="${cssFile}"]`);
    
    if (getDarkModeCssLink) {
        // Remove the dark mode css file
        getDarkModeCssLink.remove()
    };
};

// Get the checkbox status and apply style
chrome.storage.sync.get('ztmDarkModeCheckboxIsChecked', (data) => {
    const isChecked = data.ztmDarkModeCheckboxIsChecked || false;

    // Enable os disable based on the toggle check status
    isChecked ? enableZtmDarkMode() : disableZtmDarkMode();
})
