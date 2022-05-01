//Fetch parent element to insert tasks into
const tasklist = document.getElementById("kanban__column-items");
//Fetch form elements to use for future addTask() calls
const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const dueDate = document.getElementById("due-date");
const completionTime = document.getElementById("completion-time");
// Create an empty array to store tasks
var taskList = [];
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
//Add task to array
function addTask(taskTitle1, taskDescription, priorityRating, taskCategory, dueDate1, estimatedTime) {
    //Define our task object
    let task = {
        taskTitle: taskTitle1,
        taskDescription,
        priorityRating,
        taskCategory,
        dueDate: dueDate1,
        estimatedTime
    };
    // Add the task to our array of tasks
    taskList.push(task);
    // Separate the DOM manipulation from the object creation logic
    renderTask(task);
}
// Function to display the item on the page
function renderTask(task) {
    //Create an HTML element as a container for our task
    let item = document.createElement("div");
    item.classList.add('kanban__column-task');
    //Define color-coded priority icons using classes and unicode chars
    const lowPriority = "<div><p class='low-priority'>&#9670</p></div>";
    const medPriority = "<div><p class='med-priority'>&#9670 &#9670</p></div>";
    const highPriority = "<div><p class='high-priority'>&#9670 &#9670 &#9670</p></div>";
    //Check the priority rating of the form input value, and assign it to an icon
    let taskPriority = highPriority;
    if (task.priorityRating == "low") taskPriority = lowPriority;
    else if (task.priorityRating == "medium") taskPriority = medPriority;
    //Add innerHTML for the task category, but hide the element if there is a blank input
    let category1 = "<div ><span class='task-category' style='float:right'>" + task.taskCategory + "</span>";
    if (task.taskCategory == 0 || !task.taskCategory) category1 = "<div ><span class='task-category' style='float:right; display:none'>" + task.taskCategory + "</span>";
    let title = "<h4>" + task.taskTitle + "</h4></div>";
    let desc = "<div><p>" + task.taskDescription + "</p></div>";
    //Add innerHTML for the task time, but hide the element if there is a blank input
    let time = "<div><h4 style='float:right;'>" + task.estimatedTime + " hrs</h4>";
    if (!task.estimatedTime) time = "<div><h4 style='float:right; display:none;'>" + task.estimatedTime + " hrs</h4>";
    let priority1 = taskPriority + "</div>";
    //Append task metadata into the DOM
    item.innerHTML = category1 + title + desc + time + priority1;
    //Append task to array
    tasklist.appendChild(item);
}
//Some test tasks to make sure nothing breaks
addTask("2 Persona Slides", "Add user needs, requirements, and frustrations for two to three different user groups", "high", "DECO2017 CLASS", "26/03/2021", 3);
addTask("JavaScript Quiz", "Refresh concepts such as data structures, buffers and arrays", "medium", "INFO1001", "26/03/2021");
addTask("Finalise Mockups", "Clean up layers, kern font families, prepare for presentation and finish off slide deck", "low");
addTask("Virtual Reality Config", "Configure ARToolKit to prepare for mixed reality applications", "low", "", "", 10);
// Log out the newly populated taskList everytime the button has been pressed
console.log(taskList);

//# sourceMappingURL=index.aa2a3b63.js.map
