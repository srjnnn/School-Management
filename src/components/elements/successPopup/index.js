import { loadTemplate } from "../../../utils/loadTemplate.js";

class successPopup extends HTMLElement{

  constructor(){
    super();
    this.attachShadow({mode : "open"});
    this.templateContent = "";
  }
  static get observedAttributes() {
    return ['data-message'];
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("templates/elements/SuccessPopup.html");
    this.render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-message') {
      this.changeData();
    }
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  changeData(){
    const message = this.getAttribute('data-message');
    const text = this.shadowRoot.querySelector("#popupText");
    if (text) {
      text.textContent = message; // Update the text content safely
    }

  }

}
const SuccessPopup = customElements.define("success-popup",successPopup);
export default SuccessPopup;
