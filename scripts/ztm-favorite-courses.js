/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Tue Feb 1, 2024
 * Description: Adds favorite course feature to the home page
 */ 

// Create Boxicons style
const boxiconsCss = document.createElement('link');
boxiconsCss.rel = 'stylesheet';
boxiconsCss.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'

// Add Boxicons style to the head
document.head.appendChild(boxiconsCss);

// Fav courses components
const favCoursesComponents = () => {
    // get the course filter
    const courseFilter = document.querySelector('.course-filter');

    const favCoursesButton = document.createElement('div');
    favCoursesButton.innerHTML = `
    <div class="pull-left course-filter ztm-fav-courses-button">
        <div class="filter-label">
            Favorites:
        </div>
        <div class="btn-group">
            <button class="btn btn-default btn-lg btn-course-filter dropdown-toggle" type="button">
                <i class="bx bxs-heart" id="ztm-fav-courses-heart-icon"></i>
            </button>
        </div>
    </div>
    `
    // Add favCoursesButton to the academy page
    courseFilter.parentNode.insertBefore(favCoursesButton, courseFilter.nextSibling);

    // Get course cards
    let courseCards = document.querySelectorAll('.course-listing');

    // Add heart icon to each courses
    courseCards.forEach((courseCard) => {
        // get the course 
        const courseCardRow = courseCard.querySelector('.row');
        
        // Create a new div
        const ztmFavCoursesDiv = document.createElement('div');
        ztmFavCoursesDiv.id = 'ztm-fav-courses'
        // Create heart icon element 
        // <i class='bx bxs-heart' id='ztm-heart'></i>
        let ztmHeartIcon = document.createElement('i');
        ztmHeartIcon.classList.add('bx', 'bxs-heart');
        ztmHeartIcon.id = 'ztm-heart-icon'

        // Add course title as the class name for storing fav courses
        let getCourseTitle = courseCard.querySelector('.course-listing-title')
        let courseTitle = getCourseTitle.textContent.replaceAll(' ', '').replaceAll(':', '').trim();
        ztmHeartIcon.classList.add(courseTitle);

        // Add `ztmHeartIcon` to `ztmFavCoursesDiv`
        ztmFavCoursesDiv.appendChild(ztmHeartIcon);

        // Add `ztmHeartIcon` to `courseCardRow`
        courseCardRow.appendChild(ztmFavCoursesDiv);
    });
};

// Get all the favorited course array from the local storage
let favCoursesArray = JSON.parse(localStorage.getItem('favCoursesArrayData')) || [];


const favCoursesCards = () => {
    // Get all the heart icon
    let ztmHeartIcon = document.querySelectorAll('#ztm-heart-icon');

    // add toggle click
    ztmHeartIcon.forEach(function (heartIcon) {
        // Get course title class for storing favorite course
        let courseTitle = heartIcon.classList[2]

        // Get the favorite courses from the local storage
        let isFavorited = localStorage.getItem(`${courseTitle}_isFavorited`) === 'true';
        // Add to the course is favorited
        if (isFavorited) {
            heartIcon.classList.add('ztm-heart-icon-clicked');
        };

        // Toggle heart icon click
        heartIcon.addEventListener('click', function (event) {
            // Disable to click
            event.stopPropagation();
            // Toggle `ztm-heart-icon-clicked` class
            heartIcon.classList.toggle('ztm-heart-icon-clicked');

            // If the course is favorited or not
            let isFavorited = heartIcon.classList.contains('ztm-heart-icon-clicked');
            // Store the click state
            localStorage.setItem(`${courseTitle}_isFavorited`, isFavorited);

            // Get the course data
            let favoritedCourse = heartIcon.closest('.col-xs-12.col-sm-6.col-md-4');
            let favoritedCourseTitle = favoritedCourse.querySelector('.course-listing-title').innerText;
            let favoritedCourseInnerHTML = favoritedCourse.innerHTML;

            // Get the course title
            const getCourseTitle = (courseString) => {
                // Temporary div for storing course string as the innerHTML
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = courseString;

                let courseTitle = tempDiv.querySelector('.course-listing-title');
                // Return course title, otherwise, it will return empty string.
                return courseTitle ? courseTitle.textContent.trim() : '';
            }

            // If not favorited, remove (filter) that course for code improvement.
            if (!isFavorited) {
                favCoursesArray = favCoursesArray.filter((courseString) => getCourseTitle(courseString) !== favoritedCourseTitle.trim());
            } else {
                favCoursesArray.push(favoritedCourseInnerHTML);
            };

            // Remove duplicated values in `favCoursesArray` based on the course title
            favCoursesArray = favCoursesArray.reduce((array, currentCourse) => {
                let currentTitle = getCourseTitle(currentCourse);
                let isDuplicated = array.some(course => getCourseTitle(course) === currentTitle);

                if (!isDuplicated) {
                    array.push(currentCourse);
                }
                return array;
            }, []);

            // Store the favorite courses data array in the local storage
            localStorage.setItem('favCoursesArrayData', JSON.stringify(favCoursesArray));
        });
    });
};

// toggle fav courses
const toggleCourses = () => {
    // Get the ztm-fav-courses-heart-icon
    let ztmFavCoursesHeartIcon = document.querySelector('#ztm-fav-courses-heart-icon');
    // Get if there is `filtered-fav-courses` or not
    let favCoursesButtonStatus = ztmFavCoursesHeartIcon.classList.contains('filtered-fav-courses');

    // Get course cards
    let courseCards = document.querySelectorAll('.col-xs-12.col-sm-6.col-md-4');

    courseCards.forEach((course) => {
        course.style.display = favCoursesButtonStatus ? 'none' : 'block'
    });

    // Get the pagination
    let pagination = document.querySelector('.pagination');
    if (pagination) {
        pagination.style.display = favCoursesButtonStatus ? 'none' : ''
    };
};

// Toggle fav courses
const toggleFavCourses = () => {
    // Get the ztm-fav-courses-heart-icon
    let ztmFavCoursesHeartIcon = document.querySelector('#ztm-fav-courses-heart-icon');
    // Get if there is `filtered-fav-courses` or not
    let favCoursesButtonStatus = ztmFavCoursesHeartIcon.classList.contains('filtered-fav-courses');

    if (!favCoursesButtonStatus) {
        let favCourses = document.querySelectorAll('.fav-courses');
        // Remove all favorite courses the course
        favCourses.forEach((course) => course.remove());
        
    } else {
        // Get the course list
        let courseList = document.querySelector('.course-list');

        // Get all the favorited course array from the local storage
        let favCoursesArray = JSON.parse(localStorage.getItem('favCoursesArrayData')) || [];

        // Loop through the array
        favCoursesArray.forEach((courseString) => {
            // Temporary div for storing course string as the innerHTML
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = courseString;
            tempDiv.classList.add('col-xs-12', 'col-sm-6', 'col-md-4', 'fav-courses');

            // Remove `ztm-fav-courses` heart icon in the favorited course

            // Append the courses to the course list
            courseList.appendChild(tempDiv);
        });
    };
};

//
const toggleFavCoursesButton = () => {
    // Get the ztm-fav-courses-heart-icon
    let ztmFavCoursesHeartIcon = document.querySelector('#ztm-fav-courses-heart-icon');

    // Get the fav course feature status ztm-fav-courses-button
    let getFavCoursesButtonStatus = localStorage.getItem('favCoursesButtonStatus') === 'true';

    if (getFavCoursesButtonStatus) {
        ztmFavCoursesHeartIcon.classList.add('filtered-fav-courses');   
    } 
    // toggle courses
    toggleCourses();
    // toggle favorite courses
    toggleFavCourses();

    // Listner for the click statement
    ztmFavCoursesHeartIcon.addEventListener('click', () => {
        // Store the favorite courses data array in the local storage
        // localStorage.setItem('favCoursesArrayData', JSON.stringify(favCoursesArray));

        // toggle the class name by the student click
        ztmFavCoursesHeartIcon.classList.toggle('filtered-fav-courses');
        // toggle courses
        toggleCourses();
        // toggle favorite courses
        toggleFavCourses();

        // Get if there is `filtered-fav-courses` or not
        let favCoursesButtonStatus = ztmFavCoursesHeartIcon.classList.contains('filtered-fav-courses');

        // Set the favorite course status
        localStorage.setItem('favCoursesButtonStatus', favCoursesButtonStatus)
    });
};





















const ztmFavoriteCourses = () => {
    // Only work on the hompage
    // get the course filter
    const courseFilter = document.querySelector('.course-filter');

    if (courseFilter) {
        favCoursesComponents();
        favCoursesCards();
        toggleFavCoursesButton();
    };
};




chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'windowChanged') {
        ztmFavoriteCourses();
        // localStorage.removeItem('favCoursesArrayData');
    };
});




//