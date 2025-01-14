import { loadTemplate } from "../../../utils/loadTemplate.js";

class busSummary extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.busSummaryContent = '';
  }
  async connectedCallback(){
    this.busSummaryContent = await loadTemplate(
      "templates/views/busSummaryBox.html"
    );
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.busSummaryContent;
  }

}
const busSmmry = customElements.define("my-bussummary" , busSummary);
export default busSmmry;