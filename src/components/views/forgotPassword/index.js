import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class forgotPassword extends HTMLElement{
  constructor(){
    super();
    this.templateContent = null;
    this.attachShadow({mode : "open"});
    this.payload =null;
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
      
      const addFields = {};
      addFields.email = userNameField.value;
      this.payload = addFields;
      this.requestPasswordReset(userNameField);
    });
 

}

requestPasswordReset(userNameField){
  apiRequest(apiRoutes.auth.resetEmail, "POST", this.payload)
  .then(response =>{
    this.shadowRoot.querySelector('#infoText').innerHTML = 
      `Verification code has been sent to the email ,<strong> ${userNameField.value}!</strong>`;
    localStorage.setItem("passEmail",userNameField.value);
    setTimeout(() => {
      const mainHost = this.getHost();
      mainHost.shadowRoot.querySelector('.app-container').replaceChildren();
      const validateOtpPage = document.createElement("validate-otp");
      mainHost.shadowRoot.querySelector('.app-container').appendChild(validateOtpPage);
    }, 4000);
  })
  .catch(error =>{
    console.error(error)
    Common.addErrorPopup(this.shadowRoot, error.message);
  })
}
getHost (){
  const shadowRoot = this.shadowRoot.getRootNode().host;
  const mainHost = shadowRoot.getRootNode().host;
  return mainHost;
}

}


const ForgotPassword = customElements.define("forgot-password", forgotPassword);
export default ForgotPassword;