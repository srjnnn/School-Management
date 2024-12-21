let value = '';
import goBackButton from "../../../services/goBackButton.js";
import LoadPage from "../../../services/loadPages.js";
import appState from "../../../utils/appState.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";
class sidebarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.SidebarTemplateContent = "";

    }

    async connectedCallback() {
        this.SidebarTemplateContent = await loadTemplate(
            "templates/views/SidebarTemplate.html"
        );

        this.render();
        this.prop();
        this.verifyUserType();

        // Making the dashboard as the default button
        const dashboard = this.shadowRoot.querySelector('#dashboard');
        if(dashboard){
            var hostElement = this.getHostElement();
            dashboard.classList.add('active');
            LoadPage.renderPages("my-dashboard",hostElement);
            goBackButton.savePagesRendered("my-dashboard","DASHBOARD");
            this.getSidebarElement();
            
        }
        
    }

    render() {
        this.shadowRoot.innerHTML += this.SidebarTemplateContent;
    }
    prop(){

        const buttons = this.shadowRoot.querySelectorAll('.button');

        Array.from(buttons).forEach(button => {
            button.addEventListener('click', (event) => {
                const id = button.id.toUpperCase();
                this.loadPages(id);
                this.shadowRoot.querySelectorAll('.button.active').forEach(activeButton => {
                    activeButton.classList.remove('active');
                });
                button.classList.add('active');
                return id;
            });
        });
        
    
    };
    verifyUserType(){ //this is responsible for identifiying the userType and render the features accordingly
     const userType = appState.getUserType();
        if(userType === 'norm'){
            this.shadowRoot.querySelector('#Students').style.display = "none"; 
        }
        return userType;
    }
    loadPages(path){
        switch(path){
            case  "DASHBOARD":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("my-dashboard",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                // Call the change Routes and header method
                // Add the history of the rendered pages
                goBackButton.savePagesRendered("my-dashboard",path);
                goBackButton.getEventDetails(hostElement);
              break;
            case "TIMETABLE":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("timetable-page",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                goBackButton.savePagesRendered("timetable-page",path);
                goBackButton.getEventDetails(hostElement);
                break;
            case "TEACHERS":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("my-custompage",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                goBackButton.savePagesRendered("my-custompage",path);
                goBackButton.getEventDetails(hostElement);
                 break;
            case "CLASSNOTES":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("my-custompage",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                goBackButton.savePagesRendered("my-custompage" ,path);
                goBackButton.getEventDetails(hostElement);
                break;
            case "BUSDETAILS":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("my-custompage",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                goBackButton.savePagesRendered("my-custompage",path);
                goBackButton.getEventDetails(hostElement);
                break;
            case "LOCATION":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("my-custompage",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                goBackButton.savePagesRendered("my-custompage",path);
                goBackButton.getEventDetails(hostElement);
                break;
            case "HELP":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("my-custompage",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                goBackButton.savePagesRendered("my-custompage",path);
                goBackButton.getEventDetails(hostElement);
                break;
            case "SETTINGS":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("my-custompage",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                goBackButton.savePagesRendered("my-custompage",path);
                goBackButton.getEventDetails(hostElement);
                break;
            case "STUDENTS":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("my-custompage",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                goBackButton.savePagesRendered("my-custompage",path);
                goBackButton.getEventDetails(hostElement);
                break;
            case "LOGOUT":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("my-logout",hostElement);
                goBackButton.getEventDetails(hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                goBackButton.savePagesRendered("my-logout",path);
                break;
                
            default:
                break;


        }
        
    };
    getHostElement(){
        const hostElement = this.shadowRoot.getRootNode().host;
        const mainHostElement = hostElement.getRootNode().host;
        console.log('host : ',hostElement);
        return mainHostElement;
    }
    getSidebarElement(){
        const sidebarElem = this.shadowRoot.getRootNode().host;
        goBackButton.saveSidebarElement(sidebarElem);
    }
    
    

}


const sideBar = customElements.define("my-sidebar", sidebarComponent);
export default sideBar;
