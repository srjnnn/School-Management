import { apiRoutes } from "../../../globalConstants.js";
import LoadPage from "../../../services/loadPages.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadTemplate.js";

class teachersPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.templateContent = "";
    this.teachersData = null;
  }

  async connectedCallback() {
    this.templateContent = await loadTemplate("../public/templates/pages/teachers.html");
    this.render();
    this.getTeachersData();
  }

  // Get the teachers data
  getTeachersData() {
    apiRequest(apiRoutes.teachers.getAllTeachersData, "GET")
      .then((teachersData) => {
        this.teachersData = teachersData && teachersData.data;
        this.addTable();

        const user = sessionStorage.getItem("User");

        if (user === "admin") {
          this.shadowRoot.querySelector('#tcherbtns').classList.remove('hidden');
          this.addEditButtons();
          this.addNewPage();
          this.shadowRoot.querySelector("#varTHb").classList.remove('hidden');
        }

        Common.detailsClick(this.shadowRoot, this.teachersData, "teachersDetails");
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });
  }

  // Add event listeners and actions to edit buttons
  addEditButtons() {
    const rows = this.shadowRoot.querySelectorAll("#teachersDetails tr");
    rows.forEach(row => {
      const lastCell = row.querySelector('td:last-child');
      if (lastCell) {
        const editButton = document.createElement('edit-buttons');
        const deleteButton = document.createElement('delete-buttons');
        lastCell.style.display = 'flex'
        lastCell.style.justifyContent = "space-between";

        deleteButton.addEventListener('click', () => {
          // Create a confirmation box when deleting
          const div = document.createElement('div');
          const box = document.createElement('confirmation-box');
          div.className = "absoluteDiv";
          div.appendChild(box);
          this.shadowRoot.appendChild(div);

          box.cancelEvent = () => {
            div.remove();
          }

          box.deleteEvent = () => {
            const teacherId = row.dataset.id;
            const data = { id: teacherId };
            apiRequest(apiRoutes.teachers.deleteTeachersData, "DELETE", data)
              .then(() => {
                Common.addSuccessPopup(this.shadowRoot, "Teacher deletion was successful.");
                div.remove();
                setTimeout(() => {
                  this.connectedCallback();
                }, 3000);
              })
              .catch((error) => {
                console.error("Error deleting teacher:", error);
                div.remove();
              });
          };
        });

        // Edit button functionality
        editButton.addEventListener('click', () => {
          this.editTeachers(row);
        });

        const buttonDiv = document.createElement('div');
        buttonDiv.style.display = "flex";
        buttonDiv.style.gap = "1rem";
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);
        lastCell.appendChild(buttonDiv);
      }
    });
  }

  // Render table rows with teacher data
  addTable() {
    const table = this.shadowRoot.querySelector("#teachersDetails");

    // Check if teachersData is available
    if (!this.teachersData) {
      console.error("No teacher data found.");
      return;
    }

    this.teachersData.forEach(data => {
      const row = document.createElement('tr');
      row.dataset.id = data.id;

      // Create a new table row with teacher data
      row.innerHTML = `
        <td>${data.id || "NA"}</td>
        <td>${data.fullname || "NA"}</td>
        <td>${data.phone || "NA"}</td>
      `;

      // Add the attendance column only for admin users
      if (sessionStorage.getItem("User") === "admin") {
        const attendanceCell = document.createElement('td');
        attendanceCell.innerHTML = data.attendence || "NA";
        row.appendChild(attendanceCell);
      }

      table.appendChild(row);
    });
  }

  // Add a new teacher page functionality
  addNewPage() {
    const addNewTeachersButton = this.shadowRoot.querySelector("#addTeachersButton");
    addNewTeachersButton.addEventListener('click', () => {
      const addNewTeachersPage = document.createElement('add-newteachers');
      const hostElement = this.getRootNode().host;
      const path = " Add New Teacher";
      LoadPage.renderPages("add-newteachers", hostElement);
      LoadPage.changeHeaderRoutes(hostElement, path);
    });
  }

  // Edit teacher functionality
  editTeachers(row) {
    const teacherData = this.getTeachersById(row);
    const hostElem = Common.getHostElem(this.shadowRoot);
    LoadPage.renderPages("edit-teachers", hostElem, teacherData);
    LoadPage.changeHeaderRoutes(hostElem, "Edit Teacher");
  }

  // Get teacher data by ID
  getTeachersById(row) {
    const teacherID = row.dataset.id;
    return this.teachersData.find(teacher => teacher.id == teacherID);
  }

  render() {
    this.shadowRoot.innerHTML = this.templateContent;
  }
}

const TeachersPage = customElements.define("my-teachers", teachersPage);
export default TeachersPage;
