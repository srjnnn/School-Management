import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class addNewTeachers extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.tempateContent = "";
    this.payload = null;
  }

  async connectedCallback(){
    this.tempateContent = await loadTemplate("templates/views/addNewTeachersPage.html");
    this.render();
    this.addEventListeners();

  }
  render(){
    this.shadowRoot.innerHTML =  this.tempateContent;
  }
  // Add event listners 
  addEventListeners(){
    const SaveButton = this.shadowRoot.querySelector('#Save');
    const CancelButton = this.shadowRoot.querySelector('#cancel');

    // save Button on click ==== > collect all the data and form into object 
    SaveButton.addEventListener('click',()=>{
      // Get all the fields value 
      const name = this.shadowRoot.querySelector('#Name').value;
      const gender = this.shadowRoot.querySelector('#gender').value;
      const subject = this.shadowRoot.querySelector('#subject').value;
      const attendence = this.shadowRoot.querySelector('#teachersAttendence').value;
      const userName = this.shadowRoot.querySelector('#userName').value;
      const Address = this.shadowRoot.querySelector("#address").value;
      const Bus = this.shadowRoot.querySelector('#bus').value;
      const pickupAddress = this.shadowRoot.querySelector('#pickup').value;
      const dropoffAddress = this.shadowRoot.querySelector('#drop').value;
      const Contact = this.shadowRoot.querySelector('#contact').value;
      const image = this.shadowRoot.querySelector('#imageUpload').value
      const classes = this.shadowRoot.querySelector("#classSections").value;
      const id = this.shadowRoot.querySelector('#ID').value;
         // Pack the data in the object
    const studentsData = {};
    studentsData.fullName = name;
    studentsData.Class = Class;
    studentsData.Section = Section;
    studentsData.rollNumber = rollNumber;
    studentsData.userName = userName;
    studentsData.Address = Address;
    studentsData.Bus = Bus;
    studentsData.pickupAddress = pickupAddress;
    studentsData.dropoffAddress = dropoffAddress;
    studentsData.Contact = Contact;
    studentsData.id = id;
    // Not sending the image 
    console.log("Students DAta : ",studentsData);
    this.payload = studentsData;
    })







    // Cancel Button On click 
    CancelButton.addEventListener('click', ()=>{
      const inputs = this.shadowRoot.querySelectorAll('input');
      const selects = this.shadowRoot.querySelectorAll('select');
      inputs.forEach((input)=>{
        input.value = "";
      });
      selects.forEach((select)=>{
        select.selectedIndex = 0;
      })
    })
  }
   // Method to send the data to the database 
   sendData(){
    apiRequest(apiRoutes.teachers.sendTeachersData, "POST",this.payload)
    .then((response)=>{
      console.log("Data sent successfully : ",response);
      this.addSuccessPopup(response);
    })
    .catch((error)=>{
      console.error("Error sending data", error);
    })
  };

  // Success
  addSuccessPopup(response){
    const absoluteDiv = document.createElement('div');
    absoluteDiv.id = "absoluteDiv";
    absoluteDiv.className = "absoluteDiv";
    const popup = document.createElement("success-popup");
    absoluteDiv.appendChild(popup);
    this.shadowRoot.appendChild(absoluteDiv);
    const appendedPopup = this.shadowRoot.querySelector("success-popup")
    appendedPopup.setAttribute("data-message",response);
    absoluteDiv.classList.remove('hidden');
    setTimeout(() => {
    absoluteDiv.remove();
    }, 3000);
  }
}
const addNewTeachersPage = customElements.define('add-newteachers', addNewTeachers);
export default addNewTeachersPage;