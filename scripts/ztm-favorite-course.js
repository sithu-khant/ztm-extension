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

// Add favorite course heart icon
const ztmFavoriteCourse = () => {
    // Get course cards
    let courseCards = document.querySelectorAll('.course-listing');

    // Add heart icon to each courses
    courseCards.forEach((courseCard) => {
        // get the course 
        const courseCardRow = courseCard.querySelector('.row');
        
        // Create a new div
        const ztmFavCourseDiv = document.createElement('div');
        ztmFavCourseDiv.id = 'ztm-fav-course'
        // Create heart icon element 
        // <i class='bx bxs-heart' id='ztm-heart'></i>
        let ztmHeartIcon = document.createElement('i');
        ztmHeartIcon.classList.add('bx', 'bxs-heart');
        ztmHeartIcon.id = 'ztm-heart-icon'

        // Add `ztmHeartIcon` to `ztmFavCourseDiv`
        ztmFavCourseDiv.appendChild(ztmHeartIcon);

        // Add `ztmHeartIcon` to `courseCardRow`
        courseCardRow.appendChild(ztmFavCourseDiv);
    });

    // Get all the heart icon
    let ztmHeartIcon = document.querySelectorAll('#ztm-heart-icon');

    // add toggle click
    ztmHeartIcon.forEach((heartIcon, index) => {
        heartIcon.addEventListener('click', function (event) {
            // Disable to click
            event.stopPropagation();

            // Toggle `ztm-heart-icon-clicked` class
            this.classList.toggle('ztm-heart-icon-clicked');

            // Store the click state
            let isFavorited = this.classList.contains('ztm-heart-icon-clicked');
            localStorage.setItem(`isFavorited_${index}`, isFavorited);
        });

        // Get the favorite courses from the local storage
        let isFavorited = localStorage.getItem(`isFavorited_${index}`) === 'true';

        // Add to the couse is favorited
        if (isFavorited) {
            heartIcon.classList.add('ztm-heart-icon-clicked');
        };
    });
}

// Sort the courses
const ztmFavoriteSort = () => {
    // Get course cards
    // let courseCards = document.querySelectorAll('.course-listing');
    let courseCards = document.querySelectorAll('.col-xs-12.col-sm-6.col-md-4');

    // Create arrary from the course divs
    const courseArray = Array.from(courseCards);

    // Sort the courses
    courseArray.sort((course, none) => {
        // Get the heart icon
        let ztmHeartIcon = course.querySelector('.ztm-heart-icon');
        // Get the favorited status
        let isFavorited = ztmHeartIcon && ztmHeartIcon.classList.contains('ztm-heart-icon-clicked')

        // if favrited, return 1
        return isFavorited ? 1 : -1;
    });

    // Get the course list body and replace with the sorted courses
    const courseList = document.querySelector('.course-list');

    // courseArray.forEach((course) => {
    //     courseList.removeChild(course);
    // });
    // courseList.innerHTML = '';

    courseArray.forEach((course) => {
        courseList.appendChild(course);
    });
};

ztmFavoriteCourse();
ztmFavoriteSort();








