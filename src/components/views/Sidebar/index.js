let value = '';
import Router from "../../../router.js";
import appState from "../../../utils/appState.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";
import LoginPageElement from "../../pages/LoginPage/index.js";
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
            dashboard.classList.add('active');
            this.renderPages("my-dashboard");
            
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
                value = this.renderPages("my-dashboard");
                this.changeHeaderRoutes(path);
                // Call the change Routes and header method
              break;
            case "TIMETABLE":
                value = this.renderPages("my-custompage");
                this.changeHeaderRoutes(path);
                break;
            case "TEACHERS":
                value = this.renderPages("my-custompage");
                this.changeHeaderRoutes(path);
                 break;
            case "CLASSNOTES":
                value = this.renderPages("my-custompage");
                this.changeHeaderRoutes(path);
                break;
            case "BUSDETAILS":
                value = this.renderPages("my-custompage");
                this.changeHeaderRoutes(path);
                break;
            case "LOCATION":
                value = this.renderPages("my-custompage");
                this.changeHeaderRoutes(path);
                break;
            case "HELP":
                value = this.renderPages("my-custompage");
                this.changeHeaderRoutes(path);
                break;
            case "SETTINGS":
                value = this.renderPages("my-custompage");
                this.changeHeaderRoutes(path);
                break;
            case "STUDENTS":
                value = this.renderPages("my-custompage");
                this.changeHeaderRoutes(path);
                break;
            case "LOGOUT":
                value =  this.renderPages("my-logout");
                this.changeHeaderRoutes(path);
                break;
                
            default:
                break;


        }
        
    };
    renderPages(customElement){
        const homePage = this.getRootNode().host;
        if (homePage){
        const mainContainer = homePage.shadowRoot.querySelector('#main-content-container');
        if (mainContainer.children.length > 0) {
            mainContainer.replaceChildren();
            this.addPage(customElement, mainContainer);

            
        } else {
            this.addPage(customElement, mainContainer);
        }
        

        }
        return homePage;

    };
    // Add page to the main container 
    addPage(customElement , mainContainer){
        const customPage = document.createElement(customElement);
        mainContainer.appendChild(customPage);

    };
  
    changeHeaderRoutes(path){
        // change the nav header here 
        const homePage = value;
        const homepageShadowRoot = homePage.shadowRoot;
        const navBar = homepageShadowRoot.querySelector('my-navbar');
        const navBarShadowRoot = navBar.shadowRoot;
        const header = navBarShadowRoot.querySelector('#navHeader');

        // change the header based on the routes they goooooo... 
        header.innerHTML = path;
       

    };


}

const sideBar = customElements.define("my-sidebar", sidebarComponent);
export default sideBar;
