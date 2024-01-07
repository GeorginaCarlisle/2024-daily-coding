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
 * Called when page tries to unload
 */
window.addEventListener('beforeunload', function (event) {
    // First prevent moving to the new page
    event.preventDefault();

    printLog("User has requested to leave the page and the window is about to be unloaded");
    alert("You are about to leave this page");

    // Standard-compliant browsers require the return value to be set
    event.returnValue = '';

    // Display a confirmation dialog
    const confirmationMessage = 'Are you sure you want to leave? Your unsaved changes may be lost.';
    event.returnValue = confirmationMessage; // For some older browsers

    return confirmationMessage;
});

/**
 * Function renders passed argument to the JavaScript Log
 */
function printLog(details) {
    let log = document.getElementById("javascript-log");
    let newLog = document.createElement("li");
    newLog.textContent = details;
    log.appendChild(newLog);
}