// ----------
// Start Favorite Course Section
// ----------

// Get course cards
const courseCard = document.querySelectorAll('.course-listing');

// Add heart icon to every single course card 
courseCard.forEach((courseDiv) => {
    // course title
    const courseImageCover = courseDiv.querySelector('.course-box-image-container');
    const ztmFavCourseDiv = document.createElement('div');
    ztmFavCourseDiv.id = 'ztm-fav-course'

    ztmFavCourseDiv.innerHTML = `
    <!-- ZTM Favorite Course by Sithu Khant - Start -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <i class='bx bxs-heart' id='ztm-heart'></i>
    <!-- ZTM Favorite Course by Sithu Khant - End -->
    `

    courseImageCover.parentNode.insertBefore(ztmFavCourseDiv, courseImageCover.nextSibling);
});

// get all the heart icons
const ztmHeartIcon = document.querySelectorAll('#ztm-heart');

// add toggle click
ztmHeartIcon.forEach((heartIcon) => {
    heartIcon.addEventListener('click', function(event) {
    	event.stopPropagation();
        this.classList.toggle('ztm-heart-clicked');
    });
});














// ----------
// End Favorite Course Section
// ----------