import LoadPage from "../../../services/loadPages.js";
import RestrictUser from "../../../services/restrictUser.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class classNotes extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : 'open'});
    this.templateContent = "";
  }

  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/pages/ClassNotesPage.html");
    this.render();
    this.addNotes();
    if(RestrictUser.IdentifyUserType() === true){
      this.addEventListners();
      // Make the access visible
      const selectByClass = this.shadowRoot.querySelector('#class');
      const addNotesButton = this.shadowRoot.querySelector('#addNotes');
      selectByClass.classList.remove('hidden');
      addNotesButton.classList.remove('hidden');
      
    }
    
  }

  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  };
  addEventListners(){
    // Add eventistnes to the 
    const addButton = this.shadowRoot.querySelector('#addNotes');
    addButton.addEventListener('click',()=>{

      const hostElement = this.shadowRoot.getRootNode().host
      const mainHostElement = hostElement.getRootNode().host;
      LoadPage.renderPages('add-notes',mainHostElement);
      LoadPage.changeHeaderRoutes(mainHostElement,"Add class Notes");
    })
  }
  addNotes(){
    const classNotesContainer = this.shadowRoot.querySelector('.classNotesContainer');
    const classNotesCard = document.createElement('class-notes');
    classNotesContainer.appendChild(classNotesCard);
  }

}
const ClassNotes = customElements.define('classnotes-page',classNotes);
export default ClassNotes;