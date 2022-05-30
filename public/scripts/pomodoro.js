//Fetch play and pause button from DOM to check for timer start/pause/stop onclick events
const playBtn = document.getElementById("play-icon");
const pauseBtn = document.getElementById("pause-icon");

//Fetch back and next buttons to reset and skip sessions
const backBtn = document.getElementById("back-icon");
const nextBtn = document.getElementById("next-icon");

//Fetch session buttons to check for session changes onclick
const studyButton = document.getElementById("pomodoro-session-buttons--study");
const restButton = document.getElementById("pomodoro-session-buttons--rest");
const breakButton = document.getElementById("pomodoro-session-buttons--break");

//Fetch elements to calculcate times for next session
const nextBreakText = document.getElementById("next-break");
const nextStudyText = document.getElementById("next-study");
const nextRestText = document.getElementById("next-rest");

const cycleNumber = document.getElementById("cycle-number");
const sessionNumber = document.getElementById("session-number");
//Fetch time remaining to update every second
const countdownTimer = document.getElementById("time-remaining");

//Fetch progress circle to update current time progressed every second
const progressCircle = document.getElementById("progress-circle");

//Define study, break, and rest times for each session, with default values
let studyMinutes = 25;
let studyTime = studyMinutes * 60;

let breakMinutes = 5;
let breakTime = breakMinutes * 60;

let restMinutes = 15;
let restTime = restMinutes * 60;

//Set the current session name and the cycle number
var currentSession = "study";
var currentCycle = 1;

//Calculate how many study sessions are completed in the pomodoro cycle (max 4)
var completedStudySessions = -1;

//Define variable to set interval for the timer countdown function
var timerStart;

window.addEventListener('resize', calcPadding);

function calcPadding() {
    var focusWrapper = document.querySelector(".focus-wrapper");
    var calculatedPadding = window.innerWidth / 40;
    if (calculatedPadding > 33) { calculatedPadding = 33; }
    focusWrapper.style.padding = "0px " + calculatedPadding + "%";
}

//Triggered when a new session type is started, either from completion or a button onclick event
//Specify the session type and whether it counts as a completed session 
function makeActiveSession(session) {
    var sessionList = document.getElementsByClassName("pomodoro-buttons");

    if(session.classList.contains("active-state")) {
        openTimesModal();
    }

    else {
        for (let item of sessionList) {
            item.classList.remove("active-state");
            item.firstChild.style = "display: none;"
        }
        
        session.classList.add("active-state");
        session.firstChild.style = "display: flex;"

        togglePlayPause(pauseBtn);

        sessionComplete();

        if (session == restButton) {
            currentSession = "rest";
            renderTime(Math.floor(restTime / 60), restTime % 60);
            progressCircle.style.stroke = "#00B8D9";
        }

        else if (session == breakButton) {
            currentSession = "break";
            renderTime(Math.floor(breakTime / 60), breakTime % 60);
            progressCircle.style.stroke = "#FFAB00";
        }

        else {
            currentSession = "study";
            renderTime(Math.floor(studyTime / 60), studyTime % 60);
            progressCircle.style.stroke = "#6554C0";
        }
    }
}

//Start and stop the timer on play/pause onclick event
function togglePlayPause(btn) {
    if (btn.id == "play-icon") {
        playBtn.classList.add("hidden");
        pauseBtn.classList.remove("hidden");

        timerStart = setInterval(function() { updateCountdown(currentSession); }, 1000);
    }
    else {
        pauseBtn.classList.add("hidden");
        playBtn.classList.remove("hidden");
        clearInterval(timerStart);
    }
}

//Reset the current session in the Pomodoro cycle, but don't increment the completed sessions
function resetSession() { 
    if(currentSession == "study") { completedStudySessions--; }
    togglePlayPause(pauseBtn);
    sessionComplete();
}

//Skip to the next session in the Pomodoro cycle, on the skip event
function skipSession() {
    switch(currentSession) {
        case "break": 
            makeActiveSession(studyButton);
            break;
        case "rest": 
            makeActiveSession(studyButton);
            currentCycle++;
            cycleNumber.innerHTML = "CYCLE " + currentCycle;
            break;
        default: 
            if(completedStudySessions == 3) {
                makeActiveSession(restButton);
                completedStudySessions = 0;
            }
            else {
                makeActiveSession(breakButton);
            }
    }
}

//Set a delay for one second (used for temporarily disabling transitions on reset events)
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

//Reset session times and complete the progress circle, and increment the current session in the Pomodoro cycle
function sessionComplete() {
    progressCircle.style.strokeDashoffset = 0;
    renderTime(0, 0);

    studyTime = studyMinutes * 60;
    breakTime = breakMinutes * 60;
    restTime = restMinutes * 60;

    clearInterval(timerStart);
    pauseBtn.classList.add("hidden");
    playBtn.classList.remove("hidden");

    if(currentSession == "study") { completedStudySessions++; }
    resetTimer();
    if (completedStudySessions == 4) { completedStudySessions = 0; }
    sessionNumber.innerHTML = "#" + (completedStudySessions + 1);
}

//Reset the progress circle to 0%, and render the time back to the original session time
function resetTimer() {
    //Temporarily disable progress transition to reset timer, using a promise for delays
    //Without this, when the session restarts, the progress circle rewinds all the way back around
    progressCircle.classList.add("no-transition");
    progressCircle.style.strokeDashoffset = 1159;

    delay(1000).then(() => progressCircle.classList.remove("no-transition"));

    let minutes;
    let seconds;

    switch(currentSession) {
        case "break": 
            minutes = Math.floor(breakTime / 60);
            seconds = breakTime % 60;
            renderTime(minutes, seconds);
            break;
        case "rest": 
            minutes = Math.floor(restTime / 60);
            seconds = restTime % 60;
            renderTime(minutes, seconds);
            break;
        default: 
            minutes = Math.floor(studyTime / 60);
            seconds = studyTime % 60;
            renderTime(minutes, seconds);
    }
}

//Update the countdown timer every second
function updateCountdown(currentSession) {
    
    let minutes;
    let seconds;

    if (currentSession == "break") {
        minutes = Math.floor(breakTime / 60);
        seconds = breakTime % 60;

        if (breakTime == 0) { sessionComplete(); }

        else {
            renderTime(minutes, seconds);
            breakTime--;
            progressCircle.style.strokeDashoffset = percentToOffset(timeToPercent(currentSession));
        }
    }

    else if (currentSession == "rest") {
        minutes = Math.floor(restTime / 60);
        seconds = restTime % 60;

        if (restTime == 0) { sessionComplete(); }

        else {
            renderTime(minutes, seconds);
            restTime--;
            progressCircle.style.strokeDashoffset = percentToOffset(timeToPercent(currentSession));
        }
    }

    else {
        minutes = Math.floor(studyTime / 60);
        seconds = studyTime % 60;

        if (studyTime == 0) { sessionComplete(); }

        else {
            renderTime(minutes, seconds);
            studyTime--;
            progressCircle.style.strokeDashoffset = percentToOffset(timeToPercent(currentSession));
        }
    }
}

//Render user-readable time format in DOM from calculated minutes and seconds
function renderTime(minutes, seconds) {
    //Update countdown timer given minutes and seconds parameters
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownTimer.innerHTML = minutes + ":" + seconds;

    //Calculate the time for the next break
    var nextBreak = moment().add(minutes, 'm').add(seconds, 's');
    if (currentSession == "rest") {
        nextBreak = nextBreak.add(studyMinutes, 'm');
    }
    nextBreakText.innerHTML = nextBreak.format('hh:mm a');

    //Calculate the time for the next study session
    var nextStudy = moment().add(minutes, 'm').add(seconds, 's');
    nextStudyText.innerHTML = nextStudy.format('hh:mm a');
}

//Calculate what percent of session is complete, given the current time remaining
function timeToPercent(currentSession) {
    switch(currentSession) {
        case "break": return (1 - (breakTime / (breakMinutes * 60)));
        case "rest": return (1 - (restTime / (restMinutes * 60)));
        default: return (1 - (studyTime / (studyMinutes * 60)));
    }
}

//Calculate the offset for the progress circle element, given the percent
function percentToOffset(percent) {
    return 1159 - 1159 * percent;
}

//Initialise a new study session with default time specified
makeActiveSession(studyButton);
renderTime(Math.floor(studyTime / 60), studyTime % 60);