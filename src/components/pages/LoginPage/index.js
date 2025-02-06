import AuthService from "../../../services/AuthService.js";
import appState from "../../../utils/appState.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";
class LoginPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = {
      email: "",
      password: ""
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleButtonActivity = this.handleButtonActivity.bind(this);
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate(
      "../public/templates/pages/LoginpageTemplate.html"
    );
    this.render();
    this.addChildrenProps();
  }


  render() {
    this.shadowRoot.innerHTML = this.templateContent;
    const loginData = document.createElement('my-loginform');
    const spaceContainer = this.shadowRoot.querySelector('.spaceContainer');
    spaceContainer.appendChild(loginData);
  }

  handleEmailChange(value) {
    if (!value) return;
    this.state.email = value;
    // console.log("state  updated", this.state.email);
  }
  handlePassChange(value){
    if(!value) return;
    this.state.password = value;
    // console.log("state updated" , this.state.password);
;
  }
  
  handleButtonActivity(){
    // console.log("Button clicked, handleButtonActivity called"); 

    // console.log(this.state);

    // if(!button) return;
    if (this.state.email === null && this.state.password === null){
      console.warn("email field cannot be empty");
    }
    else{
      this.handleLogin(this.state.email, this.state.password);
    }
  };


  
// dummy login logic
  handleLogin(email , pass) {
   
      if(email === "admin" && pass === "admin"){
        AuthService.saveToken("admin");
        appState.setUserType("super");
        window.location.reload();
  
      }
        else if(email === "admin" && pass === "123"){
          AuthService.saveToken("Student");
          appState.setUserType("norm")
          window.location.reload();
      }
  };

  addChildrenProps() {
    const loginForm = this.shadowRoot.querySelector("my-loginform");
    loginForm.addProps(
      {
        onEmailChange: this.handleEmailChange,
        onPassChange : this.handlePassChange,
        onButtonChange : this.handleButtonActivity,
      }
    );
  }
}

const LoginPageElement = customElements.define("login-page", LoginPage);

export default LoginPageElement;
