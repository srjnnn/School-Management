import { loadTemplate } from "../../../utils/loadTemplate.js";

class LoginPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = {
      email: "",
      password: ""
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate(
      "templates/pages/LoginpageTemplate.html"
    );
    this.render();
    this.addChildrenProps();
  }


  render() {
    this.shadowRoot.innerHTML = this.templateContent;
    console.log("From pages");
    const loginData = document.createElement('my-loginform');
    const spaceContainer = this.shadowRoot.querySelector('.spaceContainer');
    spaceContainer.appendChild(loginData);
  }

  handleEmailChange(value) {
    if (!value) return;
    this.state.email = value;
    console.log("state  updated", this.state);
  }
  handlePassChange(value){
    if(!value) return;
    this.state.password = value;
    console.log("state updated" , this.state);

  }

  handleLogin() {
    AuthController.login({email: this.state.email, password: this.state.password});
  }

  addChildrenProps() {
    const loginForm = this.shadowRoot.querySelector("my-loginform");
    loginForm.addProps(
      {
        onEmailChange: this.handleEmailChange,
        onPassChange : this.handlePassChange,
      }
    );
  }
}

const LoginPageElement = customElements.define("login-page", LoginPage);

export default LoginPageElement;
