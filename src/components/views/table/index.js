import { loadTemplate } from "../../../utils/loadTemplate.js";
import apiRequest from "../../../utils/api.js";
import { apiRoutes } from "../../../globalConstants.js";
import Common from "../../../utils/common.js";

class Table extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.tableContent = "";
    this.originalData = {};
    this.data = null;
    this.payLoad = null;
    this.timetableData = null;
  }

  async connectedCallback() {
    this.tableContent = await loadTemplate("../public/templates/views/table.html");
    this.render();
    if(sessionStorage.getItem('User')==="student"){
       // get the userClass and Section
  const Class =JSON.parse(localStorage.getItem('authResponse')); 
  const userClass = Class.userData.profile.Class;
  const userSection = Class.userData.profile.section;
    this.fetchData(userClass, userSection);
    }
    this.restrictUser();
  }

  render() {
    this.shadowRoot.innerHTML = this.tableContent;

  }
 
// Method to restrict the user 
restrictUser(){
  const User = sessionStorage.getItem("User");
  if(User === "admin"){
    this.shadowRoot.querySelector('#topHeader').classList.remove('hidden');
    this.addEventListeners();
  }
}
// Fetch the table data 

fetchData(userClass, userSection){
     if(!userClass || !userSection) return;
  // fetch the timetable by the class and the section of the students
  apiRequest(apiRoutes.timetable.getTimetableDataById(userClass, userSection))
  .then(response =>{
    this.timetableData = response.data[0].data;
    this.updateContent();
  })
  .catch(error =>{
    Common.addErrorPopup(this.shadowRoot, "Error fetching the timetable data please try again later")
  })
}

// Update the content of the table {for students only}
updateContent(){
  Object.keys(this.timetableData).forEach(day =>{
    if(!day) return;
    const row = this.shadowRoot.getElementById(day);
    if(!row){
      console.warn("No row found for the table ", day)
      return;
    }
    // get the cells inside the day row 
    const cells = row.getElementsByTagName('td');
    // now start to fill the cells 
    this.timetableData[day].forEach((period , index) => {
      // Since the first index is for the day Name
       const cellIndex = index + 1 ;
       if(cells[cellIndex]){
        cells[cellIndex].textContent = period.subject
       }
    });
  })
}

// Add eventListners  to the table 
addEventListeners(){
  // method to edit the timetable and delete the timetable 
  const classSelector = this.shadowRoot.querySelector('#selectClass');
  const sectionSelector = this.shadowRoot.querySelector('#section');
  
  sectionSelector.disabled = true;
    classSelector.addEventListener('change', ()=>{
    sectionSelector.disabled = (classSelector.value === "null");
    if(sectionSelector.value !== "null"){
      // Call the api here 
      this.fetchData(classSelector.value , sectionSelector.value)
    }
    })
    sectionSelector.addEventListener('change', ()=>{
      if(sectionSelector.value !== "null"){
        // Call the api here 
      this.fetchData(classSelector.value , sectionSelector.value);
      }
    })
  }

}


customElements.define("my-table", Table);
export default Table;
