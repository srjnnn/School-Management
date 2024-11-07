import { loadTemplate } from "../../../utils/loadTemplate.js";

class TopNavbarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const templateContent = await loadTemplate(
      "templates/views/TopNavbar.html"
    );
    this.shadowRoot.innerHTML = templateContent;
  }
}

const TopNavbarElement = customElements.define(
  "top-navbar",
  TopNavbarComponent
);

export default TopNavbarElement;
