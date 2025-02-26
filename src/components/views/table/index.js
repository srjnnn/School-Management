import { loadTemplate } from "../../../utils/loadTemplate.js";
import apiRequest from "../../../utils/api.js";
import { apiRoutes } from "../../../globalConstants.js";
import Common from "../../../utils/common.js";
import LoadPage from "../../../services/loadPages.js";

class Table extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.tableContent = "";
    this.tableData = {};
    this.data = null;
    this.payLoad = null;
    this.timetableData = null;
    this.tableId = null;
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
    if(this.getPageMode() === "Create"){
      this.shadowRoot.querySelector('#topHeader').classList.add('hidden');
      this.editableTable();
    }else{
      this.tableActionButton()
    }
  }

  render() {
    this.shadowRoot.innerHTML = this.tableContent;

  }
 
// Method to restrict the user 
restrictUser(){
  const User = sessionStorage.getItem("User");
  if(User === 'admin' || User ===  'teacher'){
    this.shadowRoot.querySelector('#topHeader').classList.remove('hidden');
    this.addEventListeners();
  }else{};

  if(User === "admin"){
    this.shadowRoot.querySelector('#buttonDiv').classList.remove('hidden');
    this.shadowRoot.querySelector("#timetableEdit").disabled = false;

  }
}
// Fetch the table data 

fetchData(userClass, userSection){
     if(!userClass || !userSection) return;
  // fetch the timetable by the class and the section of the students
  apiRequest(apiRoutes.timetable.getTimetableDataById(userClass, userSection))
  .then(response =>{
    this.tableId = response.data[0].id;
    this.timetableData = response.data[0].data;
    this.updateContent();
  })
  .catch(error =>{
    Common.addErrorPopup(this.shadowRoot, "Error fetching the timetable data please try again later")
  })
}

// // Update the content of the table {for students only}
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
  const editButton = this.shadowRoot.querySelector('#timetableEdit');
  const confirtamtion = this.shadowRoot.querySelector('#confirmationBox');
  const User = sessionStorage.getItem("User");
  if(User=== "teacher" || User === "student"){
    return;
  }
  editButton.addEventListener('click', ()=>{
      confirtamtion.classList.remove('hidden');
      const closeButton = this.shadowRoot.querySelector('#close');
      closeButton.addEventListener('click',()=>{
        confirtamtion.classList.add('hidden');
      })
  })
  // Event listners for the new timetable page and editing the existing timetable page ........
  const newTimeatble = this.shadowRoot.querySelector('#new');
  const existing = this.shadowRoot.querySelector('#existing');

  existing?.addEventListener('click', ()=>{
    this.editableTable();
    confirtamtion.classList.add('hidden');
  })

  newTimeatble.addEventListener('click', ()=>{
    const hostElem = Common.getHostElem(this.shadowRoot);
    const superHostElem = hostElem.getRootNode().host;
    LoadPage.renderPages("new-timetable",superHostElem);
    LoadPage.changeHeaderRoutes(superHostElem,"Add a new Timetable")
  })

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

  // make the contents editable 
  editableTable(){
  const table = this.shadowRoot.querySelector("table");
     this.contentEditableTrue(table);
  }


  // Keep the record 
  SaveData (rows){
    const Data = {}
    if(this.getPageMode === "Create"){
      return;
    }else{
      rows.forEach((row , rowIndex) =>{
        const cells = row.querySelectorAll('td , th');
        if(rowIndex === 0) return; //skip the header 
        const day = cells[0].innerText; //first column is the day 
        Data[day] = [];

        cells.forEach((cell, cellIndex) =>{
          if(cellIndex === 0) return //skip the day i.e the first column
          Data[day].push({
            period : cellIndex,
            subject : cell.innerText
          })
        })

      })
      return Data;
    }
  }

  // Make the contents of the table Editable 
  contentEditableTrue(table){
    if(this.getPageMode()==="Create"){
      const trs = table.querySelectorAll('tr');
      trs.forEach(tr =>{
        const td = tr.querySelectorAll('td');
        td.forEach(td =>{
          td.contentEditable = true;
        })
      })
    }else{
      this.shadowRoot.querySelector('#tableButtons').classList.remove('hidden');
      const trs = table.querySelectorAll('tr');
      trs.forEach(tr =>{
        const td = tr.querySelectorAll('td');
        td.forEach(td =>{
          td.contentEditable = true;
        })
      })
      
    }
    
  }


  getPageMode(){
    const pageMode = localStorage.getItem("pageMode");
    return pageMode;
  }
 

  editTable(){
    const updateFields = {};
    updateFields.id = this.tableId;
    updateFields.Data =  this.tableData;
    apiRequest(apiRoutes.timetable.updateTimetableData, "PATCH",updateFields)
    .then(response =>{
      Common.addSuccessPopup(this.shadowRoot,"Successfully Updated Timetable Data");
      setTimeout(() => {
        this.connectedCallback();
      }, 3000);
    })
    .catch(error =>{
      Common.addErrorPopup(this.shadowRoot, "Error Updating Timeatble Data")
    })
  }

  hideTable(){
    this.shadowRoot.querySelector('#tableButtons').classList.add('hidden');
   
  }

  


   



tableActionButton(){
  const saveButton = this.shadowRoot.querySelector("#tableSave");
  const cancelButton = this.shadowRoot.querySelector('#tableCancel')
  const table = this.shadowRoot.querySelector("table");
  const rows = table.querySelectorAll('tr');

  saveButton.addEventListener('click', ()=>{

    this.tableData = this.SaveData(rows)
    this.editTable();

  })
  cancelButton.addEventListener('click', ()=>{
    this.hideTable()
  })


  

}
}
customElements.define("my-table", Table);
export default Table;
