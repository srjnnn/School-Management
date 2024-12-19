import { loadTemplate } from "../../../utils/loadTemplate.js";

class TimetablePage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: "open"});
    this.templateContent = "";
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("templates/pages/Timetable.html");
    this.render();
    this.addEventListners();
    
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
    const editButton = table.shadowRoot.querySelector('timetableEdit')
    editButton.addEventListener('click' ,()=>{
      alert('jfk')
    })

    
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
  addEventListners(){
    const editButton = this.shadowRoot.querySelector('.editButton');
    console.log(editButton);
   

  }
}
const timetablePage = customElements.define('timetable-page', TimetablePage);
export default timetablePage;