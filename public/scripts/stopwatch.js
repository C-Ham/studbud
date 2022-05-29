const stopwatchText = document.getElementById("stopwatch-text");
let paused = true;
var timerStart;
var counter = 1;

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