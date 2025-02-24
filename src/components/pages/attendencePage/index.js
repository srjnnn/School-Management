import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class attendencePage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = '';
    this.studentsData = null;
    this.attendenceData = [];
    this.payload = null;
    this.class = "";
    this.section = "";
    this.response = null
    this.updatedData = [];
    this.updatedEventlistner = false;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/pages/attendencePage.html");
    this.render();
    this.changeClass();
  }
// Select the selector and identify the change everytime
changeClass(){
  const Classselector = this.shadowRoot.querySelector('#classSelector');
  const sectionSelector = this.shadowRoot.querySelector('#sectionSelector');
  sectionSelector.disabled = true;
  Classselector.addEventListener('change', async ()=>{
  sectionSelector.disabled = (Classselector.value === "null");
  if(sectionSelector.value !== "null"){
    this.class = Classselector.value;
    this.section = sectionSelector.value;
    this.clearTable();
     await this.checkAttendence();
    if(this.response !== null &&  this.response.attendanceTaken === true){
      if(this.payload === null){
        this.shadowRoot.querySelector('#save').disabled = true;
      }else{
      this.updateContents();
      }
    }else{
    this.getStudentsData(Classselector.value, sectionSelector.value);

    }
  }
  })
  sectionSelector.addEventListener('change',async ()=>{
    if(sectionSelector.value !== "null"){
      this.class = Classselector.value;
      this.section = sectionSelector.value;
      this.clearTable();
   await  this.checkAttendence();
     if(this.response !== null &&  this.response.attendanceTaken === true){
      this.updateContents();
             
     }else{
      this.getStudentsData(Classselector.value,sectionSelector.value);
      
     }
    }
  })
}

  // get the students data
  getStudentsData(classValue,sectionValue){
    apiRequest(apiRoutes.attendence.getStudentsByClassId(classValue,sectionValue), "GET")
    .then((studentsData)=>{
      this.studentsData = studentsData && studentsData.data;
      this.addTableData();
      this.addEventListners();
      
    })
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  addTableData(){
    // First sort the students and display the data
    const table = this.shadowRoot.querySelector('#table');
    const sortedStudentsData = this.studentsData.sort((a,b)=>{
      return a.fullname.localeCompare(b.fullname);
    });
    sortedStudentsData.forEach(data => {
      const htmlContent = `
    <tr id = "${data.id}" studentName = "${data.fullname}">
      <td>${data.id || "NA"}</td>
      <td class ="name">${data.fullname || "NA"}</td>
        <td>
            <div class="btn-group">
              <button class="btn present ${data.fullname}" id="present">Present</button>
              <button class="btn absent ${data.fullname}" id ="absent">Absent</button>
            </div>
        </td>
        <td><button class="btn present" id = "edit">Edit</button></td>
    </tr>
    
    `
    table.innerHTML += htmlContent ;
      
    });
  }
  addEventListners(){
    //debugging 
    if(this.addEventListnersAdded === true) return;
    const trs = this.shadowRoot.querySelectorAll('tr');
    trs.forEach(tr =>{
      tr.addEventListener('click', (event)=>{
        const button = tr.querySelectorAll('button');

        const studentID = tr.id;
        if(event.target.id.includes("present")){
          button.forEach(bttn =>{
            if(bttn.id !== "present" && bttn.id !== "edit"){
              bttn.disabled = true;
            }
          })
          this.attendenceData.push({id : studentID, remark : true, class : this.class, section : this.section, fullname : tr.getAttribute("studentName")})
        }
        if(event.target.id.includes("absent")){
          button.forEach(bttn =>{
            if(bttn.id !== "absent" && bttn.id !== "edit"){
              bttn.disabled = true;
            }
          })
          this.attendenceData.push({id : tr.id, remark : false, class : this.class, section : this.section, fullname : tr.getAttribute("studentName")});
        }
        if(event.target.id.includes("edit")){
          button.forEach(buttns =>{
            buttns.disabled = false;
          })
        }
      })
    })
    const saveButton = this.shadowRoot.querySelector('#save');
    saveButton.addEventListener('click',()=>{
      // Show alert if all the stuents are not marked
      const studentsLength = this.studentsData.length;
      const attendenceLength = this.attendenceData.length;

      if(studentsLength !== attendenceLength){
        Common.addErrorPopup(this.shadowRoot, "It is necessary to mark all the students")
        
      }else{
       this.payload = this.attendenceData;
       console.log(this.payload)
      this.sendData();     
      }
    })
    this.addEventListnersAdded = true;

  }
  // Check if the students are attendend or not ?????? 
async checkAttendence(){
  const checkPayload = {};
  checkPayload.Class = this.class;
  checkPayload.section = this.section;
  try{

  const response = await apiRequest(apiRoutes.attendence.checkAttendenceData, "POST",checkPayload )
  this.response = response;
  }catch(error){
  console.error("Error chacking the students " ,error)
  }

}
sendData(){
   //  Send data 
   apiRequest(apiRoutes.attendence.sendAttendenceData, "POST",this.payload)
   .then(response =>{
    Common.addSuccessPopup(this.shadowRoot, "Successfully added the Attendence of the students")
    setTimeout(() => {
      this.connectedCallback();
    }, 3000);
   })
   .catch(error =>{
    console.error(error);
   })
}
  // Clear table
  clearTable(){
    const table = this.shadowRoot.querySelector('#table');
    table.innerHTML =""
  }
  updateContents() {
    const table = this.shadowRoot.querySelector('#table');
    const { attendanceData } = this.response;
  
    attendanceData.forEach(studentAttendance => {
      const htmlContent = `
        <tr id="${studentAttendance.studentId }" data-student-name="${studentAttendance.fullname}" attendenceID = ${studentAttendance.id}>  
          <td>${studentAttendance.studentId || "N/A"}</td>
          <td class="name">${studentAttendance.fullname || "NA"}</td>
          <td>
            <div class="btn-group">
              <button class="btn present" data-id="${studentAttendance.studentId }">Present</button>
              <button class="btn absent" data-id="${studentAttendance.studentId }">Absent</button>
            </div>
          </td>   
          <td><button class="btn present" data-id="${studentAttendance.studentID}" id = "edit">Edit</button></td>      
        </tr>       
      `;
      
      table.innerHTML += htmlContent;
  
      // Select the newly added buttons
      const presentButton = table.querySelector(`.present[data-id="${studentAttendance.studentId }"]`);
      const absentButton = table.querySelector(`.absent[data-id="${studentAttendance.studentId }"]`);
  
      // Disable buttons based on attendance status
      if (studentAttendance.status === true) {
        absentButton.disabled = true;
      } else {
        presentButton.disabled = true;
      }
    });

    this.fetchedEventListners();
  }
  fetchedEventListners(){
    if(this.updatedEventlistner === true) return;

    const trs = this.shadowRoot.querySelectorAll('tr');
    trs.forEach(tr =>{
      tr.addEventListener('click', (event)=>{
        const button = tr.querySelectorAll('button');
        if(event.target.textContent.includes("Present")){
          button.forEach(bttn =>{
            if(bttn.textContent !== "Present" && bttn.textContent !== "Edit"){
              bttn.disabled = true;
            }
          })
          if(!this.updatedData.some(data => data.id === tr.getAttribute("attendenceID"))){
          this.updatedData.push({id :tr.getAttribute("attendenceID") , remark : true});
          }
        }
        if(event.target.textContent.includes("Absent")){
          button.forEach(bttn =>{
            if(bttn.textContent !== "Absent" && bttn.textContent !== "Edit"){
              bttn.disabled = true;
            }
          })
          // Check if the data already exists or not 
          if(!this.updatedData.some(data => data.id === tr.getAttribute("attendenceID"))){
            this.updatedData.push({id : tr.getAttribute('attendenceID'), remark : false, });
          }
        }
        if(event.target.id.includes("edit")){
          button.forEach(buttns =>{
            buttns.disabled = false;
          })
        }
      })
    })
    // Add the event listner to the save button 
    const saveButton = this.shadowRoot.querySelector('#save');
    saveButton.addEventListener('click',()=>{
      // Show alert if all the stuents are not marked
      
       this.payload = this.updatedData;
       console.log(this.payload)
       if(this.payload === null){
        this.shadowRoot.querySelector('#save').disabled = true;
       }
       this.updateAttendence();
      this.payload = null;

    })
  }
  // Api to update attendence 
  updateAttendence(){
    // call the backend api and update the data 
    apiRequest(apiRoutes.attendence.updateAttendence, "PATCH",this.payload)
    .then(response =>{
      Common.addSuccessPopup(this.shadowRoot, "Successfully updated Students Data");
      setTimeout(() => {
        this.connectedCallback();
      }, 3000);
    })
    .catch(error=>{
      Common.addErrorPopup(this.shadowRoot, "An error occured while updating the students data please try again later......")
    })

  }
}
const AttendencePage = customElements.define("attendence-page",attendencePage);
export default AttendencePage;


