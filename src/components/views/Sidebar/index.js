let value = '';
import Router from "../../../router.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";
class sidebarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.SidebarTemplateContent = "";
        this.addBootstrapIcons();

    }

    async connectedCallback() {
        this.SidebarTemplateContent = await loadTemplate(
            "templates/views/SidebarTemplate.html"
        );

        this.render();
        this.prop();
        
    }

    render() {
        this.shadowRoot.innerHTML += this.SidebarTemplateContent;
    }
    prop(){

        const buttons = this.shadowRoot.querySelectorAll('.button');

        Array.from(buttons).forEach(button => {
            button.addEventListener('click', (event) => {
                // get the id  of all the buttons that are being clicked 
                const id = button.id.toUpperCase();
                // Now change the routes based on the id of the button and also render the respective pages ......
                
                console.log(id);
                this.loadPages(id);

                
                

                // Remove active class from all buttons
                this.shadowRoot.querySelectorAll('.button.active').forEach(activeButton => {
                    activeButton.classList.remove('active');
                });
                
                // Add active class to the clicked button
                button.classList.add('active');
                return id;
            });
        });
        
    
    };
    addBootstrapIcons() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
        this.shadowRoot.appendChild(link);
    };
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
                value = this.renderPages("my-custompage");
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
            case "LOGOUT":
                localStorage.clear();
                window.location.reload();
                break;
                
            default:
                break;    


        }
        
    };
    // && Homepage.tagName === "home-page"
    renderPages(customElement){
        const homePage = this.getRootNode().host;
        if (homePage){
        const mainContainer = homePage.shadowRoot.querySelector('#main-content-container');
        if (mainContainer.children.length > 0) {
            console.log("Yes, they have child nodes");
            console.log(mainContainer);
            mainContainer.replaceChildren();
            this.addPage(customElement, mainContainer);

            
        } else {
            console.log("No, doesn't have child nodes");
            this.addPage(customElement, mainContainer);
        }
        

        }else{
            console.log("Not working from the sidebar index js");
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
    logoutAlert(){
        // animation for the logout alert
    }


}

const sideBar = customElements.define("my-sidebar", sidebarComponent);
export default sideBar;
