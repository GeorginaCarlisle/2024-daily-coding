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
let scoreInfo = {
    cardsCorrect: 0,
    cardsUnknown: 0,
    cardsIncorrect: 0,
    percentage: 0
}

/**
 * Calls all funtions to be run once the when the entire page, 
 * including all its resources (like images, stylesheets, scripts, etc.), 
 * has finished loading.
 */
window.onload = function() {
    getDate();
    getTime();
    newCard();
    document.getElementById("cards-total").innerText = flashCards.length;
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
        seconds = `0${seconds}`;
    }
    if (minute < 10){
        minute = `0${minute}`;
    }
    if (hour < 10){
        hour = `0${hour}`;
    }
    
    renderTime(`${hour} : ${minute} : ${seconds}`);
}

let interval = setInterval(getTime, 1000);

/**
 * Function called on clicking the show answer button, which doubles up as a reset button once all cards seen.
 * Confirms whether an answer needs showing OR the cards need resetting and handles
 */
function callAnswer() {
    if (document.getElementById("show-answer").innerText === "Reset cards"){
        cardsSeen = [];
        scoreInfo.cardsCorrect = 0;
        scoreInfo.cardsUnknown = 0;
        scoreInfo.cardsIncorrect = 0;
        scoreInfo.percentage = 0;
        renderNewScore()
        document.getElementById("show-answer").innerText = "Show Answer";
        newCard();
    } else {
        document.getElementById("show-answer").style.display = "none";
        document.getElementById("outcome-buttons").style.display = "flex";
        showAnswer();
    }
}

/**
 * Function called on clicking one of the outcome buttons. 
 * Scores updated depending on button clicked and renderNewScore called.
 * New card then called.
 */
function updateScore(event) {
    if (event.target.id === "correct-btn") {
        scoreInfo.cardsCorrect++
    } else if (event.target.id === "unknown-btn") {
        scoreInfo.cardsUnknown++
    } else if (event.target.id === "incorrect-btn") {
        scoreInfo.cardsIncorrect++
    };
    scoreInfo.percentage = (scoreInfo.cardsCorrect / cardsSeen.length) * 100;
    renderNewScore();
    newCard();
}

/**
 * Function called following initial button click and running of updateScore.
 * Score information rendered to the page.
 */
function renderNewScore() {
    document.getElementById('cards-completed').innerText = cardsSeen.length;
    let { cardsCorrect, cardsUnknown, cardsIncorrect, percentage } = scoreInfo;
    document.getElementById("cards-right").innerText = cardsCorrect;
    document.getElementById("cards-unknown").innerText = cardsUnknown;
    document.getElementById("cards-incorrect").innerText = cardsIncorrect;
    document.getElementById('game-percentage').innerText = `${percentage}%`
}

/** 
 * Function called on load, following click of an outcome button and resetting cards
 * Checks if all cards have been seen and handles, if not calls chooseCard
 * and then displays returned info to the page. Otherwise alerts user that all cards
 * have been viewed.
*/
function newCard() {
    document.getElementById("show-answer").style.display = "block";
    document.getElementById("outcome-buttons").style.display = "none";
    const totalCards = flashCards.length;
    let cardInfo = ""
    if (cardsSeen.length === totalCards){
        console.log("cardsSeen includes all cards");
        cardInfo = "All cards have now been viewed";
        document.getElementById("front-card").innerText = "All cards now viewed";
        document.getElementById("back-card").innerText = "All cards now viewed";
        document.getElementById("show-answer").innerText = "Reset cards";
    } else {
        document.getElementById("front-card").innerText = chooseCard();
        document.getElementById("back-card").innerText = "??";
        console.log(cardsSeen);
    }
}

/**
 * @returns card info (front) from a randomly chosen flashcard that hasn't previously been chosen
 * to newCard also pushing the card number to the cardsSeen array
 */
function chooseCard(){
    console.log("Choose card called");

    while (true){
        let cardNumber = Math.floor(Math.random() * flashCards.length);
        console.log(cardNumber);
        if (!cardsSeen.includes(cardNumber)){
            console.log("card number not seen");
            cardsSeen.push(cardNumber);
            return cardInfo = flashCards[cardNumber].front;
        }
    }
}

/**
 * Function called after showanswer clicked and callAnswer confirms a card
 * reset is not needed. Renders front of card info for the last chosen cardNumber.
 */
function showAnswer(){
    console.log("Show Answer");
    let cardNumber = cardsSeen[cardsSeen.length - 1];
    let cardInfo = flashCards[cardNumber].back;
    document.getElementById("back-card").innerText = cardInfo;
}
