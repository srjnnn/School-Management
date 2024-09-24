class MainContainerComponent extends HTMLElement {
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
          .content {
            padding: 2rem;
            background-color: #fff;
          }
          .card-container {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }
        </style>
        <div class="content">
          <div class="card-container" id="card-container">
            <!-- Cards will be dynamically inserted here -->
          </div>
        </div>
      `;
  }

  addCard(cardComponent) {
    this.shadowRoot.getElementById("card-container").appendChild(cardComponent);
  }
}

customElements.define("my-main-content", MainContainerComponent);
