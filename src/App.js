import "./components/pages/index.js";
import "./components/elements/index.js";
import AuthService from "./services/AuthService.js";
import Router from "./router.js";

class MyApp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.loadPage();
  }

  loadPage() {
    let page;
    const user = AuthService.isLoggedIn();

    if (user) {
      this.clearContainer();
      page = Router._routePages[Router._routes.HOMEPAGE];
    } else {
      page = Router._routePages[Router._routes.LOGIN];
    }
    const main = document.getElementById("main-app");
    const pageELement = document.createElement(page);
    main.appendChild(pageELement);
  }

  clearContainer() {
    const main = document.getElementById("main-app");
    main.innerHTML = "";
  }

  render() {
    this.innerHTML = `
        <main id="main-app" class="app-container">
        </main>
      `;
  }
}

const AppElement = customElements.define("my-app", MyApp);

export default AppElement;
