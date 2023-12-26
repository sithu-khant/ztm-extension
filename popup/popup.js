// ----------
// Start ztmDarkModeCheckbox section
// ----------

document.addEventListener('DOMContentLoaded', function () {
    const ztmDarkModeCheckbox = document.getElementById('ztmDarkModeCheckbox');

    // check whether the current state is checked or not
    browser.storage.sync.get('ztmDarkModeCheckboxIsChecked', function (data) {
        ztmDarkModeCheckbox.checked = data.ztmDarkModeCheckboxIsChecked || false;
    });

    ztmDarkModeCheckbox.addEventListener('change', async function () {
        await browser.storage.sync.set({
            'ztmDarkModeCheckboxIsChecked': ztmDarkModeCheckbox.checked
        });

        // sends
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        await browser.tabs.sendMessage(tabs[0].id, { ztmDarkModeCheckboxIsChecked: ztmDarkModeCheckbox.checked });
    });
});

const ztmPopupContainer = document.querySelector('.ztm-container');
const ztmDarkModeCheckbox = document.getElementById('ztmDarkModeCheckbox');

// if checked, popup is still dark
const ztmPopupsDarkModeIsEnabled = localStorage.getItem('ztmPopuparkMode') === 'true';
ztmDarkModeCheckbox.checked = ztmPopupsDarkModeIsEnabled;

function popupDarkMode() {
    if (ztmDarkModeCheckbox.checked) {
        ztmPopupContainer.classList.add('popup-darkmode');
    } else {
        ztmPopupContainer.classList.remove('popup-darkmode');
    }
    // to store the current stage of the ztm darkmode checkbox
    localStorage.setItem('ztmPopuparkMode', ztmDarkModeCheckbox.checked);
}

ztmDarkModeCheckbox.addEventListener('change', popupDarkMode);
popupDarkMode();

// ----------
// End ztmDarkModeCheckbox section
// ----------
