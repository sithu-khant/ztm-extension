/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Fri Mar 5, 2024
 * Description: Adds favorite course feature to the home page
 */ 

// Create Boxicons style
const courseDetailsboxiconsCss = document.createElement('link');
courseDetailsboxiconsCss.rel = 'stylesheet';
courseDetailsboxiconsCss.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'

// Add Boxicons style to the head
document.head.appendChild(courseDetailsboxiconsCss);

// Fav courses components
const courseDetailsComponents = () => {

    // Get course cards
    let courseCards = document.querySelectorAll('.course-listing');

    // Add heart icon to each courses
    courseCards.forEach((courseCard) => {
        // get the course 
        const courseCardRow = courseCard.querySelector('.row');
        
        // Create a new div
        const ztmCourseDetailsDiv = document.createElement('div');
        ztmCourseDetailsDiv.id = 'ztm-course-details'
        // Create heart icon element 
        // <i class='bx bxs-heart' id='ztm-heart'></i>
        let ztmCourseDetailsIcon = document.createElement('i');
        ztmCourseDetailsIcon.classList.add('bx', 'bx-info-circle');
        ztmCourseDetailsIcon.id = 'ztm-course-details-icon'

        // Add `ztmCourseDetailsIcon` to `ztmCourseDetailsDiv`
        ztmCourseDetailsDiv.appendChild(ztmCourseDetailsIcon);

        // Add `ztmCourseDetailsIcon` to `courseCardRow`
        courseCardRow.appendChild(ztmCourseDetailsDiv);
    });
};

// // Get the course title
// const getCourseTitle = (courseString) => {
//     // Temporary div for storing course string as the innerHTML
//     let tempDiv = document.createElement('div');
//     tempDiv.innerHTML = courseString;

//     let courseTitle = tempDiv.querySelector('.course-listing-title');
//     // Return course title, otherwise, it will return empty string.
//     return courseTitle ? courseTitle.textContent.trim() : '';
// }