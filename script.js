window.onload = function() {
    loadTasks();
};

function loadTasks() {
    ['work', 'school', 'personal'].forEach(category => {
        let tasks = JSON.parse(localStorage.getItem(category)) || [];
        tasks.forEach(task => addTaskToDOM(category, task));
    });
}

function addTask(category) 
{
    const inputField = document.getElementById(`new-${category}-task`);
    const taskText = inputField.value.trim();
    if (taskText === '') return;

    addTaskToDOM(category, taskText);
    saveTask(category, taskText);

    inputField.value = '';
}


function addTaskToDOM(category, taskText) 
{
    const taskList = document.getElementById(`${category}-tasks`);
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-danger';
    deleteButton.textContent = 'Odstranit';
    deleteButton.onclick = function() {
        removeTask(category, taskText);
        taskList.removeChild(listItem);
    };

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

function saveTask(category, taskText) 
{
    let tasks = JSON.parse(localStorage.getItem(category)) || [];
    tasks.push(taskText);
    localStorage.setItem(category, JSON.stringify(tasks));
}

function removeTask(category, taskText) 
{
    let tasks = JSON.parse(localStorage.getItem(category)) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem(category, JSON.stringify(tasks));
}
