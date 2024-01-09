/**
 * Calls funtions to be run once the HTML document has been completely parsed,
 * and all deferred scripts have downloaded and executed. 
 * But, before images, subframes and async scripts have finished loading
 */
document.addEventListener('DOMContentLoaded', function() {
    printLog("DOM structure ready and safe to manipulate");
});

/**
 * Calls all funtions to be run once the when the entire page, 
 * including all its resources (like images, stylesheets, scripts, etc.), 
 * has finished loading.
 */
window.onload = function() {
    printLog("Window now loaded");
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
 * are clicked. Passes a log entry to printLog
 */
function clickInfo(event) {
    printLog(`Click event - ${event}`);
}