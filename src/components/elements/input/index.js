class InputComponent extends HTMLElement {
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
          .inpt input{
              border: 1px solid rgba(207, 226, 255, 1);
              width: Fixed (185px)px;
              height: Fixed (33px)px;
              padding: 10px 16px 10px 16px;
              gap: 10px;
              border: 1px 0px 0px 0px;
              opacity: 0px;

          
          }
        </style>
        <div class="inpt">
            <input type = 'text' placeholder = "Input Fields"></input>
        </div>
      `;
    }
  }
  
  customElements.define('my-input', InputComponent);
  