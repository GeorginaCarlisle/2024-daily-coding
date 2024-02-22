const missedDays = {
    January: 5,
    February: 5,
    March: 0,
}

/**
 * Calls all funtions to be run once the when the entire page, 
 * including all its resources (like images, stylesheets, scripts, etc.), 
 * has finished loading.
 */
window.addEventListener('load', function() {
    calculateYearProgress();
    calculateMonthProgress();
});

/**
 * Renders the percentage of the year passed as a bar guage in the header
 */
function renderPercentage(elementId, percentage) {
    let progressBar = document.getElementById(elementId);
    progressBar.style.width = `${percentage}%`;
}

/**
 * Calculates the percentage of the year passed passing this to
 * render percentage. Also renders some key details to the JS log.
 */
function calculateYearProgress(){
    let elementId = "years-progress";
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let firstDayOfYear = new Date(currentYear, 0, 1);
    let timeDifference = currentDate - firstDayOfYear
    let daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let percentage = Math.floor((daysPassed / 365) * 100);
    renderPercentage(elementId, percentage);
}

/**
 * Renders the passed months consistency percentage as a bar guage next to the info
 * for that month.
 */
function renderMonthProgress(month, consistency){
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
 * Function to change week day number into a day of the week
 */
function monthName(monthNumber) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber] || 'Unknown month of the year';
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
        let daysComplete = monthTotal - daysMissed;
        let consistency = Math.floor((daysComplete / monthTotal) * 100);
        renderMonthProgress(month, consistency);
    }
}
