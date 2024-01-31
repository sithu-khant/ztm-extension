/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Tue Jan 30, 2024
 * Description: Adds favorite course feature to the home page
 */ 

// Create Boxicons style
const boxiconsCss = document.createElement('link');
boxiconsCss.rel = 'stylesheet';
boxiconsCss.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'

// Add Boxicons style to the head
document.head.appendChild(boxiconsCss);

// Add fav course button to the page
const addFavCoursesButtonDiv = () => {
    // get the course filter
    const courseFilter = document.querySelector('.course-filter');

    const favCoursesDiv = document.createElement('div');
    favCoursesDiv.innerHTML = `
    <div class="pull-left course-filter ztm-fav-course-button">
        <div class="filter-label">
            Favorites:
        </div>
        <div class="btn-group">
            <button class="btn btn-default btn-lg btn-course-filter dropdown-toggle" type="button">
                <i class="bx bxs-heart" id="ztm-fav-course-heart-icon"></i>
            </button>
        </div>
    </div>
    `

    courseFilter.parentNode.insertBefore(favCoursesDiv, courseFilter.nextSibling);
};

// Function for showing/hiding fav courses 
const favCoursesButton = () => {
    // Add fav course button 
    addFavCoursesButtonDiv();

    // Get the fav courses heart icon
    const ztmFavCoursesHeartIcon = document.getElementById('ztm-fav-course-heart-icon');

    // Get the fav course feature status
    const getFavCoursesFeatureStatus = localStorage.getItem('ztmFavCoursesStatus') === 'true';

    if (getFavCoursesFeatureStatus) {
        ztmFavCoursesHeartIcon.classList.add('filtered-fav-courses');
    } 

    // Listner for the click statement
    ztmFavCoursesHeartIcon.addEventListener('click', () => {
        // toggle the class name by the student click
        ztmFavCoursesHeartIcon.classList.toggle('filtered-fav-courses');

        // Get if there is `filtered-fav-courses` or not
        const favCoursesFeatureStatus = ztmFavCoursesHeartIcon.classList.contains('filtered-fav-courses');
        // Set the favorite course status
        localStorage.setItem('ztmFavCoursesStatus', favCoursesFeatureStatus)
    });
};

// Add favorite course heart icon
const addFavCoursesHeartIcon = () => {
    // Get course cards
    let courseCards = document.querySelectorAll('.course-listing');

    // Add heart icon to each courses
    courseCards.forEach((courseCard) => {
        // get the course 
        const courseCardRow = courseCard.querySelector('.row');
        
        // Create a new div
        const ztmFavCoursesDiv = document.createElement('div');
        ztmFavCoursesDiv.id = 'ztm-fav-course'
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
}

// Function for toggle heart icon status 
// and for storing fav courses into an array
const favCoursesHeartIcon = () => {
    // Add heart icons
    addFavCoursesHeartIcon();

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

            // To store the favorite course list
            let courseListing = heartIcon.closest('.course-listing');
            let courseName = courseListing.querySelector('.course-listing-title').innerText;
            let courseUrl = courseListing.getAttribute('data-course-url');

            // Get the array from local storage
            let favCoursesArray = JSON.parse(localStorage.getItem('favLinkArrayData')) || [];
            
            // Remove the course if it is not favorited
            if (!isFavorited) {
                favCoursesArray = favCoursesArray.filter((course) => course.url !== courseUrl);
            } else {
                // Check if Course url already exists,
                // if already there, don't append it.
                if (!favCoursesArray.some((course) => course.url == courseUrl)) {
                    // Create an object for the current course
                    let courseData = {
                        name: courseName,
                        url: courseUrl
                    };
                    // Push the courseData object to the favCoursesArray
                    favCoursesArray.push(courseData);
                };
            };

            // Remove duplcatated values in `favCoursesArray` to make it sure
            favCoursesArray = favCoursesArray.reduce((array, currentCourse) => {
                let isDuplicated = array.some(course => course.url === currentCourse.url);
                if (!isDuplicated) {
                    array.push(currentCourse);
                };
                return array;
            }, []);

            // Store the updated array in local storage
            localStorage.setItem('favLinkArrayData', JSON.stringify(favCoursesArray));
        });
    });
};

const favCourses = () => {
    // Create a table div
    const ztmFavCourseTableDiv = document.createElement('div');
    // Add ID 
    ztmFavCourseTableDiv.id = 'ztm-fav-course-container'
    
};

const ztmFavCourses = () => {
    // Get the addFavCoursesHeartIconDiv check status
    const IsEnabledFavCourses =  localStorage.getItem('ztmFavCoursesStatus') === 'true'

    // Get course cards
    let courseCards = document.querySelectorAll('.col-xs-12.col-sm-6.col-md-4');

    courseCards.forEach((course) => {
        course.style.display = IsEnabledFavCourses ? 'none' : 'block'
    });

    // Get the pagination
    let pagination = document.querySelector('.pagination');
    if (pagination) {
        pagination.style.display = IsEnabledFavCourses ? 'none' : ''
    }
}



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'windowChanged') {
        // Get the ztm-fav-course-button
        let ztmFavCourseButton = document.querySelector('.ztm-fav-course-button');
        // To prevent overwritting
        if (!ztmFavCourseButton) {
            favCoursesButton();
            favCoursesHeartIcon();

            favCourses();
            ztmFavCourses();
        };
    };
});




