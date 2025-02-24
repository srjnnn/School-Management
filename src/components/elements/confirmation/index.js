import { loadTemplate } from "../../../utils/loadTemplate.js";

class confirmation extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : "open"});
    this.templateContent = "";
     this.cancelEvent = () => {};
     this.deleteEvent = () => {};
  }
  async connectedCallback(){
       this.templateContent = await loadTemplate("../public/templates/elements/confirmation.html");
       this.render();
       this.addEventListeners();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  addEventListeners(){
    const cancelButton = this.shadowRoot.querySelector("#cancelButton");
    const deleteButton = this.shadowRoot.querySelector("#deleteButton");

    cancelButton.addEventListener('click', ()=>{
      this.cancelEvent();
    
      // or call the disconnected callback
    });

    deleteButton.addEventListener('click', ()=>{
      this.deleteEvent();

      // Logic after clicking the delete button
    })
  }
}
const Confirmation = customElements.define('confirmation-box', confirmation);
export default Confirmation;