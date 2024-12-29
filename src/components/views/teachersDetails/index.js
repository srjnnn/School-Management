import RestrictUser from "../../../services/restrictUser.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class teacherDetails extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = "";

  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("templates/views/TeachersdetailsTable.html");
    this.render();
    this.restrictUser();

  }
  // Provide the limited access to the students 
  restrictUser(){
    if(RestrictUser.IdentifyUserType()===true){
      // Logic to limit the access
      this.addButtonsEditButtons();
    }
  };

  // Render the main content 
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  // Add buttons at the end of the last templates
  addButtonsEditButtons(){
    const rows = this.shadowRoot.querySelectorAll("#teachersDetails tr");
    rows.forEach(row =>{
      const lastCell = row.querySelector('td:last-child');
      if(lastCell){
         const combinedButtons = document.createElement('combined-buttons');
         lastCell.appendChild(combinedButtons);
      }

    });
  };

}
const TeachersDetails = customElements.define("my-teachersdetails",teacherDetails);
export default TeachersDetails;