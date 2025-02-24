import { apiRoutes } from "../../../globalConstants.js";
import LoadPage from "../../../services/loadPages.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class changePassword extends HTMLElement{
  constructor(){
    super();
    this.templateContent = null;
    this.attachShadow({mode : "open"});
    this.payload = null;

  }

  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/views/changePassword.html");
    this.render();
    this.addEventListeners();
    this.addGoBackButton();
  }

  getAuthResponse(){
    return JSON.parse(localStorage.getItem("authResponse"));
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  // Event Listners
  addEventListeners(){
    // adding the event listner whent the user clicks the change password button
    const userName = this.shadowRoot.querySelector('#userName');
    const currentPassword = this.shadowRoot.querySelector('#old-pass');
    const newPassword = this.shadowRoot.querySelector('#new-pass');
    const retypePassword = this.shadowRoot.querySelector('#re-new');
    const changePasswordButton = this.shadowRoot.querySelector('#changeButton');
    
    const inputfields = this.shadowRoot.querySelectorAll('input');
    Array.from(inputfields).forEach(input => {
      input.addEventListener('input', () => {
        if (
          currentPassword.value.trim() !== "" && 
          newPassword.value.trim() !== "" && 
          userName.value.trim() !== "" &&
          newPassword.value === retypePassword.value
        ) {
          changePasswordButton.disabled = false;
        } else {
          changePasswordButton.disabled = true;
        }
      });
    });
    
  // add the 
    changePasswordButton.addEventListener('click', ()=>{
       const addfields = {};
       addfields.userName = userName.value;
       addfields.currentPassword = currentPassword.value;
       addfields.newPassword = newPassword.value;
       this.payload = addfields;
      //  Call the change password api 
      this.reqchangePassword();
      
    })
  }
      // Storing the common method 
      loadPageWrap(customElementsName,path){
        var hostElement = Common.getHostElem(this.shadowRoot);
        LoadPage.renderPages(customElementsName,hostElement);
        LoadPage.changeHeaderRoutes(hostElement,path);
        window.history.pushState({},"",path);
    }
    // request to change the password
    reqchangePassword(){
      apiRequest(apiRoutes.auth.changePassword, "POST", this.payload)
      .then(response =>{
        if(response.status === 200){
        Common.addSuccessPopup(this.shadowRoot,"Successfully updated Password");
        }
      })
      .catch(error =>{
        console.error(error);
        if(error.status === 401){
          Common.addErrorPopup(this.shadowRoot, "Wrong password");
        }else{
          Common.addErrorPopup(this.shadowRoot, "Unexpected error occured");
        }

      })
    }
    addGoBackButton(){
      const gobackButton = document.createElement("go-back");
      const hostElem = Common.getHostElem(this.shadowRoot);
      const backButtonContainer = hostElem.shadowRoot.querySelector ("#backButtonContainer");
      backButtonContainer.innerHTML = ""
      if(backButtonContainer){
        backButtonContainer.appendChild(gobackButton);
        gobackButton.data = {
          elem : "settings-page",
          header : "SETTING"
        }
      };
    }
    
}

const ChangePassword = customElements.define("change-password", changePassword);
export default ChangePassword;
