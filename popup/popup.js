// ----------
// Start ztmDarkmodeCheckbox section
// ----------

document.addEventListener('DOMContentLoaded', function () {
	let ztmDarkmodeCheckbox = document.getElementById('ztmDarkmodeCheckbox');

	// check whether the current state is checked or not
	chrome.storage.sync.get('ztmDarkmodeCheckboxIsChecked', function (data) {
		ztmDarkmodeCheckbox.checked = data.ztmDarkmodeCheckboxIsChecked || false;
	});

	ztmDarkmodeCheckbox.addEventListener('change', function () {
		chrome.storage.sync.set({'ztmDarkmodeCheckboxIsChecked': ztmDarkmodeCheckbox.checked}, function () {
			// sends
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {ztmDarkmodeCheckboxIsChecked: ztmDarkmodeCheckbox.checked})
			});
		});
	});
});

const ztmPopupContainer = document.querySelector('.ztm-container');
let ztmDarkmodeCheckbox = document.getElementById('ztmDarkmodeCheckbox');

// if checked, popup is still dark
const ztmPopupsDarkmodeIsEnabled = localStorage.getItem('ztmPopuparkMode') === 'true';
ztmDarkmodeCheckbox.checked = ztmPopupsDarkmodeIsEnabled

function popupDarkmode() {
    if (ztmDarkmodeCheckbox.checked) {
        ztmPopupContainer.classList.add('popup-darkmode')
    } else {
        ztmPopupContainer.classList.remove('popup-darkmode')
    }
    // to store the current stage of the ztm darkmode checkbox
	localStorage.setItem('ztmPopuparkMode', ztmDarkmodeCheckbox.checked);
};

ztmDarkmodeCheckbox.addEventListener('change', popupDarkmode);
popupDarkmode()

// ----------
// End ztmDarkmodeCheckbox section
// ----------
