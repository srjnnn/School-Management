import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class addClassNotes extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : 'open'});
    this.templateContent = ""
    this.payLoad = null;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate(
      "../public/templates/views/addNotes.html"
    );
    this.render();
    this.addEventListeners();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  // Add event Listners
  addEventListeners(){
    const submitButton = this.shadowRoot.querySelector('#submit')
    submitButton.addEventListener('click',()=>{
      //  Get the value of all the fields 
      const Title = this.shadowRoot.querySelector('#title').value.trim();
      const Summary = this.shadowRoot.querySelector('#summary').value.trim();
      const Description = this.shadowRoot.querySelector('#Description').value.trim();
      const Subject = this.shadowRoot.querySelector('#notesSubject').value;
      const Class = this.shadowRoot.querySelector('#Class').value;
      const Section = this.shadowRoot.querySelector('#NotesSection').value;
      // make sure every value is received 
      if(Title === ""||Summary=== ""||Description===""|| Subject==="null" || Class==="null" || Section ==="null" ){
        alert("make sure you fill all the fields")
      }else{
        // Send the data to the backend 
        const notesData = {};
        notesData.Class = Class;
        notesData.Title = Title;
        notesData.Description = Description;
        notesData.Subject = Subject;
        notesData.Section = Section;
        notesData.Summary = Summary;
        
        // Load the data to the payload
        this.payLoad = notesData;
        this.sendData();

      }
    })
  }
  sendData(){
    apiRequest(apiRoutes.classNotes.sendClassNotesData,"POST", this.payLoad)
    .then((response)=>{
      Common.addSuccessPopup(this.shadowRoot, "Successfully added Notes");
    })
    .catch((error)=>{
      console.error("Error sending data to the backend")
    })
  }
}
const addclassNotes = customElements.define('add-notes', addClassNotes);
export default addclassNotes;