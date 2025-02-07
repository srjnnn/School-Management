import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
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

        button.addEventListener('click',()=>{
          const  userNameval = userName.value;
          const  passval = password.value;
          const addFields = {};
         
          if(userNameval === "" || passval === ""){
            alert("Fields cannot be empty");
          }
         addFields.password = passval;
         addFields.email = userNameval;
         this.payLoad = addFields;

        
        apiRequest(apiRoutes.auth.login, "POST", this.payLoad)
        .then(response =>{
            console.log(response);
            this.data = response;
        })
        .catch(error =>{
            console.log(error);
        })


        })
    }
}

const Lgnform = customElements.define("my-loginform", LoginformComponent);
export default Lgnform;
