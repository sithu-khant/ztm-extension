/*
 * Author: Matt Smith
 * GitHub: https://github.com/mattcsmith
 * Date: 4th Jan 2024
 * Description: Adds lecture time statistics to each section and the sidebar
 */

// Get the back link icon
const sectionTimesBackLinkIcon = document.querySelector('.nav-back-link');

// The function will only work on the course info page,
// Cause `sectionTimesBackLinkIcon` exists on the course info page.
if (sectionTimesBackLinkIcon) {

    // Helper function to format the lecture status
    const statusFormatter = (status) => status?.toLowerCase().includes("completed") ? "complete" : "incomplete";

    // Helper function to convert seconds to a formatted time string
    const secondsToTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return hours > 0 ? `${hours}h ${minutes}m ${remainingSeconds}s` : `${minutes}m ${remainingSeconds}s`;
    };

    // Function to update the section times and badges
    const updateSectionTimes = () => {
        const containers = document.querySelectorAll(".course-section");

        const allAnchorsArray = [];
        const sectionTimes = { totalTime: 0, totalWatched: 0 };

        containers.forEach((container) => {
            const anchors = Array.from(container.querySelectorAll("a"));

            anchors.forEach((a) => {
                const lectureTitle = a.children[1].innerText;
                const matchTime = lectureTitle.match(/\((\d{1,2}\s*:\s*\d{1,2}\s*)\)/);
                const rawTime = matchTime ? matchTime[1].replaceAll(" ", "") : "0:0";
                const timeInSecs = rawTime.split(":").reduce((acc, time) => acc * 60 + parseInt(time, 10), 0);

                const sectionTitle = container.children[0].innerText;
                const lectureStatus = statusFormatter(a.children[0].ariaLabel);

                allAnchorsArray.push({
                    section: sectionTitle,
                    status: lectureStatus,
                    title: lectureTitle,
                    rawTime: rawTime,
                    timeInSecs: timeInSecs,
                    element: container,
                });

                if (!sectionTimes[sectionTitle]) {
                    sectionTimes[sectionTitle] = { total: 0, watched: 0 };
                }
                sectionTimes[sectionTitle].total += timeInSecs;
                if (lectureStatus === "complete") sectionTimes[sectionTitle].watched += timeInSecs;

                sectionTimes.totalTime += timeInSecs;
                if (lectureStatus === "complete") sectionTimes.totalWatched += timeInSecs;
            });
        });

        Array.from(containers).forEach((cont) => {
            const alreadyHasTitleSect = cont.children[0].querySelector(".sect-title");
            const sectionTitle = alreadyHasTitleSect ? alreadyHasTitleSect.innerText : cont.children[0].innerText;

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
            const sidebar = document.querySelector(".course-progress");
            const newDiv = document.createElement("div");
            const watchedTime = secondsToTime(sectionTimes.totalWatched || 0);
            const totalTime = secondsToTime(sectionTimes.totalTime || 0);
            const left = secondsToTime(sectionTimes.totalTime - sectionTimes.totalWatched);

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

    const updateFunctionality = (isEnabled) => {
        if (!isEnabled) {
            const elementsToRemove = [
                ...document.querySelectorAll(".sect-watchtime"),
                ...document.querySelectorAll(".sidebar-times"),
            ];

            elementsToRemove.forEach((element) => {
                element.parentNode.removeChild(element);
            });
            return;
        }

        updateSectionTimes();
    };

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === "sync" && "ztmSectionTimesCheckboxIsChecked" in changes) {
            const value = changes.ztmSectionTimesCheckboxIsChecked.newValue || false;
            updateFunctionality(value);
        }
    });

    const ztmSectionTimesObserver = new MutationObserver((mutations) => {
        chrome.storage.sync.get("ztmSectionTimesCheckboxIsChecked", (data) => {
            const isEnabled = data?.ztmSectionTimesCheckboxIsChecked || false;
            updateFunctionality(isEnabled);
        });
    });

    ztmSectionTimesObserver.observe(document.documentElement, { childList: true, subtree: true });
}
