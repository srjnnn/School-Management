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
  }
  render(){
    this.shadowRoot.innerHTML =  this.tempateContent;
  }
}
const addNewTeachersPage = customElements.define('add-newteachers', addNewTeachers);
export default addNewTeachersPage;