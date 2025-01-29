import { loadTemplate } from "../../../utils/loadTemplate.js";
class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.cardComponentContent = "";
    this.data = null;
  }

  async connectedCallback() {
    this.cardComponentContent = await loadTemplate('templates/elements/notesCard.html');
    this.render();


  }
  set data(value){
    this._data= value;
    if(this.shadowRoot){
    this.updateContent();
      
    }

  }
  get data(){
    return this._data;
  }

  render() {
    this.shadowRoot.innerHTML = this.cardComponentContent;
    this.updateContent();

  }
  // Update the contents of the card
  updateContent(){
    if(!this.data || !this.shadowRoot) return;
    const subject = this.shadowRoot.querySelector("#subject");
    const teacherName = this.shadowRoot.querySelector("#teacherName");
    const title = this.shadowRoot.querySelector("#title");
    const date = this.shadowRoot.querySelector("#date");
       
    // Change the data content 
     
    if(subject){
       subject.textContent = this.data?.subject ?? "NULL"
    }
    if(teacherName){
      teacherName.textContent = this.data?.teacher ?? "NULL";

    }
    if(title){
    title.textContent = this.data?.title ?? "NULL";
        
    }
    if(date){
    date.textContent = this.data?.created_at ?? "NULL";
      
    }
  }

  
}

const CardElement = customElements.define("my-card", CardComponent);

export default CardElement;
