import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
  }

  async getHtml() {
    return `
      <h1>Домашняя страница</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Sunt ut nostrum dignissimos. Veniam aspernatur ducimus deleniti accusamus, 
        quasi exercitationem maiores sit! Nemo similique praesentium vero! 
        Beatae corrupti eveniet suscipit impedit.
      </p>
      <p>
        <a href="/posts" data-link>Посмотреть недавние посты</a>
      </p>
    `;
  }
}