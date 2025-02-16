import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class attendencePage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = '';
    this.studentsData = null;
    this.attendenceData = [];
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/pages/attendencePage.html");
    this.render();
    // this.getStudentsData();
    this.changeClass();
  }
// Select the selector and identify the change everytime
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
          this.attendenceData.push({id : studentID, remark : true})
        }
        if(event.target.id.includes("absent")){
          button.forEach(bttn =>{
            if(bttn.id !== "absent" && bttn.id !== "edit"){
              bttn.disabled = true;
            }
          })
          this.attendenceData.push({id : tr.id, remark : false});
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
      console.log(this.attendenceData);
    })
  }
  // Clear table
  clearTable(){
    const table = this.shadowRoot.querySelector('#table');
    table.innerHTML =""
  }

}
const AttendencePage = customElements.define("attendence-page",attendencePage);
export default AttendencePage;
