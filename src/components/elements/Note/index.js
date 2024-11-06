class Note extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <div class="note-container">
                This is a note
            </div>
        `;
  }
}

const NoteElement = customElements.define("custom-note", Note);

export default NoteElement;
