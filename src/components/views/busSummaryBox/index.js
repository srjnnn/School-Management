import { loadTemplate } from "../../../utils/loadTemplate.js";

class busSummary extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.busSummaryContent = '';
  }
  async connectedCallBack(){
    this.busSummaryContent = await loadTemplate(
      "templates/busSummaryBox.html"
    );
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.busSummaryContent;
  }

}
const busSmmry = customElements.define("my-busSummary" , busSummary);
export default busSmmry;