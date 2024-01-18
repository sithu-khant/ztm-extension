/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Thu Jan 18, 2024
 * Description: Adds favorite course feature to the home page
 */ 

// // Create Boxicons style
// const boxiconsCss = document.createElement('link');
// boxiconsCss.rel = 'stylesheet';
// boxiconsCss.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'

// // Add Boxicons style to the head
// document.head.appendChild(boxiconsCss);

// // Add favorite course heart icon
// const ztmFavoriteCourse = () => {
//     // Get course cards
//     let courseCards = document.querySelectorAll('.course-listing');

//     // Add heart icon to each courses
//     courseCards.forEach((courseCard) => {
//         // get the course 
//         const courseCardRow = courseCard.querySelector('.row');
        
//         // Create a new div
//         const ztmFavCourseDiv = document.createElement('div');
//         ztmFavCourseDiv.id = 'ztm-fav-course'
//         // Create heart icon element 
//         // <i class='bx bxs-heart' id='ztm-heart'></i>
//         let ztmHeartIcon = document.createElement('i');
//         ztmHeartIcon.classList.add('bx', 'bxs-heart');
//         ztmHeartIcon.id = 'ztm-heart-icon'

//         // Add course title as the class name for storing fav courses
//         let getCourseTitle = courseCard.querySelector('.course-listing-title')
//         let courseTitle = getCourseTitle.textContent.replaceAll(' ', '').replaceAll(':', '').trim();
//         ztmHeartIcon.classList.add(courseTitle);

//         // Add `ztmHeartIcon` to `ztmFavCourseDiv`
//         ztmFavCourseDiv.appendChild(ztmHeartIcon);

//         // Add `ztmHeartIcon` to `courseCardRow`
//         courseCardRow.appendChild(ztmFavCourseDiv);
//     });

//     // Get all the heart icon
//     let ztmHeartIcon = document.querySelectorAll('#ztm-heart-icon');

//     // add toggle click
//     ztmHeartIcon.forEach(function (heartIcon) {
//         // Get course title class for storing favorite course
//         let courseTitle = heartIcon.classList[2]

//         // Get the favorite courses from the local storage
//         let isFavorited = localStorage.getItem(`${courseTitle}_isFavorited`) === 'true';
//         // Add to the course is favorited
//         if (isFavorited) {
//             heartIcon.classList.add('ztm-heart-icon-clicked');
//         };

//         // Toggle heart icon click
//         heartIcon.addEventListener('click', function (event) {
//             // Disable to click
//             event.stopPropagation();

//             // Toggle `ztm-heart-icon-clicked` class
//             this.classList.toggle('ztm-heart-icon-clicked');

//             // Store the click state
//             let isFavorited = this.classList.contains('ztm-heart-icon-clicked');
//             localStorage.setItem(`${courseTitle}_isFavorited`, isFavorited);
//         });
//     });
// }

// // Sort the courses
// const ztmFavoriteSort = () => {
//     // Get the course lis
//     let courseList = document.querySelector('.course-list');
    
//     // Get the courses
//     let courses = courseList.querySelectorAll('.col-xs-12.col-sm-6.col-md-4')
//     // Create an arrry form the course
//     let courseArray = Array.from(courses);

//     // Sort the courses
//     courseArray.sort((firstCourse, secondCourse) => {
//         // Get the heart icon
//         const firstCourseFavorited = firstCourse.querySelector('.ztm-heart-icon-clicked') !== null;
//         const secondCourseFavorited = secondCourse.querySelector('.ztm-heart-icon-clicked') !== null;

//         // Put first the courses with class
//         if (!firstCourseFavorited && secondCourseFavorited) return 1;
//         if (firstCourseFavorited && !secondCourseFavorited) return -1;

//         // keep the original for the courses without favorited
//         return 0;
//     });

//     // Update the course list order
//     courseArray.forEach(course => courseList.appendChild(course));
// };

// ztmFavoriteCourse();
// ztmFavoriteSort();

