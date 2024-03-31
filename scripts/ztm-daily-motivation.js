/*
 * Author: Sithu Khant
 * GitHub: https://github.com/sithu-khant
 * Last Updated: Mon Mar 11, 2024
 * Description: Adds daily motivation quote to the home page
 */

// Quotes
const quotesArray = [
    ['The mind is everything. What you think you become', 'Buddha'],
    ['A cynic is a man who knows the price of everything, and the value of nothing.', 'Oscar Wilde'],
    ['The purpose of knowledge is action, not knowledge.', 'Aristotle'],
    ['Knowledge isn\'t free. You have to pay attention.', 'Richard Feynman'],
    ['Dharma is in your mind, not in the forest. You don\'t have to go and look anywhere else', 'Ajahn Chah'],
    ['We must be true inside, true to ourselves before we can know a truth that is outside us.', 'Thomas Merton'],
    ['Saying yes frequently is an additive strategy. Saying no is a subtractive strategy. Keep saying no to a lot of things - the negative and unimportant ones - and once in awhile, you will be left with an idea which is so compelling that it would be a screaming no-brained \'yes\'', 'Unknown'],
    ['The only way to do great work is to love what you do.', 'Steve Jobs'],
    ['Success is not final, failure is not fatal: It is the courage to continue that counts.', 'Winston Churchill'],
    ['Don’t watch the clock; do what it does. Keep going.', 'Sam Levenson'],
    ['Believe you can and you’re halfway there.', 'Theodore Roosevelt'],
    ['The only limit to our realization of tomorrow will be our doubts of today.', 'Franklin D. Roosevel'],
    ['Hard choices, easy life. Easy choices, hard life, easy life.', 'Jerzy Gregorek'],
    ['If at first the idea is not absurd, then there is no hope for it.', 'Albert Einstein'],
    ['I am an old man and I have known a great many troubles, but most of them never happened.', 'Mark Twain'],
    ['He who suffers before it is necessary suffers more than is necessary.', 'Seneca'],
    ['If you don’t build your dream, someone will hire you to help build theirs.', 'Tony A. Gaskins Jr.'],
    ['Don’t ask yourself what the world needs. Ask yourself what makes you come alive and then go do that. Because what the world needs is people who have come alive.', 'Howard Truman'],
    ['Things may come to those who wait, but only the things left by those who hustle.', 'Abraham Lincoln'],
    ['If I fail more than you do, I win.', 'Seth Godin'],
    ['Don’t let small minds convince you that your dreams are too big. They aren’t', 'Unknown'],
    ['You never fail until you stop trying.', 'Albert Einstein'],
    ['Life isn’t worth living, unless it is lived for someone else.', 'Albert Einstein'],
    ['A good life is one where you develop your strengths, realize your potential, and become what it is in your nature to become.', 'Unknown'],
    ['The first draft of anything is shit.', 'Ernest Hemingway'],
    ['Be kind, for everyone you meet is fighting a harder battle.', 'Plato'],
    ['Imagination is more important than knowledge.', 'Albert Einstein'],
    ['The way you see the problem is the problem.', 'Stephen R. Covey'],
    ['Above all, don’t fear difficult moments. The best comes from them.', 'Rita Levi-Montalcini'],
    ['The whole secret of existence is to have no fear.', 'Buddha'],
    ['It only takes one person to make you happy and change your life: YOU.', 'Charles Orlando'],
    ['Happiness and success is all about spending your life in your own way. Be yourself. No one can ever tell you you’re doing it wrong.', 'Unknown'],
    ['Happiness is when what you think, what you say, and what you do are in harmony.', 'Mahatma Gandhi'],
    ['Don’t overestimate the world and underestimate yourself. You are better than you think. And you are not alone.', 'Timothy Ferriss'],
    ['All our dreams can come true if we have the courage to pursue them.', 'Walt Disney'],
    ['Everyone has plans. Everyone has dreams. What separates those who do from those who don’t is taking action...', 'Unknown'],
    ['If you are depressed, you are living in the past. If you are anxious, you are living in the future. If you are at peace, you are living in the moment.', 'Unknown'],
    ['A bird sitting on a tree is never afraid of the branch breaking, because her trust is not on the branch but on its own wings.', 'Unknown'],
    ['Life moves pretty fast. You don’t stop and look around once in a while, you could miss it.', 'Ferris Bueller'],
    ['It is better to create than to learn! Creating is the essence of life.', 'Julius Caesar'],
    ['Adapt what is useful, reject what is useless, and add what is specifically your own.', 'Unknown'],
    ['If you love life, don’t waste time, for time is what life is made up of.', 'Unknown'],
    ['I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.', 'Unknown'],
    ['I’m not in this world to live up to your expectations and you’re not in this world to live up to mine.', 'Unknown'],
    ['Be happy, but never satisfied.', 'Unknown'],
    ['What would you do if you dont need money, and what did you do when you were 11?', 'Unknown'],
    ['You are what you do today, not what you say you’ll do tomorrow.', 'Unknown'],
    ['It’s not the mistakes and failures you have to worry about, it’s the opportunities you miss when you don’t even try that hurt the most.', 'Unknown'],
    ['Ultimately, it’s not what you do every once in a while; it’s what you dedicate yourself to on a regular basis that makes the difference.', 'Unknown'],
    ['In the long run, we shape our lives, and we shape ourselves. The process never ends until we die. And the choices we make are ultimately our own responsibility.', 'Eleanor Roosevelt'],
    ['Whenever you want to achieve something, keep your eyes open, concentrate and make sure you know exactly what it is you want. No one can hit their target with their eyes closed.', 'Paulo Coelho'],
    ['A person is a success if they get up in the morning and gets to bed at night and in between does what he wants to do.', 'Bob Dylan'],
    ['Life doesn’t turn out exactly how you plan it. Sometimes it turns out better.', 'Unknown'],
    ['If you do two things at once, one of them is getting done wrong.', 'Unknown'],
    ['We have two choices when we wake up in the morning: either we go back to sleep and dream, or we wake up and chase that dream.', 'Unknown'],
    ['If you really want to do something, you’ll find a way. If you don’t, you’ll find an excuse.', 'Unknown'],
    ['Don’t choose the one who is beautiful to the world; choose the one who makes your world beautiful.', 'Unknown'],
    ['Making one person smile can change the world – maybe not the whole world, but their world.', 'Unknown'],
    ['Don’t look for someone who will solve all your problems; look for someone who will face them with you.', 'Unknown'],
    ['Many people are so poor because the only thing they have is money.', 'Unknown'],
    ['You don’t drown by falling in the water. You drown by staying there.', 'Edwin Louis Cole'],
    ['If ‘Plan A’ doesn’t work out, don’t fret; the alphabet has another 25 letters that would be happy to give you a chance to get it right. The wrong choices usually bring us to the right places, eventually.', 'Unknown'],
    ['You are perfectly imperfect just the way you are. Instead of thinking about what you’re missing, think about what you have that everyone else is missing.', 'Unknown'],
    ['Failure is a real responsibility but regrets are completely optional.', 'Unknown'],
    ['Success is stumbling from failure to failure with no loss of enthusiasm.', 'Winston Churchill'],
    ['The person who says something is impossible should not interrupt the person who is doing it.', 'Chinese proverb'],
    ['Every man dies. not every man really lives.', 'Unknown'],
    ['Opportunities don’t happen, you create them.', 'Chris Grosser'],
    ['I’m not afraid of dying, I’m afraid of not trying.', 'Jay Z'],
    ['If it is to be, it’s up to me.', 'Caleb Anthony Parker'],
    ['Fall down seven times, get up eight times.', 'Japanese proverb'],
    ['If you want to be remarkable, you have to do something that makes you remarkable.', 'Unknown'],
    ['There are always going to be people more talented, more attractive, and more charming than you. The key is to market yourself better than the rest.', 'Unknown'],
    ['Make little bets, little choices to your ultimate HUGE goal.', 'Unknown'],
    ['This moment is not a means to an end. It is your life. Love it.', 'Unknown'],
    ['Go out and write your own story, or you’ll just be a character in someone else’s.', 'Unknown'],
    ['Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.', 'Albert Schweitzer'],
    ['There are basically two types of people. People who accomplish things, and people who claim to have accomplished things. The first group is less crowded.', 'Mark Twain'],
    ['I haven’t failed. I’ve found 10,000 ways that don’t work.', 'Thomas Edison'],
    ['One man has enthusiasm for 30 minutes, another for 30 days, but it is the man who has it for 30 years who makes a success of his life.', 'Edward B. Butler'],
    ['Small lifestyle changes compound over a period of time.', 'James Clear'],
    ['We don\'t rise to the level of our goals, we fall to the level of our systems.', 'James Clear'],
    ['It is not about ambition or effort, it is about creating an environment that makes behavioral change inevitable.', 'James Clear'],
    ['People who believe they are capable of doing something are far more likely to do it.', 'David Robson'],
    ['Adopt mindsets and beliefs that are most likely to help you.', 'David Robson'],
    ['You shouldn\'t necessarily avoid stress, you should pick the stress that you\'re happy to have.', 'Kelly McGonigal, Ph.D'],
    ['We don\'t do great work at things we love, we tend to love things that we become very good at.', 'Cal Newport'],
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
    motivationP.innerHTML = `<p class='quote'>"${quote}"</p><p class='dash-author'>&#x2015 <span class='author'>${author}</span></p>`

    // Get the motivation container
    let motivationContainer = document.querySelector('#daily-motivation');
    if (!motivationContainer) {
        // Insert motivationP tag to the container
        container.insertBefore(motivationP, container.firstChild);
    }
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
    }

    // Get the stored index
    index = localStorage.getItem('getIndex') || 0;

    const randomQuote = quotesArray[index];
    let quote = randomQuote[0];
    let author = randomQuote[1];

    dailyMotivationComponent(quote, author);
};

const toggleDailyMotivation = (isChecked) => {
    if (isChecked) {
        dailyMotivation();
    } else {
        // Get the motivation container
        let motivationContainer = document.querySelector('#daily-motivation');
        if (motivationContainer) {
            // Remove the motivation container
            motivationContainer.remove();
        }
    }
};

const ztmDailyMotivation = () => {
    // Get the initial checkbox status and apply style
    chrome.storage.sync.get('ztmDailyMotivationCheckboxIsChecked', (data) => {
        let isChecked = data.ztmDailyMotivationCheckboxIsChecked || false;
        toggleDailyMotivation(isChecked);
    })

    // Get the checkbox status dynamically and apply style
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync' && 'ztmDailyMotivationCheckboxIsChecked' in changes) {
            let isChecked = changes.ztmDailyMotivationCheckboxIsChecked.newValue || false;
            toggleDailyMotivation(isChecked);
        }
    });
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'windowChanged') {
        // To track for the home page
        let courseFilter = document.querySelector('.course-filter');
        if (courseFilter) {
            ztmDailyMotivation();
        }
        // localStorage.removeItem('getIndex');
        // localStorage.removeItem('getDay');
    }
});
