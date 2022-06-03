//DESCRIPTION: Implements all the drag and drop functionality for tasks on the Kanban Board
//Users can drag tasks between boards and the focus dropbox, and can also drop tasks over the
//delete button to remove them. Valid drop targets have a special highlight class that indicates
//whether or not a valid drop() event will fire.



// dragStart event defines initial behavior on drag; hide original element and transfer data
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => { e.target.classList.add('hide'); }, 0);
}

//Add highlight class to board when task is dragged over
function dragEnter(e, el) {
    e.preventDefault();
    if (el) {
        if(el.classList.contains("board-action")) { el.classList.add('drag-over'); }
        else { el.parentElement.classList.add('drag-over'); }
    }
}

//Add highlight class to board when task is dragged over
function dragOver(e, el) {
    e.preventDefault();
    if (el) {
        if(el.classList.contains("board-action")) { el.classList.add('drag-over'); }
        else { el.parentElement.classList.add('drag-over'); }
    }
}

//Remove highlight class from board when task is not being dragged over
function dragLeave(e, el) {
    if (el) {
        //Handle the class hierarchy differently if the target is the delete button and not a board
        if(el.classList.contains("board-action")) { el.classList.remove('drag-over'); }
        else { el.parentElement.classList.remove('drag-over'); }
    }
}

//Invalid drag over event, this is essentially a useless function
//But it's necessary to trigger and handle the invalidDrop() event
function invalidDragOver(e) {
    e.preventDefault();
}

//Handling drop events on invalid targets
//Without this function, tasks that are dropped on invalid targets never
//re-appear in the DOM because the drop() event never fires
function invalidDrop(e) {
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    draggable.classList.remove('hide');
}

//When the task is successfuly placed, remove the highlight class from the drop target
//Then fetch the previously stored element data and append child to new board parent in DOM
function drop(e, el) {

    //Check to make sure the drop target is valid
    if (el) { el.parentElement.classList.remove('drag-over'); }

    //If there are more than 3 items in the "Today's Focus" dropbox, invalidate the drop
    if ((el.id == "today-focus--items") && (el.children.length >= 4)) {
        invalidDrop(e);
    }

    else {
        // Fetch the draggable element
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);

        // Append the draggable element to the drop target
        //Insert before the placeholder if it's dropped on "Today's Focus" dropbox
        if (el.id == "today-focus--items") {  el.insertBefore(draggable, el.firstChild); }
        else { el.appendChild(draggable); }

        // Display the draggable element
        draggable.classList.remove('hide');

        //Update the total board task counts in the DOM once the task has been appended to new parent
        //(Query selector excludes "Today's Focus" board with specific ID but same class name)
        totalTasks = document.querySelectorAll(".kanban__column-items:not([id*='today-focus--items'])");
        totalTasks.forEach(board => board.parentNode.children[1].innerHTML = board.childNodes.length);

        //Remove the dragbox placeholder from "Today's Focus" board if max items (3) have been placed
        if ((el.id == "today-focus--items") && (el.children.length == 4)) {
            document.querySelector(".task-placeholder").style.display = "none";
        }
    }
}

//Delete task when dropped over the "Delete" button
function deleteTask(e, el) {
    el.classList.remove('drag-over');
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    //Remove task from DOM
    draggable.remove();

    //Update the total board task counts in the DOM once the task has been deleted
    totalTasks = document.querySelectorAll(".kanban__column-items:not([id*='today-focus--items'])");
    totalTasks.forEach(board => board.parentNode.children[1].innerHTML = board.childNodes.length);
}