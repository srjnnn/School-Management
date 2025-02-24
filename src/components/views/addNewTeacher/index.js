import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class addNewTeachers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.tempateContent = "";
    this.payload = null;
  }

  async connectedCallback() {
    this.tempateContent = await loadTemplate("../public/templates/views/addNewTeachersPage.html");
    this.render();
    this.addEventListeners();
    this.addGoBackButton();
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
      const attendence = this.shadowRoot.querySelector('#attendence').value ;
      const userName = this.shadowRoot.querySelector('#userName').value ;
      const Address = this.shadowRoot.querySelector("#address").value ;
      const Bus = this.shadowRoot.querySelector('#bus').value ;
      const pickupAddress = this.shadowRoot.querySelector('#pickup').value ;
      const dropoffAddress = this.shadowRoot.querySelector('#drop').value ;
      const Contact = this.shadowRoot.querySelector('#contact').value ;
      const id = this.shadowRoot.querySelector('#ID').value ;
      const email = this.shadowRoot.querySelector('#email').value

      // Validate all fields
      if (!name || !gender  || !attendence || !userName || !Address  ||  !Contact  || !id || !email || !userName) {
        alert("All fields are required. Please fill in all the details.");
        return;
      }

      // Pack the data in the object
      const teachersData = {}
        teachersData.attendence = attendence;
        teachersData.gender = gender;
        teachersData.fullname= name;
        teachersData.username= userName;
        teachersData.address= Address;
        teachersData.bus=Bus;
        teachersData.pickup= pickupAddress;
        teachersData.drop=dropoffAddress;
        teachersData.phone= Contact;
        teachersData.email = email;
        teachersData.id = id;
        teachersData.password = Common.generateRandomPass();

      this.payload = teachersData;

      // Clear inputs
      // this.clearFields();

      // Send data
      this.sendData(teachersData);
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

  sendData(teachersData) {
    apiRequest(apiRoutes.teachers.sendTeachersData, "POST", this.payload)
      .then((response) => {
        Common.addSuccessPopup(this.shadowRoot,`Successfully added Teacher, Email : ${teachersData.email}, Password : ${teachersData.password}`,10000);
      })
      .catch((error) => {
        console.error(error);
        Common.addErrorPopup(this.shadowRoot,"Error Adding new Teacher");
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
  addGoBackButton(){
    const gobackButton = document.createElement("go-back");
    const hostElem = Common.getHostElem(this.shadowRoot);
    const backButtonContainer = hostElem.shadowRoot.querySelector ("#backButtonContainer");
    // backButtonContainer.innerHTML = ""
    if(backButtonContainer){
      backButtonContainer.appendChild(gobackButton);
      gobackButton.data = {
        elem : "my-teachers",
        header : "TEACHERS"
      }
    }

  }
}

const addNewTeachersPage = customElements.define('add-newteachers', addNewTeachers);
export default addNewTeachersPage;
