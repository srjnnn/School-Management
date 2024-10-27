class busSummary extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
           <div class="mainBox">
        <div class="secondBox">
            <h1>Your Bus</h1>
        </div>
        <div class="controllerBox">
            <div class="detailsContainer">
                <p>Bus no : 1</p>
                <p>No.Plate : 6969</p>
                <p>Drivers Contact : 9825958298</p>
                <p>Pickup Location : Pikachu</p>
                <p>Drop Location : Pika Pika</p>
                <p>Route : {data}</p>
            </div>
            <div class="photoContainer">
                <div class="front"></div>
                <div class="back"></div>
            </div>
        </div>
    </div>
        `;
    }
}

customElements.define("bus-summary", busSummary);