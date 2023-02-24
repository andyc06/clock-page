// String that separates the timezone, date, and time
const separator = "*";

// container for all clocks
const clocks = document.getElementById("clocks");

// Grab the clock divs
const clock1 = document.getElementById("clock1");
const clock2 = document.getElementById("clock2");
const clock3 = document.getElementById("clock3");
const clock4 = document.getElementById("clock4");
const clock5 = document.getElementById("clock5");
const clock6 = document.getElementById("clock6");

// Dynamic seconds display control
const secondsCheckbox = document.querySelector("input[name=seconds]");
// Set the default 'Show seconds' value
let seconds = false;

// Return a formatted timezone name, date & time string with optional seconds
function timeDateFormatter(tzdbString, seconds, separator) {
    let timeOptions = {
        timeZone: tzdbString,
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    
    // Set the optional second display
    if (seconds) {
      timeOptions.second = "numeric";
    }
    
    let baseDateTime = new Date();
    
    // Get a 2 element array of date and time strings
    // Using en-GB because it yields 24h HH:MM time
    // toLocaleString with these options produces a string of format `DD/MM/YYYY, HH:MM`
    // e.g. `23/02/2023, 01:46`
    let date = baseDateTime.toLocaleString("en-GB", timeOptions).split(", ");
    
    // Separate date and time strings from the array for easier handling
    let dateStr = date[0];
    let timeStr = date[1];
    
    // Split date into parts
    // Note that en-GB date format is d/m/yyyy
    // String parsing feels kind of hacky here
    // TO-DO: Look into replacing with a library that does IANA timezone DB value conversions like luxon
    dateParts = dateStr.split("/");
    let day = dateParts[0];
    let month = dateParts[1];
    let year = dateParts[2];
    
    // Recombine in the desired order
    let formatted = `${tzdbString} ${separator} ${year}-${month}-${day} ${separator} ${timeStr}`
    
    return formatted;

};

function updateClocks() {
    clock1.innerHTML = timeDateFormatter("UTC", seconds, separator);
    clock2.innerHTML = timeDateFormatter("America/Los_Angeles", seconds, separator);
    clock3.innerHTML = timeDateFormatter("America/New_York", seconds, separator);
    clock4.innerHTML = timeDateFormatter("Europe/Dublin", seconds, separator);
    clock5.innerHTML = timeDateFormatter("Australia/Melbourne", seconds, separator);
    clock6.innerHTML = timeDateFormatter("Asia/Tokyo", seconds, separator);
    // Repeat every second
    setTimeout("updateClocks()", 1000);
};

window.onload = function() {
    // Make the checkbox match this script's state
    // If the seconds checkbox is checked when the page is refreshed,
    // the checked state would persist otherwise and disagree with the script's state
    secondsCheckbox.checked = seconds;

    updateClocks();
}

secondsCheckbox.addEventListener("change", function() {
    if (this.checked) {
        seconds = true;
        updateClocks();
    } else {
        seconds = false;
        updateClocks();
    }
})
