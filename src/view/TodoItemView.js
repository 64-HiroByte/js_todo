import { element } from "./html-util.js";

export class TodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id:number, completed:boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @param {Function({id:number, title:string})} onEditTodo タスクの編集イベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, { onUpdateTodo, onDeleteTodo, onEditTodo }) {
    // const todoItemElement = todoItem.completed
    //   ? element`
    //     <li class="list-group-item"><input type="checkbox" class="checkbox" checked>
    //       <s>${todoItem.title}</s>
    //       <button class="btn btn-success edit">編集</button>
    //       <button class="btn btn-danger delete">削除</button>
    //     </li>`
    //   : element`
    //     <li class="list-group-item"><input type="checkbox" class="checkbox">
    //       ${todoItem.title}
    //       <button class="btn btn-success edit">編集</button>
    //       <button class="btn btn-danger delete">削除</button>
    //     </li>`;
    const todoItemElement = element`
      <li class="list-group-item">
        <input type="checkbox" class="checkbox">
        <span class="title">${todoItem.title}</span>
        <button class="btn btn-success edit">編集</button>
        <button class="btn btn-danger delete">削除</button>
      </li>`;

    // completed の場合だけUIを調整
    if (todoItem.completed) {
      const checkbox = todoItemElement.querySelector(".checkbox");
      const titleSpan = todoItemElement.querySelector(".title");
      checkbox.checked = true;
      titleSpan.innerHTML = `<s>${todoItem.title}</s>`;
    }


    // チェックボックス
    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      // コールバック関数に変更
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });

    // 削除
    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      const modalElement = document.getElementById('deleteConfirmModal');
      const confirmButton = document.getElementById('confirmDeleteBtn');
      const bsModal = new bootstrap.Modal(modalElement);
      bsModal.show();

      const handler = () => {
        onDeleteTodo({ id: todoItem.id });
        bsModal.hide();
        confirmButton.removeEventListener('click', handler);
      };
      confirmButton.addEventListener('click', handler);
    });

    // 編集
    const editButtonElement = todoItemElement.querySelector('.edit');
    editButtonElement.addEventListener('click', () => {
      // 編集モードUI
      const editElement = document.createElement('div');
      editElement.className = 'd-flex gap-2'
      const inputElement = document.createElement('input');
      inputElement.className = 'form-control';
      inputElement.value = todoItem.title;
      const saveButtonElement = document.createElement('input');
      saveButtonElement.type = 'submit'
      saveButtonElement.value = '保存';
      saveButtonElement.className = 'btn btn-primary ms-2';
      editElement.appendChild(inputElement);
      editElement.appendChild(saveButtonElement);

      // liをクリア
      todoItemElement.innerHTML = ''
      // 編集モードUIを挿入
      todoItemElement.appendChild(editElement);

      saveButtonElement.addEventListener('click', () => {
        const newTitle = inputElement.value;
        onEditTodo({ id: todoItem.id, title: newTitle});
      });
    });

    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}
