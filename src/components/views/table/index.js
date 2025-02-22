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
    this.originalData = {};
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
    }
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
    this.tableId = response.data[0].id;
    this.timetableData = response.data[0].data;
    this.updateContent();
  })
  .catch(error =>{
    Common.addErrorPopup(this.shadowRoot, "Error fetching the timetable data please try again later")
  })
}

// Update the content of the table {for students only}
updateContent(){
  console.log(this.tableId)
  console.log(this.timetableData)
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
    const tableActionButtonsDiv = this.shadowRoot.querySelector(".tableActionsButtons");
    const saveButton = this.shadowRoot.querySelector("#tableSave");
    const cancelButton = this.shadowRoot.querySelector("#tableCancel");
    const dataTimeFields = this.shadowRoot.querySelectorAll(".dataTime");
    const cells = table.querySelectorAll("td, .dataTime"); // Include `dataTime` fields
  
      cells.forEach((cell) => {
        if (cell.contentEditable === "true") {
          cell.contentEditable = false;
          cell.classList.remove("editable");
          tableActionButtonsDiv?.classList.add("hidden");
        } else {
          cell.contentEditable = true;
          cell.classList.add("editable");
          if(this.getPageMode()==="Create"){
          }else{
            tableActionButtonsDiv?.classList.remove("hidden");
          }
          if(cell.classList.contains('dataDays')){
            cell.contentEditable=false;
          }
          
        }
      });

    // Save initial data
    table.querySelectorAll("tbody tr").forEach((row, rowIndex) => {
      row.querySelectorAll("td").forEach((cell, cellIndex) => {
        this.originalData[`${rowIndex}-${cellIndex}`] = cell.textContent.trim();
      });
    });
  
    // Save initial `dataTime` values
    dataTimeFields.forEach((field, index) => {
      this.originalData[`dataTime-${index}`] = field.textContent.trim();
    });
  
    // Enable save button if changes are detected
    table.addEventListener("input", () => {
      const hasChanges = Array.from(table.querySelectorAll("tbody tr")).some(
        (row, rIndex) =>
          Array.from(row.querySelectorAll("td")).some(
            (cell, cIndex) =>
              cell.textContent.trim() !== this.originalData[`${rIndex}-${cIndex}`]
          )
      ) || Array.from(dataTimeFields).some(
        (field, index) =>
          field.textContent.trim() !== this.originalData[`dataTime-${index}`]
      );
  
      saveButton.disabled = !hasChanges;
    });
  
    // Save changes
    saveButton.addEventListener("click", () => {
      table.querySelectorAll("tbody tr").forEach((row, rowIndex) => {
        row.querySelectorAll("td").forEach((cell, cellIndex) => {
          this.originalData[`${rowIndex}-${cellIndex}`] = cell.textContent.trim();
        });
      });
  
      dataTimeFields.forEach((field, index) => {
        this.originalData[`dataTime-${index}`] = field.textContent.trim();
      });
  
      saveButton.disabled = true;
      this.editTable();
    });
  
    // Cancel changes
    cancelButton.addEventListener("click", () => {
      
  
      saveButton.disabled = true;
      if(this.getPageMode() === "Create"){
      }else{
        table.querySelectorAll("tbody tr").forEach((row, rowIndex) => {
          row.querySelectorAll("td").forEach((cell, cellIndex) => {
            cell.textContent = this.originalData[`${rowIndex}-${cellIndex}`];
            cell.contentEditable = false;
          });
        });
    
        dataTimeFields.forEach((field, index) => {
          field.textContent = this.originalData[`dataTime-${index}`];
          field.contentEditable = false;
          });
        tableActionButtonsDiv?.classList.add("hidden");
        dataTimeFields.forEach((field, index) => {
          field.textContent = this.originalData[`dataTime-${index}`];
        field.contentEditable = false;
         });
        
      }


    });

  }
  getPageMode(){
    const pageMode = localStorage.getItem("pageMode");
    return pageMode;
  }
 
  editTable(){
    const updateFields = {};
    updateFields.id = this.tableId;
    updateFields.Data =  this.originalData;
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
}


customElements.define("my-table", Table);
export default Table;
