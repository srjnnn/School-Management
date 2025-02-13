import LoadPage from "../../../services/loadPages.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class Settings extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    this.templateContent = null;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/pages/settingsPage.html");
    this.render();
    this.addEventListeners();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  // add event listners to the two actions buttons
  addEventListeners(){

    const anchors = this.shadowRoot.querySelector('.anchors');
    anchors.addEventListener('click', (event)=>{
           if(event.target.matches('#forgot')){
              this.loadPageWrap("forgot-password", "Forgot-password")


          }else if (event.target.matches('#change')){
            this.loadPageWrap("change-password","Change-password")
           }
    })


  }
    // Storing the common method 
    loadPageWrap(customElementsName,path){
      var hostElement = Common.getHostElem(this.shadowRoot);
      LoadPage.renderPages(customElementsName,hostElement);
      LoadPage.changeHeaderRoutes(hostElement,path);
      window.history.pushState({},"",path);
  }

}
const settingsPage = customElements.define('settings-page',Settings);
export default settingsPage;