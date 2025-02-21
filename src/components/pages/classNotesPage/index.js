import { apiRoutes } from "../../../globalConstants.js";
import LoadPage from "../../../services/loadPages.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";


class classNotes extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : 'open'});
    this.templateContent = "";
  }
//  get the role 
getRole(){
  const role = sessionStorage.getItem("User");
return role;
  
}
  async connectedCallback(){
    this.templateContent = await loadTemplate("../public/templates/pages/ClassNotesPage.html");
    this.render();
    this.addNotes();
    this.selectEventListners();
    this.getRole();
    if(this.getRole()=== "admin"){
        this.shadowRoot.querySelector('#classSelector').classList.remove('hidden');
        this.shadowRoot.querySelector('#notesSubject').classList.add('hidden');
        this.shadowRoot.querySelector('#addNotes').classList.remove('hidden');
        this.addEventListners();
      
    };
    if(this.getRole()==="student"){
      const Class = JSON.parse(localStorage.getItem("authResponse"));
      const ClassData = Class.userData.profile.Class;
      this.fetchDataByClass(ClassData)
    }
    
  }

  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  };
  addEventListners(){
    // Add eventistnes to the 
    const addButton = this.shadowRoot.querySelector('#addNotes');
    addButton.addEventListener('click',()=>{

      const hostElement = this.shadowRoot.getRootNode().host
      const mainHostElement = hostElement.getRootNode().host;
      LoadPage.renderPages('add-notes',mainHostElement);
      LoadPage.changeHeaderRoutes(mainHostElement,"Add class Notes");
    })
  }
  // Add event listners to the select 
selectEventListners(){
  const Classselector = this.shadowRoot.querySelector('#classSelector');
  const notesSubject = this.shadowRoot.querySelector('#notesSubject');
  Classselector.addEventListener('change', (e)=>{
    this.fetchDataByClass(e.target.value);
  })
  if(sessionStorage.getItem('User')==='admin'){
    notesSubject.addEventListener('change', (e)=>{
      this.fetchDataBySubject(classNumber,e.target.value);
   })
  }else{
    notesSubject.addEventListener('change',(e)=>{
      this.fetchDataBySubject(this.getClass(), e.target.value);
    })
  }

}
  addNotes(){
    const classNotesContainer = this.shadowRoot.querySelector('.classNotesContainer');
    const classNotesCard = document.createElement('class-notes');
    classNotesContainer.appendChild(classNotesCard);
  }
  
  fetchDataByClass(Class){
    const otherPage = this.shadowRoot.querySelector('class-notes');
    apiRequest(apiRoutes.classNotes.getClassNotesbyClass(Class), "GET")
    .then((response)=>{
      otherPage.data = response && response.data;
      // Append the data to the every card
    })
  }

  fetchDataBySubject(Class ,subject){
    const otherPage = this.shadowRoot.querySelector('class-notes');
    apiRequest(apiRoutes.classNotes.getClassNotesbySubject(subject,Class), "GET")
    .then(response => {
      otherPage.data = response && response.data;
      // add the cards after getting the data 
    })
  }

  //for normal students
  fetchDataForStudents(){
    this.getRole()
  }
 getClass(){
  const authResponse = JSON.parse(localStorage.getItem('authResponse'));
  const Class = authResponse.userData.profile.Class;
  return Class
 }
  
}
const ClassNotes = customElements.define('classnotes-page',classNotes);
export default ClassNotes;