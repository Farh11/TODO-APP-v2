const todoInput = document.getElementById('todo-input');
const addTaskBtn = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');

// Fetch tasks from the API
function fetchTasks() {
  fetch('/api/tasks')
    .then((response) => response.json())
    .then((tasks) => {
      renderTasks(tasks);
    })
    .catch((error) => {
      console.error('Error fetching tasks:', error);
    });
}

// Render tasks in the UI
function renderTasks(tasks) {
  todoList.innerHTML = '';
  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="updateTask(${task.id}, true)">Complete</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    if (task.completed) {
      taskItem.classList.add('completed');
    }
    todoList.appendChild(taskItem);
  });
}

// Add a new task
function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText) {
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: taskText }),
    })
      .then((response) => response.json())
      .then((newTask) => {
        todoInput.value = '';
        fetchTasks();
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  }
}

// Update a task
function updateTask(taskId, completed) {
  fetch(`/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  })
    .then((response) => response.json())
    .then((updatedTask) => {
      fetchTasks();
    })
    .catch((error) => {
      console.error('Error updating task:', error);
    });
}

// Delete a task
function deleteTask(taskId) {
  fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
  })
    .then(() => {
      fetchTasks();
    })
    .catch((error) => {
      console.error('Error deleting task:', error);
    });
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
todoInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Fetch tasks on page load
fetchTasks();