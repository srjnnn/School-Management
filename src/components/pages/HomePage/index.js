import LoadPage from "../../../services/loadPages.js";
import RestrictUser from "../../../services/restrictUser.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";


class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateContent = "";
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate(
      "../public/templates/pages/HomepageTemplate.html"
    );
    this.render();
    this.addBreadCrumbs();
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
    this.addNavbar();
    this.addSidebar();
  }

  addSidebar() {
    const SidebarContainer = this.shadowRoot.getElementById("sidebar");
    const sidebarElement = document.createElement("my-sidebar");
    SidebarContainer.appendChild(sidebarElement);
  }

  addNavbar() {
    const navbarContainer = this.shadowRoot.getElementById("top-navbar");
    const navbarElement = document.createElement("my-navbar");
    navbarContainer.appendChild(navbarElement);
  }
    //  Adding the event listner to the go-back button in the sidebar

  addBreadCrumbs(){
    const container = this.shadowRoot.querySelector('.breadCrumbs');
    const breadCrumbs = document.createElement('bread-crumbs');
    container.appendChild(breadCrumbs);
  }
  

}


const HomePageElement = customElements.define("home-page", HomePage);

export default HomePageElement;
