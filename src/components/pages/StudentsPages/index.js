import { loadTemplate } from "../../../utils/loadTemplate.js";

class studentsPage extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.templateContent = "";
  }
  async connectedCallback(){
    this.templateContent = await loadTemplate('templates/pages/StudentPages.html');
    this.render();
    this.addEditButtons();
    this.StudentsDetailsClick();
  }

  render(){
    this.shadowRoot.innerHTML = this.templateContent;
  }
  // Add eventlistners and all
  addEditButtons(){
    const rows = this.shadowRoot.querySelectorAll("#teachersDetails tr");
    rows.forEach(row =>{
      const lastCell = row.querySelector('td:last-child');
      if(lastCell){
         const combinedButtons = document.createElement('combined-buttons');
         lastCell.appendChild(combinedButtons);
      }

    });
  }
  StudentsDetailsClick(){
    const rows = this.shadowRoot.querySelectorAll("#teachersDetails tr");
    console.log(rows)
    rows.forEach(row=>{
      row.addEventListener('click',()=>{
        // Rest logic on how to append the child 
        const absoluteDiv = this.shadowRoot.querySelector('#absoluteDiv');
        const contentDiv = this.shadowRoot.querySelector('#contentDiv');
        // make the div moveable 
        let isDragging = false;
        let offSetX, offSetY;
        absoluteDiv.addEventListener('mousedown', (e) =>{
          isDragging = true;
          offSetX = e.clientX - absoluteDiv.offsetLeft;
          offSetY = e.clientY - absoluteDiv.offsetTop;
          absoluteDiv.style.cursor = 'grabbing';
        })
        this.shadowRoot.addEventListener('mousemove', (e) => {
          if (isDragging) {
              const x = e.clientX - offSetX;
              const y = e.clientY - offSetY;
              absoluteDiv.style.left = `${x}px`;
              absoluteDiv.style.top = `${y}px`;
          }
      });
      this.shadowRoot.addEventListener('mouseup', () => {
        isDragging = false;
        absoluteDiv.style.cursor = 'grab';
    });
        absoluteDiv.classList.remove('hidden');
        // Create a summary box 
        const summaryBox = document.createElement('my-usersummary');
        if(contentDiv){
          contentDiv.replaceChildren();
          contentDiv.appendChild(summaryBox);
          // ALso append the close button to the div 
          const closeButton = document.createElement('div');
          // closeButton.style.background = 'transparent'
          closeButton.style.position = 'absolute'
          closeButton.style.top = '0%'

          closeButton.innerHTML = `
          <style>
                   #close {
                   border: none;
                   background-color: transparent;
                   cursor: pointer;
               
                 }
               
                 #closeImg {
                   height: 3rem;
                   z-index: 500;
                 }
               
                 .buttons {
                   display: flex;
                   justify-content: flex-end;
                 }
          </style>
              <div class="buttons">
      <button id="close" class="close"><img src="/public/assets/icons/x.svg" alt="closeIcon" id="closeImg"></button>
    </div>
     
          `
          contentDiv.appendChild(closeButton);
          closeButton.addEventListener('click',()=>{
             contentDiv.replaceChildren();

          })
        };
      
      })
    })
  };

}
const StudentsPage = customElements.define('students-page',studentsPage);
export default StudentsPage;