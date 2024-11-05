class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
               <my-sidebar></my-sidebar>

            <div class="main-container>
                This is the home page
            </div>
        `;
  }
}

const HomePageElement = customElements.define("home-page", HomePage);

export default HomePageElement;
