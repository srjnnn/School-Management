import { apiRoutes } from "../../../globalConstants.js";
import LoadPage from "../../../services/loadPages.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class upcomingEvents extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    this.upcomingEventsContent = "";
    this.data = null;
  }
  async connectedCallback(){
    this.upcomingEventsContent = await loadTemplate("../public/templates/views/upcomingEvents.html");
    this.render();
    this.getData();
  }
  validateUser(){
    if(sessionStorage.getItem("User")==="admin"){
      this.shadowRoot.querySelector("#edtBtn").classList.remove('hidden');
      // add the eventListners to the button ........7
      this.addEventListeners();
    }
  }
  render(){
    this.shadowRoot.innerHTML = this.upcomingEventsContent;
  }
  addEventListeners(){
    const editButton = this.shadowRoot.querySelector('#eventsEdit');
    editButton.addEventListener('click', ()=>{
        //  Take it to the new page .......
        this.renderNewPage();
        

    })
  }
  renderNewPage(){
    const path = "Add upcoming events"
    const hostElem = this.shadowRoot.getRootNode().host;
    const mainHostelem = hostElem.getRootNode().host
    const superHostElem = mainHostelem.getRootNode().host;
    LoadPage.renderPages("add-events", superHostElem);
    LoadPage.changeHeaderRoutes(superHostElem,path);
  }
  getData(){
    apiRequest(apiRoutes.events.postRoutes, "GET")
    .then(response =>{
      this.data = response.data.data;
      //  after fetching the data call the update contents method 
      this.updateContent();
    })
    .catch(err =>{
      console.error(err)
    })
  }

  // Update contents
  updateContent(){
    console.log(this.data)
    if(!this.data) return;

    console.log("Code has reacherd there ...")

    const container = this.shadowRoot.querySelector('.upcomingEventsContainer');
    container.innerHTML = "";

    // Create the top Header
     // Create the top header
     const topHeader = document.createElement('div');
     topHeader.classList.add('top-header');
     topHeader.innerHTML = `
       <div class="header">Upcoming Events This Month</div>
       <div class="editButton hidden" id="edtBtn"> 
         <button id="eventsEdit">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
             <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
           </svg>
           Edit
         </button>
       </div>
     `;


     container.appendChild(topHeader);
   
    //  Loop through the months and the events ......
    Object.keys(this.data).forEach((month) => {
      // Create month heading
      const monthContainer = document.createElement('div');
      monthContainer.classList.add('monthContainer');
      monthContainer.innerHTML = `<h1>${month}</h1>`;
      container.appendChild(monthContainer);

      // Create event entries
      this.data[month].forEach((event) => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('eventsDataContainer');
        eventElement.innerHTML = `
          <div class="dateContainer">${event.date}:</div>
          <div class="eventsContainer">${event.eventName}</div>
        `;
        container.appendChild(eventElement);
      });
    });
     this.validateUser();
  }
}
const upcomingevents = customElements.define("my-upcomingevents" , upcomingEvents);
export default upcomingevents;