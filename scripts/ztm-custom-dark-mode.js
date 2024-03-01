/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Fri Mar 1, 2024
 * Description: Adds custom dark mode (unable to do with css file) to the academy page. 
 */ 

const customCssForCourseCurriculumPage = (isChecked) => {
    // Only run the custom dark mode on the course curriculum page
    const ztmInstructorProfile = document.querySelector('.instructor');

    if (ztmInstructorProfile) {
        // Get the course heading
        const heading = document.querySelector('.heading');
        heading.style.color = isChecked ? '#EEEEEE' : ''

        // Get banner 
        const banner = document.querySelector('.banner');
        banner.style.color = isChecked ? '#EEEEEE' : ''

        // Get the progress
        const progress = document.querySelector('.progress');
        progress.style.background = isChecked ? '#393E46' : ''

        // Get the percentComplete
        const percentComplete = document.querySelector('.percentComplete');
        progress.style.color = isChecked ? '#EEEEEE' : ''

        // Get the progressBar
        const progressBar = document.querySelector('.progressBar');
        progressBar.style.background = isChecked ? '#232931' : ''
        
        // Get the finished
        const finished = document.querySelector('.finished');
        finished.style.background = isChecked ? '#EEEEEE' : ''    
        
    };
};

const ztmCustomDarkMode = () => {
    // Get the initial checkbox status and apply style
    chrome.storage.sync.get('ztmDarkModeCheckboxIsChecked', (data) => {
        let isChecked = data.ztmDarkModeCheckboxIsChecked || false;
        customCssForCourseCurriculumPage(isChecked);
    })

    // Get the checkbox status dynamically and apply style
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync' && 'ztmDarkModeCheckboxIsChecked' in changes) {
            let isChecked = changes.ztmDarkModeCheckboxIsChecked.newValue || false;
            customCssForCourseCurriculumPage(isChecked);
        }
    });
};

// Track the page
const ztmCustomDarkModeObserver = new MutationObserver(() => ztmCustomDarkMode());
ztmCustomDarkModeObserver.observe(document.body, { childList: true, subtree: true });







