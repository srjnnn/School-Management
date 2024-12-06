import { loadTemplate } from "../../../utils/loadTemplate.js";

class DashboardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.dashboardPageContent = '';
  }

  async connectedCallback() {
    this.dashboardPageContent = await loadTemplate(
      "templates/pages/Dashboard.html"
    )
    this.render();
    this.addContents();
   
  }

  render() {
    this.shadowRoot.innerHTML = this.dashboardPageContent;
   
  }
  addContents(){
    // call and create all the customs element 
    const userSummary = document.createElement('my-usersummary');
    const busSumamry = document.createElement('my-bussummary');
    const timeline = document.createElement('my-timeline');

    // get all the divs to append this custome elements 
    const userSummaryContainer = this.shadowRoot.querySelector('.userSummaryContainer');
    const busSummaryContainer = this.shadowRoot.querySelector('.busSummaryContainer');
    const timeLineContainer = this.shadowRoot.querySelector('.timeLineContainer');

    // Append the contents to the respective divs 
    userSummaryContainer.appendChild(userSummary);
    busSummaryContainer.appendChild(busSumamry);
    timeLineContainer.appendChild(timeline);
    console.log(busSumamry);

  }

}

const DashboardPageElement = customElements.define("my-dashboard", DashboardComponent);

export default DashboardPageElement;