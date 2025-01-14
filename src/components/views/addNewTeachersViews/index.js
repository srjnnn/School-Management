import { loadTemplate } from "../../../utils/loadTemplate.js";

class classNotes extends HTMLElement{
constructor(){
  super();
  this.attachShadow({mode : 'open'});
  this.templateContent = "";
}

async connectedCallback(){
  this.templateContent = await loadTemplate('templates/views/classNotesViews.html');
  this.render();
  this.addCards();
}

render(){
  this.shadowRoot.innerHTML = this.templateContent;
}

addCards(){
  const cards = document.createElement('my-card');
  console.log(cards);
  const notesContainer = this.shadowRoot.querySelector('.notesContainer');
  notesContainer.appendChild(cards);
}

}
const ClassNotes = customElements.define('class-notes',classNotes);
export default ClassNotes;