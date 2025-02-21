import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class busDetails extends HTMLElement{
  constructor(){
    super();
    this.templateContent = "";
    this.attachShadow({mode:'open'});
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate('../public/templates/pages/BusDetails.html');
    this.render();
    this.addEventListeners();
    this.addBusSummaryBox();

  };
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  // add event listners 
  addEventListeners(){
    const anchors = this.shadowRoot.querySelectorAll('a');
    
    anchors.forEach((anchor)=>{
      anchor.addEventListener('click',()=>{
        const id = anchor.id;
        const activeAnchors = this.shadowRoot.querySelectorAll('.active');
        // Changing the header based on the click
        const header = this.shadowRoot.querySelector('#BusName');
        const textContent = anchor.text;
        header.innerHTML = textContent;
        activeAnchors.forEach((active)=>{
          active.classList.remove('active')
        })
        anchor.classList.add('active');
        this.fetchBusData(id);
      })
    })
  }
  // fetch bus id data :::::
  fetchBusData(busId){
  apiRequest(apiRoutes.bus.getBusById(busId), "GET")
  .then((response)=>{
    this.data = response.data && response.data[0];
    this.addBusSummaryBox();
  })
  .catch((error)=>{
    console.error(error);
  })
    
    
  }
  // Add the bus info 
  addBusSummaryBox(){
     const summaryContainer = this.shadowRoot.querySelector('.busInfo');
     summaryContainer.innerHTML = "";
     const busSummary = document.createElement('my-bussummary');
     busSummary.data = this.data;
     summaryContainer.appendChild(busSummary);
  }
  
}

const BusDetails = customElements.define('busdetails-page',busDetails);
export default BusDetails;
