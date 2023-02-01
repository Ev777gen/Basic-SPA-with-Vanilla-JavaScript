import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Posts View');
  }

  async getHtml() {
    console.log(this.params.id);
    return `
      <h1>Список постов</h1>
      <p>
        Здесь можно делать запросы на сервер за постами, используя this.params.id
      </p>
    `;
  }
}