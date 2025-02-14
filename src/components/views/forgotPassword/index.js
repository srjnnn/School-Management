import LoadPage from "../../../services/loadPages.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class forgotPassword extends HTMLElement{
  constructor(){
    super();
    this.templateContent = null;
    this.attachShadow({mode : "open"});
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/views/forgotPassword.html");
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
    this.addEventListeners();
  }
  addEventListeners(){
    const requestButton = this.shadowRoot.querySelector('#request');
    const userNameField = this.shadowRoot.querySelector('#email');
    
    userNameField.addEventListener('input', ()=>{
      if(userNameField.validity.valid && userNameField.value !== ""){
        requestButton.disabled = false;
      } else {
        requestButton.disabled = true;
      }
    });

    requestButton.addEventListener('click', ()=>{
      this.shadowRoot.querySelector('#infoText').textContent = 
      `Verification code has been sent to the email , ${userNameField.value}!`;
      this.loadPageWrap("otp-verify","verifyOTP");
      
    });


}
loadPageWrap(customElementsName,path){
  // console.log(this.shadowRoot)
   const hostElem = this.shadowRoot.getRootNode().host;
   const superHostElem = hostElem.getRootNode().host;
  const mainContainer = superHostElem.shadowRoot.querySelector('#main-app');
  console.log(mainContainer)
  if(mainContainer.children.length > 0){
      mainContainer.replaceChildren();
      const page = document.createElement(customElementsName);
      mainContainer.appendChild(page);
  }
  window.history.pushState({},"",path);
}
}

const ForgotPassword = customElements.define("forgot-password", forgotPassword);
export default ForgotPassword;