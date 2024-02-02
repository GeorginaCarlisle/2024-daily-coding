const missedDays = {
    January: 5,
    February: 0,
    March: 0,
}

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
    getDateAndTime();
    calculateYearProgress();
    calculateMonthProgress();
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
    clickEventDetails(event)
    elementId = event.target.id
    element = document.getElementById(elementId)
    if (element.innerText === "click here") {
        element.innerText = `Element with ID of "${elementId}" clicked`;
    } else {
        element.innerText = "click here";
    }
}

/**
 * Called by clickEvent and passed ethe event.
 * Prints info about the event to the console
 */
function clickEventDetails(event) {
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
    console.log(event);
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
        case 0:
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
    let dateContainer = document.getElementById("date-container");
    dateContainer.innerHTML = date;
    printLog("Date added to page");
    printLog("- - - -");
}

/** Function called from timeAndDate and renders passed time to the page
 * as well as logging to JavaScript page log
 */
function renderTime(time) {
    let dateContainer = document.getElementById("time-container");
    dateContainer.textContent = time;
    printLog("Time added to page");
    printLog("- - - -");
}

/** Function called when the window is loaded
 * Gets current date and places within the page
*/
function getDateAndTime() {
    // Get current date object from JavaScript
    printLog("get Date function called");
    let jsdate = new Date();
    printLog(`New Date is ${jsdate}`)
    printLog("- - - -")
    // Get specific bits of date object needed and convert
    let year = jsdate.getFullYear();
    let monthNumber = jsdate.getMonth();
    let month = monthName(monthNumber);
    let monthDay = jsdate.getDate();
    let weekDay = jsdate.getDay();
    let day = dayName(weekDay);
    let hour = jsdate.getHours();
    let minute = jsdate.getMinutes();
    let seconds = jsdate.getSeconds();
    // Create date and pass to renderDate function
    renderDate(day, monthDay, month, year);
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

/**
 * Information and mouse location arguments are used to then render
 * an information box over the JS element the mouse is over
 */
function addHoverInformation(info, source) {
    let sourceElement = document.getElementById(source);
    // Add css class to change postion of parent to relative
    let parent = sourceElement.parentNode;
    parent.style.position = "relative"
    // Create element to contain info and give css class for styling
    let infoContainer = document.createElement('div');
    infoContainer.setAttribute('class','info-container');
    infoContainer.setAttribute('id', 'new-info-container');
    // Pass info into the new element
    infoContainer.innerText = info;
    // Add new element to the DOM appending to the source element so that the new info sits below
    sourceElement.appendChild(infoContainer);
    printLog(`Hover Information about ${source} added`);
}

/**
 * Called on mouse entering JS elements
 * Renders key info in the log and calls the addHoverInformation function 
 * passing it the source of the mouse enter and associated information
 */
function mouseEnter(event) {
    printLog("Mouse Enter Event, details to follow:");
    printLog(`target id = ${event.target.id}`);
    printLog(`source element = ${event.srcElement.tagName}`);
    printLog(`horizontal coordinate = ${event.clientX}`);
    printLog(`vertical coordinate = ${event.clientY}`);
    printLog(`event timestamp = ${event.timeStamp}`);
    // determine info needed based on source
    let source = event.target.id;
    let info = ""
    console.log(event);
    if (source === "date-div") {
        info = "On window loading the current date and time was pulled from the JSs Date() object, specific information was then extracted, manipulated and then rendered.";
    } else if (source === "time-div") {
        info = "setInterval() is used to call the getTime function everysecond. This function gets new Date(), extracts hour, minute and second and updates the time.";
    }
    // Call addHoverInformation and pass in arguments
    addHoverInformation(info, source);
    printLog("- - - -")
}

/**
 * Called on mouse leaving JS elemennts
 */
function mouseLeave(event) {
    printLog("Mouse Leave Event, details to follow:");
    printLog(`target id = ${event.target.id}`);
    printLog(`source element = ${event.srcElement.tagName}`);
    printLog(`horizontal coordinate = ${event.clientX}`);
    printLog(`vertical coordinate = ${event.clientY}`);
    printLog(`event timestamp = ${event.timeStamp}`);
    // determine source
    let source = event.target.id;
    let sourceElement = document.getElementById(source);
    // find parent and remove class added on mouse enter
    let parent = sourceElement.parentNode;
    parent.style.removeProperty("position");
    // find info container and remove
    infoContainer = document.getElementById('new-info-container');
    infoContainer.remove();
    printLog("Hover information removed");
    printLog("- - - -");
}

/**
 * Renders the percentage of the year passed as a bar guage in the header
 */
function renderPercentage(elementId, percentage) {
    printLog("Render percentage called");
    let progressBar = document.getElementById(elementId);
    printLog(progressBar);
    progressBar.style.width = `${percentage}%`;
}

/**
 * Calculates the percentage of the year passed passing this to
 * render percentage. Also renders some key details to the JS log.
 */
function calculateYearProgress(){
    printLog("Calculate Years Progress called");
    let elementId = "years-progress";
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let firstDayOfYear = new Date(currentYear, 0, 1);
    let timeDifference = currentDate - firstDayOfYear
    let daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    printLog(`${daysPassed} days passed this year`);
    let percentage = Math.floor((daysPassed / 365) * 100);
    printLog(`Percentage of year passed is ${percentage}`);
    renderPercentage(elementId, percentage);
}

/**
 * Renders the passed months consistency percentage as a bar guage next to the info
 * for that month.
 */
function renderMonthProgress(month, consistency){
    console.log(`commitment-${month}`);
    let commitmentBar = document.getElementById(`commitment-${month.toLowerCase()}`);
    commitmentBar.style.width = `${consistency}%`;
    let commitmentNumber = document.getElementById(`${month.toLowerCase()}-commitment`);
    commitmentNumber.innerText = `${consistency}%`;
}

/**
 * Returns the number of days for the month passed in.
 */
function calculateMonthTotal(monthNumber){
    if (monthNumber === 0 || 2 || 4 || 6 || 7 || 9 || 11) {
        return 31;
    } else if (monthNumber === 3 || 5 || 8 || 10) {
        return 30;
    } else if (monthNumber === 1) {
        return 29;
    } else {
        console.log(`Error retriving number of days in month ${monthNumber}`);
    }
}

/**
 * Finds the months already happened/in progress this year.
 * For each month the consistency is calculate using total days in the month
 * and the number of days missed (from list: missedDays)
 */
function calculateMonthProgress(){
    let jsdate = new Date();
    let monthNumber = jsdate.getMonth();

    for (let i = 0; i <= monthNumber; i++) {
        let month = monthName(i);
        let daysMissed = missedDays[month];
        let monthTotal = calculateMonthTotal(i);
        console.log(monthTotal)
        let daysComplete = monthTotal - daysMissed;
        let consistency = Math.floor((daysComplete / monthTotal) * 100);
        console.log(consistency);
        renderMonthProgress(month, consistency);
    }
}


let interval = setInterval(getTime, 1000);
