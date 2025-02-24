import { loadTemplate } from "../../../utils/loadTemplate.js";

class editButtons extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = ""
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/elements/editButton.html");
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  
}
const EditButtons = customElements.define("edit-buttons",editButtons);
export default EditButtons;
