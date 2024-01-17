/**
 * Calls funtions to be run once the HTML document has been completely parsed,
 * and all deferred scripts have downloaded and executed. 
 * But, before images, subframes and async scripts have finished loading
 */
document.addEventListener('DOMContentLoaded', function() {
    printLog("DOM structure ready and safe to manipulate");
    printLog("- - - -");
});

/**
 * Calls all funtions to be run once the when the entire page, 
 * including all its resources (like images, stylesheets, scripts, etc.), 
 * has finished loading.
 */
window.onload = function() {
    printLog("Window now loaded");
    printLog("- - - -");
    timeAndDate()
};

/**
 * Function renders passed argument to the JavaScript Log
 */
function printLog(details) {
    let log = document.getElementById("javascript-log");
    let newLog = document.createElement("li");
    newLog.textContent = details;
    log.appendChild(newLog);
}

/**
 * Function called when elements that have been passed this function within the html
 * are clicked. Passes a log entry to printLog with some key data from the generated event
 */
function clickEvent(event) {
    printLog("Click Event, details to follow:");
    printLog(`event type = ${event.type}`);
    printLog(`pointer type = ${event.pointerType}`);
    printLog(`pointer Id = ${event.pointerId}`);
    printLog(`target element type = ${event.target.tagName}`);
    printLog(`target id = ${event.target.id}`);
    printLog(`horizontal coordinate = ${event.clientX}`);
    printLog(`vertical coordinate = ${event.clientY}`);
    printLog(`event timestamp = ${event.timeStamp}`);
    printLog("- - - -");
    console.log("Event object:", event);
}

/**
 * Function called when the mouse passes over the mouse-event list item
 * text color of the list item changed to green
 */
function mouseEnter(event) {
    printLog("Mouse Enter Event, details to follow:");
    printLog(`target id = ${event.target.id}`);
    printLog(`source element = ${event.srcElement.tagName}`);
    printLog(`horizontal coordinate = ${event.clientX}`);
    printLog(`vertical coordinate = ${event.clientY}`);
    printLog(`event timestamp = ${event.timeStamp}`);
    printLog("- - - -");
    let mouseListItem = document.getElementById("mouse-event");
    mouseListItem.style.color = "green";
}

/**
 * Function called when the mouse passes over the mouse-event list item
 * text color of the list item changed to orange and key event details
 * passed to printLog
 */
function mouseLeave(event) {
    printLog("Mouse Leave Event, details to follow:");
    printLog(`target id = ${event.target.id}`);
    printLog(`source element = ${event.srcElement.tagName}`);
    printLog(`horizontal coordinate = ${event.clientX}`);
    printLog(`vertical coordinate = ${event.clientY}`);
    printLog(`event timestamp = ${event.timeStamp}`);
    printLog("- - - -");
    let mouseListItem = document.getElementById("mouse-event");
    mouseListItem.style.color = "orange";
}

/**
 * Function called when the mouse is within the main page
 * X and Y co-ordinates are then continually logged and updated
 * to the onmousemove information as the mouse moves
 */
function mouseMoving(event) {
    let locationBox = document.getElementById("mouse-location");
    locationBox.innerText = `X:${event.clientX} Y:${event.clientY}`;
}

/**
 * Function called when a key is pressed and key event details
 * passed to printLog
 */
function keyboardEvent(event) {
    printLog("Key Pressed, details to follow:");
    printLog(`Key = ${event.key}`);
    printLog(`Key Code = ${event.keyCode}`);
    printLog(`Event timestamp = ${event.timeStamp}`);
    printLog("- - - -");
}

/**
 * Function to change week day number into a day of the week
 */
function dayName(dayNumber) {
    let day = '';
    switch(dayNumber) {
        case 1:
            day = 'Monday';
        break;
        case 2:
            day = 'Tuesday';
        break;
        case 3:
            day = 'Wednesday';
        break;
        case 4:
            day = 'Thursday';
        break;
        case 5:
            day = 'Friday';
        break;
        case 6:
            day = 'Saturday';
        break;
        case 7:
            day = 'Sunday';
        break;
        default:
            day = 'Unknown day of the week';
        break;
    }
    return day
}

/**
 * Function to change week day number into a day of the week
 */
function monthName(monthNumber) {
    let month = '';
    switch(monthNumber) {
        case 0:
            month = 'January';
        break;
        case 1:
            month = 'February';
        break;
        case 2:
            month = 'March';
        break;
        case 3:
            month = 'April';
        break;
        case 4:
            month = 'May';
        break;
        case 5:
            month = 'June';
        break;
        case 6:
            month = 'July';
        break;
        case 7:
            month = 'August';
        break;
        case 8:
            month = 'September';
        break;
        case 9:
            month = 'October';
        break;
        case 10:
            month = 'November';
        break;
        case 11:
            month = 'December';
        break;
        default:
            day = 'Unknown month of the year';
        break;
    }
    return month
}


/** Function called when the window is loaded
 * Gets current date and places within the page
*/
function timeAndDate() {
    // Get current date object from JavaScript
    printLog("Time and Date function called");
    let jsdate = new Date();
    printLog(`New Date is ${jsdate}`)
    // Get specific bits of date object needed and convert
    let year = jsdate.getFullYear();
    let monthNumber = jsdate.getMonth();
    let month = monthName(monthNumber);
    let monthDay = jsdate.getDate();
    let weekDay = jsdate.getDay();
    let day = dayName(weekDay);
    // Create Date
    let date = `${day} the ${monthDay} of ${month} ${year}`
    // Render date to the DOM
    let dateContainer = document.getElementById("date-container");
    dateContainer.innerText = date;
    printLog("Date added to page");
    printLog("- - - -");
}