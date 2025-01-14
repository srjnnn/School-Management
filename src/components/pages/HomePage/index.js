import goBackButton from "../../../services/goBackButton.js";
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
      "templates/pages/HomepageTemplate.html"
    );
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
    this.addNavbar();
    this.addSidebar();
    this.addEventListeners();
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
  addEventListeners(){
    const GoBackButton = this.shadowRoot.querySelector('#gobackButton');
    GoBackButton.addEventListener('click',()=>{
     const History = goBackButton.getPagesRendered();
     const Header = goBackButton.getPagesHeader();

    //  get the length of the History 
    const length = History.length;
    const headerLength = Header.length;
    // get the index
    const index = length-1;
    // const headerIndex = headerLength-1;

    const previousPage = History[index-1];
    const previousPageHeader = Header[index-1];

    // loading the main page
    const mainPage = this.shadowRoot.getRootNode().host;
    
    // Loading the previos page here : 
   
    LoadPage.renderPages(previousPage,mainPage) ;
    LoadPage.changeHeaderRoutes(mainPage,previousPageHeader);
    // Get the sidebar element 
    // const sidebarElement  = goBackButton.getSidebarElem();
    const sidebar = goBackButton.getSidebarElement();
    LoadPage.changeClassList(sidebar,previousPageHeader);

        //deleting the last index
        History.splice(index-1,1); 
        Header.splice(index-1,1);
        goBackButton.getEventDetails(mainPage);
        

    
    })
  };
  

}


const HomePageElement = customElements.define("home-page", HomePage);

export default HomePageElement;
