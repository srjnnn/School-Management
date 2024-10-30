class Sidebar extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <div class="sidebar-container">
                <my-card> </my-card>
                <my-input> </my-input>
                <my-button> </my-button>
            </div>
        `;
    }
}

customElements.define("custom-sidebar", Sidebar);