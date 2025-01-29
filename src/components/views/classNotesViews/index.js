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
  this.templateContent = await loadTemplate('templates/views/classNotesViews.html');
  this.render();
  this.fetchData();
}

render(){
  this.shadowRoot.innerHTML = this.templateContent;
}

addCards(){
  
  const notesContainer = this.shadowRoot.querySelector('.notesContainer');
  // Append the data in the card and add the event listners to all the cards
  this.data.forEach(data => {
    const card = document.createElement('my-card');
    notesContainer.appendChild(card);
    card.data = data;
    card.addEventListener('click',()=>{
      const hostElement = this.getHostElem();
      // Open the summary page for the specific card

      // Make the new div and pass the required data to the page based on the card clicked 
      // LoadPage.renderPages("notes-summary",hostElement);
      LoadPage.changeHeaderRoutes(hostElement,"Notes Summary Page");
       
      // Get the summaryPage 
      const summaryPage = document.createElement('notes-summary');
      const mainContentContainer = hostElement.shadowRoot.querySelector('#main-content-container');
      summaryPage.data = data;
      
      console.log(mainContentContainer);
      mainContentContainer.replaceChildren();

      mainContentContainer.appendChild(summaryPage);
      

      // const SummaryPage = hostElement.querySelector('notes-summary')
      // alert(card.data.title);
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
fetchData(){
  apiRequest(apiRoutes.classNotes.getAllClassNotes, "GET")
  .then((notesData)=>{
    this.data = notesData && notesData.data;
    // append the notes for every data 
    this.addCards();
  })
}

}
const ClassNotes = customElements.define('class-notes',classNotes);
export default ClassNotes;