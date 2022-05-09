const playBtn = document.getElementById("play-icon");
const pauseBtn = document.getElementById("pause-icon");
const countdownTimer = document.getElementById("time-remaining");
const progressCircle = document.getElementById("progress-circle");
const studyMinutes = 1;
let studyTime = studyMinutes * 60;
renderTime(Math.floor(studyTime / 60), studyTime % 60);
var timerStart;
function makeActiveSession(session) {
    var sessionList = document.getElementsByClassName("pomodoro-buttons");
    for (let item of sessionList)item.classList.remove("active-state");
    session.classList.add("active-state");
}
function togglePlayPause(btn) {
    if (btn.id == "play-icon") {
        playBtn.classList.add("hidden");
        pauseBtn.classList.remove("hidden");
        timerStart = setInterval(updateCountdown, 1000);
    } else {
        pauseBtn.classList.add("hidden");
        playBtn.classList.remove("hidden");
        clearInterval(timerStart);
    }
}
function resetTimer() {
    progressCircle.style.strokeDashoffset = 0;
    countdownTimer.innerHTML = "0:00";
    studyTime = studyMinutes * 60;
    clearInterval(timerStart);
    pauseBtn.classList.add("hidden");
    playBtn.classList.remove("hidden");
}
function updateCountdown() {
    const minutes = Math.floor(studyTime / 60);
    let seconds = studyTime % 60;
    if (studyTime == 0) resetTimer();
    else {
        renderTime(minutes, seconds);
        studyTime--;
        progressCircle.style.strokeDashoffset = percentToOffset(timeToPercent());
    }
}
function renderTime(minutes, seconds) {
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownTimer.innerHTML = minutes + ":" + seconds;
}
function timeToPercent() {
    return 1 - studyTime / (studyMinutes * 60);
}
function percentToOffset(percent) {
    return 1159 - 1159 * percent;
}

//# sourceMappingURL=pomodoro.24d87240.js.map
