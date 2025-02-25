import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class addUpcomingEvents extends HTMLElement {
  constructor() {
    super();
    this.templateContent = "";
    this.data = null;
    this.events = {};
    this.attachShadow({ mode: "open" });
    this.addedEventListners = false;
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate("../public/templates/views/upcomingEventsAddpage.html");
    this.render();
    this.addGoBackButton();
    
    await this.getData(); // Fetch existing data before adding listeners

    this.shadowRoot.querySelector("#addEvents").addEventListener("click", () => {
      this.addEvent();
      if (!this.addedEventListners) {
        this.addEventListeners();
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
  }

  addEvent() {
    const month = this.shadowRoot.getElementById("month").value;
    const date = this.shadowRoot.getElementById("date").value;
    const eventName = this.shadowRoot.getElementById("event").value;

    if (!date || !eventName) return;

    if (!this.events[month]) this.events[month] = [];
    this.events[month].push({ date, eventName });

    this.renderEvents();
  }

  renderEvents() {
    const eventList = this.shadowRoot.getElementById("eventsList");
    eventList.innerHTML = "";

    for (const month in this.events) {
      let monthSection = `<div class="monthContainer"><h1>${month}</h1></div>`;
      
      this.events[month].forEach((event, index) => {
        monthSection += `
        <div class='eventsDataContainer' data-month="${month}" data-index="${index}">
            <div class='dateContainer' contenteditable="true">${event.date}</div>
            <div class='eventsContainer' contenteditable="true">${event.eventName}</div>
        </div>`;
      });

      eventList.innerHTML += monthSection;
    }
  }

  addEventListeners() {
    this.addedEventListners = true;
    this.shadowRoot.querySelector("#saveBtn").addEventListener("click", () => {
      this.updateEvents();
    });
  }

  // First get the data ......
  async getData() {
    try {
      const response = await apiRequest(apiRoutes.events.postRoutes, "GET");
      if (response?.data?.data) {
        this.events = response.data.data;
        this.renderEvents(); // Load fetched data into UI
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  updateEvents() {
    const updatedEvents = {};

    const eventContainers = this.shadowRoot.querySelectorAll(".eventsDataContainer");
    eventContainers.forEach((container) => {
      const month = container.getAttribute("data-month");
      const index = container.getAttribute("data-index");
      const dateElement = container.querySelector(".dateContainer");
      const eventElement = container.querySelector(".eventsContainer");

      if (!updatedEvents[month]) updatedEvents[month] = [];
      updatedEvents[month].push({
        date: dateElement.textContent.trim(),
        eventName: eventElement.textContent.trim(),
      });
    });

    this.events = updatedEvents;
    this.sendData();
  }

  sendData() {
    const payLoad = { events: this.events };

    apiRequest(apiRoutes.events.postRoutes, "PATCH", payLoad)
      .then((res) => {
        Common.addSuccessPopup(this.shadowRoot, "Successfully updated the events!");
      })
      .catch((err) => {
        Common.addErrorPopup(this.shadowRoot, "Error updating events.");
        console.error(err);
      });
  }
  addGoBackButton(){
    const gobackButton = document.createElement("go-back");
    const hostElem = Common.getHostElem(this.shadowRoot);
    const backButtonContainer = hostElem.shadowRoot.querySelector ("#backButtonContainer");
    backButtonContainer.innerHTML = ""
    if(backButtonContainer){
      backButtonContainer.appendChild(gobackButton);
      gobackButton.data = {
        elem : "my-dashboard",
        header : "DASHBOOARD"
      }
    };
  }
}

export const AddUpcomingEvents = customElements.define("add-events", addUpcomingEvents);
export default AddUpcomingEvents;
