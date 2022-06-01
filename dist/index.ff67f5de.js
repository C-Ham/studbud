//Fetch form elements to use for future addTask() calls
const addtaskModal = document.getElementById("modal");
const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const categories = document.getElementById("categories");
const dueDate = document.getElementById("due-date");
const completionTime = document.getElementById("completion-time");
category.addEventListener("keypress", function(e) {
    if (e.key === "Enter") e.preventDefault();
});
function closeModal() {
    addtaskModal.style.display = "none";
}
function openModal() {
    addtaskModal.style.display = "block";
}
//Triggered when submit button is clicked on the "Add Task" Modal
function onSubmit() {
    //Form validation
    //Title and description missing
    if (!taskTitle.value && !taskDesc.value) {
        taskTitle.style.border = "2px solid #FF5630";
        taskDesc.style.border = "2px solid #FF5630";
    } else if (!taskTitle.value) {
        taskTitle.style.border = "2px solid #FF5630";
        taskDesc.style.border = "0px solid";
    } else if (!taskDesc.value) {
        taskTitle.style.border = "0px solid";
        taskDesc.style.border = "2px solid #FF5630";
    } else {
        //Add task to DOM
        addTask(taskTitle.value, taskDesc.value, priority.value, category.value, dueDate.value, completionTime.value);
        //Reset form elements in case their styles were altered from validation checks
        taskTitle.style.border = "0px solid";
        taskDesc.style.border = "0px solid";
        document.getElementById("addtask").reset();
        closeModal();
    }
}

//# sourceMappingURL=index.ff67f5de.js.map
