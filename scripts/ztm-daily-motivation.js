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

    // Insert motivationP tag to the container
    container.insertBefore(motivationP, container.firstChild);
};

// Get random quote for the quote
const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    const randomQuote = quotesArray[randomIndex];
    let quote = randomQuote[0];
    let author = randomQuote[1];

    return { quote, author }
};

const dailyMotivation = () => {
    // Get the random quote and author
    let { quote, author } = getRandomQuote();

    console.log(quote);
    
    dailyMotivationComponent(quote, author);
};

dailyMotivation();
















