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
      this.updateContents();
    }else{
      console.log(this.response.attendanceTaken)
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
    <tr id = "${data.id}">
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
          this.attendenceData.push({id : studentID, remark : true, class : this.class, section : this.section})
        }
        if(event.target.id.includes("absent")){
          button.forEach(bttn =>{
            if(bttn.id !== "absent" && bttn.id !== "edit"){
              bttn.disabled = true;
            }
          })
          this.attendenceData.push({id : tr.id, remark : false, class : this.class, section : this.section});
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
      this.sendData();
      console.log(this.attendenceData);
         
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
  console.log(response)
  }catch(error){
  console.error("Error chacking the students " ,error)
  }

}
sendData(){
   //  Send data 
   apiRequest(apiRoutes.attendence.sendAttendenceData, "POST",this.payload)
   .then(response =>{
    console.log(response);
    Common.addSuccessPopup(this.shadowRoot, "Successfully added the Attendence of the students")
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
// update contents 
updateContents(){
  const table = this.shadowRoot.querySelector('#table')
  const tr =  document.createElement('tr');
  const {attendanceData} = this.response;
  console.log(attendanceData);
  attendanceData.forEach(studentAttendence =>{
         tr.innerHTML = `
         <td id = ${studentAttendence.id}>${studentAttendence.id}</td>
         <td id = ${studentAttendence.id}>${studentAttendence.id}</td>
         `
  })
}
  
}
const AttendencePage = customElements.define("attendence-page",attendencePage);
export default AttendencePage;
