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
      "../public/templates/views/userSummaryBox.html"
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
    this.updateContent();
  }

  updateContent() {
    if (this._data && this.shadowRoot) {
      // Update the DOM with the new data
      const userNameElement = this.shadowRoot.querySelector("#name-value");
      const userRollElement = this.shadowRoot.querySelector("#roll-value");
      const userClassElement = this.shadowRoot.querySelector('#class-value');
      const userAddressElement = this.shadowRoot.querySelector('#address-value');
      const userPickupAddressElement = this.shadowRoot.querySelector('#pickupAddress-value');
      const userDropOffElement = this.shadowRoot.querySelector('#dropoffAddress-value');
      // Example: Assuming your HTML has placeholders for user name and email
      if (userNameElement) {
        userNameElement.textContent = this._data.fullname || "No name available";
      }
      if (userRollElement) {
        userRollElement.textContent = this._data.score || "No email available";
      }
      if(userClassElement){
        userClassElement.textContent = this._data.class || "Null"
      }
      if(userAddressElement){
        userAddressElement.textContent = this._data.address || "Null"
      }
      if(userPickupAddressElement){
        userPickupAddressElement.textContent = this._data.pickup || "Null";
      }
      if(userDropOffElement){
        userDropOffElement.textContent = this._data.drop || "Null"
      }
    }
  }
}
const usrSummary = customElements.define("my-usersummary", userSummary);
export default usrSummary;
