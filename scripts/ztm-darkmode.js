// ----------
// Start Darkmode Section
// ----------

chrome.storage.sync.get('ztmDarkmodeCheckboxIsChecked', function (data) {
    const ztmDarkmodeCheckboxIsChecked = data.ztmDarkmodeCheckboxIsChecked || false;

    if (ztmDarkmodeCheckboxIsChecked) {
        enableZtmDarkmode('css/ztm-darkmode.css');
    } else {
        disableZtmDarkmode('css/ztm-darkmode.css');
    }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'sync' && 'ztmDarkmodeCheckboxIsChecked' in changes) {
        const ztmDarkmodeCheckboxIsChecked = changes.ztmDarkmodeCheckboxIsChecked.newValue || false;

        if (ztmDarkmodeCheckboxIsChecked) {
            enableZtmDarkmode('css/ztm-darkmode.css');
        } else {
            disableZtmDarkmode('css/ztm-darkmode.css');
        }
    }
})

function enableZtmDarkmode(cssFile) {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL(cssFile);
    document.head.appendChild(link);
};

function disableZtmDarkmode(cssFile) {
    let links = document.head.querySelectorAll('link[rel="stylesheet"][href*="' + cssFile + '"]');
    for (var i = 0; i < links.length; i++) {
        links[i].parentNode.removeChild(links[i])
    }
};

// ----------
// End Darkmode Section
// ----------