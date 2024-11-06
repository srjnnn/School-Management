class ButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ['label'];
  }

  async connectedCallback() {
    const templateContent = await this.loadTemplate('templates/ButtonTemplate.html');
    this.shadowRoot.appendChild(templateContent);

    // Set the initial label if provided
    if (this.hasAttribute('label')) {
      this.updateLabel(this.getAttribute('label'));
    }
  }

  async loadTemplate(url) {
    const response = await fetch(url);
    const templateText = await response.text();

    const templateElement = document.createElement('template');
    templateElement.innerHTML = templateText;

    return templateElement.content.cloneNode(true);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'label') {
      this.updateLabel(newValue);
    }
  }

  updateLabel(text) {
    const slotElement = this.shadowRoot.querySelector('slot');
    if (slotElement) {
      slotElement.textContent = text;
    }
  }
}

customElements.define("my-button", ButtonComponent);
