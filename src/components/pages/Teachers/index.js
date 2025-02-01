import { apiRoutes } from "../../../globalConstants.js";
import LoadPage from "../../../services/loadPages.js";
import RestrictUser from "../../../services/restrictUser.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class teachersPage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = "";
    this.teachersData = null;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("templates/pages/teachers.html");
    this.render();
    this.getTeachersData();
    this.restrictUser();

  }
  // get the tachers data
  getTeachersData(){
    apiRequest(apiRoutes.teachers.getAllTeachersData, "GET")
    .then((teachersData)=>{
    this.teachersData = teachersData && teachersData.data;
    this.addTable();
    this.addEditButtons();
    this.TeachersDetailsClick();

      
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

           // add the eventlistners for the box
           box.cancelEvent = ()=>{
             div.remove();
           }

       // When the delete button is clicked 
        box.deleteEvent = ()=>{
          const data = {}
          const teacherId = row.dataset.id;
          data.id = teacherId;
          console.log(teacherId);
          apiRequest(apiRoutes.teachers.deleteTeachersData,"DELETE",data)
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



        const buttonDiv = document.createElement('div');
        buttonDiv.style.display = "flex"
        buttonDiv.style.gap = "1rem"
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);

        lastCell.appendChild(buttonDiv);
      }

    });
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
      // const div = this.shadowRoot.querySelector('#mainDiv');
      // div.classList.remove('hidden');
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
    TeachersDetailsClick(){
      const rows = this.shadowRoot.querySelectorAll("#teachersDetails tr");
      rows.forEach(row=>{
        const lastRow = row.lastElementChild;
        row.addEventListener('click',(event)=>{
          if(lastRow.contains(event.target)){
            return
          }

          const teacherID = row.dataset.id;
          const teachersData = this.teachersData.find(teacher => teacher.id == teacherID)
          
              
  
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
            this.sendData(teachersData);
            
           
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
  sendData(teacherData){
    const summaryBox = this.shadowRoot.querySelector('my-usersummary');
    if(summaryBox){
      summaryBox.data = teacherData;
    }
  }

  addSuccessPopup(){
    const absoluteDiv = document.createElement('div');
    absoluteDiv.id = "absoluteDiv";
    absoluteDiv.className = "absoluteDiv";
    const popup = document.createElement("success-popup");
    popup.data = "Deletion of Teacher was successful"
    absoluteDiv.appendChild(popup);
    this.shadowRoot.appendChild(absoluteDiv);
    absoluteDiv.classList.remove('hidden');
    setTimeout(() => {
    absoluteDiv.remove();
    this.connectedCallback();

    }, 3000);
  }
}
const TeachersPage = customElements.define("my-teachers",teachersPage);
export default TeachersPage;