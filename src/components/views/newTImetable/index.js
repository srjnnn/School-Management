import { loadTemplate } from "../../../utils/loadTemplate.js";

 
class newTimetable extends HTMLElement {
  static route = "/new-timetable"
  constructor() {
    super();
    this.pageMode = "Create";
    this.attachShadow({ mode: "open" });
    this.templateContent = "";
  }
  async connectedCallback() {
    this.templateContent = await loadTemplate("templates/views/newTimetable.html");
    this.render();
    this.addTable();
    localStorage.setItem("pageMode",this.pageMode);
  }
  render() {
    this.shadowRoot.innerHTML = this.templateContent;

  }
  addTable() {
    const tableContainer = this.shadowRoot.querySelector('.tableContainer');
    const table = document.createElement('my-table');
    console.log("Table from the newTimetable : ",table);
    // const tableShadowRoot = table.shadowRoot;
    // console.log("Table ShadowRoot : ",tableShadowRoot);
    const tableEditDiv = table.querySelector('.editButton');
    console.log("TAble edit div : ",tableEditDiv);
    tableContainer.appendChild(table);

  }
  disconnectedCallback(){
    localStorage.removeItem("pageMode");
  }
  // static EditTable(tableElement){
  //   const tableShadowRoot = tableElement;
  //   const tableEditDiv = tableShadowRoot.shadowRoot.querySelector('.editButton');
  //   console.log("Table edit div : ",tableEditDiv);

  // }
  

}

const newTimeTable = customElements.define("new-timetable", newTimetable);
export default newTimeTable;