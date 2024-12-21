import { loadTemplate } from "../../../utils/loadTemplate.js";

class classDetails extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = "";
  }

  async connectedCallback(){
    this.templateContent = await loadTemplate('templates/views/classDetails.html');
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
}
const classdetails = customElements.define('my-classdetails',classDetails);
export default classdetails;