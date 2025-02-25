import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class classNotesSumamry extends HTMLElement{
  constructor(){
    super();
    this.templateContent = "";
    this.attachShadow({mode : 'open'});
    this.data = null;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/views/notesSummaryPage.html");
    this.render();
    this.addGoBackButton();
  }
  set data(value) {
    if (this._data !== value) {
      this._data = value;
  
      // Ensure shadowRoot exists before calling methods that use it
      if (this.shadowRoot && this.shadowRoot.innerHTML) {
        this.updateContent();
      }
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
    const file = this.shadowRoot.querySelector("#file");
    if(title && summary && description && file){

      title.textContent = this.data?.title ?? "Null";
      summary.textContent = this.data?.summary ?? "NULL";
      description.textContent = this.data?.description ?? "NULL";
      if(this.data.file_type.startsWith("image/") ){
        file.innerHTML = "";
        file.innerHTML = `<img src="${this.data.file_url}" alt = "Note Image" width = "200" />
        <br>
        <br>
        <a href="${this.data.file_url}" class="download-btn" download target = "_blank">
  <span class="icon">⬇️</span>
  <span>Download</span>
</a>
        `;
      }else if(this.data.file_type==="application/pdf"){
        file.innerHTML = `
        <iframe src="${this.data.file_url}" width="100%" height="1000px"></iframe>
            <br>
            <a href="${this.data.file_url}" target="_blank">View PDF in New Page</a>
        `
      }
    }


  }
  addGoBackButton(){
    const gobackButton = document.createElement("go-back");
    const hostElem = Common.getHostElem(this.shadowRoot);
    const backButtonContainer = hostElem.shadowRoot.querySelector ("#backButtonContainer");
    backButtonContainer.innerHTML = ""
    if(backButtonContainer){
      backButtonContainer.appendChild(gobackButton);
      gobackButton.data = {
        elem : "classnotes-page",
        header : "Class Notes"
      }
    };
  }

}
const notesSummaryPage = customElements.define('notes-summary', classNotesSumamry);

export default notesSummaryPage;