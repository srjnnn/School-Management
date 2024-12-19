import { loadTemplate } from "../../../utils/loadTemplate.js";

class table extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode : "open"});
    this.tableContent = "";
  }
  async connectedCallback(){
    this.tableContent = await loadTemplate("templates/views/table.html");
    this.render();
    this.dispatchEvent(new Event('rendered'));
  }
  render(){
    this.shadowRoot.innerHTML = this.tableContent;
  }

}
const Table = customElements.define('my-table', table);
export default Table;