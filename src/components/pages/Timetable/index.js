import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class TimetablePage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: "open"});
    this.templateContent = "";
    this.tableData = null;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("templates/pages/Timetable.html");
    this.render();    
    this.fetchTableData();
    
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
    this.addTable();
    this.addNotes();
    this.addDetails();
  }
  addTable(){
    const tableContainer = this.shadowRoot.querySelector('.tableContainer');
    const table = document.createElement('my-table');
    tableContainer.appendChild(table);
  }
  // Fetch the table Data
  fetchTableData(){
    apiRequest(apiRoutes.timetable.getAllTimetableData, "GET")
    .then((timetableData)=>{
      this.tableData = timetableData && timetableData.data;
      this.updateTableContent();
    })
    .catch((error)=>
      console.error("Error fetching the table data : ", error));
  }
  updateTableContent(){
    const table = this.shadowRoot.querySelector("my-table");
    if(table){
      table.data = this.tableData;
    }
  }
  addNotes(){
    const notesContainer = this.shadowRoot.querySelector('.classNotesContainer');
    const notes = document.createElement('my-notes');
    notesContainer.appendChild(notes);
    notes.setAttr({height : 'auto', width: '50rem'});
    const adjuster = notes.shadowRoot.querySelector('.adjuster');
  }
  addDetails(){
    const detailsContainer = this.shadowRoot.querySelector('.detailsContainer');
    const details = document.createElement('my-classdetails');
    detailsContainer.appendChild(details);
  }
}
const timetablePage = customElements.define('timetable-page', TimetablePage);
export default timetablePage;