import { loadTemplate } from "../../../utils/loadTemplate.js";

class forgotPassword extends HTMLElement{
  constructor(){
    super();
    this.templateContent = null;
    this.attachShadow({mode : "open"});
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/views/forgotPassword.html");
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
}
const ForgotPassword = customElements.define("forgot-password", forgotPassword);
export default ForgotPassword;