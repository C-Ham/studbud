//Fetch form elements to use for future addTask() calls
const studyForm = document.getElementById("pomodoro");
const breakForm = document.getElementById("break");
const restForm = document.getElementById("rest");
const modalTimes = document.getElementById("modal-times");

function closeTimesModal() {
  document.getElementById("change-times").reset();
  modalTimes.style.display = "none";
 }

function openTimesModal() {
  modalTimes.style.display = "block";
 }
 

//Triggered when submit button is clicked on the "Add Task" Modal
function onTimesSubmit() {
    studyForm.value = studyForm.value > 60 ? 60 : studyForm.value;
    breakForm.value = breakForm.value > 60 ? 60 : breakForm.value;
    restForm.value = restForm.value > 60 ? 60 : restForm.value;

    if (studyForm.value) { 
      studyMinutes = studyForm.value;
    }
    if (breakForm.value) { 
      breakMinutes = breakForm.value;
    }
    if (restForm.value) { 
      restMinutes = restForm.value;
    }

    document.getElementById("change-times").reset();
    closeTimesModal();
    resetSession();
}