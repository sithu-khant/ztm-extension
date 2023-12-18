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

        <style type="text/css">
            .ztm-toggle-hide {
                position: absolute;
                top: 50%;
                left: 60px;
                transform: translateY(-50%);
            }

            @media screen and (max-width: 765px) {
                .ztm-toggle-hide {
                    display: none;
                }
            }
        </style>

        <div class="switch ztm-toggle-hide">
            <input id="ztm-toggle-hide" class="custom-toggle custom-toggle-round" type="checkbox">
            <label for="ztm-toggle-hide"></label>
        </div> 

        <!-- ZTM Toggle Bar by Sithu Khant -->
        `;

        // add toggle checkbox after back-to-home icon
        // lectureLeft.parentNode.insertBefore(addZtmToggleCheckbox, lectureLeft.nextSibling);
        if (lectureLeft.nextSibling) {
            lectureLeft.parentNode.insertBefore(addZtmToggleCheckbox, lectureLeft.nextSibling);
        } else {
            lectureLeft.parentNode.appendChild(addZtmToggleCheckbox);
        }

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

// ----------
// Start Darkmode Section
// ----------

const dropdownMenuUl = document.querySelector('.dropdown-menu');
const addZtmDarkmodeLi = document.createElement('span');
const addZtmDarkmodeStyle = document.createElement('div');
const darkModeContainer = document.createElement('div');

darkModeContainer.appendChild(addZtmDarkmodeStyle);

addZtmDarkmodeLi.innerHTML = `
<!-- ZTM Darkmode by Sithu Khant -->

<li class="nav-focus" aria-label="menuitem">
    <div class="switch" id="switch-autoplay-lectures">
        <input id="ztm-darkmode" class="custom-toggle custom-toggle-round" type="checkbox">
        <label for="ztm-darkmode"></label>
    </div>
    <span>Darkmode</span>
</li>

<!-- ZTM Darkmode by Sithu Khant -->
`;

addZtmDarkmodeStyle.innerHTML = `
<!-- ZTM Darkmode Style by Sithu Khant -->

<style type="text/css">
    body,
    div,
    ul, li, strong, a {
        background-color: #1E1E1E !important;
        color: #fff !important;
    }

    header.half-height .lecture-left .nav-icon-back {
        background-color: #fff !important;
        color: #fff !important;
        fill: #fff !important;
    }

    input.custom-toggle-round:checked+label:before {
        background: #4e4e4e !important;
        border: 1px solid #4e4e4e;
    }

    input.custom-toggle-round:checked+label:after {
        background: #fff !important;
        border: 1px solid #4e4e4e;
    }

    #settings_menu:hover, .nav-btn:hover,
    header.half-height .lecture-left .nav-icon-settings:hover, header.half-height .lecture-left .nav-icon-list:hover {
        background-color: #4e4e4e !important;
    }

    header.half-height .lecture-left .open .dropdown-toggle {
        background-color: #4e4e4e !important;
    }

    .progressbar {
        border: 0.5px solid #4e4e4e !important;
    }

    .nav-btn.complete,
    .progressbar .progressbar-fill {
        background-color: #4e4e4e !important;
    }

    .course-section ul.section-list .section-item.incomplete .status-icon {
        box-shadow: inset 0 0 0 2px #b8b8b8 !important;
    }

    .course-sidebar .course-progress.lecture-page.sticky {
        background: #1E1E1E !important;
    }

    .course-section ul.section-list .section-item.next-lecture .item,
    .course-section ul.section-list .section-item.next-lecture .item div {
        background-color: #000 !important;
    }

    .course-sidebar .row.lecture-sidebar .course-section .item:hover, 
    .course-sidebar .row.lecture-sidebar .course-section .item:hover div {
        background-color: #4e4e4e !important;
    }

    header.half-height .lecture-left .nav-icon-list.nav-icon-list,
    header.half-height .lecture-left .nav-icon-list:hover {
        background-color: #4e4e4e !important;
    }

    .course-mainbar.lecture-content.full-width-content * {
        background-color: #1E1E1E !important;
        color: #fff !important;
    }

    .course-mainbar.lecture-content.full-width-content code,
    .course-mainbar.lecture-content.full-width-content pre {
        border: 0.5px solid #fff;
    }

    .lecture-content .lecture-attachment a {
        text-decoration: underline;
    }

    .lecture-content .lecture-attachment .video-options * {
        background-color: #4e4e4e !important;
    }

</style>

<!-- ZTM Darkmode Style by Sithu Khant -->
`;

// append the dark mode style container to ul
dropdownMenuUl.appendChild(addZtmDarkmodeLi);
dropdownMenuUl.appendChild(darkModeContainer);

const ztmToggleDarkmodeCheckbox = document.getElementById('ztm-darkmode');

// check if dark mode is enabled in localStorage
const isDarkModeEnabled = localStorage.getItem('ztmDarkMode') === 'true';

// store dark mode checkbox status
ztmToggleDarkmodeCheckbox.checked = isDarkModeEnabled;

function ztmToggleDarkmode() {
    if (ztmToggleDarkmodeCheckbox.checked) {
        // append the dark mode style container to ul
        dropdownMenuUl.appendChild(darkModeContainer);
    } else {
        // remove the dark mode style container from ul
        dropdownMenuUl.removeChild(darkModeContainer);
    }

    // store dark mode checkbox status
    localStorage.setItem('ztmDarkMode', ztmToggleDarkmodeCheckbox.checked);
}

ztmToggleDarkmodeCheckbox.addEventListener('change', ztmToggleDarkmode);
ztmToggleDarkmode();

// ----------
// End Darkmode Section
// ----------
