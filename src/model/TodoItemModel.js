// ユニークなIDを管理する変数
let todoIdx = 0;

export class TodoItemModel {
  /** @type {number} TodoアイテムのID */
  id;
  /** @type {string} Todoアイテムのタイトル */
  title;
  /** @type {boolean} Todoアイテムが完了済みならばtrue、そうでない場合はfalse */
  completed;
  /**
   * @param {{ title: string, completed: boolean }}
   */
  constructor({ title, completed }) {
    // idは連番となり、それぞれのインスタンス毎に異なるものとする
    this.id = todoIdx++;
    this.title = title;
    this.completed = completed;
  }

  /**
   * タイトルが空文字列の場合にtrueを返す
   * @returns {boolean}
   */
  isEmptyTitle() {
    let title;
    title = this.title.trim();  // 前後のスペースを削除する
    return title.length === 0;
    // return this.title.length === 0;
  }
}
