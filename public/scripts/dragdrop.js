// dragStart event defines initial behavior on drag; hide original element and transfer data
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

//Add highlight class to board when task is dragged over
function dragEnter(e, el) {
    e.preventDefault();
    if (el) {
        if(el.classList.contains("board-action")) {
            el.classList.add('drag-over');
        }

        else {
            el.parentElement.classList.add('drag-over');
        }
    }
}

//Add highlight class to board when task is dragged over
function dragOver(e, el) {
    e.preventDefault();
    if (el) {
        if(el.classList.contains("board-action")) {
            el.classList.add('drag-over');
        }

        else {
            el.parentElement.classList.add('drag-over');
        }
    }
}

//Remove highlight class from board when task is not being dragged over
function dragLeave(e, el) {
    if (el) {
        if(el.classList.contains("board-action")) {
            el.classList.remove('drag-over');
        }

        else {
            el.parentElement.classList.remove('drag-over');
        }
    }
}

//When task is placed, remove highlight class from board
//And fetch the previously stored element data
//Then append child to new board parent in DOM

function invalidDragOver(e) {
    e.preventDefault();
}

//Handling drop events on invalid targets
function invalidDrop(e) {
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    draggable.classList.remove('hide');
}

function drop(e, el) {

    //Check to make sure the drop target is valid
    if (el) {
        el.parentElement.classList.remove('drag-over');
    }

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
        if (el.id == "today-focus--items") { 
            el.insertBefore(draggable, el.firstChild); 
        }
        else { 
            el.appendChild(draggable); 
        }

        // Display the draggable element
        draggable.classList.remove('hide');

        totalTasks = document.querySelectorAll(".kanban__column-items:not([id*='today-focus--items'])");
        totalTasks.forEach(board => board.parentNode.children[1].innerHTML = board.childNodes.length);

        if ((el.id == "today-focus--items") && (el.children.length == 4)) {
            document.querySelector(".task-placeholder").style.display = "none";
        }
    }
}

function deleteTask(e, el) {
    el.classList.remove('drag-over');
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    draggable.remove();

    totalTasks = document.querySelectorAll(".kanban__column-items:not([id*='today-focus--items'])");
    totalTasks.forEach(board => board.parentNode.children[1].innerHTML = board.childNodes.length);
}