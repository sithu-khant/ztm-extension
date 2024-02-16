/* 
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant 
 * Last Updated: Fri Feb 16, 2024
 * Description: Adds daily motivation quote to the home page
 */ 

// Quotes
const quotesArray = [
    ["The only way to do great work is to love what you do.", "Steve Jobs"],
    ["Success is not final, failure is not fatal: It is the courage to continue that counts.", "Winston Churchill"],
    ["Don't watch the clock; do what it does. Keep going.", "Sam Levenson"],
    ["Believe you can and you're halfway there.", "Theodore Roosevelt"],
    ["The only limit to our realization of tomorrow will be our doubts of today.", "Franklin D. Roosevelt"]
];

// Daily motivation component
const dailyMotivationComponent = (quote, author) => {
    // Get the course directory
    const courseDirectory = document.querySelector('.course-directory');
    // Get the container
    const container = courseDirectory.querySelector('.container');

    // Create a new p tag for quotes
    const motivationP =  document.createElement('div');
    motivationP.id = 'daily-motivation' 
    motivationP.innerHTML = `
    <p class='quote'>"${quote}"</p><p class='dash-author'>&#x2015 <span class='author'>${author}</span></p>
    `
    
    // Get the motivation container
    let motivationContainer = document.querySelector('#daily-motivation');
    if (!motivationContainer) {
        // Insert motivationP tag to the container
        container.insertBefore(motivationP, container.firstChild);
    };
};

// Get a new quote for every new day
const dailyMotivation = () => {
    // Initial Index
    let index;
    // Get the stored day
    let getDayData = localStorage.getItem('getDay') || 0;
    // Get the date
    const currentDate = new Date();

    // If getDay and current day are not equal, get the new index 
    if (getDayData != currentDate.getDay()) {
        index = Math.floor(Math.random() * quotesArray.length);
        // Store that new index and date
        localStorage.setItem('getIndex', index)
        localStorage.setItem('getDay', currentDate.getDay())
    };

    // Get the stored index
    index = localStorage.getItem('getIndex') || 0;

    const randomQuote = quotesArray[index];
    let quote = randomQuote[0];
    let author = randomQuote[1];
    
    dailyMotivationComponent(quote, author);
};


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'windowChanged') {
        // To track for the home page
        let courseFilter = document.querySelector('.course-filter');
        if (courseFilter) {
            dailyMotivation();
        };
        // localStorage.removeItem('getIndex');
        // localStorage.removeItem('getDay');
    };
});















