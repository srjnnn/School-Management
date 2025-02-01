import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class addNewStudents extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = "";
    this.payload = null;
  }

  async connectedCallback(){
    this.templateContent = await loadTemplate("templates/views/addNewStudents.html");
    this.render();
    this.addButtons();

  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  // Add eventListners to the  two buttons 
  addButtons(){
    const form = this.shadowRoot.querySelector('#StudentsForm');
    form.addEventListener('submit', (event)=>{
         event.preventDefault();
    })
    const submitButton = this.shadowRoot.querySelector('#submit');
    submitButton.addEventListener('click',()=>{

      // Get all the fields value 
      const name = this.shadowRoot.querySelector('#Name').value;
      const Class = this.shadowRoot.querySelector('#Class').value;
      const Section = this.shadowRoot.querySelector('#Section').value;
      const rollNumber = this.shadowRoot.querySelector('#rollno').value;
      const userName = this.shadowRoot.querySelector('#userName').value;
      const Address = this.shadowRoot.querySelector("#address").value;
      const Bus = this.shadowRoot.querySelector('#bus').value;
      const pickupAddress = this.shadowRoot.querySelector('#pickup').value;
      const dropoffAddress = this.shadowRoot.querySelector('#drop').value;
      const Contact = this.shadowRoot.querySelector('#contact').value;
      const Attendence = this.shadowRoot.querySelector('#attendence').value;
      const image = this.shadowRoot.querySelector('#imageUpload').value
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
    studentsData.Attendence = Attendence;
    studentsData.id = id;
    // Not sending the image 
    console.log("Students DAta : ",studentsData);
    this.payload = studentsData;
    this.sendData();
    });
  }
  // Method to send the data to the database 
  sendData(){
    apiRequest(apiRoutes.students.sendStudentData, "POST",this.payload)
    .then((response)=>{
      this.addSuccessPopup();
    })
    .catch((error)=>{
      console.error("Error sending data", error);
    })
  }
  // Error
  addSuccessPopup(){
    const absoluteDiv = document.createElement('div');
    absoluteDiv.id = "absoluteDiv";
    absoluteDiv.className = "absoluteDiv";
    const popup = document.createElement("success-popup");
    absoluteDiv.appendChild(popup);
    this.shadowRoot.appendChild(absoluteDiv);
    const appendedPopup = this.shadowRoot.querySelector("success-popup")
    appendedPopup.data = "Successfully added students";
    absoluteDiv.classList.remove('hidden');
    setTimeout(() => {
    absoluteDiv.remove();
    this.connectedCallback();

    }, 3000);
  }

}
export const AddNewStudents = customElements.define("addnew-students",addNewStudents);
export default AddNewStudents;