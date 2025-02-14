import { loadTemplate } from "../../../utils/loadTemplate.js";

class verifyOtp extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : "open"})
    this.templateContent = null;
    this.payload = null;
  }

  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/views/verifyOTP.html");
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  addEventListeners(){
    const verifyButton = this.shadowRoot.querySelector('#verifyBtn');
    verifyButton.addEventListener('click', ()=>{
      
    })
  }
}
const verifyByOTP = customElements.define("otp-verify", verifyOtp);
export default verifyByOTP;