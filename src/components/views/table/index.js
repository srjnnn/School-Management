import RestrictUser from "../../../services/restrictUser.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class Table extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.tableContent = "";
    this.originalData = {};
    
  }

  async connectedCallback() {
    this.tableContent = await loadTemplate("templates/views/table.html");
    this.render();
    if(RestrictUser.IdentifyUserType()===true){
      const mode = this.getPageMode();
      if(mode === "Create"){
        // add the editable table and the save button
        this.editableTable();
      }else{
       this.addEventListeners();


      }
    }

  }

  render() {
    this.shadowRoot.innerHTML = this.tableContent;
  }
 
  addEventListeners() {
    const topHeader = this.shadowRoot.querySelector('#topHeader');
    topHeader.classList.remove("hidden");
    const popup = this.shadowRoot.querySelector("#editButtonPopup");
    const editButton = this.shadowRoot.querySelector("#timetableEdit");
    // make the button visible
    editButton.classList.remove('hidden');
    const crossImage = this.shadowRoot.querySelector("#cross-img");
    const existingDataEditButton = this.shadowRoot.querySelector("#existingData");
    const newTimetableButton = this.shadowRoot.querySelector('#newTimetable');
    const table = this.shadowRoot.querySelector("table");
  
    if (!popup || !editButton || !crossImage || !table) return;
  
    // Popup visibility
    editButton.addEventListener("click", () => {
      popup.classList.remove("hidden");
    });
  
    // Close popup
    crossImage.addEventListener("click", () => {
      popup.classList.add("hidden");
    });



    // create a newTimetable
    newTimetableButton.addEventListener('click',()=>{
      // remove the topHeader of the table page && make the table addable and add the save button ;
     const newTimetable = document.createElement('new-timetable');
      const timetablePage = this.getRootNode().host;
      const homePage = timetablePage.getRootNode().host;
      const mainContentContainer = homePage.shadowRoot.querySelector('#main-content-container');
      mainContentContainer.replaceChildren();
      mainContentContainer.appendChild(newTimetable)
    });
  
    // Edit existing data
    existingDataEditButton?.addEventListener("click", () => {
      popup.classList.add("hidden");
      this.editableTable();
    });
      
  };
  // Get the page name 
  getPageMode(){
    const pageMode = localStorage.getItem("pageMode");
    return pageMode;
  }
  // make the conten't editable of the table
  // make everyrow and column of a tableEditable 
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
      alert("Changes saved!");
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
  
  
}

customElements.define("my-table", Table);
export default Table;
