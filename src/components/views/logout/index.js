import { loadTemplate } from "../../../utils/loadTemplate.js";

class logOut extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    this.logOutContent ="";
    this.noEvent = ()=>{};
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
    const logoutNo = this.shadowRoot.querySelector('#lgNo');
    logOutYes.addEventListener('click' , () =>{
      localStorage.clear();
      window.location.reload();
    })
    logoutNo.addEventListener('click', ()=>{
      this.noEvent();

    })
  }
}
const logout = customElements.define("my-logout" , logOut);
export default logout;