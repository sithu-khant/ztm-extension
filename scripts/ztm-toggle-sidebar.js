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

const toggleSidebarHomeBackIcon = document.querySelector('.nav-icon-back');

// Check the `toggleSidebarHomeBackIcon` to prevent conflix
if (toggleSidebarHomeBackIcon) {
    // Add ZTM Toggle
    toggleSidebarHomeBackIcon.parentNode.insertBefore(createZtmToggleSidebar, toggleSidebarHomeBackIcon.nextSibling);
    // Get the ZTM Toggle Checkbox
    const ztmToggleCheckbox = document.getElementById('ztm-toggle-checkbox');

    // Create objects for hiding/showing the sidebar
    const hideSidebarStyles = { transform: 'translateX(-100%)' };
    const showSidebarStyles = { transform: 'translateX(0%)', transition: 'transform 0.3s' }

    // Create objects for hiding/showing the lectureContent
    const addLectureContentStyles = { marginLeft: '0' };
    const removeLectureContentStyles = { marginLeft: '', transition: 'all 0.3s'}

    // Get the sidebar status 
    // (this allows the checkbox is still checked even if the page is reloaded)
    const ztmToggleSidebarCheckStatus = localStorage.getItem('ztmToggleSidebarStatus') === 'true';
    ztmToggleCheckbox.checked = ztmToggleSidebarCheckStatus;

    const ztmToggleSidebar = () => {
        const courseSidebar = document.getElementById('courseSidebar');
        const lectureContent = document.querySelector('.course-mainbar.lecture-content');

        // Assign the styles based on the check status
        const sidebarStyles = ztmToggleCheckbox.checked ? hideSidebarStyles : showSidebarStyles;
        const lectureContentStyles = ztmToggleCheckbox.checked ? addLectureContentStyles : removeLectureContentStyles;
        
        // Apply styles to courseSidbar and lectureContent
        Object.assign(courseSidebar.style, sidebarStyles);
        Object.assign(lectureContent.style, lectureContentStyles);

        localStorage.setItem('ztmToggleSidebarStatus', ztmToggleCheckbox.checked)
    };

    ztmToggleCheckbox.addEventListener('change', ztmToggleSidebar);

    // Track the page for every new lecture  
    const ztmToggleSidebarObserver = new MutationObserver(() => ztmToggleSidebar());
    ztmToggleSidebarObserver.observe(document.body, { childList: true, subtree: true });
    ztmToggleSidebar();
}
