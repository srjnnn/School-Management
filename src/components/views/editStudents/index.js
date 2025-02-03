import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";
import Common from "../../../utils/common.js";

class editStudents extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : 'open'});
    this.templateContent  = "";
    this.data = null;
    this.payload = null;
  }

 async connectedCallback(){
  // Reusing the addNewStudents form
  this.templateContent = await loadTemplate("templates/views/addNewStudents.html");
  this.render();
  }

  set data(value){
    this._data = value;
  }

  get data(){
    return this._data;
  }

  render(){
    this.shadowRoot.innerHTML = this.templateContent;
    this.updateContent();
    this.getData();
    this.getFormFields().id.disabled = true;

  }
  // get form fields 
  getFormFields(){
    return{
       fullname : this.shadowRoot.querySelector('#Name'),
       Class : this.shadowRoot.querySelector('#Class'),
       section : this.shadowRoot.querySelector('#Section'),
       roll_number : this.shadowRoot.querySelector('#rollno'),
       username : this.shadowRoot.querySelector('#userName'),
       address : this.shadowRoot.querySelector("#address"),
       bus : this.shadowRoot.querySelector('#bus'),
       pickup : this.shadowRoot.querySelector('#pickup'),
       drop : this.shadowRoot.querySelector('#drop'),
       phone : this.shadowRoot.querySelector('#contact'),
       attendence : this.shadowRoot.querySelector('#attendence'),
       image : this.shadowRoot.querySelector('#imageUpload'),
       id : this.shadowRoot.querySelector('#ID')
    };
  }
  // Update content 
  updateContent(){
    if(this.data && this.shadowRoot){
      const formFields = this.getFormFields();
      console.log(this.data)

      Object.keys(formFields).forEach((key)=>{
        if(formFields[key] && this.data[key]){
          formFields[key].value = this.data[key];
        }
      })
      
    }
  }
  // Send the new data to the server
  getData(){
    const form = this.shadowRoot.querySelector('#StudentsForm');
    form.addEventListener('submit', (event)=>{
      event.preventDefault();
    })
    const submitButton = this.shadowRoot.querySelector('#submit');
    submitButton.addEventListener('click', ()=>{
      // students data object 
      const studentsData = {};

      // Get all the fields value
      const fields = this.getFormFields();
      Object.keys(fields).forEach((key)=>{
        studentsData[key] = fields[key].value;
      })
      this.payload = studentsData;
      this.UpdateData();
    })
  }
  // Method to update the data to the database
  UpdateData(){
    apiRequest(apiRoutes.students.updateStudentData,"PATCH",this.payload)
    .then((response)=>{
      Common.addSuccessPopup(this.shadowRoot,"Student data Updated SuccessFully");
      console.log("data updated successfully")
    })
    .catch((error)=>{
      console.error("Error Updating Students data")
    })
  }

}
export const EditStudents = customElements.define('edit-students',editStudents);
export default EditStudents;