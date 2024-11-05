class ButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const templateContent = await this.loadTemplate(
      "templates/ButtonTemplate.html"
    );
    this.shadowRoot.appendChild(templateContent);

    //   this.render();
  }

  async loadTemplate(url) {
    const response = await fetch(url);
    const templateText = await response.text();

    const templateElement = document.createElement("template");
    templateElement.innerHTML = templateText;

    return templateElement.content.cloneNode(true);
  }
}

const ButtonElement = customElements.define("my-button", ButtonComponent);

export default ButtonElement;
