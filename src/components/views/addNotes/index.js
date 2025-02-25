import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class addClassNotes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.templateContent = "";
    this.payLoad = null;
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate(
      "../public/templates/views/addNotes.html"
    );
    this.render();
    this.addEventListeners();
    this.addGoBackButton();
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
  }

  addGoBackButton() {
    const gobackButton = document.createElement("go-back");
    const hostElem = Common.getHostElem(this.shadowRoot);
    const backButtonContainer = hostElem.shadowRoot.querySelector("#backButtonContainer");
    if (backButtonContainer) {
      backButtonContainer.appendChild(gobackButton);
      gobackButton.data = {
        elem: "classNotes-page",
        header: "Class Notes"
      };
    }
  }

  // Add event Listeners
  addEventListeners() {
    const submitButton = this.shadowRoot.querySelector('#submit');
    submitButton.addEventListener('click', () => {
      // Get the value of all the fields
      const Title = this.shadowRoot.querySelector('#title').value.trim();
      const Summary = this.shadowRoot.querySelector('#summary').value.trim();
      const Description = this.shadowRoot.querySelector('#Description').value.trim();
      const Subject = this.shadowRoot.querySelector('#notesSubject').value;
      const Class = this.shadowRoot.querySelector('#Class').value;
      const fileInput = this.shadowRoot.querySelector('#fileInput');
      const file = fileInput.files[0];

      // Make sure every value is received
      if (Title === "" || Summary === "" || Description === "" || Subject === "null" || Class === "null" || !file) {
        alert("Make sure you fill all the fields");
        return;
      }

      // Convert image file to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;  // The Base64 string of the image
        this.sendData(Title, Summary, Description, Subject, Class, base64String);
      };
      reader.readAsDataURL(file);  // This converts the file to Base64
    });
  }

  // Send data to the backend
  sendData(Title, Summary, Description, Subject, Class, base64Image) {
    // Extract the MIME type from the Base64 string
    const fileType = base64Image.split(';')[0].split(':')[1];
    
    const notesData = {
      Title,
      Summary,
      Description,
      Subject,
      Class,
      file: base64Image.split(',')[1],  // Remove the data:image/jpeg;base64, prefix
      fileType: fileType  // Add the file type
    };
  
    console.log(notesData);
  
    apiRequest(apiRoutes.classNotes.sendClassNotesData, "POST", notesData)
      .then((response) => {
        Common.addSuccessPopup(this.shadowRoot, "Successfully added Notes");
        this.shadowRoot.querySelector('#submit').disabled = true;
        setTimeout(() => {
          this.connectedCallback();
        }, 3000);
        
      })
      .catch((error) => {
        Common.addErrorPopup(this.shadowRoot, "Error adding the class notes");
      });
  }
}

const addclassNotes = customElements.define('add-notes', addClassNotes);
export default addclassNotes;
