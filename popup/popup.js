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


// ----------
// Start ztmSidebarCheckbox section
// ----------

document.addEventListener('DOMContentLoaded', function () {
	const ztmSidebarCheckbox = document.getElementById('ztmSidebarCheckbox');

	// check whether the current state is checked or not
	chrome.storage.sync.get('ztmSidebarCheckboxIsChecked', function (data) {
		ztmSidebarCheckbox.checked = data.ztmSidebarCheckboxIsChecked || false;
	});

	ztmSidebarCheckbox.addEventListener('change', function () {
		chrome.storage.sync.set({'ztmSidebarCheckboxIsChecked': ztmSidebarCheckbox.checked}, function () {
			// sends
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {ztmSidebarCheckboxIsChecked: ztmSidebarCheckbox.checked})
			});
		});
	});
});

// ----------
// End ztmDarkmodeCheckbox section
// ----------


// ----------
// Start ztmFavouriteCourseCheckbox section
// ----------

document.addEventListener('DOMContentLoaded', function () {
	const ztmFavouriteCourseCheckbox = document.getElementById('ztmFavouriteCourseCheckbox');

	// check whether the current state is checked or not
	chrome.storage.sync.get('ztmFavouriteCourseCheckboxIsChecked', function (data) {
		ztmFavouriteCourseCheckbox.checked = data.ztmFavouriteCourseCheckboxIsChecked || false;
	});

	ztmFavouriteCourseCheckbox.addEventListener('change', function () {
		chrome.storage.sync.set({'ztmFavouriteCourseCheckboxIsChecked': ztmFavouriteCourseCheckbox.checked}, function () {
			// sends
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {ztmFavouriteCourseCheckboxIsChecked: ztmFavouriteCourseCheckbox.checked})
			});
		});
	});
});

// ----------
// End ztmFavouriteCourseCheckbox section
// ----------


// ----------
// Start ztmSameResolutionCheckbox section
// ----------

document.addEventListener('DOMContentLoaded', function () {
	const ztmSameResolutionCheckbox = document.getElementById('ztmSameResolutionCheckbox');

	// check whether the current state is checked or not
	chrome.storage.sync.get('ztmSameResolutionCheckboxIsChecked', function (data) {
		ztmSameResolutionCheckbox.checked = data.ztmSameResolutionCheckboxIsChecked || false;
	});

	ztmSameResolutionCheckbox.addEventListener('change', function () {
		chrome.storage.sync.set({'ztmSameResolutionCheckboxIsChecked': ztmSameResolutionCheckbox.checked}, function () {
			// sends
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {ztmSameResolutionCheckboxIsChecked: ztmSameResolutionCheckbox.checked})
			});
		});
	});
});

// ----------
// End ztmSameResolutionCheckbox section
// ----------


// ----------
// Start ztmTotalHoursCheckbox section
// ----------

document.addEventListener('DOMContentLoaded', function () {
	const ztmTotalHoursCheckbox = document.getElementById('ztmTotalHoursCheckbox');

	// check whether the current state is checked or not
	chrome.storage.sync.get('ztmTotalHoursCheckboxIsChecked', function (data) {
		ztmTotalHoursCheckbox.checked = data.ztmTotalHoursCheckboxIsChecked || false;
	});

	ztmTotalHoursCheckbox.addEventListener('change', function () {
		chrome.storage.sync.set({'ztmTotalHoursCheckboxIsChecked': ztmTotalHoursCheckbox.checked}, function () {
			// sends
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {ztmTotalHoursCheckboxIsChecked: ztmTotalHoursCheckbox.checked})
			});
		});
	});
});

// ----------
// End ztmTotalHoursCheckbox section
// ----------

