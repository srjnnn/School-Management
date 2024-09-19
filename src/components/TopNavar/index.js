class TopNavbarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          header {
            background-color: #0073e6;
            color: white;
            padding: 1rem;
            text-align: center;
            font-size: 1.5rem;
          }
        </style>
        <header>
          My Dashboard
        </header>
      `;
  }
}

customElements.define("my-header", TopNavbarComponent);
