//Fetch kanban container to insert new boards into
const kanbanContainer = document.querySelector(".kanban");
//Fetch parent element to insert tasks into
const tasklist = document.getElementById("kanban__column-items");
let totalTasks = document.querySelectorAll(".kanban__column-items:not([id*='today-focus--items'])");
//Create an empty array to store saved category names and label colors
var categoryList = [];
//List of available label colors
var colorList = [
    "#6554C0",
    "#0065FF",
    "#FF5630",
    "#00B8D9",
    "#36B37E",
    "#FFAB00"
];
//Pointer to indicate which label color should be used next
let colorPos = 0;
//Generate (mostly) unique ID for each task
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function addNewBoard() {
    let kanbanColumn = document.createElement("div");
    kanbanColumn.classList.add("kanban__column");
    let kanbanColumnTitle = document.createElement("div");
    kanbanColumnTitle.classList.add("kanban__column-title");
    kanbanColumnTitle.contentEditable = true;
    kanbanColumnTitle.innerHTML = "UNTITLED";
    let kanbanColumnTitleTaskcount = document.createElement("div");
    kanbanColumnTitleTaskcount.classList.add("kanban__column-title--taskcount");
    kanbanColumnTitleTaskcount.innerHTML = 0;
    let kanbanButton = document.createElement("button");
    kanbanButton.classList.add("kanban__button");
    kanbanButton.setAttribute("onclick", "openModal()");
    kanbanButton.innerHTML = "+";
    let kanbanColumnItems = document.createElement("div");
    kanbanColumnItems.id = "kanban__column-items";
    kanbanColumnItems.classList.add("kanban__column-items");
    kanbanColumnItems.setAttribute("ondrop", "drop(event, this)");
    kanbanColumnItems.setAttribute("ondragenter", "dragEnter(event, this)");
    kanbanColumnItems.setAttribute("ondragover", "dragOver(event, this)");
    kanbanColumnItems.setAttribute("ondragleave", "dragLeave(event, this)");
    kanbanColumn.appendChild(kanbanColumnTitle);
    kanbanColumn.appendChild(kanbanColumnTitleTaskcount);
    kanbanColumn.appendChild(kanbanButton);
    kanbanColumn.appendChild(kanbanColumnItems);
    kanbanContainer.insertBefore(kanbanColumn, kanbanContainer.lastElementChild);
}
function deleteLastBoard() {
    var allBoards = document.querySelectorAll(".kanban__column");
    if (allBoards.length > 2) allBoards[allBoards.length - 1].remove();
}
//Add task to array
function addTask(taskTitle, taskDescription, priorityRating, taskCategory, dueDate, estimatedTime) {
    //Define our task object
    let task = {
        idNumber: getRandomInt(99999),
        taskTitle,
        taskDescription,
        priorityRating,
        taskCategory: taskCategory.toUpperCase(),
        dueDate,
        estimatedTime
    };
    //Check to see if the category exists yet
    let categoryObj;
    let catMap = categoryList.map((cat)=>cat.name
    );
    if (!catMap.includes(task.taskCategory)) {
        //If the category doesn't exist yet define our category object
        //Stores the category name and randomised label color
        categoryObj = {
            name: task.taskCategory,
            labelColor: colorList[colorPos]
        };
        if (colorPos == colorList.length - 1) colorPos = 0;
        else colorPos += 1;
        categoryList.push(categoryObj);
        let catSelect = document.createElement("option");
        catSelect.value = categoryObj.name;
        categories.appendChild(catSelect);
    } else categoryObj = categoryList[catMap.indexOf(task.taskCategory)];
    // Separate the DOM manipulation from the object creation logic
    renderTask(task, categoryObj);
}
// Function to display the item on the page
function renderTask(task, cat) {
    //Create an HTML element as a container for our task
    let kanbanTaskContainer = document.createElement("div");
    kanbanTaskContainer.classList.add('kanban__column-task');
    kanbanTaskContainer.setAttribute("draggable", true);
    kanbanTaskContainer.id = task.idNumber;
    kanbanTaskContainer.addEventListener('dragstart', dragStart);
    //Define color-coded priority icons using classes and unicode chars
    const lowPriority = "<div><p class='low-priority'>&#9670</p></div>";
    const medPriority = "<div><p class='med-priority'>&#9670 &#9670</p></div>";
    const highPriority = "<div><p class='high-priority'>&#9670 &#9670 &#9670</p></div>";
    //Check the priority rating of the form input value, and assign it to an icon
    let taskPriority = highPriority;
    if (task.priorityRating == "low") taskPriority = lowPriority;
    else if (task.priorityRating == "medium") taskPriority = medPriority;
    //Add innerHTML for the task category, but hide the element if there is a blank input
    //Use the category object to set a randomised label color for new categories, and use the same color for existing ones
    let categoryDiv = "<div ><span class='task-category' style='float:right; background-color:" + cat.labelColor + "'>" + cat.name + "</span>";
    //If the task div label color is light, change the text color to black for accessibility
    if (cat.labelColor == "#00B8D9" || cat.labelColor == "#36B37E" || cat.labelColor == "#FFAB00") categoryDiv = "<div ><span class='task-category' style='float:right; color: black; background-color:" + cat.labelColor + "'>" + cat.name + "</span>";
    if (cat.name == "" || !cat.name) categoryDiv = "<div ><span class='task-category' style='float:right; display:none'>" + task.taskCategory + "</span>";
    let title = "<h4>" + task.taskTitle + "</h4></div>";
    let desc = "<div><p>" + task.taskDescription + "</p></div>";
    //Add innerHTML for the task time, but hide the element if there is a blank input
    let time = "<div><h4 style='float:right;'>" + task.estimatedTime + " hrs</h4>";
    if (!task.estimatedTime) time = "<div><h4 style='float:right; display:none;'>" + task.estimatedTime + " hrs</h4>";
    let priority = taskPriority + "</div>";
    //Append task metadata into the DOM
    kanbanTaskContainer.innerHTML = categoryDiv + title + desc + time + priority;
    //Append task to array
    tasklist.appendChild(kanbanTaskContainer);
    totalTasks = document.querySelectorAll(".kanban__column-items:not([id*='today-focus--items'])");
    totalTasks.forEach((board)=>board.parentNode.children[1].innerHTML = board.childNodes.length
    );
}
//Some test tasks to make sure nothing breaks
addTask("2 Persona Slides", "Add user needs, requirements, and frustrations for two to three different user groups", "high", "DECO2017 CLASS", "26/03/2021", 3);
addTask("JavaScript Quiz", "Refresh concepts such as data structures, buffers and arrays", "medium", "INFO1001", "26/03/2021");
addTask("Finalise Mockups", "Clean up layers, kern font families, prepare for presentation and finish off slide deck", "low", "", "", "");
addTask("Virtual Reality Config", "Configure ARToolKit to prepare for mixed reality applications", "low", "INFO1001", "", 10);
addTask("FAANG Interview Prep", "Do 3-5 practice problems daily for the next week, specifically datasets and binary trees", "medium", "Interviews", "", 20);

//# sourceMappingURL=index.aa2a3b63.js.map
