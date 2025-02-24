import { loadTemplate } from "../../../utils/loadTemplate.js";

class busSummary extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.busSummaryContent = '';
    this.data = null;
  }
  async connectedCallback(){
    this.busSummaryContent = await loadTemplate(
      "../public/templates/views/busSummaryBox.html"
    );
    this.render();

  }
  set data(value) {
    this._data = value;
    this.updateContent(); 
  }
  get data(){
    return this._data;
  }
  render(){
    this.shadowRoot.innerHTML = this.busSummaryContent;
    this.updateContent(); 

  }
  updateContent(){
    if(this.data && this.shadowRoot){
    // get the fields and update the contents ...........
    const busId = this.shadowRoot.querySelector('#bus-numberValue')
    const plate = this.shadowRoot.querySelector('#bus-numberPlateValue');
    const driver = this.shadowRoot.querySelector('#bus-driver');
    const driversContact  = this.shadowRoot.querySelector('#bus-driverContactValue');
    const seats = this.shadowRoot.querySelector('#bus-seats');
    
    if(busId) busId.textContent = this.data.id || "N/A";
    // Setting up the necessary valaue : 
   if(plate) plate.textContent = this.data.number_plate || "N/A";
    if(driver)driver.textContent= this.data.driver || "N/A";
    if(driversContact)driversContact.textContent = this.data.contact || "N/A";
    if(seats)seats.textContent = this.data.seats || "N/A";
    
  }
  }
}
const busSmmry = customElements.define("my-bussummary" , busSummary);
export default busSmmry;