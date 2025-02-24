import { loadTemplate } from "../../../utils/loadTemplate.js";

class forBidden extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.templateContent = "";
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/forbidden.html");
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML=this.templateContent;
  }
}
const forbidden = customElements.define('forbidden-page',forBidden);
export default forbidden;