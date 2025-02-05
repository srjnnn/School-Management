import { loadTemplate } from "../../../utils/loadTemplate.js";

class TimetablePage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: "open"});
    this.templateContent = "";
    this.tableData = null;
    this.reloadEvent = () =>{
      this.connectedCallback();
    }
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("templates/pages/Timetable.html");
    this.render();    

    
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
    this.addTable();
  }
  addTable(){
    const tableContainer = this.shadowRoot.querySelector('.tableContainer');
    const table = document.createElement('my-table');
    tableContainer.appendChild(table);
  }
 
 
  
}
const timetablePage = customElements.define('timetable-page', TimetablePage);
export default timetablePage;