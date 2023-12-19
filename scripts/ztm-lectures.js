// ----------
// Start Togglebar Section
// ----------

chrome.storage.sync.get('ztmSidebarCheckboxIsChecked', function (data) {
    const ztmSidebarCheckboxIsChecked = data.ztmSidebarCheckboxIsChecked || false;

    if (ztmSidebarCheckboxIsChecked) {
        const lectureLeft = document.querySelector('.nav-icon-back');
        const addZtmToggleCheckbox = document.createElement('div');

        addZtmToggleCheckbox.innerHTML = `
        <!-- ZTM Toggle Bar by Sithu Khant -->

        <div class="switch ztm-toggle-hide">
            <input id="ztm-toggle-hide" class="custom-toggle custom-toggle-round" type="checkbox">
            <label for="ztm-toggle-hide"></label>
        </div> 

        <!-- ZTM Toggle Bar by Sithu Khant -->
        `;

        // add toggle checkbox after back-to-home icon
        lectureLeft.parentNode.insertBefore(addZtmToggleCheckbox, lectureLeft.nextSibling);

        const ztmToggleCheckbox = document.getElementById('ztm-toggle-hide');
        const courseSidebar = document.getElementById('courseSidebar');

        // check if dark mode is enabled in localStorage
        const isSidebarToggleEnabled = localStorage.getItem('ztmToggleSidebarkMode') === 'true';

        // store dark mode checkbox status
        ztmToggleCheckbox.checked = isSidebarToggleEnabled;

        function ztmToggleSidebar() {
            const lectureVideo = document.querySelector('.course-mainbar.lecture-content');

            // if checked, hide sidebar
            if (ztmToggleCheckbox.checked) {
                courseSidebar.style.transform = 'translateX(-100%)'

                lectureVideo.style.marginLeft = '0';
            } else {
                courseSidebar.style.transition = "transform 0.3s";
                courseSidebar.style.transform = 'translateX(0%)';

                lectureVideo.style.marginLeft = '';
                lectureVideo.style.transition = "all 0.3s";
            };

            // store dark mode checkbox status
            localStorage.setItem('ztmToggleSidebarkMode', ztmToggleCheckbox.checked);
        };

        // hide sidebar
        ztmToggleCheckbox.addEventListener('change', ztmToggleSidebar);

        // Use MutationObserver to detect changes and apply styles
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // Check if a new node with the target class is added
                if (mutation.addedNodes) {
                    mutation.addedNodes.forEach(function (node) {
                        if (node.classList && node.classList.contains('course-mainbar') && node.classList.contains('lecture-content')) {
                            // Apply styles to the new node
                            ztmToggleSidebar();
                        }
                    });
                }
            });
        });

        // Configure and start the observer
        const observerConfig = { childList: true, subtree: true };
        observer.observe(document.body, observerConfig);
        ztmToggleSidebar();
    };
});

// ----------
// End Togglebar Section
// ----------
