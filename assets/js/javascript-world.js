/**
 * Calls funtions to be run once the HTML document has been completely parsed,
 * and all deferred scripts have downloaded and executed. 
 * But, before images, subframes and async scripts have finished loading
 */
document.addEventListener('DOMContentLoaded', function() {
    printLog("DOM Content loaded");
    printLog("- - - -");
});

/**
 * Calls all funtions to be run once the when the entire page, 
 * including all its resources (like images, stylesheets, scripts, etc.), 
 * has finished loading.
 */
window.addEventListener('load', function() {
    printLog("Window loaded");
    printLog("- - - -");
});

/**
 * Function creates a new list Item containg the passed details
 * Adding this <li> before the first child contained within the <ul> 
 * with id of "javascript-log"
 */
function printLog(details) {
    let log = document.getElementById("javascript-log");
    let logFirstChild = log.firstChild;
    let newLog = document.createElement("li");
    newLog.textContent = details;
    log.insertBefore(newLog, logFirstChild);
};

/**
 * Function called when elements that have been passed this function within the html
 * are clicked. Passes a log entry to printLog with some key data from the generated event
 */
function clickEvent(event) {
    clickEventDetails(event);
    const element = event.target;
    element.innerText = (element.innerText === "click events") ? "click event clicked" :"click events";
}

/**
 * Called by clickEvent and passed ethe event.
 * Prints info about the event to the console
 */
function clickEventDetails(event) {
    printLog("- - - -");    
    printLog(`event timestamp = ${event.timeStamp}`);
    printLog(`vertical coordinate = ${event.clientY}`);
    printLog(`horizontal coordinate = ${event.clientX}`);
    printLog(`target id = ${event.target.id}`);
    printLog(`target element type = ${event.target.tagName}`);
    printLog(`pointer Id = ${event.pointerId}`);
    printLog(`pointer type = ${event.pointerType}`);
    printLog(`event type = ${event.type}`);
    printLog("Click Event, details to follow:");
}


/**
 * Function called when the mouse is within the main page
 * X and Y co-ordinates are then continually logged and updated
 * to the onmousemove information as the mouse moves
 */
function mouseMoving(event) {
    let locationBox = document.getElementById("mouse-location");
    locationBox.innerText = `X:${event.clientX}  Y:${event.clientY}`;
}

/**
 * Function called when a key is pressed and key event details
 * passed to printLog. Key pressed also passed to update key log function
 */
function keyboardEvent(event) {
    printLog("- - - -");
    printLog(`Event timestamp = ${event.timeStamp}`);
    printLog(`Key Code = ${event.keyCode}`);
    printLog(`Key = ${event.key}`);
    printLog("Key Pressed, details to follow:");
    updateKeyLog(event.key);
}

/**
 * Function adds key pressed into the key log
 */
function updateKeyLog(key){
    let keyLog = document.getElementById("keys-pressed");
    let currentLog = keyLog.textContent;
    currentLog === "No keys pressed yet" ? keyLog.innerText = key : keyLog.innerText = currentLog + key;
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
}

/**
 * Called on mouse entering JS elements
 * Renders key info in the log and calls the addHoverInformation function 
 * passing it the source of the mouse enter and associated information
 */
function mouseEnter(event) {
    printLog("- - - -");
    printLog(`event timestamp = ${event.timeStamp}`);
    printLog(`vertical coordinate = ${event.clientY}`);
    printLog(`horizontal coordinate = ${event.clientX}`);
    printLog(`source element = ${event.srcElement.tagName}`);
    printLog(`target id = ${event.target.id}`);
    printLog("Mouse Enter Event, details to follow:");
    // determine info needed based on source
    let source = event.target.id;
    let info = ""
    if (source === "date-div") {
        info = "On window loading the current date and time was pulled from the JSs Date() object, specific information was then extracted, manipulated and then rendered.";
    } else if (source === "time-div") {
        info = "setInterval() is used to call the getTime function everysecond. This function gets new Date(), extracts hour, minute and second and updates the time.";
    } else if (source === "moon-phase-container") {
        info = "Script contained here links to http://moonphases.co.uk/js/widget.js which passes JS code, css code and images to create this image";
    }
    // Call addHoverInformation and pass in arguments
    addHoverInformation(info, source);
}

/**
 * Called on mouse leaving JS elemennts
 */
function mouseLeave(event) {
    printLog("- - - -");
    printLog(`event timestamp = ${event.timeStamp}`);
    printLog(`vertical coordinate = ${event.clientY}`);
    printLog(`horizontal coordinate = ${event.clientX}`);
    printLog(`source element = ${event.srcElement.tagName}`);
    printLog(`target id = ${event.target.id}`);
    printLog("Mouse Leave Event, details to follow:");
    // determine source
    let source = event.target.id;
    let sourceElement = document.getElementById(source);
    // find parent and remove class added on mouse enter
    let parent = sourceElement.parentNode;
    parent.style.removeProperty("position");
    // find info container and remove
    infoContainer = document.getElementById('new-info-container');
    infoContainer.remove();
}
