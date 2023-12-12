var lectureLeft = document.querySelector('.nav-icon-back');
var addZtmCheckbox = document.createElement('div');

addZtmCheckbox.innerHTML = `
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

lectureLeft.parentNode.insertBefore(addZtmCheckbox, lectureLeft.nextSibling);

var ztmCheckbox = document.getElementById('ztm-toggle-hide');
var courseSidebar = document.getElementById('courseSidebar');

function ztmToggleSidebar() {
    var lectureVideo = document.querySelector('.course-mainbar.lecture-content');

    // if checked, hide sidebar
    if (ztmCheckbox.checked) {
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
ztmCheckbox.addEventListener('change', ztmToggleSidebar);

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





