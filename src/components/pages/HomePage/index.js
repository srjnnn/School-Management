class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="login-container>
                This is the home page
            </div>
        `;
  }
}

const HomePageElement = customElements.define("home-page", HomePage);

export default HomePageElement;
