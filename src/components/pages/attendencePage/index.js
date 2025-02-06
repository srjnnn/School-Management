import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class attendencePage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = '';
    this.studentsData = null;
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
    const table = this.shadowRoot.querySelector('#table');
    this.studentsData.forEach(data => {
      const htmlContent = `
    <tr>
      <td>${data.id || "NA"}</td>
      <td class ="name">${data.fullname || "NA"}</td>
       <td>
            <div class="btn-group">
              <button class="btn present">Present</button>
              <button class="btn absent">Absent</button>
            </div>
        </td>
        <td><button class="btn present">Edit</button></td>
    </tr>
    
    `
    table.innerHTML += htmlContent ;
      
    });
  }
  addEventListners(){
    // Code for the event Listners
  }
  // Clear table
  clearTable(){
    const table = this.shadowRoot.querySelector('#table');
    table.innerHTML =""
  }

}
const AttendencePage = customElements.define("attendence-page",attendencePage);
export default AttendencePage;
