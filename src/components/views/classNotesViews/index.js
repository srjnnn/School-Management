import { apiRoutes } from "../../../globalConstants.js";
import LoadPage from "../../../services/loadPages.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class classNotes extends HTMLElement{
constructor(){
  super();
  this.attachShadow({mode : 'open'});
  this.templateContent = "";
  this.data = null;
}

async connectedCallback(){
  this.templateContent = await loadTemplate('../public/templates/views/classNotesViews.html');
  this.render();
}

set data(value) {
  this._data = value;
  if(this._data){
    this.updateContent(); 
  }
}
get data(){
  return this._data;
}

updateContent(){
  this.addCards();
  this._data = null;
}

render(){
  this.shadowRoot.innerHTML = this.templateContent;
}
addCards(){
  
  const notesContainer = this.shadowRoot.querySelector('.notesContainer');
  notesContainer.innerHTML = "";
  this.data.forEach(data => {
    const card = document.createElement('my-card');
    notesContainer.appendChild(card);
    card.data = data;
    card.addEventListener('click',()=>{
      const hostElement = this.getHostElem();

      LoadPage.changeHeaderRoutes(hostElement,"Notes Summary Page");
       
      // Get the summaryPage 
      const summaryPage = document.createElement('notes-summary');
      const mainContentContainer = hostElement.shadowRoot.querySelector('#main-content-container');
      summaryPage.data = data;
      
      mainContentContainer.replaceChildren();

      mainContentContainer.appendChild(summaryPage);
    })

  });

}

// Get host elem
getHostElem(){
  const host = this.shadowRoot.getRootNode().host;
  const mainHost = host.getRootNode().host;
  const superHost = mainHost.getRootNode().host;
  // const superSuperHost = superHost.getRootNode().host;
  // const supermainHost = mainHost
  console.log();
  return superHost;
}
}
const ClassNotes = customElements.define('class-notes',classNotes);
export default ClassNotes;