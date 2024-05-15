/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Wed May 15, 2024
 * Description: Adds course details feature to the home page
 */

// Create Box icons style
const courseDetailsBoxIconsCss = document.createElement('link')
courseDetailsBoxIconsCss.rel = 'stylesheet'
courseDetailsBoxIconsCss.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'

// Add Box icons style to the head
document.head.appendChild(courseDetailsBoxIconsCss)

// Fav courses components
const courseDetailsComponents = () => {

    // Get course cards
    let courseCards = document.querySelectorAll('.course-listing')

    // Add heart icon to each courses
    courseCards.forEach((courseCard) => {
        // get the course 
        const courseCardRow = courseCard.querySelector('.row')

        // Create a new div
        const ztmCourseDetailsDiv = document.createElement('div')
        ztmCourseDetailsDiv.id = 'ztm-course-details'
        const ztmCourseDetailsAnchor = document.createElement('a')
        ztmCourseDetailsAnchor.id = 'ztm-course-details-anchor'
        ztmCourseDetailsAnchor.target = '_blank'
        // Append `ztmCourseDetailsAnchor` to `ztmCourseDetailsDiv`
        ztmCourseDetailsDiv.appendChild(ztmCourseDetailsAnchor)

        // Create heart icon element 
        // <i class='bx bxs-heart' id='ztm-heart'></i>
        let ztmCourseDetailsIcon = document.createElement('i')
        ztmCourseDetailsIcon.classList.add('bx', 'bxs-info-circle')
        ztmCourseDetailsIcon.id = 'ztm-course-details-icon'

        // Add `ztmCourseDetailsIcon` to `ztmCourseDetailsAnchor`
        ztmCourseDetailsAnchor.appendChild(ztmCourseDetailsIcon)

        // Add `ztmCourseDetailsIcon` to `courseCardRow`
        courseCardRow.appendChild(ztmCourseDetailsDiv)
    })
}

// Check if two titles are equal
// const checkTitles = (title1, title2) => {
//     let count = 0;
//     // Loop through the title1
//     for (let i = 0; i < title1.length; i++) {
//         if (title2.includes(title1[i])) {
//             count++
//             // If at least four elements are equal, return true
//             if (count >= 5) return true
//         }
//     }
//     return false
// }


const courseDetails = () => {
    // Get all the course details icon
    let ztmCourseDetailsIcons = document.querySelectorAll('#ztm-course-details-icon')

    ztmCourseDetailsIcons.forEach(courseDetailsIcon => {
        // Get the course data
        const courseCard = courseDetailsIcon.closest('.col-xs-12.col-sm-6.col-md-4')
        const courseTitle = courseCard.querySelector('.course-listing-title').textContent.trim()
        // Get `ztm-course-details-anchor` tag
        const ztmCourseDetailsAnchor = courseDetailsIcon.closest('#ztm-course-details-anchor')

        // Course title data cleaning
        const removeColonFromTitle = courseTitle.replace(/:/g, '')
        const removeBracketsFromTitle = removeColonFromTitle.replace(/[()]/g, '')
        const titleArray =  removeBracketsFromTitle.split(' ')

        // const getTitleArray = removeColonFromTitle.split(' ')
        // // Regular expression for years lik 2024, 2025, 2026
        // const yearRegex = /^\d{4}:$/
        // const yearWithColonRegex = /^\d{4}$/
        // const yearWithBracketsRegex = /\[\d{4}]/
        // // Filter out `in` and year elements from  titleArray
        // const titleArray = getTitleArray.filter(item => {
        //     return (
        //         item !== 'in'
        //         && !yearRegex.test(item)
        //         && !yearWithColonRegex.test(item)
        //         && !yearWithBracketsRegex.test(item)
        //     )
        // })

        console.log(titleArray)

        const jsonUrl = 'https://raw.githubusercontent.com/sithu-khant/ztm-extension/main/course-details.json'

        fetch(jsonUrl)
            .then(res => res.json())
            .then((responses) => {
                responses.forEach((res) => {
                    const removeColonFromResTitleArray = res.name?.replace(/:/g, '')
                    const removeBracketsFromResTitleArray = removeColonFromResTitleArray.replace(/[()]/g, '')

                    const resTitleArray = removeBracketsFromResTitleArray.split(' ')
                    const courseDetailsUrl = res.link
                    // Check all the element in resTitleArray exists in titleArray or not
                    // const isTrue = titleArray.every(element => resTitleArray.includes(element))
                    // const isTrue = titleArray.every(element => resTitleArray.includes(element))

                    const isTrue = resTitleArray.every(element => titleArray.includes(element))

                    // console.log(resTitleArray)
                    // ['Complete', 'Web', 'Developer:', 'Zero', 'to', 'Mastery']

                    // console.log(titleArray)
                    // ['Complete', 'Web', 'Developer', 'in', '2024:', 'Zero', 'to', 'Mastery']

                    if (isTrue) {
                        // Add courseDetailsUrl as url link
                        ztmCourseDetailsAnchor.href = courseDetailsUrl
                    }

                    // ztmCourseDetailsAnchor.href = courseDetailsUrl

                    courseDetailsIcon.addEventListener('click', (event) => {
                        // Disable to click
                        event.stopPropagation()
                    })
                })
            })
    })
}


const ztmCourseDetails = () => {
    // Get the initial checkbox status and apply style
    chrome.storage.sync.get('ztmDarkModeCheckboxIsChecked', (data) => {
        let isChecked = data.ztmDarkModeCheckboxIsChecked || false
        // ztmToggleDarkMode(isChecked);
        courseDetailsComponents()
        courseDetails()
    })

    // Get the checkbox status dynamically and apply style
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync' && 'ztmDarkModeCheckboxIsChecked' in changes) {
            let isChecked = changes.ztmDarkModeCheckboxIsChecked.newValue || false
            // ztmToggleDarkMode(isChecked);
            courseDetailsComponents()
            courseDetails()
        }
    })
}


chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'windowChanged') {
        ztmCourseDetails()
    }
})
