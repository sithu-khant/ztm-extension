/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Sun Jan 14, 2024
 * Description: Hide the video lecture title 
 */ 

const ztmHideLectureTitle = () => {
	const hideLectureTitle = (isChecked) => {
		// Get the lecture attachement
		const lectureAttachment = document.querySelector('.lecture-attachment');
		// Check it is video lecture type or not
		const isVideoLectureType =  lectureAttachment.classList.contains('lecture-attachment-type-video');

		// Get the lecture title
		const ztmVideoLectureTitle = document.getElementById('lecture_heading');

		if (isVideoLectureType && isChecked) {
			ztmVideoLectureTitle.style.display = 'none';
		} else {
			ztmVideoLectureTitle.style.display = 'block';
		};
	};

	// Get the initial checkbox status and apply style
	chrome.storage.sync.get('ztmHideLectureTitleCheckboxIsChecked', (data) => {
	    let isChecked = data.ztmHideLectureTitleCheckboxIsChecked || false;
	    hideLectureTitle(isChecked);
	})

	// Get the checkbox status dynamically and apply style
	chrome.storage.onChanged.addListener((changes, namespace) => {
	    if (namespace === 'sync' && 'ztmHideLectureTitleCheckboxIsChecked' in changes) {
	        let isChecked = changes.ztmHideLectureTitleCheckboxIsChecked.newValue || false;
	        hideLectureTitle(isChecked);
	    }
	});
}

// Track the page for every new lecture  
const ztmHideLectureTitleObserver = new MutationObserver(() => ztmHideLectureTitle());
ztmHideLectureTitleObserver.observe(document.body, { childList: true, subtree: true })
