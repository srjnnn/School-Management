import { loadTemplate } from "../../../utils/loadTemplate.js";

class successPopup extends HTMLElement{

  constructor(){
    super();
    this.attachShadow({mode : "open"});
    this.templateContent = "";
    this.data = null;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("templates/elements/SuccessPopup.html");
    this.render();
  }
 set data(value){
  this._data = value;
  this.updateContent();
 }

 get data(){
  return this._data;
 }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
    this.updateContent();
  }
  updateContent(){
    const text = this.shadowRoot.querySelector("#popupText");
    if (text) {
      text.textContent = this.data.success; // Update the text 
      // content safely
      console.log(this.data);
    }

  }

}
const SuccessPopup = customElements.define("success-popup",successPopup);
export default SuccessPopup;
