import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class newPasswordPage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : "open"});
    this.templateContent = null;
    this.payload = null;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/views/newPassword.html");
    this.render();
    this.addEventListeners();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  addEventListeners(){
    const saveButton = this.shadowRoot.querySelector('#saveBtn');
    const newPass = this.shadowRoot.querySelector('#newPass');
    const reNewPass  = this.shadowRoot.querySelector('#confirmPass');
    const inputFields = this.shadowRoot.querySelectorAll('input');
  
    // Initially disable the save button
    saveButton.disabled = true;
  
    inputFields.forEach(input => {
      input.addEventListener('input', ()=>{ // Use 'input' event for real-time validation
        if(newPass.value !==""  && reNewPass.value !== "" && newPass.value === reNewPass.value){
          saveButton.disabled = false;
        } else {
          saveButton.disabled = true;
        }
      });
    });

    saveButton.addEventListener('click', ()=>{
      const addFields = {}
      addFields.uuid = localStorage.getItem("uuid");
      addFields.newPassword = newPass.value;
      this.payload =addFields;
      
      apiRequest(apiRoutes.auth.resetPass, "POST", this.payload)
      .then(response =>{
        localStorage.removeItem("uuid");
        Common.addSuccessPopup(this.shadowRoot, "Successfylly reset Password");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(error =>{
        console.error("Error")
        Common.addErrorPopup(this.shadowRoot, error.message);
      })
    })
  }
  
}
const NewPassword = customElements.define("new-password", newPasswordPage);
export default NewPassword;