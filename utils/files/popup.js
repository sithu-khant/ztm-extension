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
			).catch( console.error )
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
        ztmPopupContainer.classList.add('popup-darkMode')
    } else {
        ztmPopupContainer.classList.remove('popup-darkMode')
    }
    // to store the current stage of the ztm darkMode checkbox
	localStorage.setItem('ztmPopupDarkMode', ztmDarkModeCheckbox.checked);
};

ztmDarkModeCheckbox.addEventListener('change', popupDarkMode);
popupDarkMode();

// ----------
// End ztmDarkModeCheckbox section
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
			querySendTabMessage({
				ztmSidebarCheckboxIsChecked:
				ztmSidebarCheckbox.checked
			});
		});
	});
});

// ----------
// End ztmDarkModeCheckbox section
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
			querySendTabMessage({
				ztmFavouriteCourseCheckboxIsChecked:
				ztmFavouriteCourseCheckbox.checked
			})
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
			querySendTabMessage({ztmSameResolutionCheckboxIsChecked: ztmSameResolutionCheckbox.checked})
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
		chrome.storage.sync.set({'/': ztmTotalHoursCheckbox.checked },function () {
			// sends
			querySendTabMessage({
				ztmTotalHoursCheckboxIsChecked: ztmTotalHoursCheckbox.checked
			});
		});
	});
});

// ----------
// End ztmTotalHoursCheckbox section
// ----------

