class LoginPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="login-container">
              This is the login page 
            </div>
        `;
  }
}

const LoginPageElement = customElements.define("login-page", LoginPage);

export default LoginPageElement;
