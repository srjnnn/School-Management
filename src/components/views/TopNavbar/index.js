import { loadTemplate } from "../../../utils/loadTemplate.js";
class topNavbarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.navBarTemplateContent = "";
    }

    async connectedCallback() {
        this.navBarTemplateContent = await loadTemplate(
            "templates/views/TopNavbar.html"
        );

        this.render();
        this.observeNavText();
    }

    render() {
        this.shadowRoot.innerHTML = this.navBarTemplateContent;
    }
    observeNavText(){
        const navText = this.shadowRoot.getElementById('navHeader');
        console.log(navText);
        // Change the nav Text based on the current routes 
        this.changeNavText()
    }
    changeNavText(){
        // add the logic to examine the current route and change the text based on the routes
    }

}

const navBar = customElements.define("my-navbar", topNavbarComponent);
export default navBar;
