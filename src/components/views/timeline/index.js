import { loadTemplate } from "../../../utils/loadTemplate.js";

class timeline extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.timelineContent = "";
  }
  async connectedCallback(){
    this.timelineContent = await loadTemplate(
      "../public/templates/views/timelineTemplate.html"
    );
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.timelineContent;
  }
}
const timeLine = customElements.define("my-timeline" , timeline);
export default timeLine;