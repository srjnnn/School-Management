import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class combinedButtons extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = ""
    this.userType = null
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("templates/elements/combinedButtons.html");
    this.render();
    this.addEventListners();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  addEventListners(){
    const editButton = this.shadowRoot.querySelector('#edit');
    const deleteButton = this.shadowRoot.querySelector("#delete");
     
    editButton.addEventListener('click',(event)=>{
      event.stopPropagation();//to prevent the bubbling 
      
    });

    deleteButton.addEventListener('click',(event)=>{
      event.stopPropagation(); //to prevent the bubbling
      this.deleteUser(1);
    })
  }

  // Append the are you sure Popup 




  // Delete the student/Teacher data
  deleteUser(id){
      apiRequest(apiRoutes.students.deleteStudentData, "DELETE")
      .then((response)=>{
        console.log("Student Deleted Successfully", response)
      })
      .catch((error)=>{
        console.error("Error deleting Student : ",error)
      })
     
  }

}
const CombinedButtons = customElements.define("combined-buttons",combinedButtons);
export default CombinedButtons;
