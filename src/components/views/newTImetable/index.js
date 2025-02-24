import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";
 
class newTimetable extends HTMLElement {
  static route = "/new-timetable"
  constructor() {
    super();
    this.pageMode = "Create";
    this.attachShadow({ mode: "open" });
    this.templateContent = "";
    this.payload = null;
  }
  async connectedCallback() {
    this.templateContent = await loadTemplate("../public/templates/views/newTimetable.html");
    this.render();
    this.addTable();
    localStorage.setItem("pageMode",this.pageMode);
    this.saveNewTimeTable();
    this.addGoBackButton();
  }
  render() {
    this.shadowRoot.innerHTML = this.templateContent;

  }
  addTable() {
    const tableContainer = this.shadowRoot.querySelector('.tableContainer');
    const table = document.createElement('my-table');

    tableContainer.appendChild(table);

  }
  disconnectedCallback(){
    localStorage.removeItem("pageMode");
  }

  addGoBackButton(){
    const gobackButton = document.createElement("go-back");
    const hostElem = Common.getHostElem(this.shadowRoot);
    const backButtonContainer = hostElem.shadowRoot.querySelector ("#backButtonContainer");
    backButtonContainer.innerHTML = ""
    if(backButtonContainer){
      backButtonContainer.appendChild(gobackButton);
      gobackButton.data = {
        elem : "classnotes-page",
        header : "CLASSNOTES"
      }
    };
  }

  // get the table data 
  saveNewTimeTable(){
    const saveButton = this.shadowRoot.querySelector('#tableSave');
    saveButton.addEventListener('click',()=>{
    //getting all the data of the fields
      const Class = this.shadowRoot.querySelector('#selectClass').value;
      const Section = this.shadowRoot.querySelector('#section').value;
      const totalStudents = this.shadowRoot.querySelector('#totalStudents').value;
      const girls = this.shadowRoot.querySelector('#girlsNo').value;
      const boys = this.shadowRoot.querySelector('#boysNo').value;
       
      // if the value are null then alert the user to enter the values 
      if(Class === 'null' || Section === 'null' || totalStudents === '' || girls === '' || boys === ''){
        alert("Every fields are required")
      }else{

        

        const  tableToJson = () =>{
          const table = this.shadowRoot.querySelector('my-table');
          const rows = table.shadowRoot.querySelectorAll('tr');
          const data = {};
  
          rows.forEach((row , rowIndex) =>{
            const cells = row.querySelectorAll('td , th');
            if(rowIndex === 0) return; //skip the header 
            const day = cells[0].innerText; //first column is the day 
            data[day] = [];
  
            cells.forEach((cell, cellIndex) =>{
              if(cellIndex === 0) return //skip the day i.e the first column
              data[day].push({
                period : cellIndex,
                subject : cell.innerText
              })
            })
  
          })
          return data;
        }
      const Data = tableToJson();

              // laod all the timetable data 
              const timeTableData = {
                Class, 
                Section,
                totalStudents,
                girls,
                boys,
                Data,
              }


      this.payload = timeTableData;

      this.clearFields();

      this.sendData();
      }
    })
  }
sendData(){
  apiRequest(apiRoutes.timetable.sendTimetableData, "POST", this.payload)
  .then((response)=>{
    this.addSuccessPopup();
    setTimeout(() => {
      this.connectedCallback();
    }, 3000);
  })
  .catch((error)=>{
    console.error("Error sending data, ",error);
  });
}

  clearFields() {
    const inputs = this.shadowRoot.querySelectorAll('input');
    const selects = this.shadowRoot.querySelectorAll('select');
    inputs.forEach(input => {
      input.value = "";
    });
    selects.forEach(select => {
      select.selectedIndex = 0;
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
    appendedPopup.data = "Timetable Added Successfully";
    absoluteDiv.classList.remove('hidden');
    setTimeout(() => {
      absoluteDiv.remove();
    }, 3000);
  }
  
}

const newTimeTable = customElements.define("new-timetable", newTimetable);
export default newTimeTable;