import { loadTemplate } from "../../../utils/loadTemplate.js";

class addClassNotes extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : 'open'});
    this.templateContent = ""
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate(
      "templates/views/addNotes.html"
    );
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
}
const addclassNotes = customElements.define('add-notes', addClassNotes);
export default addclassNotes;