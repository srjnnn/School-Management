import { loadTemplate } from "../../../utils/loadTemplate.js";

class upcomingEvents extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    this.upcomingEventsContent = "";
  }
  async connectedCallback(){
    this.upcomingEventsContent = await loadTemplate("../public/templates/views/upcomingEvents.html");
    this.render();
  }
  render(){
    this.shadowRoot.innerHTML = this.upcomingEventsContent;
  }
}
const upcomingevents = customElements.define("my-upcomingevents" , upcomingEvents);
export default upcomingevents;