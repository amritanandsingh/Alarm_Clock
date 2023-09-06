// Function to display the current time
function updateTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM'; // Determine whether it's AM or PM

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0:00) as 12:00 AM

    var timeString = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ' ' + ampm;
    document.getElementById('clock').textContent = timeString;
}

// Function to play the alarm sound
function playAlarmSound() {
    var audio = document.getElementById('alarmSound');
    audio.play();
}

// Function to add a new alarm to the array and display it
function addAlarm(time) {
    alarms.push(time);
    displayAlarms();
}

// Function to display the list of alarms
function displayAlarms() {
    var alarmsList = document.getElementById('alarmsList');
    alarmsList.innerHTML = ''; // Clear the existing list

    alarms.forEach(function (alarm, index) {
        var li = document.createElement('li');
        li.textContent = 'Alarm set for ' + alarm;

        // Create a delete button
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            deleteAlarm(index);
        });

        li.appendChild(deleteButton);
        alarmsList.appendChild(li);
    });
}

// Function to delete an alarm from the array
function deleteAlarm(index) {
    alarms.splice(index, 1);
    displayAlarms();
}

// Function to check if it's time to trigger an alarm
function checkAlarms() {
    var currentTime = new Date();
    var currentTimeString =
        currentTime.getHours() + ':' + (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();

    alarms.forEach(function (alarm, index) {
        if (alarm === currentTimeString) {
            playAlarmSound();
            deleteAlarm(index);
        }
    });
}

// Array to store alarms
var alarms = [];

// Form submission handler
var alarmForm = document.getElementById('alarmForm');
alarmForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var alarmTime = document.getElementById('alarmTime').value;
    addAlarm(alarmTime);
    alarmForm.reset(); // Clear the form input field
});

// Call updateTime initially to display the time immediately
updateTime();
setInterval(updateTime, 1000); // Update the time every second
setInterval(checkAlarms, 1000); // Check alarms every second
