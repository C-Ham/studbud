const stopwatchText = document.getElementById("stopwatch-text");
const timeMobileText = document.getElementById("time-mobile-wrapper");

let paused = true;
var timerStart;
var updateTime;
var counter = 1;

function updateCurrentTime() {
    if (timeMobileText) {
        timeMobileText.innerHTML = moment().format('hh:mm a');
    }
}

function stopCount() {
    paused = true;
    stopwatchText.style.color= "#FFAB00";
    clearInterval(timerStart);
    counter = 1;
    stopwatchText.innerHTML = moment().hour(0).minute(0).second(0).format('HH:mm:ss');
}

function playPauseCount() {
    if(paused) {
        paused = false;
        stopwatchText.style.color = "#FFF";
        timerStart = setInterval(function() { updateTime(); }, 1000);
    }
    else {
        paused = true;
        stopwatchText.style.color = "#FFAB00";
        clearInterval(timerStart);
    }
}

function updateTime() {
    stopwatchText.innerHTML = moment().hour(0).minute(0).second(counter++).format('HH:mm:ss');
}

updateCurrentTime();
updateTime = setInterval(function() { updateCurrentTime(); }, 10000);