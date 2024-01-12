/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Fri Jan 12, 2024
 * Description: Adds toggle hiding sidebar to the lecture page
 */ 

// Create a new div and add toggle icon elements
const createZtmToggleSidebar = document.createElement('div');
createZtmToggleSidebar.innerHTML = `
    <div class="switch ztm-toggle-sidebar">
        <input id="ztm-toggle-checkbox" class="custom-toggle custom-toggle-round" type="checkbox">
        <label for="ztm-toggle-checkbox"></label>
    </div> 
`;

const homeBackIcon = document.querySelector('.nav-icon-back');

// Only add the toggle sidebar feature if there is `homeBackIcon`
if (homeBackIcon) {
    homeBackIcon.parentNode.insertBefore(createZtmToggleSidebar, homeBackIcon.nextSibling);

    const ztmToggleCheckbox = document.getElementById('ztm-toggle-checkbox');
    const courseSidebar = document.getElementById('courseSidebar');
    const lectureVideo = document.querySelector('.course-mainbar.lecture-content');

    // Create objects for hiding/showing the sidebar
    const hideSidebarStyles = { transform: 'translateX(-100%)' };
    const showSidebarStyles = { transform: 'translateX(0%)', transition: 'transform 0.3s' }

    // Create objects for hiding/showing the lectureVideo
    const addLectureVideoStyles = { marginLeft: '0' };
    const removeLectureVideoStyles = { marginLeft: '', transition: 'all 0.3s'}

    // Get the sidebar status 
    // (this allows the checkbox is still checked even if the page is reloaded)
    const ztmToggleSidebarCheckStatus = localStorage.getItem('ztmToggleSidebarStatus') === 'true';
    ztmToggleCheckbox.checked = ztmToggleSidebarCheckStatus;

    const applyToggleSidebarStyles = () => {
        // Assign the styles based on the check status
        const sidebarStyles = ztmToggleCheckbox.checked ? hideSidebarStyles : showSidebarStyles;
        const lectureVideoStyles = ztmToggleCheckbox.checked ? addLectureVideoStyles : removeLectureVideoStyles;
        
        // Apply styles to courseSidbar and lectureVideo
        Object.assign(courseSidebar.style, sidebarStyles);
        Object.assign(lectureVideo.style, lectureVideoStyles);
    };

    const ztmToggleSidebar = () => {
        // Add styles to the sidebar
        applyToggleSidebarStyles();
        localStorage.setItem('ztmToggleSidebarStatus', ztmToggleCheckbox.checked)
    };

    ztmToggleCheckbox.addEventListener('change', ztmToggleSidebar);

    // Observering the page everytime and adding styles
    const ztmToggleSidebarObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            console.log('mutation looping...')
            if (mutation.addedNotes) {
                console.log('addedNotes working')
                mutation.addedNotes.forEach((node) => {
                    // check if there is `lecture-content` div
                    if (node.classList?.contains('lecture-content')) {
                        applyToggleSidebarStyles()
                        console.log('final working')
                    };
                });
            };
        });
    });

    ztmToggleSidebarObserver.observe(document.body, { childList: true, subtree: true });

    ztmToggleSidebar();

}












