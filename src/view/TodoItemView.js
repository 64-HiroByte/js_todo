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
    // const todoItemElement = element`
    //   <li class="list-group-item">
    //     <input type="checkbox" class="checkbox">
    //     <span class="title">${todoItem.title}</span>
    //     <button class="btn btn-success edit">編集</button>
    //     <button class="btn btn-danger delete">削除</button>
    //   </li>
    // `;
    const todoItemElement = element`
    <li class="list-group-item d-flex align-items-center">
      <input type="checkbox" class="checkbox me-2">
      <span class="title flex-grow-1 text-wrap">${todoItem.title}</span>
      <div class="ms-auto gap-1">
        <button class="btn btn-success edit">編集</button>
        <button class="btn btn-danger delete">削除</button>
      </div>
    </li>`;

    // completed の場合だけUIを調整
    if (todoItem.completed) {
      const checkbox = todoItemElement.querySelector(".checkbox");
      const titleSpan = todoItemElement.querySelector(".title");
      checkbox.checked = true;
      titleSpan.className = 'text-decoration-line-through';
      // titleSpan.innerHTML = `<s>${todoItem.title}</s>`;
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
      const modalBodyElement = document.getElementById('js-modal-body');
      modalBodyElement.innerHTML = `タスク: 「${todoItem.title}」を削除しますか？`;
      
      const bsModal = new bootstrap.Modal(modalElement);
      bsModal.show();
      
      const handleConfirmDelete = () => {
        onDeleteTodo({ id: todoItem.id });
        bsModal.hide();
        confirmButton.removeEventListener('click', handleConfirmDelete);
      };
      confirmButton.addEventListener('click', handleConfirmDelete);
    });
    // 編集ボタン
    const editButtonElement = todoItemElement.querySelector(".edit");
    editButtonElement.addEventListener("click", () => {
      // 編集モードUIを element テンプレートで作成
      const editElement = element`
      <form class="d-flex gap-2">
        <input type="text" class="form-control" value="${todoItem.title}">
        <input type="submit" class="btn btn-primary" value="保存">
      </form>`;
      // <button type="submit" class="btn btn-primary">保存</button>
    
      // li の中身を編集フォームに置き換える
      todoItemElement.innerHTML = "";
      todoItemElement.appendChild(editElement);
      
      // 保存イベント
      editElement.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        const input = editElement.querySelector("input");
        const newTitle = input.value.trim();
        if (newTitle.length > 0) {
          onEditTodo({ id: todoItem.id, title: newTitle });
        } else {
          onEditTodo({ id: todoItem.id, title: todoItem.title });
        }
      });
    });
    // // 編集
    // const editButtonElement = todoItemElement.querySelector('.edit');
    // editButtonElement.addEventListener('click', () => {
    //   // 編集モードUI
    //   const editElement = document.createElement('div');
    //   editElement.className = 'd-flex gap-2'
    //   const inputElement = document.createElement('input');
    //   inputElement.className = 'form-control';
    //   inputElement.value = todoItem.title;
    //   const saveButtonElement = document.createElement('input');
    //   saveButtonElement.type = 'submit'
    //   saveButtonElement.value = '保存';
    //   saveButtonElement.className = 'btn btn-primary ms-2';
    //   editElement.appendChild(inputElement);
    //   editElement.appendChild(saveButtonElement);

    //   // liをクリア
    //   todoItemElement.innerHTML = ''
    //   // 編集モードUIを挿入
    //   todoItemElement.appendChild(editElement);

    //   saveButtonElement.addEventListener('click', () => {
    //     const newTitle = inputElement.value;
    //     onEditTodo({ id: todoItem.id, title: newTitle});
    //   });
    // });

    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}
