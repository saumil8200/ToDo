const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');

addTodoBtn.addEventListener('click', function() {
    const todoText = todoInput.value;
    if (todoText.trim() !== '') {
      addTodoToList(todoText);
      todoInput.value = '';
    }
  });

let todos = []; // Array to store todos

function addTodoToList(todoText) {
    const todo = {
      id: generateTodoId(),
      text: todoText,
      completed: false
    };
  
    todos.push(todo);
  
    // Update the display
    renderTodos();
}

function generateTodoId() {
    // Generate a random number and convert it to a string
    const randomId = Math.floor(Math.random() * 1000000).toString();
  
    // Check if the generated ID already exists in the todos array
    const isDuplicateId = todos.some(todo => todo.id === randomId);
  
    // If the ID is a duplicate, recursively call the function to generate a new one
    if (isDuplicateId) {
      return generateTodoId();
    }
  
    // If the ID is unique, return it
    return randomId;
}

const todoList = document.getElementById('todoList');
const STORAGE_KEY = 'todos';

let todoItems = [];

function addTodoToList(todoText) {
  const todo = {
    id: generateTodoId(),
    text: todoText,
    completed: false
  };

  todoItems.push(todo);

  saveTodos();
  renderTodos();
}

function generateTodoId() {
  const randomId = Math.floor(Math.random() * 1000000).toString();

  const isDuplicateId = todoItems.some(todo => todo.id === randomId);

  if (isDuplicateId) {
    return generateTodoId();
  }

  return randomId;
}

function renderTodos() {
  todoList.innerHTML = '';

  for (const todo of todoItems) {
    const todoItem = document.createElement('li');
    const todoText = document.createElement('div');
    const todoId = document.createElement('span');
    const deleteButton = document.createElement('button');

    todoText.textContent = todo.text;
    todoId.textContent = `ID: ${todo.id}`;
    todoId.style.display = 'block';

    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    deleteButton.addEventListener('click', function () {
      deleteTodoById(todo.id);
    });

    todoItem.appendChild(todoId);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);
    todoItem.classList.add('todo-item');

    // Add event listener to mark todo as completed
    todoItem.addEventListener('click', function () {
      toggleTodoCompletion(todo.id);
    });

    // Apply completed class if todo is completed
    if (todo.completed) {
      todoItem.classList.add('completed');
    }

    todoList.appendChild(todoItem);
  }
}

function deleteTodoById(id) {
  todoItems = todoItems.filter(todo => todo.id !== id);

  saveTodos();
  renderTodos();
}

function toggleTodoCompletion(id) {
  const todo = todoItems.find(todo => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoItems));
}

function loadTodos() {
  const savedTodos = localStorage.getItem(STORAGE_KEY);
  todoItems = savedTodos ? JSON.parse(savedTodos) : [];
}

window.addEventListener('load', function() {
  loadTodos();
  renderTodos();
});

localStorage.setItem('test', 'Hello');
const value = localStorage.getItem('test');
console.log(value);
