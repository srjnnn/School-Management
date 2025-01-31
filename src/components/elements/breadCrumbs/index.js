import { loadTemplate } from "../../../utils/loadTemplate.js";

class BreadCrumbs extends HTMLElement{
  constructor(){
    super();
    this.templateContent = "";
    this.attachShadow({mode : "open"});
    this.data = null;
  }
  set data(value){
    this._data = value;
  }
  get data(){
    return this._data;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("templates/elements/breadCrums.html");
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  addAddress(){
     alert("HEllo")
  }
}
const breadCrumbs = customElements.define("bread-crumbs", BreadCrumbs);
export default breadCrumbs;
