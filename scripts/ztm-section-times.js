/*
 * Author: Matt Smith
 * GitHub: https://github.com/mattcsmith
 * Date: 4th Jan 2024
 * Description: Adds lecture time statistics to each section and the sidebar
 */

// Helper function to format the lecture status
const statusFormatter = (status) =>
    status?.toLowerCase().includes("completed") ? "complete" : "incomplete";

// Helper function to convert seconds to a formatted time string
const secondsToTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return hours > 0
        ? `${hours}h ${minutes}m ${remainingSeconds}s`
        : `${minutes}m ${remainingSeconds}s`;
};

// Function to update the section times and badges
const updateSectionTimes = () => {
    // Get all containers with the class .course-section
    const containers = document.querySelectorAll(".course-section");

    // Initialize an array to store all anchor information for each section
    const allAnchorsArray = [];

    // Object to store total times for each section and overall
    const sectionTimes = { totalTime: 0, totalWatched: 0 };

    // Loop through each container
    containers.forEach((container) => {
        // Get all anchor elements within the current container
        const anchors = Array.from(container.querySelectorAll("a"));

        // Loop through each anchor
        anchors.forEach((a) => {
            // Extract relevant information from the anchor
            const lectureTitle = a.children[1].innerText;
            const matchTime = lectureTitle.match(
                /\((\d{1,2}\s*:\s*\d{1,2}\s*)\)/,
            );
            const rawTime = matchTime
                ? matchTime[1].replaceAll(" ", "")
                : "0:0";
            const timeInSecs = rawTime
                .split(":")
                .reduce((acc, time) => acc * 60 + parseInt(time, 10), 0);

            // Extract section title and lecture status
            const sectionTitle = container.children[0].innerText;
            const lectureStatus = statusFormatter(a.children[0].ariaLabel);

            // Store anchor information in the array
            allAnchorsArray.push({
                section: sectionTitle,
                status: lectureStatus,
                title: lectureTitle,
                rawTime: rawTime,
                timeInSecs: timeInSecs,
                element: container,
            });

            // Update section times object
            if (!sectionTimes[sectionTitle]) {
                sectionTimes[sectionTitle] = { total: 0, watched: 0 };
            }
            sectionTimes[sectionTitle].total += timeInSecs;
            if (lectureStatus === "complete")
                sectionTimes[sectionTitle].watched += timeInSecs;

            // Update overall times
            sectionTimes.totalTime += timeInSecs;
            if (lectureStatus === "complete")
                sectionTimes.totalWatched += timeInSecs;
        });
    });

    // Update HTML for each container based on the calculated times
    Array.from(containers).forEach((cont) => {
        const alreadyHasTitleSect =
            cont.children[0].querySelector(".sect-title");

        const sectionTitle = alreadyHasTitleSect
            ? alreadyHasTitleSect.innerText
            : cont.children[0].innerText;

        const data = sectionTimes[sectionTitle];
        const watchedTime = secondsToTime(data?.watched || 0);
        const totalTime = secondsToTime(data?.total || 0);

        cont.children[0].innerHTML = `
      <div class="sect-container">
        <div class="sect-title">${sectionTitle}</div>
        <div class="sect-watchtime">
          <div class="badge">
            <span class="badge-prefix">Watched</span>
            <span class="badge-text">${watchedTime}</span>
          </div>
          <div class="badge">
            <span class="badge-prefix">Total</span>
            <span class="badge-text">${totalTime}</span>
          </div>
        </div>
      </div>`;
    });

    const existingSidebar = document.querySelector(".sidebar-times");

    if (!existingSidebar) {
        // Update sidebar with overall course times
        const sidebar = document.querySelector(".course-progress");
        const newDiv = document.createElement("div");
        const watchedTime = secondsToTime(sectionTimes.totalWatched || 0);
        const totalTime = secondsToTime(sectionTimes.totalTime || 0);
        const left = secondsToTime(
            sectionTimes.totalTime - sectionTimes.totalWatched,
        );

        newDiv.innerHTML = `
    <div class="sidebar-times">
      <div class="badge">
        <span class="badge-prefix">Course Length</span>
        <span class="badge-text">${totalTime}</span>
      </div>
      <div class="badge">
        <span class="badge-prefix">Total Watched</span>
        <span class="badge-text">${watchedTime}</span>
      </div>
      <div class="badge">
        <span class="badge-prefix">Total Left</span>
        <span class="badge-text">${left}</span>
      </div>
    </div>`;
        sidebar.insertAdjacentElement("afterend", newDiv);
    }
};

// Function to enable/disable functionality based on Chrome storage
const updateFunctionality = (isEnabled) => {
    if (!isEnabled) {
        // Remove existing elements related to functionality
        const elementsToRemove = [
            ...document.querySelectorAll(".sect-watchtime"),
            ...document.querySelectorAll(".sidebar-times"),
        ];

        elementsToRemove.forEach((element) => {
            element.parentNode.removeChild(element);
        });
        return;
    }

    // Call the function to update section times and badges
    updateSectionTimes();
};

// Listen for changes in Chrome storage
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "sync" && "ztmSectionTimesCheckboxIsChecked" in changes) {
        const value =
            changes.ztmSectionTimesCheckboxIsChecked.newValue || false;
        // Update functionality based on the changed value
        updateFunctionality(value);
    }
});

// Use arrow function for MutationObserver
const observer = new MutationObserver((mutations) => {
    const existingSidebarTimes = document.querySelector(".sidebar-times");
    const existingSectCont = document.querySelector(".sect-container");
    const isRightPage = window.location.pathname.includes("courses/enrolled");

    isRightPage &&
        chrome.storage.sync.get("ztmSectionTimesCheckboxIsChecked", (data) => {
            const isEnabled = data?.ztmSectionTimesCheckboxIsChecked || false;
            // Call the updateFunctionality with the retrieved isEnabled state
            if (!existingSectCont && !existingSidebarTimes && isRightPage) {
                updateFunctionality(isEnabled);
            }
        });
});

// Use arrow function for observer.observe
observer.observe(document.documentElement, { childList: true, subtree: true });
