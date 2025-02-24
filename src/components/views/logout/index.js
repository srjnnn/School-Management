import { loadTemplate } from "../../../utils/loadTemplate.js";

class logOut extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    this.logOutContent ="";
  }
  async connectedCallback(){
    this.logOutContent= await loadTemplate(
      "../public/templates/views/logoutTemplate.html"
    )
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.logOutContent;
    this.addFunctions();
  }
  addFunctions(){
    const logOutYes = this.shadowRoot.querySelector('#lgYes');
    logOutYes.addEventListener('click' , () =>{
      localStorage.clear();
      window.location.reload();
    })
  }
}
const logout = customElements.define("my-logout" , logOut);
export default logout;