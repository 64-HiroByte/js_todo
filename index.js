import { App } from "./src/App.js";

const formElement = document.querySelector("#js-form");
const formInputElement = document.querySelector("#js-form-input");
const todoCountElement = document.querySelector("#js-todo-count");
const todoListContainerElement = document.querySelector("#js-todo-list");

const app = new App({
    formElement,
    formInputElement,
    todoCountElement,
    todoListContainerElement
});
window.addEventListener("load", () => {
    app.mount();
});
window.addEventListener("unload", () => {
    app.unmount();
});

// const form = document.getElementById('js-form');
// const formInput = document.getElementById('js-form-input');
// const ul = document.getElementById('ul');

// const todos = JSON.parse(localStorage.getItem('todos'));

// if (todos) {
//   todos.forEach(todo => {
//     add(todo);
//   });
// }

// form.addEventListener('submit', function(event) {
//   event.preventDefault();
//   add();
// });

// function add(todo) {
//   let todoText = formInput.value;
//   if (todo) {
//     todoText = todo.text;
//   }

//   if (todoText) {
//     // li要素
//     const li = document.createElement('li');
//     // li.innerText = todoText;
//     li.classList.add('list-group-item', 'form-check');

//     // チェックボックス
//     const checkbox = document.createElement('input');
//     checkbox.classList.add('me-1');
//     checkbox.type = 'checkbox';

//     // Todoタスクの内容
//     const label = document.createElement('label');
//     // label.classList = 'form-check-label';
//     label.textContent = todoText;

//     // 編集ボタン
//     const editButton = document.createElement('button');
//     editButton.classList = 'btn btn-primary'
//     editButton.textContent = '編集';

//     // 削除ボタン
//     const deleteButton = document.createElement('button');
//     deleteButton.classList = 'btn btn-danger'
//     deleteButton.textContent = '削除'

//     deleteButton.addEventListener('click', () => {
//       if (confirm('このタスクを削除しますか？')) {
//         li.remove()
//       }
//     });

//     // liに追加
//     li.appendChild(checkbox);
//     li.appendChild(label);
//     li.appendChild(editButton);
//     li.appendChild(deleteButton);

//     if (todo && todo.completed) {
//       li.classList.add('text-decoration-line-through');
//     }

    // // 削除処理（右クリック）
    // li.addEventListener('contextmenu', function(event) {
    //   event.preventDefault();
    //   li.remove();
    //   saveData();
    // });

    // // 完了処理（左クリック）
    // li.addEventListener('click', function () {
    //   li.classList.toggle('text-decoration-line-through');
    //   saveData();
    // });

//     ul.appendChild(li);
//     formInput.value = '';
//     saveData();
//   }
// }

// function saveData() {
//   const lists = document.querySelectorAll('li');
//   let todos = [];
//   lists.forEach(list => {
//     const label = document.querySelector('label');
//     let todo = {
//       text:label.innerText,
//       // text:list.innerText,
//       completed: list.classList.contains('text-decoration-line-through')
//     }
//     todos.push(todo);
//   });
//   localStorage.setItem('todos', JSON.stringify(todos));
// }