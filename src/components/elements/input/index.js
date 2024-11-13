import { loadTemplate } from "../../../utils/loadTemplate.js";

class InputComponent extends HTMLElement {
  static get observedAttributes(){
    return['height' , 'width' , 'val'];
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.templateContent = "";
    this.onValueChange = (value) => {
    }
    this.handleEvents = this.handleEvents.bind(this);
    this.applyAttr = this.applyAttr.bind(this);

  }

  async connectedCallback() {
    this.templateContent = await loadTemplate(
      "templates/elements/InputTempelate.html"
    );
    

      this.render();
      this.applyAttr();
      this.handleEvents();
  }

  attributeChangedCallback(name , oldValue, newValue){
    this.applyAttr();
  }
  
  applyAttr(){
    const input = this.shadowRoot.getElementById("inpt");

    if(!input) return;

    // Update the input fields styles based on current attributes
    const height = this.getAttribute("height");
    const width = this.getAttribute("width");
    const val = this.getAttribute("val");
    if(height) input.style.height = height;
    if(width) input.style.width = width;
    if(val) input.placeholder = val;
  }

  handleEvents() {
    const inputEl = this.shadowRoot.querySelector("input");
    console.log("handling event", inputEl);
    if (!inputEl) return;
    inputEl.addEventListener("input", (e) => {
      this.onValueChange(e.target.value);
    })
  }
  render(){
    console.log("rendering input");
    this.shadowRoot.innerHTML = this.templateContent;
  }

  setAttr({height,width,val}){
    if(height) this.setAttribute("height" , height);
    if(width) this.setAttribute("width" , width);
    if(val) this.setAttribute("val" , val);
  }

}

const Input = customElements.define("my-input", InputComponent);

export default Input;
