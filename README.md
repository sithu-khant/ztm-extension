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


## Feature requests
*(plans to add - top to bottom)*

* [ ] To keep the favourite courses at top
* [ ] Showing total amount of time in each section
* [ ] Focus Video
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


## License

MIT License


## Logs

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
