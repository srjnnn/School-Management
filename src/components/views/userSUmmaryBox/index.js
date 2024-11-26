import { loadTemplate } from "../../../utils/loadTemplate.js";

class userSummary extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    this.userSummaryContent ="";
  }
  async connectedCallback(){
    this.userSummaryContent = await loadTemplate(
      "templates/views/userSummaryBox.html"
    )
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.userSummaryContent;


  }
}
const usrSummary = customElements.define("my-usersummary" , userSummary);
export default usrSummary;