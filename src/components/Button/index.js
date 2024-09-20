import { loadTemplate } from "../../utils/loadTemplate.js";

class ButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
      .custom-button {
        background-color: blue;
        color: white;
        padding: 10px;
      }
    </style>
    <button class="custom-button">Click Me</button>
  `;
  }

//   async connectedCallback() {
//     const templateContent = await loadTemplate("./index.html");
//     const title = this.getAttribute("title");
//     const content = this.getAttribute("content");

//     const templateClone = templateContent.cloneNode(true);

//     // const filledTemplate = templateContent.querySelector(".custom-button");
//     // filledTemplate.innerHTML = filledTemplate.innerHTML
//     //   .replace("{{title}}", title)
//     //   .replace("{{content}}", content);

//     this.shadowRoot.appendChild(templateClone);
//   }
}

customElements.define("my-button", ButtonComponent);
