// ----------
// Start Togglebar Section
// ----------

var lectureLeft = document.querySelector('.nav-icon-back');
var addZtmToggleCheckbox = document.createElement('div');

addZtmToggleCheckbox.innerHTML = `
<!-- ZTM Toggle Bar by Sithu Khant -->

<style type="text/css">
    .ztm-toggle-hide {
        position: absolute;
        top: 50%;
        left: 50px;
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
lectureLeft.parentNode.insertBefore(addZtmToggleCheckbox, lectureLeft.nextSibling);

var ztmToggleCheckbox = document.getElementById('ztm-toggle-hide');
var courseSidebar = document.getElementById('courseSidebar');

function ztmToggleSidebar() {
    var lectureVideo = document.querySelector('.course-mainbar.lecture-content');

    // if checked, hide sidebar
    if (ztmToggleCheckbox.checked) {
        courseSidebar.style.transition = "transform 0.3s";
        courseSidebar.style.transform = 'translateX(-100%)'

        lectureVideo.style.marginLeft = '0';
        // lectureVideo.style.transition = "all 0.3s";
    } else {
        courseSidebar.style.transition = "transform 0.3s";
        courseSidebar.style.transform = 'translateX(0%)';

        lectureVideo.style.marginLeft = '';
        lectureVideo.style.transition = "all 0.3s";
    };
};

// hide sidebar
ztmToggleCheckbox.addEventListener('change', ztmToggleSidebar);

// Use MutationObserver to detect changes and apply styles
var observer = new MutationObserver(function (mutations) {
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
var observerConfig = { childList: true, subtree: true };
observer.observe(document.body, observerConfig);

// ----------
// End Togglebar Section
// ----------

// ----------
// Start Darkmode Section
// ----------


var dropdownMenuUl = document.querySelector('.dropdown-menu');
var addZtmDrakmodeLi = document.createElement('span');
var addZtmDrakmodeStyle = document.createElement('div');

addZtmDrakmodeLi.innerHTML = `
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

addZtmDrakmodeStyle.innerHTML = `
<!-- ZTM Darkmode Style by Sithu Khant -->

<style type="text/css">
    body,
    div,
    ul, li, .item {
        background-color: #1E1E1E !important;
        color: #fff !important;
    }

    a {
        color: #fff !important;
    }

    input.custom-toggle-round:checked+label:before {
        background: #4e4e4e !important;
        border: 1px solid #4e4e4e;
    }

    input.custom-toggle-round:checked+label:after {
        background: #fff !important;
        border: 1px solid #4e4e4e;
    }

    #settings_menu:hover, .nav-btn:hover {
        background-color: #4e4e4e !important;
    }

    header.half-height .lecture-left .open .dropdown-toggle {
        background-color: #4e4e4e !important;
    }

    .nav-btn.complete,
    .progressbar .progressbar-fill {
        background-color: #4e4e4e !important;
    }

    .course-sidebar .course-progress.lecture-page.sticky {
        background: #1E1E1E !important;
    }

    .course-sidebar .row.lecture-sidebar .course-section .item:hover,
    .course-sidebar .row.lecture-sidebar .course-section .section-item .title-container:hover {
        background-color: #4e4e4e !important;
    }

</style>

<!-- ZTM Darkmode Style by Sithu Khant -->
`;

// append the darkmode style li to ul
dropdownMenuUl.appendChild(addZtmDrakmodeLi);

var ztmToggleDarkmodeCheckbox = document.getElementById('ztm-darkmode');

function ztmToggleDarkmode() {
    if (ztmToggleDarkmodeCheckbox.checked) {
        // append the darkmode style li to ul
        dropdownMenuUl.appendChild(addZtmDrakmodeStyle);
    } else {
       dropdownMenuUl.removeChild(addZtmDrakmodeStyle);
    };
};

ztmToggleDarkmodeCheckbox.addEventListener('change', ztmToggleDarkmode);

// ----------
// End Darkmode Section
// ----------




