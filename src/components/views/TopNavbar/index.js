import { loadTemplate } from "../../../utils/loadTemplate.js";
class topNavbarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.navBarTemplateContent = "";
    }

    async connectedCallback() {
        this.navBarTemplateContent = await loadTemplate(
            "../public/templates/views/TopNavbar.html"
        );

        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = this.navBarTemplateContent;
    }
 

}

const navBar = customElements.define("my-navbar", topNavbarComponent);
export default navBar;
