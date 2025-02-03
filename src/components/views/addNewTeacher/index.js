import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class addNewTeachers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.tempateContent = "";
    this.payload = null;
  }

  async connectedCallback() {
    this.tempateContent = await loadTemplate("templates/views/addNewTeachersPage.html");
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = this.tempateContent;
  }

  addEventListeners() {
    const SaveButton = this.shadowRoot.querySelector('#submit');
    const CancelButton = this.shadowRoot.querySelector('#reset');

    SaveButton.addEventListener('click', () => {
      const name = this.shadowRoot.querySelector('#Name').value;
      const gender = this.shadowRoot.querySelector('#gender').value;
      const subject = this.shadowRoot.querySelector('#subject').value ;
      const attendence = this.shadowRoot.querySelector('#teachersAttendance').value ;
      const userName = this.shadowRoot.querySelector('#userName').value ;
      const Address = this.shadowRoot.querySelector("#address").value ;
      const Bus = this.shadowRoot.querySelector('#bus').value ;
      const pickupAddress = this.shadowRoot.querySelector('#pickup').value ;
      const dropoffAddress = this.shadowRoot.querySelector('#drop').value ;
      const Contact = this.shadowRoot.querySelector('#contact').value ;
      const classes = this.shadowRoot.querySelector("#classes").value ;
      const section = this.shadowRoot.querySelector('#sections').value ;
      const id = this.shadowRoot.querySelector('#ID').value ;

      // Validate all fields
      if (!name || !gender || !subject || !attendence || !userName || !Address || !Bus ||  !Contact || !classes || !id || !section) {
        alert("All fields are required. Please fill in all the details.");
        return;
      }

      // Pack the data in the object
      const teachersData = {}
        teachersData.attendence = attendence;
        teachersData.subject = subject;
        teachersData.gender = gender;
        teachersData.fullname= name;
        teachersData.classes =classes;
        teachersData.username= userName;
        teachersData.address= Address;
        teachersData.bus=Bus;
        teachersData.pickup= pickupAddress;
        teachersData.drop=dropoffAddress;
        teachersData.phone= Contact;
        teachersData.id = id;
        teachersData.section = section;

      console.log("Teachers data:", teachersData);
      this.payload = teachersData;

      // Clear inputs
      this.clearFields();

      // Send data
      this.sendData();
    });

    CancelButton.addEventListener('click', () => {
      this.clearFields();
    });
  }

  clearFields() {
    const inputs = this.shadowRoot.querySelectorAll('input');
    const selects = this.shadowRoot.querySelectorAll('select');
    inputs.forEach(input => {
      input.value = "";
    });
    selects.forEach(select => {
      select.selectedIndex = 0;
    });
  }

  sendData() {
    apiRequest(apiRoutes.teachers.sendTeachersData, "POST", this.payload)
      .then((response) => {
        this.addSuccessPopup();
      })
      .catch((error) => {
        console.error("Error sending data", error);
      });
  }

  addSuccessPopup() {
    const absoluteDiv = document.createElement('div');
    absoluteDiv.id = "absoluteDiv";
    absoluteDiv.className = "absoluteDiv";
    const popup = document.createElement("success-popup");
    absoluteDiv.appendChild(popup);
    this.shadowRoot.appendChild(absoluteDiv);
    const appendedPopup = this.shadowRoot.querySelector("success-popup");
    appendedPopup.data = "Successfully added a new teacher";
    absoluteDiv.classList.remove('hidden');
    setTimeout(() => {
      absoluteDiv.remove();
    }, 3000);
  }
}

const addNewTeachersPage = customElements.define('add-newteachers', addNewTeachers);
export default addNewTeachersPage;
