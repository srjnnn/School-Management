import { loadTemplate } from "../../../utils/loadTemplate.js";

class recentClassNotes extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : "open"});
    this.recentClassNotesContent = "";
  }
  async connectedCallback(){
    this.recentClassNotesContent = await loadTemplate("templates/views/recentClassNotes.html");
    this.render();
    this.addCards();
  }
  render(){
    this.shadowRoot.innerHTML = this.recentClassNotesContent;
  }
  addCards(){
    const card =  document.createElement('my-card');
    const cardContainer = this.shadowRoot.querySelector('.cardContainer');
    cardContainer.appendChild(card);
  }
}
const RecentClassNotes = customElements.define("my-notes" , recentClassNotes);
export default RecentClassNotes;