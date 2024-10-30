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

customElements.define("my-app", MyApp);
