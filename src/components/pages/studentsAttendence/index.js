import { loadTemplate } from "../../../utils/loadTemplate.js";

class studentsAttendence extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : 'open'});
    this.templateContent = "";
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate('templates/pages/StudentAttendencePage.html');
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
}
const StudentsAttendence = customElements.define('attendence-page',studentsAttendence);
export default StudentsAttendence;