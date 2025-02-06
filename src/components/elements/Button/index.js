import { loadTemplate } from "../../../utils/loadTemplate.js";

export class ButtonComponent extends HTMLElement {
  static get observedAttributes() {
    return ['height', 'width', 'val'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.onValueChange = () =>{
      console.log("Button Clicked , button triggered");
    }
    // this.onValueChange = this.onButtonChange;
    
    // this.handleEvents = this.handleEvents.bind(this);
    this.templateContent = "";
  }

  async connectedCallback() {
    // Load and render the template before setting any styles
    this.templateContent = await loadTemplate("../public/templates/elements/ButtonTemplate.html");
    this.render();
    
   

    // Now that the element is rendered, apply initial styles if any attributes are set
    this.updateStyles();
    this.handleEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateStyles();
    
  }

  updateStyles() {
    const btn = this.shadowRoot.getElementById("bbb");
    if (!btn) return;

    // Update the button’s style based on current attributes
    const height = this.getAttribute("height");
    const width = this.getAttribute("width");
    const val = this.getAttribute("val");

    if (height) btn.style.height = height;
    if (width) btn.style.width = width;
    if (val) btn.innerHTML = val;
  }
  handleEvents(){
    const buttonEl = this.shadowRoot.getElementById('bbb');
    if(!buttonEl) return;
    buttonEl.addEventListener('click' ,()=>{
      this.onValueChange();
    })
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
  }

  setStyle({ height, width, val }) {
    if (height) this.setAttribute("height", height);
    if (width) this.setAttribute("width", width);
    if (val) this.setAttribute("val", val);
  }
}

if (!customElements.get("my-button")) {
  customElements.define("my-button", ButtonComponent);
}
export default ButtonComponent;