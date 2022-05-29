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
        el.parentElement.classList.add('drag-over');
    }
}

//Add highlight class to board when task is dragged over
function dragOver(e, el) {
    e.preventDefault();
    if (el) {
        el.parentElement.classList.add('drag-over');
    }
}

//Remove highlight class from board when task is not being dragged over
function dragLeave(e, el) {
    if (el) {
        el.parentElement.classList.remove('drag-over');
    }
}

//When task is placed, remove highlight class from board
//And fetch the previously stored element data
//Then append child to new board parent in DOM

function drop(e, el) {
    if (el) {
        el.parentElement.classList.remove('drag-over');
    }

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // add it to the drop target
    el.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');

    totalTasks = document.querySelectorAll(".kanban__column-items");
    totalTasks.forEach(board => board.parentNode.children[1].innerHTML = board.childNodes.length);
}