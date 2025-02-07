import AuthService from "../../../services/AuthService.js";
import appState from "../../../utils/appState.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";
class LoginPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate(
      "../public/templates/pages/LoginpageTemplate.html"
    );
    this.render();
  }


  render() {
    this.shadowRoot.innerHTML = this.templateContent;
    const loginData = document.createElement('my-loginform');
    const spaceContainer = this.shadowRoot.querySelector('.spaceContainer');
    spaceContainer.appendChild(loginData);
  }

  

  


}

const LoginPageElement = customElements.define("login-page", LoginPage);

export default LoginPageElement;
