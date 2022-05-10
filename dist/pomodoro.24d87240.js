//Fetch play and pause button from DOM to check for timer start/pause/stop onclick events
const playBtn = document.getElementById("play-icon");
const pauseBtn = document.getElementById("pause-icon");
//Fetch session buttons to check for session changes onclick
const studyButton = document.getElementById("pomodoro-session-buttons--study");
const restButton = document.getElementById("pomodoro-session-buttons--rest");
const breakButton = document.getElementById("pomodoro-session-buttons--break");
//Fetch time remaining to update every second
const countdownTimer = document.getElementById("time-remaining");
//Fetch progress circle to update current time progressed every second
const progressCircle = document.getElementById("progress-circle");
//Define study, break, and rest times for each session, with default values
const studyMinutes = 25;
let studyTime = studyMinutes * 60;
const breakMinutes = 5;
let breakTime = breakMinutes * 60;
const restMinutes = 15;
let restTime = restMinutes * 60;
var currentSession = "study";
var timerStart;
function makeActiveSession(session) {
    var sessionList = document.getElementsByClassName("pomodoro-buttons");
    for (let item of sessionList)item.classList.remove("active-state");
    session.classList.add("active-state");
    togglePlayPause(pauseBtn);
    sessionComplete();
    if (session == restButton) {
        currentSession = "rest";
        renderTime(Math.floor(restTime / 60), restTime % 60);
        progressCircle.style.stroke = "#00B8D9";
    } else if (session == breakButton) {
        currentSession = "break";
        renderTime(Math.floor(breakTime / 60), breakTime % 60);
        progressCircle.style.stroke = "#FFAB00";
    } else {
        currentSession = "study";
        renderTime(Math.floor(studyTime / 60), studyTime % 60);
        progressCircle.style.stroke = "#6554C0";
    }
}
function togglePlayPause(btn) {
    if (btn.id == "play-icon") {
        playBtn.classList.add("hidden");
        pauseBtn.classList.remove("hidden");
        timerStart = setInterval(function() {
            updateCountdown(currentSession);
        }, 1000);
    } else {
        pauseBtn.classList.add("hidden");
        playBtn.classList.remove("hidden");
        clearInterval(timerStart);
    }
}
function delay(time) {
    return new Promise((resolve)=>setTimeout(resolve, time)
    );
}
function sessionComplete() {
    progressCircle.style.strokeDashoffset = 0;
    renderTime(0, 0);
    studyTime = studyMinutes * 60;
    breakTime = breakMinutes * 60;
    restTime = restMinutes * 60;
    clearInterval(timerStart);
    pauseBtn.classList.add("hidden");
    playBtn.classList.remove("hidden");
    resetTimer();
}
function resetTimer() {
    progressCircle.classList.add("no-transition");
    progressCircle.style.strokeDashoffset = 1159;
    delay(1000).then(()=>progressCircle.classList.remove("no-transition")
    );
    let minutes;
    let seconds;
    switch(currentSession){
        case "break":
            minutes = Math.floor(breakTime / 60);
            seconds = breakTime % 60;
            renderTime(minutes, seconds);
        case "rest":
            minutes = Math.floor(restTime / 60);
            seconds = restTime % 60;
            renderTime(minutes, seconds);
        default:
            minutes = Math.floor(studyTime / 60);
            seconds = studyTime % 60;
            renderTime(minutes, seconds);
    }
}
function updateCountdown(currentSession1) {
    let minutes;
    let seconds;
    if (currentSession1 == "break") {
        minutes = Math.floor(breakTime / 60);
        seconds = breakTime % 60;
        if (breakTime == 0) sessionComplete();
        else {
            renderTime(minutes, seconds);
            breakTime--;
            progressCircle.style.strokeDashoffset = percentToOffset(timeToPercent(currentSession1));
        }
    } else if (currentSession1 == "rest") {
        minutes = Math.floor(restTime / 60);
        seconds = restTime % 60;
        if (restTime == 0) sessionComplete();
        else {
            renderTime(minutes, seconds);
            restTime--;
            progressCircle.style.strokeDashoffset = percentToOffset(timeToPercent(currentSession1));
        }
    } else {
        minutes = Math.floor(studyTime / 60);
        seconds = studyTime % 60;
        if (studyTime == 0) sessionComplete();
        else {
            renderTime(minutes, seconds);
            studyTime--;
            progressCircle.style.strokeDashoffset = percentToOffset(timeToPercent(currentSession1));
        }
    }
}
function renderTime(minutes, seconds) {
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownTimer.innerHTML = minutes + ":" + seconds;
}
function timeToPercent(currentSession2) {
    switch(currentSession2){
        case "break":
            return 1 - breakTime / (breakMinutes * 60);
        case "rest":
            return 1 - restTime / (restMinutes * 60);
        default:
            return 1 - studyTime / (studyMinutes * 60);
    }
}
function percentToOffset(percent) {
    return 1159 - 1159 * percent;
}
makeActiveSession(studyButton);
renderTime(Math.floor(studyTime / 60), studyTime % 60);

//# sourceMappingURL=pomodoro.24d87240.js.map
