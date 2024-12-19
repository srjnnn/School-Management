import { loadTemplate } from "../../../utils/loadTemplate.js";

class Table extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.tableContent = "";
    this.originalData = {};
  }

  async connectedCallback() {
    this.tableContent = await loadTemplate("templates/views/table.html");
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = this.tableContent;
  }

  addEventListeners() {
    const popup = this.shadowRoot.querySelector("#editButtonPopup");
    const editButton = this.shadowRoot.querySelector("#timetableEdit");
    const crossImage = this.shadowRoot.querySelector("#cross-img");
    const existingDataEditButton = this.shadowRoot.querySelector("#existingData");
    const tableActionButtonsDiv = this.shadowRoot.querySelector(".tableActionsButtons");
    const saveButton = this.shadowRoot.querySelector("#tableSave");
    const cancelButton = this.shadowRoot.querySelector("#tableCancel");
    const table = this.shadowRoot.querySelector("table");
  
    if (!popup || !editButton || !crossImage || !table) return;
  
    // Popup visibility
    editButton.addEventListener("click", () => {
      popup.classList.remove("hidden");
    });
  
    // Close popup
    crossImage.addEventListener("click", () => {
      popup.classList.add("hidden");
    });
  
    // Edit existing data
    existingDataEditButton?.addEventListener("click", () => {
      popup.classList.add("hidden");
      const cells = table.querySelectorAll("td"); // Only target `td` cells
  
      cells.forEach((cell) => {
        if (cell.contentEditable === "true") {
          cell.contentEditable = false;
          cell.classList.remove("editable");
          tableActionButtonsDiv?.classList.add("hidden");
        } else {
          cell.contentEditable = true;
          cell.classList.add("editable");
          tableActionButtonsDiv?.classList.remove("hidden");
        }
      });
    });
  
    // Save initial data for body cells (td) only, not th
    table.querySelectorAll("tbody tr").forEach((row, rowIndex) => {
      row.querySelectorAll("td").forEach((cell, cellIndex) => {
        this.originalData[`${rowIndex}-${cellIndex}`] = cell.textContent.trim();
      });
    });
  
    // Enable save button if changes are detected
    table.addEventListener("input", (event) => {
      const cell = event.target;
      const rowIndex = cell.parentElement.rowIndex - 1; // Adjust for header row
      const cellIndex = cell.cellIndex;
  
      const originalValue = this.originalData[`${rowIndex}-${cellIndex}`];
      const currentValue = cell.textContent.trim();
  
      const hasChanges = Array.from(table.querySelectorAll("tbody tr")).some(
        (row, rIndex) =>
          Array.from(row.querySelectorAll("td")).some(
            (cell, cIndex) =>
              cell.textContent.trim() !== this.originalData[`${rIndex}-${cIndex}`]
          )
      );
  
      saveButton.disabled = !hasChanges;
  
      if (currentValue === originalValue) {
        saveButton.disabled = !hasChanges;
      }
    });
  
    // Save changes
    saveButton.addEventListener("click", () => {
      table.querySelectorAll("tbody tr").forEach((row, rowIndex) => {
        row.querySelectorAll("td").forEach((cell, cellIndex) => {
          this.originalData[`${rowIndex}-${cellIndex}`] = cell.textContent.trim();
        });
      });
      saveButton.disabled = true;
      alert("Changes saved!");
    });
  
    // Cancel changes
    cancelButton.addEventListener("click", () => {
      // Only reset the td cells, not th
      table.querySelectorAll("tbody tr").forEach((row, rowIndex) => {
        row.querySelectorAll("td").forEach((cell, cellIndex) => {
          cell.textContent = this.originalData[`${rowIndex}-${cellIndex}`];
          cell.contentEditable = false;
      tableActionButtonsDiv?.classList.add("hidden");

        });
      });
      saveButton.disabled = true;


    });
  }
  
  
}

customElements.define("my-table", Table);
export default Table;
