let value = '';
import LoadPage from "../../../services/loadPages.js";
import Common from "../../../utils/common.js";
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
            var hostElement = Common.getHostElem(this.shadowRoot);
            dashboard.classList.add('active');
            LoadPage.renderPages("my-dashboard",hostElement);
            window.history.pushState({},"","/DASHBOARD")
            
        }
        
    }

    render() {
        this.shadowRoot.innerHTML += this.SidebarTemplateContent;
           // display or hide the actions buttons of the sidebar based on the users
           this.displayActionsButton()
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
    // Restricting the students from accessing the buttons 
    displayActionsButton(){
        const button = this.shadowRoot.querySelectorAll('button');
        const hiddenButton = Array.from(button).filter(btn =>btn.classList.contains("button") && btn.classList.contains("hidden"));
        if(this.verifyUser() !== "student"){
            hiddenButton.forEach(button =>{
                button.classList.remove('hidden');
            });
        }
        if(this.verifyUser()==='teacher'){
            this.shadowRoot.querySelector("#feedbacks").classList.add('hidden');
        }
    }
    
    loadPages(path){
        switch(path){
            case  "DASHBOARD":
                this.loadPageWrap("my-dashboard", path)
              break;
              
            case "TIMETABLE":
                this.loadPageWrap("timetable-page",path)
                break;

            case "TEACHERS":
                this.loadPageWrap("my-teachers", path)
                 break;
                 
            case "CLASSNOTES":
                this.loadPageWrap("classnotes-page",path)
                break;

            case "BUSDETAILS":
                this.loadPageWrap("busdetails-page",path)
                break;

            case "ATTENDENCE":
                if(this.verifyUser()==="student"){
                    return
                }
                this.loadPageWrap("attendence-page",path)
                break;

            case "HELP":
                this.loadPageWrap("help-page", path)
                break;

            case "SETTINGS":
                this.loadPageWrap("settings-page", path)
                break;

            case "STUDENTS":
                if(this.verifyUser()==="student"){
                    return
                }
                this.loadPageWrap("students-page",path);
                break; 

            case "LOGOUT":
              this.loadPageWrap("my-logout",path);
                break;

            case "FEEDBACKS":
                if(this.verifyUser()==="admin"){
                this.loadPageWrap("feedback-page",path);
                }
                break;
                
            default:
                break;


        }
        
    };

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

    // Storing the common method 
    loadPageWrap(customElementsName,path){
        var hostElement = Common.getHostElem(this.shadowRoot);
        LoadPage.renderPages(customElementsName,hostElement);
        LoadPage.changeHeaderRoutes(hostElement,path);
        window.history.pushState({},"",path);
    }


}


const sideBar = customElements.define("my-sidebar", sidebarComponent);
export default sideBar;
