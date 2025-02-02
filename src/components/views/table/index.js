import RestrictUser from "../../../services/restrictUser.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";
import apiRequest from "../../../utils/api.js";
import { apiRoutes } from "../../../globalConstants.js";

class Table extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.tableContent = "";
    this.originalData = {};
    this.data = null;
    this.payLoad = null;
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

 
  set data(value) {
    this._data = value;
    this.updateContent();

  }

  get data(){
    return this._data;
  }

  render() {
    this.shadowRoot.innerHTML = this.tableContent;
  }
  updateContent() {
            //  Get the table 
    const table = this.shadowRoot.querySelector('table');
    if(table){
      // get the data from the table 
      const data = this.data;
      // Filter the timetable data 
      const timetableData = data[0].data;

      // fetch all the days with their data
      for(const day in timetableData){
        // get the tr matching the data 
        const tr = this.shadowRoot.querySelector(`#${day}`)

        tr.innerHTML = ``;
        
        let rowContent = `<td id="${day}" class="dataDays">${day}</td>`;


        for(const session of timetableData[day]){
                       // Clear the trs and append the latest data
                       rowContent += `
                       <td>
                           ${session.subject}
                       </td>
                       
                       `
                               
                
        }
         // Fill empty cells if there are less than 7 periods
         const emptyCells = 7 - timetableData[day].length;
         for (let i = 0; i < emptyCells; i++) {
             rowContent += `<td>OFF</td>`;
         }
        
         tr.innerHTML = rowContent;
      }
    }
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
    
    const cells = table.querySelectorAll("td"); // Include `dataTime` fields
  
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
  

  
    // Enable save button if changes are detected
    table.addEventListener("input", () => {
      const hasChanges = Array.from(table.querySelectorAll("tbody tr")).some(
        (row, rIndex) =>
          Array.from(row.querySelectorAll("td")).some(
            (cell, cIndex) =>
              cell.textContent.trim() !== this.originalData[`${rIndex}-${cIndex}`]
          )
      )
  
      saveButton.disabled = !hasChanges;
    });
  
    // Save changes
    saveButton.addEventListener("click", () => {
      table.querySelectorAll("tbody tr").forEach((row, rowIndex) => {
        row.querySelectorAll("td").forEach((cell, cellIndex) => {
          this.originalData[`${rowIndex}-${cellIndex}`] = cell.textContent.trim();
        });
      });
      // Now convert the orignal data to server side store form
      const outputData = {};
      Object.keys(this.originalData).forEach(key => {
        const [dayIndex, period] = key.split("-").map(Number);
        
        if (period === 0) {
          outputData[this.originalData[key]] = [];
        } else {
          const day = this.originalData[`${dayIndex}-0`]; // Get the day's name
          outputData[day].push({ period, subject: this.originalData[key] });
        }
      });
      // required id , id
      
      const addFields = {};
      addFields.id = this.data[0].id;
      addFields.Data = outputData;
      this.payLoad = addFields;
        
    
      // call the api and send the original data 
       this.updateData();
       cells.forEach(cell => {
        cell.contentEditable = false;
       });
      tableActionButtonsDiv.classList.add("hidden");
    });
  
    // Cancel changes
    cancelButton.addEventListener("click", () => {
      
  
      saveButton.disabled = true;
      tableActionButtonsDiv.classList.add('hidden');
      if(this.getPageMode() === "Create"){
      }else{
        table.querySelectorAll("tbody tr").forEach((row, rowIndex) => {
          row.querySelectorAll("td").forEach((cell, cellIndex) => {
            cell.textContent = this.originalData[`${rowIndex}-${cellIndex}`];
            cell.contentEditable = false;
          });
        });
        tableActionButtonsDiv?.classList.add("hidden");

        
      }


    });

  }
  // send the data to the backend 
updateData(){
  apiRequest(apiRoutes.timetable.updateTimetableData,"PATCH",this.payLoad)
  .then((response)=>{
    this.addSuccessPopup();
  })
  .catch((error)=>{
    console.error("Error sending data , ",error);
  });
}
addSuccessPopup() {
  const absoluteDiv = document.createElement('div');
  absoluteDiv.id = "absoluteDiv";
  absoluteDiv.className = "absoluteDiv";
  const popup = document.createElement("success-popup");
  absoluteDiv.appendChild(popup);
  this.shadowRoot.appendChild(absoluteDiv);
  const appendedPopup = this.shadowRoot.querySelector("success-popup");
  appendedPopup.data = "Timetable Updated Successfully";
  absoluteDiv.classList.remove('hidden');
  setTimeout(() => {
    absoluteDiv.remove();
  }, 3000);
}

  
}

customElements.define("my-table", Table);
export default Table;
