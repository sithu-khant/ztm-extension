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
        <p class='ztm-section-times-text'>Total Times</p>
        <p class='ztm-section-times-data'>2hrs 3mins</p>
    </div>
    <!-- Total Watched -->
    <div class='ztm-section-times-item'>
        <p class='ztm-section-times-text'>Total Watched</p>
        <p class='ztm-section-times-data'>2hrs 3mins</p>
    </div>
    <!-- Total Left -->
    <div class='ztm-section-times-item'>
        <p class='ztm-section-times-text'>Total Left</p>
        <p class='ztm-section-times-data'>2hrs 3mins</p>
    </div>
`

progressBar.parentNode.insertBefore(ztmSectionTimesDiv, progressBar.nextSibling);












