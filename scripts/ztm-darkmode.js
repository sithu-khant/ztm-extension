// ----------
// Start Darkmode Section
// ----------

chrome.storage.sync.get('ztmDarkModeCheckboxIsChecked', function (data) {
    const ztmDarkModeCheckboxIsChecked = data.ztmDarkModeCheckboxIsChecked || false;

    if (ztmDarkModeCheckboxIsChecked) {
        enableZtmDarkmode('css/ztm-darkmode.css');
    } else {
        disableZtmDarkMode('css/ztm-darkmode.css');
    }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'sync' && 'ztmDarkModeCheckboxIsChecked' in changes) {
        const ztmDarkModeCheckboxIsChecked = changes.ztmDarkModeCheckboxIsChecked.newValue || false;

        if (ztmDarkModeCheckboxIsChecked) {
            enableZtmDarkmode('css/ztm-darkmode.css');
        } else {
            disableZtmDarkMode('css/ztm-darkmode.css');
        }
    }
})

function enableZtmDarkmode(cssFile) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL(cssFile);
    document.head.appendChild(link);
};

function disableZtmDarkMode(cssFile) {
    const links = document.head.querySelectorAll('link[rel="stylesheet"][href*="' + cssFile + '"]');
    for (let i = 0; i < links.length; i++) {
        links[i].parentNode.removeChild(links[i])
    }
};

// ----------
// End Darkmode Section
// ----------