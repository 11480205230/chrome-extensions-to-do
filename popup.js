const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('#collection');
const clearBtn = document.querySelector('#clear-tasks');
const errorTask = document.querySelector('#error');

loadEventListeners();

function loadEventListeners() {

    document.addEventListener('DOMContentLoaded',getTasks);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click",removeTask);
    clearBtn.addEventListener("click", clearAllTasks);
    

}

function addTask(e) {
    if (taskInput.value === "") {
        $('#error').text("Nothing is here~");
    } else {
        $('#error').text("");
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        taskList.appendChild(li);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = "";
    }
    e.preventDefault();
}

function storeTaskInLocalStorage(e) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(e);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function getTasks(e) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // console.log(tasks);
    tasks.forEach(function(e) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(e));
        taskList.appendChild(li);
    })
}

function removeTask(e) {
    if(e.target.classList.contains('collection-item')) {
        e.target.remove();
    }
    removeTaskFromLocalStorage(e.target);
}

function removeTaskFromLocalStorage(e) {
    console.log(e);
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //JSON to String
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index) {
        if(e.textContent === task) {
            tasks.splice(index,1);
        }
        //update localStorage
        localStorage.setItem('tasks',JSON.stringify(tasks));
    })
}

function clearAllTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        clearAllTasksFromLocalStorage();
    }
}

function clearAllTasksFromLocalStorage() {
    localStorage.clear();
}