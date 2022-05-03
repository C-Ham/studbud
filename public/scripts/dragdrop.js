/* draggable element */
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}


/* drop targets */
let columns = document.querySelectorAll('.kanban__column-items');
columns.forEach(col => {
    col.addEventListener('dragenter', dragEnter)
    col.addEventListener('dragover', dragOver);
    col.addEventListener('dragleave', dragLeave);
    //col.addEventListener('drop', drop);
});


function dragEnter(e, el) {
    e.preventDefault();
    el.parentElement.classList.add('drag-over');
    //e.target.classList.add('drag-over');
}

function dragOver(e, el) {
    e.preventDefault();
    el.parentElement.classList.add('drag-over');
    //e.target.classList.add('drag-over');
}

function dragLeave(e, el) {
    el.parentElement.classList.remove('drag-over');
    //e.target.classList.remove('drag-over');
}

function drop(e, el) {
    el.parentElement.classList.remove('drag-over');
    //e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // add it to the drop target
    el.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');
}