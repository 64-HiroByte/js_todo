import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
    #items;
    /**
     * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
     */
    constructor(items = []) {
        super();
        this.#items = items;
    }

    /**
     * TodoItemの合計個数を返す
     * @returns {number}
     */
    getTotalCount() {
        return this.#items.length;
    }

    /**
     * TodoItemの完了済みタスクの数を返す
     * @returns {number}
     */
    getCompletedCount() {
        let completedCount = 0;
        this.#items.forEach(item => {
            if (item.completed) {
                completedCount++;
            }
        });
        // console.log(completedCount);  // 出力確認用、PR提出前に削除する
        return completedCount;
    }

    /**
     * 表示できるTodoItemの配列を返す
     * @returns {TodoItemModel[]}
     */
    getTodoItems() {
        return this.#items;
    }

    /**
     * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
     * @param {Function} listener
     */
    onChange(listener) {
        this.addEventListener("change", listener);
    }

    /**
     * `onChange`で登録したリスナー関数を解除する
     * @param {Function} listener
     */
    offChange(listener) {
        this.removeEventListener("change", listener);
    }

    /**
     * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
     */
    emitChange() {
        this.emit("change");
    }

    /**
     * TodoItemを追加する
     * @param {TodoItemModel} todoItem
     */
    addTodo(todoItem) {
        // タイトルが空のものは追加しない
        if (todoItem.isEmptyTitle()) {
            return;
        }
        this.#items.push(todoItem);
        this.emitChange();
    }

    /**
     * 指定したidのTodoItemのcompletedを更新する
     * @param {{ id:number, completed: boolean }}
     */
    updateTodo({ id, completed }) {
        const todoItem = this.#items.find(todo => todo.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.completed = completed;
        this.emitChange();
    }

    /**
     * 指定したidのTodoItemを削除する
     * @param {{ id: number }}
     */
    deleteTodo({ id }) {
        // `id`に一致しないTodoItemだけを残すことで、`id`に一致するTodoItemを削除する
        this.#items = this.#items.filter(todo => {
            return todo.id !== id;
        });
        this.emitChange();
    }

    /**
     * 指定したTodoItemのtitleを編集する
     * @param {{ id:number, title: string }}
     */
    editTodo({ id, title }) {
        const todoItem = this.#items.find(todo => todo.id === id);
        if (!todoItem) {
            return;
        }
        // if (title.trim().length === 0) {
        if (title.trim().length !== 0) {
            // return;
            todoItem.title = title.trim();
        }
        // todoItem.title = title.trim();
        this.emitChange();
    }
}
