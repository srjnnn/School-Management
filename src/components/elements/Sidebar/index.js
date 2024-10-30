class SidebarComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          nav {
            background-color: #f4f4f4;
            padding: 1rem;
            height: 100vh;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            margin: 1rem 0;
          }
          a {
            text-decoration: none;
            color: #333;
          }
        </style>
        <nav>
          <img src="/sources/amity-logo.svg" alt="School Logo">
               <ul>
                 <li><a href="#/dashboard">Dashboard</a></li>
                 <li><a href="#/reports">Reports</a></li>
                 <li><a href="#/settings">Settings</a></li>
               </ul>
        </nav>
      `;
    }
  }
  
  const SidebarElement = customElements.define('my-sidebar', SidebarComponent);
  
  export default SidebarElement;