import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
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
      "templates/views/addNotes.html"
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
      this.addSuccessPopup();
    })
    .catch((error)=>{
      console.error("Error sending data to the backend")
    })
  }
  addSuccessPopup(){
    const absoluteDiv = document.createElement('div');
    absoluteDiv.id = "absoluteDiv";
    absoluteDiv.className = "absoluteDiv";
    const popup = document.createElement("success-popup");
    absoluteDiv.appendChild(popup);
    this.shadowRoot.appendChild(absoluteDiv);
    const appendedPopup = this.shadowRoot.querySelector("success-popup");
    // Send the response here 
    appendedPopup.data = "Successfylly added Notes"
    absoluteDiv.classList.remove('hidden');
    setTimeout(() => {
    absoluteDiv.remove();
    }, 3000);
  }
}
const addclassNotes = customElements.define('add-notes', addClassNotes);
export default addclassNotes;