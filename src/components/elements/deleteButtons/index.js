import { loadTemplate } from "../../../utils/loadTemplate.js";

class deleteButtons extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = ""
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/elements/deleteButton.html");
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  
}
const DeleteButtons = customElements.define("delete-buttons",deleteButtons);
export default DeleteButtons;
