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
      console.log(this.feedbackData)
      this.feedbackData = feedbackData && feedbackData.data;
      this.addData();
      
    })
    .catch(err=>{
      console.log(err);
    })
  };
  addData(){
    const mainContainer = this.shadowRoot.querySelector('.main-main-container');
    
      console.log(this.data);
  }
  
}
const feedbackPageComponent = customElements.define('feedback-page', feedbackPage);
export default feedbackPageComponent;