const tasklist = document.getElementById("kanban__column-items");

// Create an empty array to store our tasks
var taskList = [];

function addTask(taskTitle, taskDescription, taskCategory, createdDate, dueDate, priorityRating, estimatedTime, completionStatus) {
  let task = {
    taskTitle,
    taskDescription,
    taskCategory,
    createdDate,
    dueDate,
    priorityRating,
    estimatedTime,
    completionStatus
  };

  // Add the task to our array of tasks
  taskList.push(task);

  // Separate the DOM manipulation from the object creation logic
  renderTask(task);
}


// Function to display the item on the page
function renderTask(task) {
  let item = document.createElement("div");

  const lowPriority = "<div><p class='low-priority'>" + "&#9670" + "</p></div>";
  const medPriority = "<div><p class='med-priority'>" + "&#9670 &#9670" + "</p></div>";
  const highPriority = "<div><p class='high-priority'>" + "&#9670 &#9670 &#9670" + "</p></div>";

  let taskPriority = highPriority;

  if (task.priorityRating == "Low") {
    taskPriority = lowPriority;
  }

  else if (task.priorityRating == "Medium") {
    taskPriority = lowPriority;
  }

  /*var colors = [variables.$primaryBlue, variables.$confirmGreen, variables.$warningYellow, 
                variables.$errorRed, variables.$helpPurple, variables.$accentTeal]

  let labelColor = colors[Math.floor(Math.random() * colors.length)];*/

  item.classList.add('kanban__column-task');
  item.innerHTML = "<div><span style='float:right'>" + task.taskCategory + "</span>" +
                   "<h4>" + task.taskTitle + "</h4></div>" + 
                   "<div><p>" + task.taskDescription + "</p></div>" +
                   "<div><h4 style='float:right;'>" + task.estimatedTime + " hrs</h4>" +
                   taskPriority + "</div>";

  tasklist.appendChild(item);
}


let task = "2 Persona Slides"; // could be swapped out for line below
let desc = "Add user needs, requirements, and frustrations for two to three different user groups";
let cat = "DECO2017 CLASS";
let date = (new Date()).toLocaleDateString('en-US'); //Convert to short date format


addTask(task, desc, cat, date, "26/03/2021", "High", 3, false);

addTask("JavaScript Quiz", "Refresh concepts such as data structures, buffers and arrays", "INFO1001", date, "26/03/2021", "Low", 5, false);

// Log out the newly populated taskList everytime the button has been pressed
console.log(taskList);