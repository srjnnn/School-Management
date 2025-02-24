import { loadTemplate } from "../../../utils/loadTemplate.js";

class recentClassNotes extends HTMLElement{
  static get observerAttributes(){
    return['height','width'];
  }
  constructor(){
    super();
    this.attachShadow({mode : "open"});
    this.recentClassNotesContent = "";
  }

  async connectedCallback(){
    this.recentClassNotesContent = await loadTemplate("../public/templates/views/recentClassNotes.html");
    this.render();
    this.addCards();
    this.applyAttr();
  }
  render(){
    this.shadowRoot.innerHTML = this.recentClassNotesContent;
  }
  addCards(){
    const card =  document.createElement('my-card');
    const cardContainer = this.shadowRoot.querySelector('.cardContainer');
    cardContainer.appendChild(card);
  }
  attributeChangedCallback(name , oldValue, newValue){
    this.applyAttr();

  }
  applyAttr(){
    const recentClassnotes = this.shadowRoot.querySelector('.recentClassNotesContainer');
    if(!recentClassnotes) return;
    // update the class notes height width based on the provided space 
    const height = this.getAttribute('height');
    const width =  this.getAttribute('width');

    if(height) recentClassnotes.style.height = height;
    if(width) recentClassnotes.style.width =  width;
  }
  setAttr({height,width}){
    if(height) this.setAttribute("height" , height);
    if(width) this.setAttribute("width" , width);
  }
}
const RecentClassNotes = customElements.define("my-notes" , recentClassNotes);
export default RecentClassNotes;