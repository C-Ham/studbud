const playBtn = document.getElementById("play-icon");
const pauseBtn = document.getElementById("pause-icon");
const countdownTimer = document.getElementById("time-remaining");

const studyMinutes = 25;
let studyTime = studyMinutes * 60;

var timerStart;

function togglePlayPause(btn) {
    if (btn.id == "play-icon") {
        playBtn.classList.add("hidden");
        pauseBtn.classList.remove("hidden");
        timerStart = setInterval(updateCountdown, 1000);
    }
    else {
        pauseBtn.classList.add("hidden");
        playBtn.classList.remove("hidden");
        clearInterval(timerStart);
    }
}

function updateCountdown() {
    const minutes = Math.floor(studyTime / 60);
    let seconds = studyTime % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownTimer.innerHTML = minutes + ":" + seconds;
    studyTime--;
}

function makeActiveSession(session) {
    var sessionList = document.getElementsByClassName("pomodoro-buttons");
    for (let item of sessionList) {
        item.classList.remove("active");
    }
    
    session.classList.add("active");
}