/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Tue Jan 23, 2024
 * Description: Show lecture time data in the course info page
 */ 

// Get the course progress percentage bar
const progressBar = document.querySelector('.course-progress-percentage');


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

    if (courseTotalHours > 0) {
        return `${courseTotalHours}h ${courseTotalMinutes}min`;
    } else {
        return `${courseTotalMinutes}min ${courseTotalSeconds}s`;
    }
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

const ztmSidebarSectionTimes = () => {
    // Get all the lectures
    const courseLengthSectionItems = document.querySelectorAll('.section-item');
    // Get all the completed lectures
    const totalWatchedSectionItems = document.querySelectorAll('.completed');
    // Get all the incompleted items
    const totalLeftSectionItems = document.querySelectorAll('.incomplete');

    // For Course Length
    courseLengthSectionItems.forEach((sectionItem) => getTimes(sectionItem, courseLengthTotalArray));
    const courseLength = getTimesData(courseLengthTotalSeconds, courseLengthTotalArray);

    // For Total Watched
    totalWatchedSectionItems.forEach((sectionItem) => getTimes(sectionItem, totalWatchedArray));
    const totalWatched = getTimesData(totalWatchedSeconds, totalWatchedArray);
    
    // For Total Left
    totalLeftSectionItems.forEach((sectionItem) => getTimes(sectionItem, totalLeftArray));
    const isFinished = getTimesData(totalLeftSeconds, totalLeftArray);
    // If all are zeros, mark as `Completed`
    const totalLeft = isFinished === '0min 0s' ? 'Completed' : isFinished;

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

    // Add ztmSidebarSectionTimesDiv
    progressBar.parentNode.insertBefore(ztmSidebarSectionTimesDiv, progressBar.nextSibling);

};

ztmSidebarSectionTimes();







