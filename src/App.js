import "./components/pages/index.js";
import "./components/elements/index.js";
import './components/views/index.js';
import AuthService from "./services/AuthService.js";
import Router from "./router.js";

class MyApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Using Shadow DOM
  }

  connectedCallback() {
    this.render();
    this.loadPage();
  }

  loadPage() {
    const user = AuthService.isLoggedIn();
    const page = user
      ? Router._routePages[Router._routes.HOMEPAGE]
      : Router._routePages[Router._routes.LOGIN];

    const main = this.shadowRoot.getElementById("main-app");
    const pageElement = document.createElement(page);
    main.appendChild(pageElement);
  }

  clearContainer() {
    const main = document.getElementById("main-app");
    main.innerHTML = "";
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
    :host {
            display: block; /* Allows the host element to behave like a block element */
            width: 100%;
            height: 100%;
        }
            
          .app-container {
          width: 100%;
          height: 100%;
          flex: 1;
          display: flex;
          overflow: hidden;
        }
    </style>
      <main id="main-app" class="app-container">
      </main>
    `;
  }
}

const AppElement = customElements.define("my-app", MyApp);

export default AppElement;
