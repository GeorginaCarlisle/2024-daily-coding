const flashCards = [
    {
        front: "What is destructuring and how would I use it?",
        back: "Destructuring is a way of taking the items in an array or object and placing in individual variables.\n\n const { keyname, secondKeyname, thirdKeyname } = object; (where the new variable names corrospond to the key names, you can add as many or little of keys needed).\n\n const [first, , , fourth] = array; (where the array items will be passed to new variables in order, commas can be used to pass items and you only need to move as far through the array as needed.)"
    },
    {
        front: "What is the spread operator and why is it needed?",
        back: "The spread operator is used to spread the data from an existing array or object into a new array or object.\n\n By doing so the new array, while containing exactly the same data, will be independent of the original.\n\n attempting to simply pass one array into another in order to copy can have unexpected consequences.\n\n Example:\narray2 = [...array1];"
    },
    {
        front: "How can the spread operator be used in combination with adding to, combining or updating an array or object?",
        back: "Combining:\narray3 = [...array1, ...array2];\n\nAdding to:\nobject1 = { ...object1, 'newKey': 'newValue' }\nhere a new variable could be used to hold the adjusted data.\n\nUpdating:\nlet object = { 'first': 'eat', 'next': 'wash' };\nobject = { ...object, first: 'wash', next: 'eat' }; "
    },
    {
        front: "What is a try - catch block and how can it be used?",
        back: "try...catch statements are used when you have a piece of code that may throw an error:\n\ntry {\n<code you want to execute>\n} catch (<where you catch the error or exceptionVar. This can be ommitted if unneeded>){\n<code to run if an error occurs>\n} finally {\n<any further code to be run as part of this construct. This finally bit can be left out>\n}"
    },
    {
        front: "Explain Synchronous and Asynchronous in regards to JavaScript",
        back: "JavaScript is a single-threaded language and from a simple point of view is synchronous with one line of code happening at a time.\nAs soon as a line has been run (and only when it has been run) JavaScript moves on to the next line.\n\nHowever, you can create asychronous functions which remove a chunk of code out of the flow while waiting for something to occur (API call, set timeout ...). Once the awaited thing has happened the set chunk of code is then run."
    },
    {
        front: "What is optional chaining?",
        back: "Answer needed!"
    },
    {
        front: "Arrow functions",
        back: "Answer needed!"
    },
    {
        front: "Inline If with Logical && Operator",
        back: "Answer needed!"
    },
    {
        front: "Destructuring rules",
        back: "Answer needed!"
    },
    {
        front: "How can destructuring be used to rename",
        back: "Answer neeeded!"
    },
    {
        front: "reduce()",
        back: "Answer needed!"
    },
    {
        front: "filter()",
        back: "Answer needed!"
    },
    {
        front: "What is conditional changing?",
        back: "Answer needed!"
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
window.addEventListener('load', function() {
    newCard();
    document.getElementById("cards-total").innerText = flashCards.length;
});

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
    if (cardsSeen.length === totalCards){
        console.log("cardsSeen includes all cards");
        document.getElementById("card-info").innerText = "All cards now viewed";
        document.getElementById("show-answer").innerText = "Reset cards";
    } else {
        document.getElementById("card-info").innerText = chooseCard();
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
            let cardInfo = flashCards[cardNumber].front;
            return cardInfo
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
    document.getElementById("card-info").innerText = cardInfo;
}
