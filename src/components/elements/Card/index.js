import { loadTemplate } from "../../../utils/loadTemplate.js";

class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.cardComponentContent = "";
  }

  async connectedCallback() {
    this.cardComponentContent = await loadTemplate('templates/elements/notesCard.html');

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = this.cardComponentContent;
  }
}

const CardElement = customElements.define("my-card", CardComponent);

export default CardElement;
