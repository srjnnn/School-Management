import { loadTemplate } from "../../../utils/loadTemplate.js";
import apiRequest from "../../../utils/api.js";
import { apiRoutes } from "../../../globalConstants.js";

class DashboardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.dashboardPageContent = "";

    this.isLoading = false;
    this.error = false;

    this.storedData = localStorage.getItem("authResponse");
    this.data = JSON.parse(this.storedData);
  }

  async connectedCallback() {
    this.dashboardPageContent = await loadTemplate(
      "../public/templates/pages/Dashboard.html"
    );
    this.render();
    this.addContents();
  }

  render() {
    this.shadowRoot.innerHTML = this.dashboardPageContent;
  }

  
  updateContent() {
    const userSummary = this.shadowRoot.querySelector("my-usersummary");
    if (userSummary) {
      userSummary.data = this.data.userData.profile; // 
      // Pass the data as a property
    }
  }

  addContents() {
    // call and create all the customs element
    const userSummary = document.createElement("my-usersummary");
    const busSumamry = document.createElement("my-bussummary");
    const timeline = document.createElement("my-timeline");
    const upcomingEvents = document.createElement("my-upcomingevents");
    const recentClassNotes = document.createElement("my-notes");

    // get all the divs to append this custome elements
    const userSummaryContainer = this.shadowRoot.querySelector(
      ".userSummaryContainer"
    );
    const busSummaryContainer = this.shadowRoot.querySelector(
      ".busSummaryContainer"
    );
    const timeLineContainer =
      this.shadowRoot.querySelector(".timeLineContainer");
    const upcomingEventsContainer = this.shadowRoot.querySelector(
      ".upComingEventsContainer"
    );
    const recentClassNotesContainer = this.shadowRoot.querySelector(
      ".recentClassNotesContainer"
    );

    // Append the contents to the respective divs
    userSummaryContainer.appendChild(userSummary);
    busSummaryContainer.appendChild(busSumamry);
    timeLineContainer.appendChild(timeline);
    upcomingEventsContainer.appendChild(upcomingEvents);
    recentClassNotesContainer.appendChild(recentClassNotes);

    // Update the content 
    this.updateContent();
    }
}

const DashboardPageElement = customElements.define(
  "my-dashboard",
  DashboardComponent
);

export default DashboardPageElement;
