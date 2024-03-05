/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Tue Mar 5, 2024
 * Description: Adds dark mode to the academy page
 */ 

const cssFile = 'css/ztm-dark-mode.css';

// Create dark mode css file
const darkModeCssLink = document.createElement('link');
darkModeCssLink.rel = 'stylesheet';
darkModeCssLink.type = 'text/css';
darkModeCssLink.href = chrome.runtime.getURL(cssFile);

const enableZtmDarkMode = () => {
    // Add dark mode css file to the head tag
    document.head.appendChild(darkModeCssLink);

    const customStyleDiv = document.createElement('div');
    customStyleDiv.id = 'custom-style-div'
    customStyleDiv.innerHTML = `
    <style>
    *:not(.bxs-heart) {
        color: #EEEEEE !important;
    }
    </style>
    `

    const isHomePage = document.querySelector('.course-list');
    const isLearningPage = document.querySelector('.nav-icon-back')
    if (isHomePage || isLearningPage) {
        document.head.appendChild(customStyleDiv);
    };
};

const disableZtmDarkMode = () => {
    const getDarkModeCssLink = document.head.querySelector(`link[rel="stylesheet"][href*="${cssFile}"]`);
    
    if (getDarkModeCssLink) {
        // Remove the dark mode css file
        getDarkModeCssLink.remove();
    };

    const getCustomStyleDiv = document.getElementById('custom-style-div');
    if (getCustomStyleDiv) {
        getCustomStyleDiv.remove();
    }
};

// Enable os disable based on the toggle check status
const ztmToggleDarkMode = (isChecked) => {
    isChecked ? enableZtmDarkMode() : disableZtmDarkMode();
};

const ztmDarkMode = () => {
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
}

ztmDarkMode();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'windowChanged') {
        ztmDarkMode();
    }
});
