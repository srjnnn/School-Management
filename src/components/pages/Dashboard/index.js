class DashboardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.dashboardPageContent = '';
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
            <my-list> </my-list>
              
            </my-main-content>
            <custom-sidebar></custom-sidebar>             
          </div>
        </div>
      `;
  }

}

const DashboardPageElement = customElements.define("my-dashboard", DashboardComponent);

export default DashboardPageElement;