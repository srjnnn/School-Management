// import "../../elements/Button/index.js";

class DashboardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    // this.addCards();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          .dashboard {
            display: grid;
            grid-template-columns: 200px 1fr;
            height: 100vh;
            background-color: #e0e0e0;
          }
        </style>
        <div class="dashboard">
          <my-sidebar></my-sidebar>
          <div>
            <my-header></my-header>
            <my-main-content>
              
            </my-main-content>
            <custom-sidebar></custom-sidebar>             
          </div>
        </div>
      `;
  }

  addCards() {
    const mainContent = this.shadowRoot.querySelector("my-main-content");

    const card1 = document.createElement("my-card");
    card1.setAttribute("title", "Card 1");
    card1.setAttribute("content", "This is the content of card 1.");

    const card2 = document.createElement("my-card");
    card2.setAttribute("title", "Card 2");
    card2.setAttribute("content", "This is the content of card 2.");

    mainContent.addCard(card1);
    mainContent.addCard(card2);
  }
}

customElements.define("my-dashboard", DashboardComponent);
