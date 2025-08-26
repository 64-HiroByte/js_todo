import { element } from "./html-util.js";

export class TodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem 表示対象のTodoアイテム
   * @param {function({id:number, completed:boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @param {Function({id:number, title:string})} onEditTodo タスクの編集イベントリスナー
   * @returns {Element} Todoアイテムの <li> 要素
   */
  createElement(todoItem, { onUpdateTodo, onDeleteTodo, onEditTodo }) {
    // Todoアイテムのベースを作成（1行分）
    const todoItemElement = element`
      <li class="list-group-item">
        <div class="row align-items-center">
          <div class="col-auto">
            <input type="checkbox" class="checkbox">
          </div>
          <div class="col text-wrap text-break">
            <span class="title">${todoItem.title}</span>
          </div>
          <div class="col-auto d-flex gap-1">
            <button class="btn btn-success edit">編集</button>
            <button class="btn btn-danger delete">削除</button>
          </div>
        </div>
      </li>
    `;

    // completed=true の場合、UIに反映（チェック済み、取り消し線を追加）
    if (todoItem.completed) {
      const checkbox = todoItemElement.querySelector(".checkbox");
      const titleSpan = todoItemElement.querySelector(".title");
      checkbox.checked = true;
      titleSpan.className = 'text-decoration-line-through';
    }

    // --- チェックボックス更新イベント ---
    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      // モデル更新のコールバック呼び出し
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });

    
    // --- 編集ボタンイベント ---
    const editButtonElement = todoItemElement.querySelector(".edit");
    editButtonElement.addEventListener("click", () => {
      // 編集用UIを作成
      const editElement = element`
      <form class="d-flex w-100 gap-2">
        <input type="text" class="form-control" value="${todoItem.title}">
        <input type="submit" class="btn btn-primary" value="保存">
      </form>
      `;
      
      // li の中身を編集フォームに置換
      todoItemElement.innerHTML = "";
      todoItemElement.appendChild(editElement);

      // 編集中は編集対象外のアイテムのボタンを無効化する
      document.querySelectorAll('.edit, .delete').forEach(btn => {
        btn.disabled = true;
      });
      editButtonElement.disabled = false;
      
      // フォーム送信（保存処理）
      editElement.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        const input = editElement.querySelector("input");
        const newTitle = input.value.trim();

        // 空文字の場合は、編集前のタスク（title）に戻す
        if (newTitle.length > 0) {
          onEditTodo({ id: todoItem.id, title: newTitle });
        } else {
          onEditTodo({ id: todoItem.id, title: todoItem.title });
        }
      });
    });

    // --- 削除ボタンイベント ---
    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      // Bootstrapのモーダルを使用
      const modalElement = document.getElementById('deleteConfirmModal');
      const confirmButton = document.getElementById('confirmDeleteBtn');
      const modalBodyElement = document.getElementById('js-modal-body');

      // モーダルの本文に削除対象のタスク（title）を埋め込む
      modalBodyElement.innerHTML = `タスク: 「${todoItem.title}」を削除しますか？`;

      // モーダルを表示
      const bsModal = new bootstrap.Modal(modalElement);
      bsModal.show();

      // ボタンクリック時の処理
      const handleConfirmDelete = () => {
        onDeleteTodo({ id: todoItem.id });
        bsModal.hide();
        // 二重登録を防ぐためにリスナーを解除
        confirmButton.removeEventListener('click', handleConfirmDelete);
      };
      confirmButton.addEventListener('click', handleConfirmDelete);
    });

    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}
