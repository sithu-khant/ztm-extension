/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Tue Jan 23, 2024
 * Description: Show lecture time data in the course info page
 */ 

// Get the course progress percentage bar
const progressBar = document.querySelector('.course-progress-percentage');

// Create a new div for lecture time data
const ztmSectionTimesDiv = document.createElement('div');
// Add id
ztmSectionTimesDiv.id = 'ztm-section-times-container'
ztmSectionTimesDiv.innerHTML = `
    <!-- Course Length -->
    <div class='ztm-section-times-item'>
        <div class='ztm-section-times-text'>Course Length</div>
        <div class='ztm-section-times-data'>2hrs 3mins</div>
    </div>
    <!-- Total Watched -->
    <div class='ztm-section-times-item'>
        <div class='ztm-section-times-text'>Total Watched</div>
        <div class='ztm-section-times-data'>2hrs 3mins</div>
    </div>
    <!-- Total Left -->
    <div class='ztm-section-times-item'>
        <div class='ztm-section-times-text'>Total Left</div>
        <div class='ztm-section-times-data'>2hrs 3mins</div>
    </div>
`

progressBar.parentNode.insertBefore(ztmSectionTimesDiv, progressBar.nextSibling);

// Collect all the time data
const getTimes = (item, array) => {
    // Get the text
    const getText = item.querySelector('.lecture-name').innerText;
    // Regex expression to extract minute from the lectureName
    const regex = /\(([^)]*:\s*[^)]+)\)/;
    // Get the minutes
    const getLectureTimes = getText.match(regex);
    // Remove all white spaces
    if (getLectureTimes && getLectureTimes[1]) {
        const lectureTimes = getLectureTimes[1].replaceAll(/\s/g,'');

        // Add lectureTimes to array;
        array.push(lectureTimes);
    }
}

// Convert times to seconds
const convertToSeconds = (time) => {
    // Split into minutes and seconds
    const [ minutes, seconds ] = time.split(":").map(Number);
    const totalSeconds = minutes * 60 + seconds

    return totalSeconds;
}

const getTimesData = (totalSeconds, array) => {
    // Loop through array and apply convertToSeconds function
    array.forEach((time) => totalSeconds += convertToSeconds(time));

    // Total hours
    const courseTotalHours = Math.floor(totalSeconds / 3600); 
    // Total minutes
    const courseTotalMinutes = Math.floor((totalSeconds % 3600) / 60);
    // Total seconds
    const courseTotalSeconds = Math.floor(totalSeconds % 60);

    console.log(`${courseTotalHours}hrs ${courseTotalMinutes}mins ${courseTotalSeconds}secs`);
};

// -----
// Course Length Section - Start
// -----

// Create new empty arrays to collect lecture minutes
const courseLengthTotalSeconds = 0;
const courseLengthTotalArray = [];

// Get all the section items
const courseLengthSectionItems = document.querySelectorAll('.section-item');

courseLengthSectionItems.forEach((sectionItem) => getTimes(sectionItem, courseLengthTotalArray));
getTimesData(courseLengthTotalSeconds, courseLengthTotalArray);

// -----
// Course Length Section - End
// -----

// -----
// Total Watched Section - Start
// -----

const totalWatchedSeconds = 0;
const totalWatchedArray = [];

// Get all the section items
const totalWatchedSectionItems = document.querySelectorAll('.completed');

totalWatchedSectionItems.forEach((sectionItem) => getTimes(sectionItem, totalWatchedArray));
getTimesData(totalWatchedSeconds, totalWatchedArray);


// -----
// Total Watched Section - End
// -----


// -----
// Total Left Section - Start
// -----
const totalLeftSeconds = 0;
const totalLeftArray = [];

// Get all the section items
const totalLeftSectionItems = document.querySelectorAll('.incomplete');

if (totalLeftSectionItems) {
    totalLeftSectionItems.forEach((sectionItem) => getTimes(sectionItem, totalLeftArray));
    getTimesData(totalLeftSeconds, totalLeftArray);
}

// -----
// Total Left Section - End
// -----







