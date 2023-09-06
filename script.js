function updateTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM'; // Determine whether it's AM or PM

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0:00) as 12:00 AM

    var timeString = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
    document.getElementById('clock').innerHTML = timeString;
}

updateTime(); // Call the function once to display the time immediately.
setInterval(updateTime, 1000); // Update the time every second.
