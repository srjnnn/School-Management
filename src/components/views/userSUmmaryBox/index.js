import { loadTemplate } from "../../../utils/loadTemplate.js";

class userSummary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.userSummaryContent = "";
    this.data = null;
  }
  async connectedCallback() {
    this.userSummaryContent = await loadTemplate(
      "templates/views/userSummaryBox.html"
    );
    this.render();
  }

  set data(value) {
    this._data = value;
    this.updateContent(); // Update content when data is set
  }

  get data() {
    return this._data;
  }

  render() {
    this.shadowRoot.innerHTML = this.userSummaryContent;
  }

  updateContent() {
    if (this._data && this.shadowRoot) {
      // Update the DOM with the new data
      const userNameElement = this.shadowRoot.querySelector("#name-value");
      const userRollElement = this.shadowRoot.querySelector("#roll-value");
      // Example: Assuming your HTML has placeholders for user name and email
      if (userNameElement) {
        userNameElement.textContent = this._data.name || "No name available";
      }
      if (userRollElement) {
        userRollElement.textContent = this._data.score || "No email available";
      }
    }
  }
}
const usrSummary = customElements.define("my-usersummary", userSummary);
export default usrSummary;
