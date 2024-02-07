const flashCards = [
    {
        front: "Front of first test card",
        back: "Back of first test card"
    },
    {
        front: "Front of second test card",
        back: "Back of second test card"
    },
    {
        front: "Front of third test card",
        back: "Back of third test card"
    },
];

let cardsSeen = [];
let cardsCorrect = 0;

/**
 * Calls all funtions to be run once the when the entire page, 
 * including all its resources (like images, stylesheets, scripts, etc.), 
 * has finished loading.
 */
window.onload = function() {
    getDate();
    getTime();
    newCard();
};

/**
 * Function to change week day number into a day of the week
 */
function dayName(dayNumber) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNumber] || 'Unknown day of the week';
}

/**
 * Function to change week day number into a day of the week
 */
function monthName(monthNumber) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber] || 'Unknown month of the year';
}

/** Function called from timeAndDate and renders passed date to the page
 * as well as logging to JavaScript page log
 */
function renderDate(day, monthDay, month, year) {
    let dayExtra = "";
    if (monthDay === 1 || monthDay === 21 || monthDay === 31) {
        dayExtra = "st";
    } else if (monthDay === 2 || monthDay === 22) {
        dayExtra = "nd";
    } else if (monthDay === 3 || monthDay === 23) {
        dayExtra = "rd";
    } else {
        dayExtra = "th";
    };
    let date = `${day} the ${monthDay}<sup>${dayExtra}</sup> of ${month} ${year}`
    document.getElementById("date-container").innerHTML = date;
}

/** Function called from timeAndDate and renders passed time to the page
 * as well as logging to JavaScript page log
 */
function renderTime(time) {
    document.getElementById("time-container").textContent = time;
}

/** Function called when the window is loaded
 * Gets current date and places within the page
*/
function getDate() {
    // Get current date object from JavaScript
    let jsdate = new Date();
    // Get specific bits of date object needed and convert
    let year = jsdate.getFullYear();
    let monthNumber = jsdate.getMonth();
    let month = monthName(monthNumber);
    let monthDay = jsdate.getDate();
    let weekDay = jsdate.getDay();
    let day = dayName(weekDay);
    // Create date and pass to renderDate function
    renderDate(day, monthDay, month, year);
}

/** Function called every minute
 * Gets current time and renders within the page
 */
function getTime() {
    // Get current date object from JavaScript
    let jsdate = new Date();
    // Get specific bits of date object needed
    let hour = jsdate.getHours();
    let minute = jsdate.getMinutes();
    let seconds = jsdate.getSeconds();
    // Create time and pass to renderTime function
    if (seconds < 10){
        renderTime(`${hour} : ${minute} : 0${seconds}`);
    } else if (minute < 10){
        renderTime(`${hour} : 0${minute} : ${seconds}`);
    } else if (hour < 20){
        renderTime(`0${hour} : ${minute} : ${seconds}`);
    } else {
        renderTime(`${hour} : ${minute} : ${seconds}`);
    }   
}

let interval = setInterval(getTime, 1000);

/** 
 * Function called on load and on click of the flip card button
 * Picks a random card from the list of flashcards
 * and displays to the page
*/
function newCard() {
    let totalCards = flashCards.length;
    let cardNumber = Math.floor(Math.random() * totalCards);
    console.log(cardNumber);
    const frontCard = document.getElementById("front-card");
    frontCard.innerText = flashCards[cardNumber].front;
}
