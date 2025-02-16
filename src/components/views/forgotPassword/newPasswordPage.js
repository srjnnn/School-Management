import { loadTemplate } from "../../../utils/loadTemplate.js";

class newPasswordPage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : "open"});
    this.templateContent = null;
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
    const email = this.shadowRoot.querySelector('#email');
    const confirmField  = this.shadowRoot.querySelector('#confirmPassword');
    const inputFields = this.shadowRoot.querySelectorAll('input');
  
    // Initially disable the save button
    saveButton.disabled = true;
  
    inputFields.forEach(input => {
      input.addEventListener('input', ()=>{ // Use 'input' event for real-time validation
        if(email.value !==""  && newField.value !== "" && confirmField.value !== ""){
          saveButton.disabled = false;
        } else {
          saveButton.disabled = true;
        }
      });
    });
  }
  
}
const NewPassword = customElements.define("new-password", newPasswordPage);
export default NewPassword;