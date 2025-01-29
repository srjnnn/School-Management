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

    this.testData = null;
  }

  async connectedCallback() {
    this.dashboardPageContent = await loadTemplate(
      "templates/pages/Dashboard.html"
    );
    this.render();
    this.fetchData();
    this.addContents();
  }

  render() {
    this.shadowRoot.innerHTML = this.dashboardPageContent;
  }

  fetchData() {
    apiRequest(apiRoutes.test.getAllTestData, "GET")
      .then((testData) => {
        this.testData = testData && testData.data && testData.data[0];
        this.updateContent();
      })
      .catch((error) => console.error("error fetching data", error));

  }
  
  updateContent() {
    const userSummary = this.shadowRoot.querySelector("my-usersummary");
    if (userSummary) {
      userSummary.data = this.testData; // 
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
  }
}

const DashboardPageElement = customElements.define(
  "my-dashboard",
  DashboardComponent
);

export default DashboardPageElement;
