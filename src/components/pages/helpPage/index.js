import { loadTemplate } from "../../../utils/loadTemplate.js";

class HelpPage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : "open"});
    this.templateContent = "";
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/pages/helpPage.html");
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
    this.addEventListeners();
  }
  addEventListeners(){
    const buttons = this.shadowRoot.querySelectorAll('.menu-button');
    Array.from(buttons).forEach(button => {
      button.addEventListener('click',()=>{
        // Add the class active to the clicked buttons
        this.shadowRoot.querySelectorAll('.menu-button.active').forEach(activeButtons =>{
          activeButtons.classList.remove('active');
        });
        button.classList.add('active');
        const buttonId = button.id;
        this.changePage(buttonId);
      })
      
    });
   
  }
  async changePage(buttonID){
     switch(buttonID){
      case "faqs" :
        this.clearContent();
        this.templateContent = await loadTemplate("../public/templates/views/help-page-faqs.html");
        this.changeContent();
        break;
      case "feedback" : 
         this.clearContent();
         this.templateContent = await loadTemplate("../public/templates/views/help-page-feedback.html");
         this.changeContent();
        //  const feedbackPage = this.shadowRoot.querySelector("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaa")
         break;
      case "customer":
        this.connectedCallback();
        break;
     }
     
  }
  clearContent(){
     this.templateContent = ""
  }
  changeContent(){
    const mainContainer = this.shadowRoot.querySelector('.contents-container');
    mainContainer.innerHTML = "";
    mainContainer.innerHTML = this.templateContent;
  }
}
const helpPage = customElements.define("help-page",HelpPage);
export default helpPage;
