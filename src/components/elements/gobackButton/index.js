import LoadPage from "../../../services/loadPages.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class gobackButton extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : "open"});
    this.templateContent = "";
    this.data = null;
  }
  set data(value){
    this._data = value;
    if(this.shadowRoot && this.shadowRoot.innerHTML){
      this.trigger();
    }
  }
  get data(){
    return this._data
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/elements/gobackButton.html");
    this.render();
    this.trigger();

  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }


  trigger(){
    if(this.data && this.shadowRoot){
      this.addEventListeners();
    }
  }

  addEventListeners(){
      const button = this.shadowRoot.querySelector('#back');
      button.addEventListener('click',()=>{
        button.classList.add('hidden');
        // get the custom elems and the header of the page  from the data
        const hostelem = Common.getHostElem(this.shadowRoot);

       if(hostelem){
        LoadPage.renderPages(this.data.elem, hostelem); 
        LoadPage.changeHeaderRoutes(hostelem, this.data.header);
       }

      })
  }


}
const backButton = customElements.define("go-back", gobackButton);
export default backButton;
