import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Posts');
  }

  async getHtml() {
    return `
      <h1>Список постов</h1>
      <p>
        Здесь могли бы быть ваши посты...
      </p>
    `;
  }
}