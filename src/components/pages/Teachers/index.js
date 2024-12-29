import RestrictUser from "../../../services/restrictUser.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class teachersPage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = "";
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("templates/pages/teachers.html");
    this.render();
    this.restrictUser();
  }
  // Restrict user page 
  restrictUser(){
    if(RestrictUser.IdentifyUserType()===true){
      // add new page EventListner 
      this.addNewPage();

      

    }else{

    }
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
    this.addTable();
  };
  addTable(){
    const table = document.createElement('my-teachersdetails');
    const tableContainer = this.shadowRoot.querySelector(".tableContainer");
    tableContainer.appendChild(table);
  };
    // Add a new page button actions 
  addNewPage(){
      const addNewTeachers = this.shadowRoot.querySelector("#addNewTeachers");
      addNewTeachers.addEventListener('click',()=>{
        alert("running well")
      })
    };
}
const TeachersPage = customElements.define("my-teachers",teachersPage);
export default TeachersPage;