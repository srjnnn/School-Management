import { apiRoutes } from "../../../globalConstants.js";
import LoadPage from "../../../services/loadPages.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class teachersPage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = "";
    this.teachersData = null;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/pages/teachers.html");
    this.render();
    this.getTeachersData();
// get the user type .....

  }
  // get the tachers data
  getTeachersData(classId , section){
    apiRequest(apiRoutes.teachers.getAllTeachersData, "GET")
    .then((teachersData)=>{
    this.teachersData = teachersData && teachersData.data;
    this.addTable();
    const user = sessionStorage.getItem("User");

    if(user === "admin"){
       this.addEditButtons();
       const header = this.shadowRoot.querySelector(".headers");
       header.classList.remove('hidden');
       this.addNewPage();
    }
    Common.detailsClick(this.shadowRoot,this.teachersData, "teachersDetails");
    })
  }

   // Add eventlistners and all
   addEditButtons(){
    const rows = this.shadowRoot.querySelectorAll("#teachersDetails tr");
    rows.forEach(row =>{
      const lastCell = row.querySelector('td:last-child');
      if(lastCell){
        const editButton = document.createElement('edit-buttons');
        const deleteButton = document.createElement('delete-buttons');

        deleteButton.addEventListener('click',()=>{
           //  summon a  confirmation popup 
           const div = document.createElement('div');
           const box = document.createElement('confirmation-box');
           div.className = "absoluteDiv"
           div.appendChild(box);
           // Now append the div in the main html
           this.shadowRoot.appendChild(div);

           box.cancelEvent = ()=>{
             div.remove();
           }
       // When the delete button is clicked 
           box.deleteEvent = ()=>{
             const data = {}
             const teacherId = row.dataset.id;
             data.id = teacherId;
             apiRequest(apiRoutes.teachers.deleteTeachersData,"DELETE",data)
             .then((response)=>{
               Common.addSuccessPopup(this.shadowRoot, "Deletion of teacher was Successful")
               div.remove();
             })
             .catch((error)=>{
               console.error(error);
               div.remove();
             })
        };

      });
      // EventListner to the edit div 
      editButton.addEventListener('click',()=>{
        this.editTeachers(row);
      })
     
        const buttonDiv = document.createElement('div');
        buttonDiv.style.display = "flex"
        buttonDiv.style.gap = "1rem"
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);
        lastCell.appendChild(buttonDiv);
      

      }
    });
    
  }

  changeClass(){
    const Classselector = this.shadowRoot.querySelector('#classSelector');
    const sectionSelector = this.shadowRoot.querySelector('#sectionSelector');
    sectionSelector.disabled = true;
    Classselector.addEventListener('change', ()=>{
    sectionSelector.disabled = (Classselector.value === "null");
    if(sectionSelector.value !== "null"){
      this.getStudentsData(Classselector.value, sectionSelector.value);
      this.clearTable();
    }
    })
    sectionSelector.addEventListener('change', ()=>{
      if(sectionSelector.value !== "null"){
        this.clearTable();
        this.getStudentsData(Classselector.value,sectionSelector.value);
      }
    })
  }


  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  };
  addTable(){

    const table = this.shadowRoot.querySelector("#teachersDetails");
     this.teachersData.forEach(data => {
      const row = document.createElement('tr');
      row.dataset.id = data.id;
      row.innerHTML = `
      <tr>
        <td> ${data.id|| "NA"} </td>
        <td> ${data.fullname|| "NA"}</td>
        <td> ${data.subject|| "NA" }</td>
        <td> ${data.attendence|| "NA" }</td>
      `
      table.appendChild(row);
     });
  };
    // Add a new page button actions 
  addNewPage(){
      const addNewTeachers = this.shadowRoot.querySelector("#addTeachersButton");
      addNewTeachers.addEventListener('click',()=>{
        // render the main page when we cick it 
        const addNewTeachersPage = document.createElement('add-newteachers');
        var hostElement = this.getRootNode().host;
         const path = " Add New Teacher"
         LoadPage.renderPages("add-newteachers",hostElement);
         LoadPage.changeHeaderRoutes(hostElement,path);

      })
    };

// editTeachersPage
editTeachers(row){
  const teacherData = this.getTeachersById(row);
  const hostElem = Common.getHostElem(this.shadowRoot);
  LoadPage.renderPages("edit-teachers",hostElem, teacherData);
  LoadPage.changeHeaderRoutes(hostElem, "Edit Teachers ")
}

// Get teachers by id 
getTeachersById(row){
  const teacherID = row.dataset.id;
  const teachersData = this.teachersData.find(teacher => teacher.id == teacherID)
  return teachersData;
}

}
const TeachersPage = customElements.define("my-teachers",teachersPage);
export default TeachersPage;