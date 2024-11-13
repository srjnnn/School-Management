import { loadTemplate } from "../../../utils/loadTemplate.js";
class sidebarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.LoginTemplateContent = "";
    }

    async connectedCallback() {
        this.LoginTemplateContent = await loadTemplate(
            "templates/views/SidebarTemplate.html"
        );

        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = this.LoginTemplateContent;
    }

}

const sideBar = customElements.define("my-sidebar", sidebarComponent);
export default sideBar;
