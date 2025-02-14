import { loadTemplate } from "../../../utils/loadTemplate.js";

class newPasswordPage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : "open"});
    this.templateContent = null;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/views/newPassword.html");
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
}
const NewPassword = customElements.define("new-password", newPasswordPage);
export default NewPassword;