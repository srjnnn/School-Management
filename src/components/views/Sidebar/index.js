let value = '';
import LoadPage from "../../../services/loadPages.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";
class sidebarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.SidebarTemplateContent = "";

    }
verifyUser(){
    const user =  sessionStorage.getItem("User");
    return user;
}
    async connectedCallback() {
        this.SidebarTemplateContent = await loadTemplate(
            "../public/templates/views/SidebarTemplate.html"
        );
        this.render();
        this.prop();
        this.toggle();

        // Making the dashboard as the default button
        const dashboard = this.shadowRoot.querySelector('#dashboard');
        if(dashboard){
            var hostElement = this.getHostElement();
            dashboard.classList.add('active');
            LoadPage.renderPages("my-dashboard",hostElement);
            window.history.pushState({},"","/DASHBOARD")
            
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
            });
        });
        
    
    };

    loadPages(path){
        switch(path){
            case  "DASHBOARD":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("my-dashboard",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                window.history.pushState({},"",path);
 
              break;
            case "TIMETABLE":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("timetable-page",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                window.history.pushState({},"",path);

 


                break;
            case "TEACHERS":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("my-teachers",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                window.history.pushState({},"",path);

 


                 break;
            case "CLASSNOTES":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("classnotes-page",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                window.history.pushState({},"",path);

 

               
                break;
            case "BUSDETAILS":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("busdetails-page",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                window.history.pushState({},"",path);

 

               
                break;
            case "ATTENDENCE":
                if(this.verifyUser()==="student"){
                    return
                }
               var hostElement = this.getHostElement();
                LoadPage.renderPages("attendence-page",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                window.history.pushState({},"",path);

 

               
                break;
            case "HELP":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("help-page",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                window.history.pushState({},"",path);

 

                
                break;
            case "SETTINGS":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("my-custompage",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                window.history.pushState({},"",path);

 

                
                break;
            case "STUDENTS":
                if(this.verifyUser()==="student"){
                    return
                }
               var hostElement = this.getHostElement();
                LoadPage.renderPages("students-page",hostElement);
                LoadPage.changeHeaderRoutes(hostElement,path);
                window.history.pushState({},"",path);

 

                
                break;
            case "LOGOUT":
               var hostElement = this.getHostElement();
                LoadPage.renderPages("my-logout",hostElement);
                window.history.pushState({},"",path);

 
                
                break;
                
            default:
                break;


        }
        
    };
    getHostElement(){
        const hostElement = this.shadowRoot.getRootNode().host;
        const mainHostElement = hostElement.getRootNode().host;
        return mainHostElement;
    }
    getSidebarElement(){
        const sidebarElem = this.shadowRoot.getRootNode().host;
    }
    
    toggle(){
        const button = this.shadowRoot.querySelector('.toggleButton');
        const sidebar = this.shadowRoot.getElementById('sidebar');
        button.addEventListener('click', ()=>{
             sidebar.classList.toggle('open');
             
        })
    }

}


const sideBar = customElements.define("my-sidebar", sidebarComponent);
export default sideBar;
