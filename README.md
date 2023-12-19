<img align="right" width="150" height="150" src="./utils/assets/ztm-logo.png">

# Zero To Mastery - Extension

Official extension for Zero To Mastery Academy students.

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
* Toggle dark mode


## Feature requests
*(plans to add)*

* [ ] Dark mode in all Zero To Mastery pages (not just in lecture page)
* [ ] Keep the lecture video resolution the same
* [ ] To keep the favourite courses at top
* [ ] Showing total amount of time in each section


## Versions

| Versions  | Chrome | Firefox | Safari | Edge |
|-----------|--------|---------|--------|------|
| 2023.12.14.01 | ✅      | ✅       | ✅   | ✅    |
| 2023.12.13 | ✅      | ✅       | ✅   | ✅    |
| 23.12.13 | ✅      | ✅       | ✅    | ✅    |
| 2023.12.12 | ✅      | ✅       | ✅    | ✅    |

**Not found your favorite browser?** Feel free to test that, and contribute to this.

### Version list

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


## Demos

* Toggle sidebar
![](utils/assets/demo-gifs/sidebar-demo.gif)

* Toggle dark mode
![](utils/assets/demo-gifs/darkmode-demo.gif)


## License

MIT License


## Logs

* Tue Dec 19, 2023 - Darkmode function works in beta but needs to be dynamic.
* Mon Dec 18, 2023 - All the checkboxes in `popup` can now store the check status. 
	* Toggle Sidebar is connected to the `popup`.
* Sun Dec 17, 2023 - Added `popup`. Started working on the content scripts. Restructure the folder directories.
* Fri Dec 15, 2023 - Made official announcement in the ZTM discord server.
* Thu Dec 14, 2023 - fixed all the `<a>` tags that are not underlined in dark mode. Fixed a lot of bugs. Released version (2023.12.14.01).
* Wed Dec 13, 2023 - Version (23.12.13) pre-release and version (2023.12.13)
* Tue Dec 12, 2023 - Launched first version (2023.12.12).
* Sun Dec 10, 2023 - Started the project.
