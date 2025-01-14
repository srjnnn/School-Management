import RestrictUser from "../../../services/restrictUser.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class addNewTeachers extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.tempateContent = "";
  }

  async connectedCallback(){
    this.tempateContent = await loadTemplate("templates/views/addNewTeachersPage.html");
    this.render();
    this.addEventListeners();

  }
  render(){
    this.shadowRoot.innerHTML =  this.tempateContent;
  }
  // Add event listners 
  addEventListeners(){
    const SaveButton = this.shadowRoot.querySelector('#Save');
    const CancelButton = this.shadowRoot.querySelector('#cancel');

    // save Button on click ==== > collect all the data and form into object 





    // Cancel Button On click 
    CancelButton.addEventListener('click', ()=>{
      const inputs = this.shadowRoot.querySelectorAll('input');
      const selects = this.shadowRoot.querySelectorAll('select');
      inputs.forEach((input)=>{
        input.value = "";
      });
      selects.forEach((select)=>{
        select.selectedIndex = 0;
      })
    })
  }
}
const addNewTeachersPage = customElements.define('add-newteachers', addNewTeachers);
export default addNewTeachersPage;