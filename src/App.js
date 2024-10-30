import "./components/testComponents/index.js";
import "./components/pages/index.js";
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
    const page = Router.getMainPage();
console.log('page', page);
    const user = AuthService.isLoggedIn();
    this.clearContainer();
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
