import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";


class verifyOtp extends HTMLElement{

  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent ="";
    this.payload = null;
    
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/views/verifyOtp.html");
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
    this.addEventListeners();
  }
  addEventListeners(){
    const otpInput = this.shadowRoot.getElementById('otp');
    const verifyButton = this.shadowRoot.getElementById('verify');
    const infoText = this.shadowRoot.getElementById('infoText');
  
    // Function to enable/disable the button based on OTP length
    otpInput.addEventListener('input', () => {
      const otpValue = otpInput.value;
      if (otpValue.length === 6) {
        verifyButton.disabled = false;
      } else {
        verifyButton.disabled = true;
      }
    });
  
    // Function to handle button click and OTP verification
    verifyButton.addEventListener('click', async () => {
      const otp = otpInput.value;
      if (otp.length === 6) {
        // Simulate OTP verification process
        infoText.textContent = "Verifying OTP... Please wait.";
        verifyButton.disabled = true;
        const  addFields = {};
        addFields.email = localStorage.getItem("passEmail");
        addFields.otp = otp;
        this.payload = addFields;
  
        // Simulate an API call for OTP verification
       apiRequest(apiRoutes.auth.verifyOtp, "POST", this.payload)
       .then(response =>{
        localStorage.removeItem("passEmail");
        localStorage.setItem("uuid", response.uuid);
        Common.addSuccessPopup(this.shadowRoot, "Successfully verified Otp");
        setTimeout(() => {
          // Go to the change password page
          const mainHost = this.getHost();
          mainHost.shadowRoot.querySelector('.app-container').replaceChildren();
          const newPassword = document.createElement("new-password");
          mainHost.shadowRoot.querySelector('.app-container').appendChild(newPassword);

        }, 4000);
       })
       .catch(error =>{
        Common.addErrorPopup(this.shadowRoot, error.message);
       })
      }
    });
  }

  getHost (){
    const shadowRoot = this.shadowRoot.getRootNode().host;
    const mainHost = shadowRoot.getRootNode().host;
    return mainHost;
  }

}
const validateOtp = customElements.define("validate-otp", verifyOtp);
export default validateOtp;