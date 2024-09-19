export default class BaseComponent extends HTMLElement {
    constructor() {
      super();
      if (this.template) {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = this.template;
      }
    }
  }
  