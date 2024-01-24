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

// Convert times to seconds
const convertToSeconds = (time) => {
    // Split into minutes and seconds
    const [ minutes, seconds ] = time.split(":").map(Number);
    let totalSeconds = minutes * 60 + seconds

    return totalSeconds;
}

// Collect all the time data
const getTimes = (text, array) => {
    // Regex expression to extract minute from the lectureName
    const regex = /\(([^)]*:\s*[^)]+)\)/;
    // Get the minutes
    let getLectureTimes = text.match(regex);
    // Remove all white spaces
    if (getLectureTimes && getLectureTimes[1]) {
        let lectureTimes = getLectureTimes[1].replaceAll(/\s/g,'');

        // Add lectureTimes to array;
        array.push(lectureTimes);
    }
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

// Create new empty arrays to collect lecture minutes
const courseLengthTotalArray = [];
const courseLengthTotalSeconds = 0;

const totalWatchedArray = [];
const totalWatchedSeconds = 0;

const totalLeftArray = [];
const totalLeftSeconds = 0;

// Get all the section items
const sectionItems = document.querySelectorAll('.section-item');

sectionItems.forEach((sectionItem) => {
    const lectureName = sectionItem.querySelector('.lecture-name').innerText;

    // For the course length data
    getTimes(lectureName, courseLengthTotalArray);
});

// Total seconds
getTimesData(courseLengthTotalSeconds, courseLengthTotalArray);








