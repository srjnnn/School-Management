import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";
import Common from "../../../utils/common.js";

class editTeachers extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : 'open'});
    this.templateContent  = "";
    this.data = null;
    this.payload = null;
  }

 async connectedCallback(){
  // Reusing the addNewStudents form
  this.templateContent = await loadTemplate("../public/templates/views/addNewTeachersPage.html");
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
       classes : this.shadowRoot.querySelector('#classes'),
       section : this.shadowRoot.querySelector('#sections'),
       roll_number : this.shadowRoot.querySelector('#rollno'),
       username : this.shadowRoot.querySelector('#userName'),
       subject : this.shadowRoot.querySelector('#subject'),
       address : this.shadowRoot.querySelector("#address"),
       bus : this.shadowRoot.querySelector('#bus'),
       pickup : this.shadowRoot.querySelector('#pickup'),
       drop : this.shadowRoot.querySelector('#drop'),
       phone : this.shadowRoot.querySelector('#contact'),
       attendence : this.shadowRoot.querySelector('#attendence'),
       image : this.shadowRoot.querySelector('#imageUpload'),
       id : this.shadowRoot.querySelector('#ID'),
       email : this.shadowRoot.querySelector('#email')

    };
  }
  // Update content 
  updateContent(){
    if(this.data && this.shadowRoot){
      const formFields = this.getFormFields();

      Object.keys(formFields).forEach((key)=>{
        if(formFields[key] && this.data[key]){
          formFields[key].value = this.data[key];
        }
      })
      
    }
  }
  // Send the new data to the server
  getData(){
    const form = this.shadowRoot.querySelector('#teachersForm');
    form.addEventListener('submit', (event)=>{
      event.preventDefault();
    })
    const submitButton = this.shadowRoot.querySelector('#submit');
    submitButton.addEventListener('click', ()=>{
      // students data object 
      const teachersData = {};

      // Get all the fields value
      const fields = this.getFormFields();
      Object.keys(fields).forEach((key)=>{
        teachersData[key] = fields[key]?.value;
      })
      this.payload = teachersData;
      this.UpdateData();
    })
  }
  // Method to update the data to the database
  UpdateData(){
    apiRequest(apiRoutes.teachers.updateTeacherData,"PATCH",this.payload)
    .then((response)=>{
      Common.addSuccessPopup(this.shadowRoot,"Teacher data Updated SuccessFully");
    })
    .catch((error)=>{
      console.error("Error Updating Teachers data")
    })
  }

}
export const EditTeachers = customElements.define('edit-teachers',editTeachers);
export default EditTeachers;