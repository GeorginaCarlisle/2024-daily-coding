/**
 * Calls all funtions to be run on window loading
 */
window.onload = printLog("JavaScript running")

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