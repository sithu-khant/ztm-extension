/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Fri Feb 16, 2024
 * Description: Sending windowChanged message to the window tab.
 */ 

browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'complete') {
        browser.tabs.sendMessage(tabId, { action: 'windowChanged' });
    }
});
