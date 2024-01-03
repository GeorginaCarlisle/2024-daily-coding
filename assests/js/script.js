/**
 * Calls funtions to be run once the HTML document has been completely parsed,
 * and all deferred scripts have downloaded and executed. 
 * But, before images, subframes and async scripts have finished loading
 */
document.addEventListener('DOMContentLoaded', function() {
    printLog("DOM structure ready and safe to manipulate");
});

/**
 * Calls all funtions to be run once the whole page has been fully loaded
 */
window.onload = printLog("Whole page now loaded");

/**
 * Function renders passed argument to the JavaScript Log
 */
function printLog(details) {
    let log = document.getElementById("javascript-log");
    log.innerHTML = `
    <div>
        ${details}
    </div>`;
}