import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Settings');
  }

  async getHtml() {
    return `
      <h1>Настройки</h1>
      <p>
        Какие-нибудь настройки
      </p>
    `;
  }
}