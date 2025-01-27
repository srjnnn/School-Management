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
    const SaveButton = this.shadowRoot.querySelector('#Save');
    const CancelButton = this.shadowRoot.querySelector('#cancel');

    SaveButton.addEventListener('click', () => {
      const name = this.shadowRoot.querySelector('#Name').value.trim();
      const gender = this.shadowRoot.querySelector('#gender').value.trim();
      const subject = this.shadowRoot.querySelector('#subject').value.trim();
      const attendence = this.shadowRoot.querySelector('#teachersAttendance').value.trim();
      const userName = this.shadowRoot.querySelector('#userName').value.trim();
      const Address = this.shadowRoot.querySelector("#address").value.trim();
      const Bus = this.shadowRoot.querySelector('#bus').value.trim();
      const pickupAddress = this.shadowRoot.querySelector('#pickup').value.trim();
      const dropoffAddress = this.shadowRoot.querySelector('#drop').value.trim();
      const Contact = this.shadowRoot.querySelector('#contact').value.trim();
      const classes = this.shadowRoot.querySelector("#classSections").value.trim();
      const id = this.shadowRoot.querySelector('#ID').value.trim();

      // Validate all fields
      if (!name || !gender || !subject || !attendence || !userName || !Address || !Bus ||  !Contact || !classes || !id) {
        alert("All fields are required. Please fill in all the details.");
        return;
      }

      // Pack the data in the object
      const teachersData = {
        attendence,
        subject,
        gender,
        fullname: name,
        classes,
        username: userName,
        address: Address,
        bus: Bus,
        pickup: pickupAddress,
        drop: dropoffAddress,
        phone: Contact,
        id,
      };

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
        console.log("Data sent successfully:", response);
        this.addSuccessPopup(response);
      })
      .catch((error) => {
        console.error("Error sending data", error);
      });
  }

  addSuccessPopup(response) {
    const absoluteDiv = document.createElement('div');
    absoluteDiv.id = "absoluteDiv";
    absoluteDiv.className = "absoluteDiv";
    const popup = document.createElement("success-popup");
    absoluteDiv.appendChild(popup);
    this.shadowRoot.appendChild(absoluteDiv);
    const appendedPopup = this.shadowRoot.querySelector("success-popup");
    appendedPopup.setAttribute("data-message", response);
    absoluteDiv.classList.remove('hidden');
    setTimeout(() => {
      absoluteDiv.remove();
    }, 3000);
  }
}

const addNewTeachersPage = customElements.define('add-newteachers', addNewTeachers);
export default addNewTeachersPage;
