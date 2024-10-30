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
          <my-button></my-button>
          <my-input></my-input>
          <bus-summary></bus-summary>
        </div>
        
      `;
  }
}

customElements.define("my-app", MyApp);
