// ----------
// Start ztmDarkModeCheckbox section
// ----------

function querySendTabMessage( options ){
    chrome.tabs.query(
        { active: true, currentWindow: true},
        function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                options
            )
        });
}

document.addEventListener('DOMContentLoaded', function () {
    let ztmDarkModeCheckbox = document.getElementById('ztmDarkModeCheckbox');

    // check whether the current state is checked or not
    chrome.storage.sync.get('ztmDarkModeCheckboxIsChecked', function (data) {
        ztmDarkModeCheckbox.checked = data.ztmDarkModeCheckboxIsChecked || false;
    });

    ztmDarkModeCheckbox.addEventListener('change', function () {
        chrome.storage.sync.set({'ztmDarkModeCheckboxIsChecked': ztmDarkModeCheckbox.checked}, 
        function () {
            // sends
            querySendTabMessage({
                ztmDarkModeCheckboxIsChecked:
                ztmDarkModeCheckbox.checked
            });
        });
    });
});

const ztmPopupContainer = document.querySelector('.ztm-container');
let ztmDarkModeCheckbox = document.getElementById('ztmDarkModeCheckbox');

// if checked, popup is still dark
const ztmPopupsDarkModeIsEnabled = localStorage.getItem('ztmPopupDarkMode') === 'true';
ztmDarkModeCheckbox.checked = ztmPopupsDarkModeIsEnabled

function popupDarkMode() {
    if (ztmDarkModeCheckbox.checked) {
        ztmPopupContainer.classList.add('popup-darkmode')
    } else {
        ztmPopupContainer.classList.remove('popup-darkmode')
    }
    // to store the current stage of the ztm darkMode checkbox
    localStorage.setItem('ztmPopupDarkMode', ztmDarkModeCheckbox.checked);
};

ztmDarkModeCheckbox.addEventListener('change', popupDarkMode);
popupDarkMode();

// ----------
// End ztmDarkModeCheckbox section
// ----------
