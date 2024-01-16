/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Tue Jan 16, 2024
 * Description: Adds favorite course feature to the home page
 */ 

// Create Boxicons style
const boxiconsCss = document.createElement('link');
boxiconsCss.rel = 'stylesheet';
boxiconsCss.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'

// Add Boxicons style to the head
document.head.appendChild(boxiconsCss);

// Get course cards
const courseCards = document.querySelectorAll('.course-listing');

// Add heart icon to each courses
courseCards.forEach((courseCard) => {
	// get the course 
    const courseCardRow = courseCard.querySelector('.row');
    
    // Create a new div
    const ztmFavCourseDiv = document.createElement('div');
    ztmFavCourseDiv.id = 'ztm-fav-course'
    // Create heart icon element 
    // <i class='bx bxs-heart' id='ztm-heart'></i>
    const ztmHeartIcon = document.createElement('i');
    ztmHeartIcon.classList.add('bx', 'bxs-heart');
    ztmHeartIcon.id = 'ztm-heart-icon'

    // Add `ztmHeartIcon` to `ztmFavCourseDiv`
    ztmFavCourseDiv.appendChild(ztmHeartIcon);

    // Add `ztmHeartIcon` to `courseCardRow`
    courseCardRow.appendChild(ztmFavCourseDiv);
});

// Get all the heart icon
const ztmHeartIcon = document.querySelectorAll('#ztm-heart-icon');

// add toggle click
ztmHeartIcon.forEach((heartIcon) => {
    heartIcon.addEventListener('click', function(event) {
        this.classList.toggle('ztm-heart-icon-clicked');
    });
});













