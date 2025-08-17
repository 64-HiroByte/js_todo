// import { App } from "./src/App.js";
// const app = new App();

const form = document.getElementById('js-form');
const formInput = document.getElementById('js-form-input');
const ul = document.getElementById('ul');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach(todo => {
    add(todo);
  });
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  add();
});

function add(todo) {
  let todoText = formInput.value;
  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const li = document.createElement('li');
    li.innerText = todoText;
    li.classList.add('list-group-item');

    if (todo && todo.completed) {
      li.classList.add('text-decoration-line-through');
    }

    // 削除処理（右クリック）
    li.addEventListener('contextmenu', function(event) {
      event.preventDefault();
      li.remove();
      saveData();
    });

    // 完了処理（左クリック）
    li.addEventListener('click', function () {
      li.classList.toggle('text-decoration-line-through');
      saveData();
    });

    ul.appendChild(li);
    formInput.value = '';
    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll('li');
  let todos = [];
  lists.forEach(list => {
    let todo = {
      text:list.innerText,
      completed: list.classList.contains('text-decoration-line-through')
    }
    todos.push(todo);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}