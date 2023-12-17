document.addEventListener('DOMContentLoaded', function () {
	var ztmDarkmodeCheckbox = document.getElementById('ztmDarkmodeCheckbox');

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