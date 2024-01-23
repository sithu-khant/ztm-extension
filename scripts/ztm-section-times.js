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
    <!-- Total Times -->
    <div class='ztm-section-times-item'>
        <div class='ztm-section-times-text'>Total Times</div>
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

// Get all the section items
const sectionItems = document.querySelectorAll('.section-item');
// Create a new empty array to collect lecture minutes
const ztmMinutesArray = [];

sectionItems.forEach((sectionItem) => {
    const lectureName = sectionItem.querySelector('.lecture-name').innerText;
    // Regex expression to extract minute from the lectureName
    const regex = /\(([^)]*:\s*[^)]+)\)/;
    // Get the minutes
    const getLectureMinutes = lectureName.match(regex);
    // Remove all white spaces
    if (getLectureMinutes && getLectureMinutes[1]) {
        const lectureMinutes = getLectureMinutes[1].replaceAll(/\s/g,'');

        // Add lectureMinutes to ztmMinutesArray;
        ztmMinutesArray.push(lectureMinutes);
    }
});








