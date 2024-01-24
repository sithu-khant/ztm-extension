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

    console.log(`${courseTotalHours}hrs ${courseTotalMinutes}mins ${courseTotalSeconds}secs`);
};

// For Course Length
const courseLengthTotalSeconds = 0;
const courseLengthTotalArray = [];
// For Total Watched
const totalWatchedSeconds = 0;
const totalWatchedArray = [];
// For Total Left
const totalLeftSeconds = 0;
const totalLeftArray = [];

const ztmSectionTimes = () => {
    // Get all the lectures
    const courseLengthSectionItems = document.querySelectorAll('.section-item');
    // Get all the completed lectures
    const totalWatchedSectionItems = document.querySelectorAll('.completed');
    // Get all the incompleted items
    const totalLeftSectionItems = document.querySelectorAll('.incomplete');

    // For Course Length
    courseLengthSectionItems.forEach((sectionItem) => getTimes(sectionItem, courseLengthTotalArray));
    getTimesData(courseLengthTotalSeconds, courseLengthTotalArray);

    // For Total Watched
    totalWatchedSectionItems.forEach((sectionItem) => getTimes(sectionItem, totalWatchedArray));
    getTimesData(totalWatchedSeconds, totalWatchedArray);

    totalLeftSectionItems.forEach((sectionItem) => getTimes(sectionItem, totalLeftArray));
    getTimesData(totalLeftSeconds, totalLeftArray);

};

ztmSectionTimes();







