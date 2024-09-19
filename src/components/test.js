let myTemplate = document.createElement("template");
myTemplate.innerHTML = `
  <button>
    <slot name="icon"></slot>
    <span>Default text</span>
  </button>
`;

class CustomButton extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(myTemplate.content.cloneNode(true));

    this.button = this.shadowRoot.querySelector("button");
    this.handleClick = this.handleClick.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  get ariaPressed() {
    const value = this.button.getAttribute("aria-pressed");
    return value === "true";
  }

  set ariaPressed(value) {
    this.button.setAttribute("aria-pressed", value);
  }

  connectedCallback() {
    this.button.addEventListener("click", this.handleClick);
    if (this.hasAttribute("text")) this.updateText();
  }

  handleClick() {
    this.ariaPressed = !this.ariaPressed;
  }

  updateText() {
    let buttonSpan = this.button.querySelector("span");
    buttonSpan.innerText = this.getAttribute("text");
  }
}

window.customElements.define("custom-button", CustomButton);
