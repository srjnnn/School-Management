import "./components/testComponents/index.js";

class MyApp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    // Router.init();
  }

  render() {
    this.innerHTML = `
        <my-header></my-header>
        <div class="app-container">
          <my-sidebar></my-sidebar>
          <div id="main-content"></div>
        </div>
      `;
  }
}

const AppElement = customElements.define("my-app", MyApp);

export default AppElement;
