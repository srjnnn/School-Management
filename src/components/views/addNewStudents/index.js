import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class addNewStudents extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = "";
    this.payload = null;
  }

  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/views/addNewStudents.html");
    this.render();
    this.addButtons();
    this.addGoBackButton();

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
      const Email = this.shadowRoot.querySelector('#email').value;
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
      const gender = this.shadowRoot.querySelector('#gender').value;
      // Pack the data in the object
    const studentsData = {};
    studentsData.fullName = name;
    studentsData.gender = gender;
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
    studentsData.email = Email;
    studentsData.password = Common.generateRandomPass();
    // Not sending the image 
    this.payload = studentsData;
             // Validate all fields
             if (!name || !gender  || !Attendence || !userName || !Address  ||  !Contact  || !id || !Class || !Section || !rollNumber || !Email || !userName) {
              alert("All fields are required. Please fill in all the details.");
              return;
            }else{
              this.sendData(studentsData);

            }
    });
  }
  // Method to send the data to the database 
  sendData(data){
    apiRequest(apiRoutes.students.sendStudentData, "POST",this.payload)
    .then((response)=>{
      Common.addSuccessPopup(this.shadowRoot, `Student Added Successfully, Email : ${data.email}, Password : ${data.password}`,10000);
      console.log(response);
    })
    .catch((error)=>{
      console.error("Error sending data", error);
    })
  }
  // Error
  addGoBackButton(){
    const gobackButton = document.createElement("go-back");
    const hostElem = Common.getHostElem(this.shadowRoot);
    const backButtonContainer = hostElem.shadowRoot.querySelector ("#backButtonContainer");
    // backButtonContainer.innerHTML = ""
    if(backButtonContainer){
      backButtonContainer.appendChild(gobackButton);
      gobackButton.data = {
        elem : "students-page",
        header : "STUDENTS"
      }
    }

  }

}
export const AddNewStudents = customElements.define("addnew-students",addNewStudents);
export default AddNewStudents;