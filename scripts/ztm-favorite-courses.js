/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Wed May 15, 2024
 * Description: Adds favorite course feature to the home page
 */ 

// Create Box icons style
const boxIconsCss = document.createElement('link');
boxIconsCss.rel = 'stylesheet';
boxIconsCss.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'

// Add Box icons style to the head
document.head.appendChild(boxIconsCss);

// Fav courses components
const favCoursesComponents = () => {
    // get the course filter
    const courseFilter = document.querySelector('.course-filter');

    const favCoursesButton = document.createElement('div');
    favCoursesButton.classList.add('pull-left', 'course-filter', 'ztm-fav-courses-button');
    favCoursesButton.innerHTML = `
    <div class="filter-label">
        Favorites:
    </div>
    <div class="btn-group">
        <button class="btn btn-default btn-lg btn-course-filter dropdown-toggle" type="button">
            <i class="bx bxs-heart" id="ztm-fav-courses-heart-icon"></i>
        </button>
    </div>
    `
    // // ztm-fav-courses-button
    // let ztmFavCoursesButton = document.querySelector('.ztm-fav-courses-button');

    // if (!ztmFavCoursesButton) {
    //     courseFilter.parentNode.insertBefore(favCoursesButton, courseFilter.nextSibling);
    // };

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

        // Add `ztmHeartIcon` to `ztmFavCoursesDiv`
        ztmFavCoursesDiv.appendChild(ztmHeartIcon);

        // Add `ztmHeartIcon` to `courseCardRow`
        courseCardRow.appendChild(ztmFavCoursesDiv);
    });
};

// Get all the favorite course array from the local storage
let favCoursesArray = JSON.parse(localStorage.getItem('favCoursesArrayData')) || [];
// Get all the heart clicked favorite course array from the local storage
let heartClickedArray = JSON.parse(localStorage.getItem('heartClickedArrayData')) || [];

// Get the course title
const getCourseTitle = (courseString) => {
    // Temporary div for storing course string as the innerHTML
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = courseString;

    let courseTitle = tempDiv.querySelector('.course-listing-title');
    // Return course title, otherwise, it will return empty string.
    return courseTitle ? courseTitle.textContent.trim() : '';
}

const favCoursesCards = () => {
    // Get all the heart icon
    let ztmHeartIcon = document.querySelectorAll('#ztm-heart-icon');

    // add toggle click
    ztmHeartIcon.forEach(function (heartIcon) {
        // Get the course data
        let favoritedCourse = heartIcon.closest('.col-xs-12.col-sm-6.col-md-4');
        let favoritedCourseTitle = favoritedCourse.querySelector('.course-listing-title').textContent.trim();
        let favoritedCourseInnerHTML = favoritedCourse.innerHTML;

        // Get the favorite status
        let isFavorited = heartClickedArray.includes(favoritedCourseTitle);
        heartIcon.style.color = isFavorited ? '#30d683' : 'grey'

        // Toggle heart icon click
        heartIcon.addEventListener('click', function (event) {
            // Disable to click
            event.stopPropagation();

            // Check if the title is already in the heartClickedArray or not
            let favoritedCourseTitleIndex = heartClickedArray.indexOf(favoritedCourseTitle);

            // If there is no favoritedCourseTitle in the heartClickedArray store it
            if (favoritedCourseTitleIndex === -1) {
                heartIcon.style.color = '#30d683'
                heartClickedArray.push(favoritedCourseTitle);
                favCoursesArray.push(favoritedCourseInnerHTML);
            } else {
                heartIcon.style.color = 'grey'
                heartClickedArray.splice(favoritedCourseTitleIndex, 1);
                favCoursesArray = favCoursesArray.filter((courseString) => getCourseTitle(courseString) !== favoritedCourseTitle.trim());
            }

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
            localStorage.setItem('heartClickedArrayData', JSON.stringify(heartClickedArray));

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

    // Get the filterTitle
    let filterTitle = document.querySelector('.filter-title');
    if (filterTitle) {
        filterTitle.style.display = favCoursesButtonStatus ? 'none' : ''
    }

    // Get the pagination
    let pagination = document.querySelector('.pagination');
    if (pagination) {
        pagination.style.display = favCoursesButtonStatus ? 'none' : ''
    }
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
        let noFavoritedCourseDiv = document.querySelector('#no-favorited-course');
        // Remove the text if there is
        noFavoritedCourseDiv ? noFavoritedCourseDiv.remove() : ''
    } else {
        // Get the course list
        let courseList = document.querySelector('.course-list');

        // Get all the favorited course array from the local storage
        let favCoursesArray = JSON.parse(localStorage.getItem('favCoursesArrayData')) || [];

        // No favorited course
        let noFavoritedCourseDiv = document.createElement('div');
        noFavoritedCourseDiv.id = 'no-favorited-course'
        noFavoritedCourseDiv.innerHTML = `
        <p>No courses selected as favorites. Turn off Favorites button above to see all courses.</p>
        `
        // If there is no favorited course
        let isAlreadyNoFavoritedCourseDiv = document.querySelector('#no-favorited-course');
        if (favCoursesArray.length === 0 && !isAlreadyNoFavoritedCourseDiv) {
            courseList.appendChild(noFavoritedCourseDiv);
        };

        // Loop through the array
        favCoursesArray.forEach((courseString) => {
            // Temporary div for storing course string as the innerHTML
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = courseString;
            tempDiv.classList.add('col-xs-12', 'col-sm-6', 'col-md-4', 'fav-courses');

            // Remove `ztm-fav-courses` heart icon in the favorited course
            // let ztmFavCourses = tempDiv.querySelector('#ztm-fav-courses');
            // ztmFavCourses.remove();

            // Append the courses to the course list
            courseList.appendChild(tempDiv);
        });
    }
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

    // Get the ztm-fav-courses-button
    let ztmFavCoursesButton = document.querySelector('.ztm-fav-courses-button');

    // Listener for the click statement
    ztmFavCoursesButton.addEventListener('click', () => {
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

// To update progress bar of favorited courses
const updateProgressbar = () => {
    // Get the course sidebar head
    let courseSidebarHeader = document.querySelector('.course-sidebar-head');
    // Get the course title
    let lectureCourseTitleElement = courseSidebarHeader.getElementsByTagName('h2')[0];
    let lectureCourseTitle = lectureCourseTitleElement.textContent.trim();
    // Get the updated percentage value
    let updatedPercentage = courseSidebarHeader.querySelector('.percentage').textContent.trim();

    // Get all the favorited course array from the local storage
    let favCoursesArray = JSON.parse(localStorage.getItem('favCoursesArrayData')) || [];

    favCoursesArray.forEach((courseString) => {
        // Temporary div for storing course string as the innerHTML
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = courseString;

        // Remove courseString from the favCoursesArray
        favCoursesArray.indexOf(courseString)

        let courseTitle = tempDiv.querySelector('.course-listing-title').textContent.trim();

        if (lectureCourseTitle === courseTitle) {
            // Update percentage with the updatedPercentage
            let percentage = tempDiv.querySelector('.percentage');
            percentage.textContent = updatedPercentage

            // get the progressbar-fill
            let progressbarFill = tempDiv.querySelector('.progressbar-fill');
            
            // Update the progress bar fill minWith with the new value
            progressbarFill.style.minWidth = updatedPercentage

            // Remove % sign from the updatedPercentage
            let updatedPercentageValue = updatedPercentage.replaceAll('%', '');
            // Update the aria-valuenow value with the new updatedPercentageValue
            progressbarFill.setAttribute('aria-valuenow', updatedPercentageValue.trim());

            // console.log(tempDiv.innerHTML)
        }

        // Get all the favorited course array from the local storage
        let updatedFavCoursesArray = JSON.parse(localStorage.getItem('favCoursesArrayData')) || [];

        // Remove favCoursesArray from the local storage
        localStorage.removeItem('favCoursesArrayData');

        let newUpdatedCourseString = tempDiv.innerHTML
        // Add newUpdatedCourseString to updatedFavCoursesArray
        updatedFavCoursesArray.unshift(newUpdatedCourseString);

        // Remove duplicated values in `favCoursesArray` based on the course title
        updatedFavCoursesArray = updatedFavCoursesArray.reduce((array, currentCourse) => {
            let currentTitle = getCourseTitle(currentCourse);
            let isDuplicated = array.some(course => getCourseTitle(course) === currentTitle);

            if (!isDuplicated) {
                array.push(currentCourse);
            }
            return array;
        }, []);

        // Store the updated favorite courses data array (updatedFavCoursesArray) in the local storage
        localStorage.setItem('favCoursesArrayData', JSON.stringify(updatedFavCoursesArray));
    });
};

// Remove extra fav courses components except the last one
const removeExtraFavCoursesComponents = () => {
    // Get all the ztm-fav-courses-button
    let ztmFavCoursesButtons = document.querySelectorAll('.ztm-fav-courses-button');
    // Check if there is more than one button
    if (ztmFavCoursesButtons.length > 1) {
        // Remove buttons starting from the first one up to the second-to-last one
        for (let i = 0; i < ztmFavCoursesButtons.length - 1; i++) {
            ztmFavCoursesButtons[i].remove();
        }
    }

    // Get all the course-listing
    let courseListing = document.querySelectorAll('.course-listing');
    courseListing.forEach((course) => {
        let ztmFavCoursesAll = course.querySelectorAll('#ztm-fav-courses');
        // Check if there is more than one button
        if (ztmFavCoursesAll.length > 1) {
            // Remove buttons starting from the first one up to the second-to-last one
            for (let i = 0; i < ztmFavCoursesAll.length - 1; i++) {
                ztmFavCoursesAll[i].remove();
            }
        }
    });
};

const toggleFavoriteCourses = (isChecked) => {
    // get all the favorite courses button
    let ztmFavCoursesButtons = document.querySelectorAll('.ztm-fav-courses-button');
    // get all the heart icons
    let ztmFavCoursesHeartIcons = document.querySelectorAll('#ztm-fav-courses');

    ztmFavCoursesButtons.forEach(button => {
        // button.style.display = isChecked ? 'block' : 'none'
        if (!isChecked) {
            button.remove()
        }
    });

    ztmFavCoursesHeartIcons.forEach(heartIcon => {
        heartIcon.style.display = isChecked ? 'block' : 'none'
    });

    // When toggle off from the popup, made all the course card to display block
    // get all the course cards
    let courseCards = document.querySelectorAll('.col-xs-12.col-sm-6.col-md-4')
    courseCards.forEach((courseCard) => {
        if (!isChecked) {
            courseCard.style.display = 'block'
        }
    });

    // Remove no favorite course text
    let noFavoritedCourseDiv = document.querySelector('#no-favorited-course');
    // Remove the text if it is unchecked
    !isChecked ? noFavoritedCourseDiv?.remove() : ''

    let pagination = document.querySelector('.pagination');
    if (pagination && !isChecked) {
        pagination.style.display = 'inline-block'
    }

    // get all the favorite courses
    let favCourseCards = document.querySelectorAll('.fav-courses')
    favCourseCards.forEach((courseCard) => {
        if (!isChecked) {
            courseCard.style.display = 'none'
        }
    })
};

const ztmFavoriteCourses = (isChecked) => {
    // Only work on the homepage
    const courseFilter = document.querySelector('.course-filter');
    if (courseFilter) {
        favCoursesComponents();
        toggleFavCoursesButton();
        removeExtraFavCoursesComponents();
        favCoursesCards();
        toggleFavoriteCourses(isChecked)

        // Get the ztm-fav-courses-button
        let ztmFavCoursesButton = document.querySelector('.ztm-fav-courses-button');
        // Listener for the click statement
        if (ztmFavCoursesButton) {
            ztmFavCoursesButton.addEventListener('click', () => {
                favCoursesComponents();
                removeExtraFavCoursesComponents();
                favCoursesCards();
                toggleFavoriteCourses(isChecked)
            });
        }
    }

    // Only work on the lecture learning page
    const ztmFavCoursesIconBack = document.querySelector('.nav-icon-back');
    if (ztmFavCoursesIconBack) {
        // updateProgressbar();

        // Track the page for every new lecture and update the progressbar 
        // Get the course sidebar head
        let courseSidebarHeader = document.querySelector('.course-sidebar-head');
        let ztmProgressbarObserver = new MutationObserver(() => updateProgressbar());
        ztmProgressbarObserver.observe(courseSidebarHeader, { childList: true, subtree: true });
    }
};

// Toggle fav courses
const ztmToggleFavoriteCourses = () => {
    // Get the initial checkbox status and apply style
    chrome.storage.sync.get('ztmFavoriteCoursesCheckboxIsChecked', (data) => {
        if (data.ztmFavoriteCoursesCheckboxIsChecked === undefined) {
            ztmFavoriteCourses(true);
        } else {
            let isChecked = data.ztmFavoriteCoursesCheckboxIsChecked || false;
            ztmFavoriteCourses(isChecked)
        }
    });

    // Get the checkbox status dynamically and apply style
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync' && 'ztmFavoriteCoursesCheckboxIsChecked' in changes) {
            let isChecked = changes.ztmFavoriteCoursesCheckboxIsChecked.newValue || false;
            ztmFavoriteCourses(isChecked);
        }
    });
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'windowChanged') {
        ztmToggleFavoriteCourses();
        // localStorage.removeItem('favCoursesArrayData');
        // localStorage.removeItem('heartClickedArrayData');
    }
});
