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

// Card Style
const cardStyles = document.createElement('style');
cardStyles.innerHTML = `
<style>
.course-listing {
    display: flex !important;
    flex-direction: column !important;
    width: 100%;
    box-shadow: 2px 4px 40px rgba(19, 15, 235, 0.1) !important;
    transition: box-shadow 0.4s ease-in-out !important;

    &:hover {
    box-shadow: 2px 4px 40px rgba(19, 15, 235, 0.3) !important;
    }
}


.course-listing .course-box-image-container {
    width: 100% !important;
    height: 200px !important;
    cursor: pointer !important;
}


@media screen and (max-width: 765px) {
    .course-listing-title { 
        min-height: 100px !important;
    }
}
.course-listing .course-listing-subtitle {
    height: 200px !important;
}
</style>`


const addFavCoursesDiv = () => {
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

// Add favorite course heart icon
const ztmFavoriteCourse = () => {
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
            this.classList.toggle('ztm-heart-icon-clicked');

            // Store the click state
            let isFavorited = this.classList.contains('ztm-heart-icon-clicked');
            localStorage.setItem(`${courseTitle}_isFavorited`, isFavorited);
        });
    });
}

const filterFavoritedCourses = () => {

    // Collect all the favoried courses as array
    const favoritedCoursesArray = []
    // Get all the courses
    const ztmCourses = document.querySelectorAll('.col-xs-12.col-sm-6.col-md-4');

    // Loop through the courses and append the favoried course to the favoritedCoursesArray
    ztmCourses.forEach((course) => {
        // ztm-heart-icon-clicked
        const containHeartClick = course.querySelector('.ztm-heart-icon-clicked');

        if (containHeartClick) {
            favoritedCoursesArray.push(course.innerHTML)
            // favoritedCoursesArray.push(cardStyles.innerHTML);
        }
    })

    // Turn favoritedCoursesArray value into single array
    const filteredFavCoursesString = favoritedCoursesArray.join('');
    console.log(filteredFavCoursesString)

    // Get the course list
    const ztmCourseList = document.querySelector('.course-list');


    // Replace the course list with the new filtered fav course list
    if (ztmCourseList) {
        ztmCourseList.innerHTML = filteredFavCoursesString
    }
}

// const hideUnfavoritedCourses = () => {
//     // Get the fav course feature status
//     const ztmFavCoursesFeatureStatus = localStorage.getItem('ztmFavCoursesStatus') === 'true';

//     ztmCourses.forEach((course) => {
//         const ztmHeartIconClicked = course.querySelector('.ztm-heart-icon-clicked');

//         if (ztmFavCoursesFeatureStatus && ztmHeartIconClicked) {
//             course.style.display = 'block';
//         } else {
//             course.style.display = 'none';
//         };
//     });

// }











addFavCoursesDiv();
ztmFavoriteCourse();
filterFavoritedCourses();
// hideUnfavoritedCourses();

