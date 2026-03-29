const toDoList = document.getElementById('to-do-list');
const input = document.querySelector('input');
const addButton = document.getElementById('add-btn');

document.addEventListener('DOMContentLoaded', getLocalTodos);

function addTask() {
    const task = input.value.trim();
    if (task === '') {
        alert('Please enter a task');
        return;
    }

    createTodoElement(task, false); 
    saveLocalTodo(task, false);  
    input.value = '';
}

function createTodoElement(task, isCompleted) {
    const li = document.createElement('li');
    if (isCompleted) li.classList.add('completed');

    li.innerHTML = `
        <span>${task}</span> 
        <button class="done-btn">${isCompleted ? 'Cancel' : 'Done'}</button> 
        <button class="delete-btn">Delete</button>
    `;
    toDoList.appendChild(li);
}

toDoList.addEventListener('click', function(e) {
    const item = e.target;
    const parent = item.parentElement;
    const taskText = parent.querySelector('span').innerText;

    if (item.classList.contains('done-btn')) {
        parent.classList.toggle('completed');
        item.textContent = parent.classList.contains('completed') ? 'Cancel' : 'Done';
        updateLocalTodo(taskText); 
    }

    if (item.classList.contains('delete-btn')) {
        parent.remove();
        removeLocalTodo(taskText);
    }
});

addButton.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });


function saveLocalTodo(task, completed) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push({ text: task, completed: completed });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos() {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach(todo => createTodoElement(todo.text, todo.completed));
}

function removeLocalTodo(taskText) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos = todos.filter(t => t.text !== taskText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateLocalTodo(taskText) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(t => {
        if (t.text === taskText) t.completed = !t.completed;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
