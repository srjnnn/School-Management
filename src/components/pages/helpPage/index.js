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
    const buttons = this.shadowRoot.querySelectorAll('.tab-button');
    console.log(buttons)
    Array.from(buttons).forEach(button => {
      button.addEventListener('click',()=>{
        // Add the class active to the clicked buttons
        this.shadowRoot.querySelectorAll('.tab-button.active').forEach(activeButtons =>{
          activeButtons.classList.remove('active');
        });
        button.classList.add('active')
      })
      
    });
   
  }
}
const helpPage = customElements.define("help-page",HelpPage);
export default helpPage;
