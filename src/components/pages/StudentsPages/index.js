import { apiRoutes } from "../../../globalConstants.js";
import LoadPage from "../../../services/loadPages.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";
import Common from "../../../utils/common.js";
class studentsPage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = "";
    this.studentData = null;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate('../public/templates/pages/StudentPages.html');
    this.render();
    this.getStudentsData();
    this.renderAddNewStudentsPage();
    
  }

  getStudentsData(){
    apiRequest(apiRoutes.students.getAllStudentsData, "GET")
    .then((studentData)=>{
      this.studentData = studentData && studentData.data;
      this.addTable();
      this.addEditButtons();
      Common.detailsClick(this.shadowRoot, this.studentData,"studentsDetails");
    })
  }
  addTable(){
    const tableDiv = this.shadowRoot.querySelector('#studentsDetails');

    this.studentData.forEach(data=>{
      const row = document.createElement('tr');
      row.dataset.id = data.id;
      row.innerHTML = `
      <tr>
        <td> ${data.id|| "NA"} </td>
        <td> ${data.fullname|| "NA"}</td>
        <td> ${data.phone|| "NA" }</td>
        <td> ${data.address || "NA"}</td>
        <td> ${data.attendence|| "NA" }</td>
      `
      tableDiv.appendChild(row);
    })
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  // Add eventlistners and all
  addEditButtons(){
    const rows = this.shadowRoot.querySelectorAll("#studentsDetails tr");
    rows.forEach(row =>{
      const lastCell = row.querySelector('td:last-child');


      // Append all the students edit and delete button at the last cell
      if(lastCell){
        const editButton = document.createElement('edit-buttons');
        const deleteButton = document.createElement('delete-buttons');
        const buttonDiv = document.createElement('div');
        buttonDiv.style.display = "flex"
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);
        lastCell.appendChild(buttonDiv);


      // Event listners for the edit Button
      editButton.addEventListener('click',()=>{
      const studentData = this.findStudentDataByID(row);
        const hostElement = Common.getHostElem(this.shadowRoot);
        LoadPage.renderPages("edit-students",hostElement, studentData);

        LoadPage.changeHeaderRoutes(hostElement,"Edit Student");
      })


        // add the event Listners to all the appended buttons 
        deleteButton.addEventListener('click',()=>{
            const div = document.createElement('div');
            const box = document.createElement('confirmation-box');
            div.className = "absoluteDiv"
            div.appendChild(box);
            this.shadowRoot.appendChild(div);


            // when the cancel button is triggered when we clicked the box
            box.cancelEvent = ()=>{
              div.remove();
            }

            // when the delete Button is triggered of the box we appended
            box.deleteEvent = ()=>{
              const data = {}
              const studentId = row.dataset.id;
              data.id = studentId;
              apiRequest(apiRoutes.students.deleteStudentData,"DELETE",data)
              .then((response)=>{
                Common.addSuccessPopup(this.shadowRoot,"Deletion of Student was Successful");
                div.remove();
              })
              .catch((error)=>{
                console.error(error);
                div.remove();
              })
            }
        })
        
      }

    });
  }
  
// Add new students Page 
  renderAddNewStudentsPage(){
    const button = this.shadowRoot.querySelector('#addStudentsButton');
    const path = "Add new Student"
    button.addEventListener('click',()=>{
      const hostElem = Common.getHostElem(this.shadowRoot);
      LoadPage.renderPages("addnew-students" , hostElem);
      LoadPage.changeHeaderRoutes(hostElem,path);
    })
  }

// find the student data by id 
findStudentDataByID(row){
  const studentId = row.dataset.id;
  const studentData = this.studentData.find(student => student.id == studentId)
  return studentData;

}
  

}
const StudentsPage = customElements.define('students-page',studentsPage);
export default StudentsPage;