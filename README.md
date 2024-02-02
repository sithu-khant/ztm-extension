<img align="right" width="150" height="150" src="./utils/assets/ztm-logo.png">

# Zero To Mastery - Extension

Official extension for [Zero To Mastery Academy](https://zerotomastery.io/) students.

![Extension Current Version](https://img.shields.io/github/manifest-json/v/sithu-khant/ztm-extension)
![License](https://img.shields.io/github/license/sithu-khant/ztm-extension)
![Code File Size](https://img.shields.io/github/languages/code-size/sithu-khant/ztm-extension)
![GitHub forks](https://img.shields.io/github/forks/sithu-khant/ztm-extension)
![GitHub Repo stars](https://img.shields.io/github/stars/sithu-khant/ztm-extension)

## Downloads

<a href="https://chromewebstore.google.com/detail/zero-to-mastery/hbcijdniocfclnfmjldkhjdepijfoeim" target="_blank">
<img src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/iNEddTyWiMfLSwFD6qGq.png" alt='Available in the Chrome Web Store'>
</a>


## Features

* Toggle sidebar (responsive)
* Toggle dark mode on all pages
* Hide Lecture Title
* Showing total amount of time in each section


## Feature requests
*(plans to add - top to bottom)*

* [x] To keep the favourite courses at top (WIP) 
* [ ] Keep the lecture video resolution the same


## Versions

| Versions  | Chrome | Firefox | Edge | Brave |
|-----------|--------|---------| ------| ------|
| 2023.12.21 | ✅      | ✅       | ✅   | ✅   |
| 2023.12.14.01 | ✅      | ✅       |  ✅    | ✅   |
| 2023.12.13 | ✅      | ✅       | ✅    | ✅   |
| 23.12.13 | ✅      | ✅       | ✅    | ✅   |
| 2023.12.12 | ✅      | ✅       | ✅    | ✅   |

WIP - Work in progress

**Not found your favorite browser?** Feel free to test that, and contribute to this.

### Version list

* 2023.12.21
	* Dark mode on all the pages
	* Changed color theme for dark mode
	* Added popup
	* Improvements
* 2023.12.14.01
	* Fixed bugs
* 2023.12.13
* 23.12.13 (pre-release)
	* Added `underline` in the lecture attachment links
	* Fixed `nav-icon-list:hover` background color in mobile view.
* 2023.12.12
	* New feature `Toggle sidebar`
	* New feature `Toggle dark mode`


## Download and install it locally?

[![Downloads](https://img.shields.io/github/downloads/sithu-khant/ztm-extension/total.svg)]()

* For Chrome -> [Installing extension on Google Chrome locally](./docs/install-on-chrome.md)
* For Firefox -> [Installing extension on Firefox locally](./docs/install-on-firefox.md)


## Suggestions or Issues?

Any new suggestions are welcome. You can suggest here -> [GitHub Suggestion](https://github.com/sithu-khant/ztm-extension/issues)

Feel free to create a new issue here -> [GitHub Issue](https://github.com/sithu-khant/ztm-extension/issues)

(If you are currently a member of the ZTM discord server, you can also suggest/issue there)

## Want to contribue?

If you added any new features, make a pull request. I will review, and merge into the extension if it is fun to have.

## To support my work?

<a href="https://www.buymeacoffee.com/sithukhant" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/arial-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>


## License

MIT License


## Logs

* Fri Feb 2, 2024
	* (2.2.01) - Stored the heart clicked status in the array.
* Thu Feb 1, 2024
	* (2.1.01) - Started new method for `ztm-favorite-courses`.
	* (2.1.02) - Committed for safety.
	* (2.1.03) - `toggleFavCourses` working...
	* (2.1.04) - Committed for safety.
	* (2.1.05) - (To Revert).
	* (2.1.06) - Favorite course is partically working now...
	* (2.1.07) - Added condition for only work on the home page.
	* (2.1.08) - Updated course progressbar percentage.
	* (2.1.09) - Updated for safety.
	* (2.1.10) - Favorite courses feature is working...
	* (2.1.11) - Prevent overwritting the components.
	* (2.1.12) - Changed heart icon red to green.
	* (2.1.13) - Applyed changed in the favorited courses.
* Wed Jan 31, 2024
	* (1.31.01) - This method also doesn't work. But I will make a commit for later use.
	* (1.31.02) - Committed for safety.
	* (1.31.03) - Cleaned the codes.
	* (1.31.04) - Stored data on the local storage.
	* (1.31.05) - Stored data as objects in the array.
	* (1.31.06) - Can be store/remove fav courses dynamically.
	* (1.31.07) - To prevent overwritting.
	* (1.31.08) - Add favorited courses to the courseList.
	* (1.31.09) - Added course percentage to the fav course list.
	* (1.31.10) - Committed for safety.
	* (1.31.11) - Styled the favorite courses.
	* (1.31.12) - Added course index.
* Tue Jan 30, 2024
	* (1.30.01) - Fixed `ztm-section-times` feature showing on the Your Instructor page.
	* (1.30.02) - Linked with course length instead of header.
	* (1.30.03) - Started `fav-course` section.
	* (1.30.04) - Styled `ztm-fav-course-button`.
	* (1.30.05) - This method doesn't work. But I will make a commit with the purpose of this code could be useful later.
	* (1.30.06) - Collected favorited courses as array.
* Mon Jan 29, 2024
	* (1.29.01) - Created a new pull request for `section-times` feature.
* Thu Jan 26, 2024
	* (1.24.01) - Changed to `courseInfoSectionTimes` function.
	* (1.24.02) - Started `ztmCurriculumSectionTimes` function.
	* (1.24.03) - `ztmCurriculumSectionTimes` function is working now.
	* (1.24.04) - Linked `ztmCurriculumSectionTimes` with the popup.
	* (1.24.05) - Added curriculum section time div to the section title.
	* (1.25.06) - Section time feature is working.
	* (1.26.07) - I made it sure.
* Thu Jan 25, 2024
	* (1.24.01) - Tested `background.js` script file. 
* Wed Jan 24, 2024
	* (1.24.01) - Committed for safety.
	* (1.24.02) - Created `getTimes` function.
	* (1.24.03) - Cleaned the codes and created functions.
	* (1.24.04) - Finished `Course Length`.
	* (1.24.05) - All the codes working.
	* (1.24.06) - Cleaned the codes.
	* (1.24.07) - Cleaned the codes.
	* (1.24.08) - All the feature function working.
	* (1.24.09) - Cleaned the codes.
	* (1.24.10) - The `section-times` feature is now working...
	* (1.24.11) - Fixed bug for `section-times` feature.
* Tue Jan 23, 2024
	* (1.23.01) - Added display none style to `sticky` progress bar.
	* (1.23.02) - Added `section-times` feature to popup.
	* (1.23.03) - Added section times html codes to course info page.
	* (1.23.04) - Added styles to section times html codes.
	* (1.23.05) - Collected all the minutes.
	* (1.23.06) - Total hours code is working.
* Fri Jan 19, 2024
	* (1.19.01) - Update README.
* Thu Jan 18, 2024
	* (1.18.01) - Added course title as class list for storing fav courses in the local storage. I tried to use it with index number but not working properly.
* Tue Jan 16, 2024
	* (1.16.01) - Cleaned the `ztmHideLectureTitle` code.
	* (1.16.02) - Made reindentation to `ztm-section-times` code. Added `.prettierrc` 
	file.
	* (1.16.03) - Improved the code efficiency.
	* (1.16.04) - `ztm-section-times` is working but it delays when on and off.
	* (1.16.05) - Disabled `ztm-section-times` feature.
	* (1.16.06) - Started working on the `fav-course` feature. Added heart icons to each course. 
	* (1.16.07) - Phew...
	* (1.16.08) - The favorite course feature is partially working now...
* Sun Jan 14, 2024
	* (1.14.01) - Converted indentations to spaces.
	* (1.14.02) - Added `ztmHideLectureTitle` file in popup.
	* (1.14.03) - `ztmHideLectureTitle` feature working.
* Sat Jan 13, 2024
	* (1.13.01) - Fixed the dark mode function not working properly.
	* (1.13.02) - Refactored the popup files.
* Fri Jan 12, 2024
	* (1.12.01) - Mutation is not working.
	* (1.12.02) - Refactored the code base.
	* (1.12.03) - Preparing to create the pull request.
* Wed Jan 10, 2024
	* (1.10.01) - Added style to heart icon.
	* (1.10.02) - Added heart click function to the page.
* Sun Jan 7, 2024
	* (1.7.01) - Started working on the `Favorite course` function.
* Thu Jan 4, 2024 
	* Updated LICENSE
	* (1.4.01) - Merged from `MattCSmith`
		* Time statistics on each category/section of the course curriculum
		* Time statistics in the sidebar for the course overall
		* Toggle switch to enable all the statistics.
	* (1.4.02)
		* Changed SectionTime color to grey
		* Added dark mode for SectionTime
* Sat Dec 30, 2023 
	* (12.30.01) - Added `Buy Me a Coffee` button.
	* (12.30.02) - Added versions for Firefox and other browsers.
* Wed Dec 27, 2023
	* (12.27.01) - Added `Focus Video` feature request.
* Tue Dec 26, 2023
	* (12.26.01) - Merged from `LaurelineP`.
		* fixed typos
		* provided a bit of refacto
		* have a catch block - to handle as you wish later on
	* (12.26.02) - Committed for safety
	* (12.26.03) - Fixed a bug
	* (12.26.04) - Added font-family to `popup.css`
	* (12.26.05) - Added some CSS properties to `popup.css`.
	* (12.26.06) - Version for Firefox. Tested on Edge and Brave.
* Fri Dec 22, 2023 - Version (2023.12.21)
* Thu Dec 21, 2023
	* (12.21.01) - Added dark scroll bar. (pre-release, version 2023.12.21)
	* (12.21.02) - Added KeepResolution function in popup and it is worked now.
	* (12.21.03) - Started working for the favourite course feature.
	* (12.21.03) - Committed to safety.
* Wed Dec 20, 2023 
	* (12.20.01) - Added darkmode to `course-info` page.
	* (12.20.02) - Darkmode to all pages.
	* (12.20.03) - Added hover box-shadow and border. 
	* (12.20.04) - Fixed toggle bar function.
	* (12.20.05) - New theme for the academy home page
	* (12.20.06) - New theme for the course info page
	* (12.20.07) - New theme for the learning page
* Tue Dec 19, 2023 
	* (12.19.01) - Darkmode function works in beta but needs to be dynamic.
	* (12.19.02) - Darkmode function is now dynamic.
	* (12.19.03) - Darkmode for `popup`.
	* (12.19.04) - Toggle Sidebar linked with the `popup`.
* Mon Dec 18, 2023 - All the checkboxes in `popup` can now store the check status. 
	* Toggle Sidebar is connected to the `popup`.
* Sun Dec 17, 2023 - Added `popup`. Started working on the content scripts. Restructure the folder directories.
* Fri Dec 15, 2023 - Made official announcement in the ZTM discord server.
* Thu Dec 14, 2023 - fixed all the `<a>` tags that are not underlined in dark mode. Fixed a lot of bugs. Released version (2023.12.14.01).
* Wed Dec 13, 2023 - Version (23.12.13) pre-release and version (2023.12.13)
* Tue Dec 12, 2023 - Launched first version (2023.12.12).
* Sun Dec 10, 2023 - Started the project.
