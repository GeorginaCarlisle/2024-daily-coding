/**
 * Calls funtions to be run once the HTML document has been completely parsed,
 * and all deferred scripts have downloaded and executed. 
 * But, before images, subframes and async scripts have finished loading
 */
document.addEventListener('DOMContentLoaded', function() {
    printLog("DOM structure ready and safe to manipulate");
    printLog("");
});

/**
 * Calls all funtions to be run once the when the entire page, 
 * including all its resources (like images, stylesheets, scripts, etc.), 
 * has finished loading.
 */
window.onload = function() {
    printLog("Window now loaded");
    printLog("");
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
function mouseEvent(event) {
    printLog("Mouse Event, details to follow:")
    printLog(`event type = ${event.type}`);
    printLog(`pointer type = ${event.pointerType}`);
    printLog(`pointer Id = ${event.pointerId}`);
    printLog(`target element type = ${event.target.tagName}`);
    printLog(`target id = ${event.target.id}`);
    printLog(`horizontal coordinate = ${event.clientX}`);
    printLog(`vertical coordinate = ${event.clientY}`);
    printLog(`event timestamp = ${event.timeStamp}`);
    printLog("");
    console.log("Event object:", event);
}