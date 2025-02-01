import { apiRoutes } from "../../../globalConstants.js";
import LoadPage from "../../../services/loadPages.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class studentsPage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = "";
    this.studentData = null;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate('templates/pages/StudentPages.html');
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
    this.StudentsDetailsClick();


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
      if(lastCell){
        const editButton = document.createElement('edit-buttons');
        const deleteButton = document.createElement('delete-buttons');
        const buttonDiv = document.createElement('div');
        buttonDiv.style.display = "flex"
        // buttonDiv.style.gap = "1rem"
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);

        lastCell.appendChild(buttonDiv);


        deleteButton.addEventListener('click',()=>{
        //  summon a  confirmation popup 
            const div = document.createElement('div');
            const box = document.createElement('confirmation-box');
            div.className = "absoluteDiv"
            div.appendChild(box);
            // Now append the div in the main html
            this.shadowRoot.appendChild(div);

            // add the eventlistners for the box
            box.cancelEvent = ()=>{
              div.remove();
            }
            // when the delete Button is triggered
            box.deleteEvent = ()=>{
              const data = {}
              const studentId = row.dataset.id;
              data.id = studentId;
              apiRequest(apiRoutes.students.deleteStudentData,"DELETE",data)
              .then((response)=>{
                console.log(response);
                this.addSuccessPopup();
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
  StudentsDetailsClick(){
    const rows = this.shadowRoot.querySelectorAll("#studentsDetails tr");
    rows.forEach(row=>{
      
      row.addEventListener('click',(event)=>{
        // logic for adding the student id 
        const lastRow = row.lastElementChild;
      if(lastRow.contains(event.target)){
        return;
      }
        event.stopPropagation();
            const studentId = row.dataset.id;
            const studentData = this.studentData.find(student => student.id == studentId)

            

        // Rest logic on how to append the child 
        const absoluteDiv = this.shadowRoot.querySelector('#absoluteDiv');
        const contentDiv = this.shadowRoot.querySelector('#contentDiv');
        // make the div moveable 
        let isDragging = false;
        let offSetX, offSetY;
        absoluteDiv.addEventListener('mousedown', (e) =>{
          isDragging = true;
          offSetX = e.clientX - absoluteDiv.offsetLeft;
          offSetY = e.clientY - absoluteDiv.offsetTop;
          absoluteDiv.style.cursor = 'grabbing';
        })
        this.shadowRoot.addEventListener('mousemove', (e) => {
          if (isDragging) {
              const x = e.clientX - offSetX;
              const y = e.clientY - offSetY;
              absoluteDiv.style.left = `${x}px`;
              absoluteDiv.style.top = `${y}px`;
          }
      });
      this.shadowRoot.addEventListener('mouseup', () => {
        isDragging = false;
        absoluteDiv.style.cursor = 'grab';
    });
        absoluteDiv.classList.remove('hidden');
        // Create a summary box 
        const summaryBox = document.createElement('my-usersummary');
        if(contentDiv){
         
          contentDiv.replaceChildren();
          contentDiv.appendChild(summaryBox);
          
        //  Logic for providing the data 
          this.sendData(studentData);
          // ALso append the close button to the div 
          const closeButton = document.createElement('div');
          // closeButton.style.background = 'transparent'
          closeButton.style.position = 'absolute'
          closeButton.style.top = '0%'

          closeButton.innerHTML = `
          <style>
                   #close {
                   border: none;
                   background-color: transparent;
                   cursor: pointer;
               
                 }
               
                 #closeImg {
                   height: 3rem;
                   z-index: 500;
                 }
               
                 .buttons {
                   display: flex;
                   justify-content: flex-end;
                 }
          </style>
              <div class="buttons">
      <button id="close" class="close"><img src="/public/assets/icons/x.svg" alt="closeIcon" id="closeImg"></button>
    </div>
     
          `
          contentDiv.appendChild(closeButton);
          closeButton.addEventListener('click',()=>{
             contentDiv.replaceChildren();

          })
        };
      
      })
    })
  };
 // Add data to the summary box 
 sendData(studentData){
   const userSummaryBox = this.shadowRoot.querySelector('my-usersummary');
   if(userSummaryBox){
     userSummaryBox.data = studentData;
   }
  }

  renderAddNewStudentsPage(){
    const button = this.shadowRoot.querySelector('#addStudentsButton');
    const path = "Add new Student"
    button.addEventListener('click',()=>{
      const hostElem = this.getRootNode().host;
      LoadPage.renderPages("addnew-students" , hostElem);
      LoadPage.changeHeaderRoutes(hostElem,path);
    })
  }
  addSuccessPopup(){
    const absoluteDiv = document.createElement('div');
    absoluteDiv.id = "absoluteDiv";
    absoluteDiv.className = "absoluteDiv";
    const popup = document.createElement("success-popup");
    popup.data = "Deletion of student was successful"
    absoluteDiv.appendChild(popup);
    this.shadowRoot.appendChild(absoluteDiv);
    const appendedPopup = this.shadowRoot.querySelector("success-popup")
    absoluteDiv.classList.remove('hidden');
    setTimeout(() => {
    absoluteDiv.remove();
    this.connectedCallback();

    }, 3000);
  }

}
const StudentsPage = customElements.define('students-page',studentsPage);
export default StudentsPage;