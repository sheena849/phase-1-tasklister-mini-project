document.addEventListener("DOMContentLoaded", () => {
  //you code here
  fetchTasks();
  const newTaskForm = document.querySelector('form');
  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newToDo = e.target.querySelector('#new-task-description').value.trim();
    if (newToDo === "") {
      return;
    }
    buildToDoOnClient(newToDo);
    newTaskForm.reset();
  });
});

function fetchTasks() {
  
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => buildToDo(task));
}

function buildToDoOnClient(newToDo) {
  const task = { id: Date.now(), task: newToDo };
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  buildToDo(task);
}

function buildToDo(task) {
  const taskLi = document.createElement('li');
  taskLi.className = 'task-item';
  taskLi.setAttribute('data-id', task.id);
  const taskText = document.createElement('span');
  taskText.textContent = task.task;
  taskLi.appendChild(taskText);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'x';
  deleteButton.setAttribute('aria-label', 'Delete task');
  taskLi.appendChild(deleteButton);
  document.querySelector('#tasks').appendChild(taskLi);
  deleteButton.addEventListener('click', () => {
    handleDelete(task.id);
  });
}

function handleDelete(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  const taskLi = document.querySelector(`[data-id='${taskId}']`);
  taskLi.remove();
}
