import { apiRoutes } from "../../../globalConstants.js";
import AuthService from "../../../services/AuthService.js";
import LoadPage from "../../../services/loadPages.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";
class LoginformComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.LoginTemplateContent = "";
        this.payLoad = null;
        this.data = null
    }

    async connectedCallback() {
        this.LoginTemplateContent = await loadTemplate(
            "../public/templates/views/LoginForm.html"
        );
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = this.LoginTemplateContent;

    }

    // Add eventListners
    addEventListeners(){
        const userName = this.shadowRoot.querySelector('#Username');
        const password = this.shadowRoot.querySelector('#Password');
        const button = this.shadowRoot.querySelector('#login');
        const forgotPasswordButton = this.shadowRoot.querySelector('#forgot-password');
        forgotPasswordButton.addEventListener('click',()=>{
            this.loadPageWrap("forgot-password", "Forgot-password");
        })
        button.addEventListener('click',()=>{
          const  userNameval = userName.value;
          const  passval = password.value;
          const addFields = {};
         
          if(userNameval === "" || passval === ""){
            Common.addErrorPopup(this.shadowRoot, "Fields cannot be empty");
            return;
          }
         addFields.password = passval;
         addFields.email = userNameval;
         this.payLoad = addFields;

        
        apiRequest(apiRoutes.auth.login, "POST", this.payLoad)
        .then(response =>{
            this.data = response;
            if(response.status === 200){
                Common.addSuccessPopup(this.shadowRoot, "Success");
                setTimeout(() => {
                this.saveToken(response);
                }, 1000);

            }
        })
        .catch(error =>{
            if(error.status === 401){
                Common.addErrorPopup(this.shadowRoot, "Wrong authentication Credientials");
            }
        })
        })
    }
    saveToken(response){
        // check if the user has ticked the remember button or not ??
        const rememberButton = this.shadowRoot.querySelector('#rememberMe');
        if(rememberButton.checked){
            // Store the access token in local storage
            AuthService.saveToken(response.access_token);
            localStorage.setItem("authResponse",JSON.stringify(response) );
            window.location.reload();
        }else{
            if(response.refresh_token){
            sessionStorage.setItem("refresh_token", response.refresh_token)
            }
            window.location.reload();
        }
    }
          // Storing the common method 
          loadPageWrap(customElementsName,path){
            // console.log(this.shadowRoot)
            var hostElement = Common.getHostElem(this.shadowRoot.getRootNode().host);
            console.log(hostElement)
            const mainContainer = hostElement.shadowRoot.querySelector('#main-app');
            if(mainContainer.children.length > 0){
                mainContainer.replaceChildren();
                const page = document.createElement('forgot-password');
                mainContainer.appendChild(page);
            }
            window.history.pushState({},"",path);
        }
}

const Lgnform = customElements.define("my-loginform", LoginformComponent);
export default Lgnform;
