/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Sun Mar 3, 2024
 * Description: Adds custom dark mode (unable to do with css file) to the academy page. 
 */ 

// Custom css properties for elements those exist in all pages
const customCss = (isChecked) => {
    // Progress bar
    const progressbars = document.querySelectorAll('.progressbar');
    progressbars.forEach((progressbar) => {
        progressbar.style.background = isChecked ? '#393E46' : ''
    });

    // progressbar-fill
    const progressbarFills = document.querySelectorAll('.progressbar-fill');
    progressbarFills.forEach((progressbarFill) => {
        progressbarFill.style.background = isChecked ? '#EEEEEE' : ''
    });
};

const customCssForCourseCurriculumPage = (isChecked) => {
    // Only run the custom dark mode on the course curriculum page
    const ztmInstructorProfile = document.querySelector('.instructor');
    // On mobile view
    const ztmCurriculumSectionHeader = document.querySelector('.section-header.jsx-3825904483');

    if (ztmInstructorProfile || ztmCurriculumSectionHeader) {
        // Get the course heading
        const heading = document.querySelector('.heading');
        heading.style.color = isChecked ? '#EEEEEE' : ''

        // Get banner 
        const banner = document.querySelector('.banner');
        banner.style.color = isChecked ? '#EEEEEE' : ''

        if (ztmInstructorProfile) {
            // Get the progress
            const progress = document.querySelector('.progress');
            progress.style.background = isChecked ? '#393E46' : ''  
            
            // Get the progressBar
            let progressBar = document.querySelector('.progressBar');
            progressBar.style.background = isChecked ? '#232931' : ''
        }

        // Get the percentComplete
        const percentComplete = document.querySelector('.percentComplete');
        percentComplete.style.color = isChecked ? '#EEEEEE' : ''

        // Get the progressBar
        let progressBar = document.querySelector('.progressBar');
        progressBar.style.background = isChecked ? '#393E46' : ''
        
        // Get the finished
        const finished = document.querySelector('.finished');
        finished.style.background = isChecked ? '#EEEEEE' : ''    

        // Get the certificate
        const certificate = document.querySelector('.certificate');
        if (certificate) {
            certificate.style.background = isChecked ? '#393E46' : ''
            const certTitle = certificate?.querySelector('.title');
            certTitle.style.background = isChecked ? '#393E46' : ''
            certTitle.style.color = isChecked ? '#EEEEEE' : ''
        }
    };
};

const ztmCustomDarkMode = () => {
    // Get the initial checkbox status and apply style
    chrome.storage.sync.get('ztmDarkModeCheckboxIsChecked', (data) => {
        let isChecked = data.ztmDarkModeCheckboxIsChecked || false;
        customCss(isChecked);
        customCssForCourseCurriculumPage(isChecked);
    })

    // Get the checkbox status dynamically and apply style
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync' && 'ztmDarkModeCheckboxIsChecked' in changes) {
            let isChecked = changes.ztmDarkModeCheckboxIsChecked.newValue || false;
            customCss(isChecked);
            customCssForCourseCurriculumPage(isChecked);
        }
    });
};

// Track the page
const ztmCustomDarkModeObserver = new MutationObserver(() => ztmCustomDarkMode());
ztmCustomDarkModeObserver.observe(document.body, { childList: true, subtree: true });







