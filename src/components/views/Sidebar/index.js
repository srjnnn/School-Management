import { loadTemplate } from "../../../utils/loadTemplate.js";
class sidebarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.LoginTemplateContent = "";
        this.addBootstrapIcons();
    }

    async connectedCallback() {
        this.LoginTemplateContent = await loadTemplate(
            "templates/views/SidebarTemplate.html"
        );

        this.render();
        this.prop();
        
    }

    render() {
        this.shadowRoot.innerHTML += this.LoginTemplateContent;
    }
    prop(){

        const buttons = this.shadowRoot.querySelectorAll('.button');

        Array.from(buttons).forEach(button => {
            button.addEventListener('click', (event) => {
                // Remove active class from all buttons
                this.shadowRoot.querySelectorAll('.button.active').forEach(activeButton => {
                    activeButton.classList.remove('active');
                });
                
                // Add active class to the clicked button
                button.classList.add('active');
            });
        });
        
    
    };
    addBootstrapIcons() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
        this.shadowRoot.appendChild(link);
    }

}

const sideBar = customElements.define("my-sidebar", sidebarComponent);
export default sideBar;
