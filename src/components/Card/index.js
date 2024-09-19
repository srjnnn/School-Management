class CardComponent extends HTMLElement {
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
          .card {
            padding: 1rem;
            background-color: #0073e6;
            color: white;
            border-radius: 8px;
            flex: 1;
            min-width: 200px;
          }
          .card h3 {
            margin: 0 0 1rem;
            font-size: 1.25rem;
          }
        </style>
        <div class="card">
          <h3>${this.getAttribute('title')}</h3>
          <p>${this.getAttribute('content')}</p>
        </div>
      `;
    }
  }
  
  customElements.define('my-card', CardComponent);
  