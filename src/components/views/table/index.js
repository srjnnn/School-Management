import { loadTemplate } from "../../../utils/loadTemplate.js";

class table extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : "open"});
    this.tableContent = "";
  }
  async connectedCallback(){
    this.tableContent = await loadTemplate("templates/views/table.html");
    this.render();
    this.addEventListeners();
  }
  render(){
    this.shadowRoot.innerHTML = this.tableContent;
  }
  addEventListeners() {
    const popup = this.shadowRoot.querySelector('#editButtonPopup');
    const editButton = this.shadowRoot.querySelector('#timetableEdit');
    const crossImage = this.shadowRoot.querySelector('#cross-img');
  
    // Toggle popup visibility
    editButton.addEventListener('click', () => {
      console.log("Edit button clicked");
      popup.classList.remove('hidden');
    });
  
    // Close popup
    crossImage.addEventListener('click', () => {
      console.log("Close icon clicked");
      popup.classList.add('hidden');
    });
  }
  

}
const Table = customElements.define('my-table', table);
export default Table;