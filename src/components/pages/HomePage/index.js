import LoadPage from "../../../services/loadPages.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";


class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateContent = "";
    this.attendencePageData = "";
    this.timetablePageData = "";
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate(
      "../public/templates/pages/HomepageTemplate.html"
    );
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
    // this.addNavbar();
    this.addSidebar();
  }

  addSidebar() {
    const SidebarContainer = this.shadowRoot.getElementById("sidebar");
    const sidebarElement = document.createElement("my-sidebar");
    SidebarContainer.appendChild(sidebarElement);
  }

  // addNavbar() {
  //   const navbarContainer = this.shadowRoot.getElementById("top-navbar");
  //   const navbarElement = document.createElement("my-navbar");
  //   navbarContainer.appendChild(navbarElement);
  // }
 

  

}


const HomePageElement = customElements.define("home-page", HomePage);

export default HomePageElement;
