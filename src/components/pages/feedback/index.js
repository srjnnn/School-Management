import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";
import { apiRoutes } from "../../../globalConstants.js";
class feedbackPage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = "";
    this.feedbackData = null;
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate('../public/templates/pages/feedbackPage.html');
    this.render();
    this.getFeedbackData();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  getFeedbackData(){
    apiRequest(apiRoutes.feedback.getFeedbackData, "GET")
    .then(feedbackData=>{
      this.feedbackData = feedbackData && feedbackData.data;
      this.addData();
      
    })
    .catch(err=>{
      console.log(err);
    })
  };
  addData(){
    const mainContainer = this.shadowRoot.querySelector('.main-container');
     this.feedbackData.forEach(data => {
      const div = document.createElement('div');
      div.className = "card";

      div.innerHTML = `
           ${data.your_feedback};
           <br>
           <br>
            <span class="author"><i> By: ${data.name} </i></span>
      `

    mainContainer.innerHTML += div.outerHTML;
      
     });
  }
  
}
const feedbackPageComponent = customElements.define('feedback-page', feedbackPage);
export default feedbackPageComponent;