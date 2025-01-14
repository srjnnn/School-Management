import { loadTemplate } from "../../../utils/loadTemplate.js";

class busDetails extends HTMLElement{
  constructor(){
    super();
    this.templateContent = "";
    this.attachShadow({mode:'open'});
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate('templates/pages/BusDetails.html');
    this.render();
    this.addEventListeners();
    this.addSummaryBox();
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
        const activeAnchors = this.shadowRoot.querySelectorAll('.active');
        // Changing the header based on the click
        const header = this.shadowRoot.querySelector('#BusName');
        const textContent = anchor.text;
        header.innerHTML = textContent;
        activeAnchors.forEach((active)=>{
          active.classList.remove('active')
        })
        anchor.classList.add('active');

      })
    })
  }
  // Drivers Summary Box
  addSummaryBox(){
    const userSUmmaryBox = document.createElement('my-usersummary');
    const summaryContainer = this.shadowRoot.querySelector('.driversSummary');
    summaryContainer.appendChild(userSUmmaryBox);
  }
  // Update the datas of the table 
  updateTable(){

  }
  // Add the bus info 
  addBusSummaryBox(){
     const summaryContainer = this.shadowRoot.querySelector('.busInfo');
     const busSummary = document.createElement('my-bussummary');
     summaryContainer.appendChild(busSummary);
  }
  
}

const BusDetails = customElements.define('busdetails-page',busDetails);
export default BusDetails;
