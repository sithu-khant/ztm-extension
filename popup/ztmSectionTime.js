/*
 * Author: Matt Smith
 * GitHub: https://github.com/mattcsmith
 * Date: 4th Jan 2024
 * Description: Adds lecture time statistics to each section and the sidebar
 */

// NOTE: I decided to abstract/seperate this from the popup.js file to seperate concerns.
//       As the feature list grows, having all the code in popup.js will become hard to manage.

// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", async () => {
  // Get the checkbox element from the DOM
  const sectionTimesCheckbox = document.getElementById(
    "ztmSectionTimesCheckbox"
  );

  // Retrieve the stored checkbox state from Chrome storage
  const data = await chrome.storage.sync.get(
    "ztmSectionTimesCheckboxIsChecked"
  );

  // Set the checkbox state based on the retrieved data (or default to false)
  sectionTimesCheckbox.checked = data.ztmSectionTimesCheckboxIsChecked || false;

  // Add an event listener for changes in the checkbox state
  sectionTimesCheckbox.addEventListener("change", async () => {
    // Update the checkbox state in Chrome storage
    await chrome.storage.sync.set({
      ztmSectionTimesCheckboxIsChecked: sectionTimesCheckbox.checked,
    });

    // Get information about the active tab
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

    // Send a message to the active tab with the updated checkbox state
    await chrome?.tabs?.sendMessage(tabs[0].id, {
      ztmSectionTimesCheckboxIsChecked: sectionTimesCheckbox.checked,
    });
  });
});
