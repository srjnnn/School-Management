import { loadTemplate } from "../../../utils/loadTemplate.js";

class combinedButtons extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = ""
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("templates/elements/combinedButtons.html");
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }

}
const CombinedButtons = customElements.define("combined-buttons",combinedButtons);
export default CombinedButtons;
