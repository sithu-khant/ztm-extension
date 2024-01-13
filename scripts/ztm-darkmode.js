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

// Enable os disable based on the toggle check status
const ztmToggleDarkMode = (isChecked) => {
    isChecked ? enableZtmDarkMode() : disableZtmDarkMode();
};

// Get the initial checkbox status and apply style
chrome.storage.sync.get('ztmDarkModeCheckboxIsChecked', (data) => {
    let isChecked = data.ztmDarkModeCheckboxIsChecked || false;
    ztmToggleDarkMode(isChecked);
})

// Get the checkbox status dynamically and apply style
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && 'ztmDarkModeCheckboxIsChecked' in changes) {
        let isChecked = changes.ztmDarkModeCheckboxIsChecked.newValue || false;
        ztmToggleDarkMode(isChecked);
    }
});
