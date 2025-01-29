import { loadTemplate } from "../../../utils/loadTemplate.js";

class classNotesSumamry extends HTMLElement{
  constructor(){
    super();
    this.templateContent = "";
    this.attachShadow({mode : 'open'});
    this.data = null;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("templates/views/notesSummaryPage.html");
    this.render();
  }
  set data(value){
    this._data = value;
    if(this.shadowRoot){
      this.updateContent();
    }
  }
  get data(){
    return this._data;
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
    this.updateContent();
  }

  updateContent(){
    if(!this.data || !this.shadowRoot) return;
    // Method to update the content of the summary page

    const title = this.shadowRoot.querySelector('#titleContent');
    const summary = this.shadowRoot.querySelector("#summaryContent");
    const description = this.shadowRoot.querySelector("#descriptionContent");
    const file = this.shadowRoot.querySelector(".file");
    if(title && summary && description && file){

      title.textContent = this.data?.title ?? "Null";
      summary.textContent = this.data?.summary ?? "NULL";
      description.textContent = this.data?.description ?? "NULL";
    }


  }

}
const notesSummaryPage = customElements.define('notes-summary', classNotesSumamry);

export default notesSummaryPage;