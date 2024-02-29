/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Thu Feb 29, 2024
 * Description: Show lecture time data in the course info page
 */ 

// Collect all the time data
const getTimes = (item, className, array) => {
    // Get the text
    const getText = item.querySelector(className)?.innerText;
    // Regex expression to extract minute from the lectureName
    const regex = /\(([^)]*:\s*[^)]+)\)/;
    // Get the minutes
    const getLectureTimes = getText?.match(regex);
    // Remove all white spaces
    if (getLectureTimes && getLectureTimes[1]) {
        const lectureTimes = getLectureTimes[1].replaceAll(/\s/g,'');

        // Add lectureTimes to array;
        array.push(lectureTimes);
    };
};

// Convert times to seconds
const convertToSeconds = (time) => {
    // Split into minutes and seconds
    const [ minutes, seconds ] = time.split(":").map(Number);
    const totalSeconds = minutes * 60 + seconds

    return totalSeconds;
};

// Get the time data
const getTimesData = (totalSeconds, array) => {
    // Loop through array and apply convertToSeconds function
    array.forEach((time) => totalSeconds += convertToSeconds(time));

    // Total hours
    const courseTotalHours = Math.floor(totalSeconds / 3600); 
    // Total minutes
    const courseTotalMinutes = Math.floor((totalSeconds % 3600) / 60);
    // Total seconds
    const courseTotalSeconds = Math.floor(totalSeconds % 60);

    if (courseTotalHours > 0) {
        return `${courseTotalHours}h ${courseTotalMinutes}min`;
    } else {
        return `${courseTotalMinutes}min ${courseTotalSeconds}s`;
    }
};

const curriculumPageSectionTimesDiv = (courseLength, totalWatched, totalLeft) => {
    // Create a new div for lecture time data
    const ztmSidebarSectionTimesDiv = document.createElement('div');
    // Add id
    ztmSidebarSectionTimesDiv.id = 'ztm-section-times-container'
    ztmSidebarSectionTimesDiv.innerHTML = `
        <!-- Course Length -->
        <div class='ztm-section-times-item'>
            <div class='ztm-section-times-text'>Course Length</div>
            <div class='ztm-section-times-data'>${courseLength}</div>
        </div>
        <!-- Total Watched -->
        <div class='ztm-section-times-item'>
            <div class='ztm-section-times-text'>Total Watched</div>
            <div class='ztm-section-times-data'>${totalWatched}</div>
        </div>
        <!-- Total Left -->
        <div class='ztm-section-times-item'>
            <div class='ztm-section-times-text'>Total Left</div>
            <div class='ztm-section-times-data'>${totalLeft}</div>
        </div>
    `

    // Get the course progress percentage bar
    const progressBar = document.querySelector('.progressBar');
    // Not to show if the course length is zero length
    const isCourseLengthZero = courseLength == '0min 0s'

    // Only add to the page if there is progressBar
    if (progressBar && !isCourseLengthZero) {
        // Add ztmSidebarSectionTimesDiv
        progressBar.parentNode.insertBefore(ztmSidebarSectionTimesDiv, progressBar.nextSibling);
    }
};

const ztmCurriculumPageSectionTimes = () => {
    // For Course Length
    const courseLengthTotalArray = [];
    // For Total Watched
    const totalWatchedArray = [];
    // For Total Left
    const totalLeftArray = [];

    // Get all the lecture bars
    const lectureBars = document.querySelectorAll('.bar');

    // For Total Watched and Total Left
    lectureBars.forEach((lectureBar) => {
        const icon = lectureBar.querySelector('use');
        const iconStatus = icon.getAttribute('xlink:href');

        // For Course Length
        getTimes(lectureBar, '.jsx-2138578525.duration', courseLengthTotalArray)

        if (iconStatus === '#icon-circle-check') {
            // For Total Watched
            getTimes(lectureBar, '.jsx-2138578525.duration', totalWatchedArray)
        } else if (iconStatus === '#icon-circle-outline') {
            // For Total Left
            getTimes(lectureBar, '.jsx-2138578525.duration', totalLeftArray)
        }
    });

    const courseLength = getTimesData(0, courseLengthTotalArray);
    const totalWatched = getTimesData(0, totalWatchedArray);
    const isFinished = getTimesData(0, totalLeftArray);
    // If all are zeros, mark as `Completed`
    const totalLeft = isFinished === '0min 0s' ? 'Completed' : isFinished;

    const alreadySectionTimesDiv = document.getElementById('ztm-section-times-container');
    
    // Add sidebar section div
    if (!alreadySectionTimesDiv) {
        curriculumPageSectionTimesDiv(courseLength, totalWatched, totalLeft);
    }
};

const curriculumSectionTimesDiv = (sectionTitleItem, totalWatched, total ) => {
    // Create a new div for lecture time data
    const ztmCurriculumSectionTimesDiv = document.createElement('div');
    // Add id
    ztmCurriculumSectionTimesDiv.id = 'curriculum-section-times-container'

    const forCourseCurriculumPage = document.querySelector('.instructor');
    const forLearningPage = document.querySelector('.nav-icon-back');

    if (forCourseCurriculumPage) {
        ztmCurriculumSectionTimesDiv.innerHTML = `
            <!-- Total Watched -->
            <div class='curriculum-section-times-item'>
                <div class='curriculum-section-times-text'>Watched</div>
                <div class='curriculum-section-times-data'>${totalWatched}</div>
            </div>
            <!-- Course Length -->
            <div class='curriculum-section-times-item'>
                <div class='curriculum-section-times-text'>Total</div>
                <div class='curriculum-section-times-data'>${total}</div>
            </div> 
        `
    };

    if (forLearningPage) {
        ztmCurriculumSectionTimesDiv.innerHTML = `
            <!-- Total -->
            <div class='curriculum-section-times-item for-learning-page'>
                <div class='curriculum-section-times-data'>${total}</div>
            </div> 
        `
    };

    sectionTitleItem.appendChild(ztmCurriculumSectionTimesDiv);
}

const ztmCurriculumSectionTimes = () => {

};

// Section Times for Learning Page
const ztmLearningPageSectionTimes = () => {
    const courseSections = document.querySelectorAll('.course-section');

    // Loop through to add time data
    courseSections.forEach((section) => {
        const learningPageSectionTitleItem = section.querySelector('.section-title')
        const learningPageSectionItems = section.querySelectorAll('.section-item');

        // For Total
        const learningPageTotalArray = [];
        learningPageSectionItems.forEach((sectionItem) => getTimes(sectionItem, learningPageTotalArray, '.lecture-name'));
        const learningPageTotal = getTimesData(0, learningPageTotalArray);

        // Only add section time div if the total section is not zero
        if (learningPageTotal !== '0min 0s') {
            const alreadyCurriculumSectionTimesDiv = section.querySelector('#curriculum-section-times-container');

            // Only add if there is no curriculum section times div
            if (!alreadyCurriculumSectionTimesDiv) {
                curriculumSectionTimesDiv(learningPageSectionTitleItem, 0, learningPageTotal)
            }
        };
    });
};

const hideCourseInfoSectionTimes = (isChecked) => {
    // Only run the ztmCourseInfoSectionTimes on the course info page
    const ztmInstructorProfile = document.querySelector('.instructor');

    if (ztmInstructorProfile) {
        ztmCurriculumPageSectionTimes();

        // Get the getSidebarSectionTimesDiv to hide
        const getSidebarSectionTimesDiv = document.getElementById('ztm-section-times-container');
        // If there is getSidebarSectionTimesDiv, apply style
        if (getSidebarSectionTimesDiv) {
            getSidebarSectionTimesDiv.style.display = isChecked ? 'block' : 'none';
        }
    }

    ztmLearningPageSectionTimes();

    const getCurriculumSectionTimesDivs = document.querySelectorAll('#curriculum-section-times-container');
    
    getCurriculumSectionTimesDivs.forEach(getCurriculumSectionTimesDiv => {
        getCurriculumSectionTimesDiv.style.display = isChecked ? 'flex' : 'none';
    })

};

const ztmSectionTimes = () => {
    // Get the initial checkbox status and apply style
    chrome.storage.sync.get('ztmSectionTimesCheckboxIsChecked', (data) => {
        let isChecked = data.ztmSectionTimesCheckboxIsChecked || false;
        hideCourseInfoSectionTimes(isChecked);
    })

    // Get the checkbox status dynamically and apply style
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync' && 'ztmSectionTimesCheckboxIsChecked' in changes) {
            let isChecked = changes.ztmSectionTimesCheckboxIsChecked.newValue || false;
            hideCourseInfoSectionTimes(isChecked);    
        };
    });
}

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'windowChanged') {
//         ztmSectionTimes();
//     }
// });

// Track the page
const ztmSectionTimesObserver = new MutationObserver(() => ztmSectionTimes());
ztmSectionTimesObserver.observe(document.body, { childList: true, subtree: true });







