// All the repeated functions are written here to minimize code

class Common {
// Add success PopUp
 static addSuccessPopup(hostShadowroot,response,timer){
    const absoluteDiv = document.createElement('div');
    absoluteDiv.id = "absoluteDiv";
    absoluteDiv.className = "absoluteDiv";
    const popup = document.createElement("success-popup");
    popup.data = response;
    absoluteDiv.appendChild(popup);
    hostShadowroot.appendChild(absoluteDiv);
    absoluteDiv.classList.remove('hidden');
    setTimeout(() => {
    absoluteDiv.remove();
    }, timer || 3000);
  };
  // Add error Popup
  static addErrorPopup(hostShadowroot, response,timer){
    const absoluteDiv = document.createElement('div');
    absoluteDiv.id = "absoluteDiv";
    absoluteDiv.className = "absoluteDiv";
    const popup = document.createElement("error-popup");
    popup.data = response;
    absoluteDiv.appendChild(popup);
    hostShadowroot.appendChild(absoluteDiv);
    absoluteDiv.classList.remove('hidden');
    setTimeout(() => {
    absoluteDiv.remove();
    }, timer || 3000);
  }
//  Moveavle box
 static detailsClick(hostShadowroot,UserData,tableId){
  const rows = hostShadowroot.querySelectorAll(`#${tableId} tr`);
  rows.forEach(row=>{
    const lastRow = row.lastElementChild;
    row.addEventListener('click',(event)=>{
      if(lastRow.contains(event.target)){
        return
      }
    // teacher data by the id 
    const userId = row.dataset.id;
    const userData = UserData.find(user => user.id == userId);


      // Rest logic on how to append the child 
      const absoluteDiv = hostShadowroot.querySelector('#absoluteDiv');
      const contentDiv = hostShadowroot.querySelector('#contentDiv');


      // make the div moveable 

      let isDragging = false;
      let offSetX, offSetY;
      absoluteDiv.addEventListener('mousedown', (e) =>{
        isDragging = true;
        offSetX = e.clientX - absoluteDiv.offsetLeft;
        offSetY = e.clientY - absoluteDiv.offsetTop;
        absoluteDiv.style.cursor = 'grabbing';
      })
      hostShadowroot.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const x = e.clientX - offSetX;
            const y = e.clientY - offSetY;
            absoluteDiv.style.left = `${x}px`;
            absoluteDiv.style.top = `${y}px`;
        }
    });
    hostShadowroot.addEventListener('mouseup', () => {
      isDragging = false;
      absoluteDiv.style.cursor = 'grab';
  });
      absoluteDiv.classList.remove('hidden');
      // Create a summary box and send the clicked teachers/studentData
      const summaryBox = document.createElement('my-usersummary');
      summaryBox.data = userData;
      if(contentDiv){
        contentDiv.replaceChildren();
        contentDiv.appendChild(summaryBox);
        const closeButton = document.createElement('div');
        closeButton.style.position = 'absolute'
        closeButton.style.top = '0%'
        closeButton.innerHTML = `
        <style>
           #close {border: none; background-color : transparent; cursor : pointer;}
           #closeImg {height: 3rem; z-index: 500;}
          .buttons {display: flex; justify-content: flex-end;}
        </style>

        <div class="buttons">
           <button id="close" class="close"><img src="/public/assets/icons/x.svg" alt="closeIcon" id="closeImg"></button>
        </div>`
        
        contentDiv.appendChild(closeButton);
        closeButton.addEventListener('click',()=>{
           contentDiv.replaceChildren();

        })
      };
    
    })
  })
 }
// get hostElement 
static getHostElem(shadowRoot){
  const hostElement = shadowRoot.getRootNode().host;
  const mainHostElement = hostElement.getRootNode().host;
  return mainHostElement;
};
//  Generate the random password
static generateRandomPass(){
  const characters = "AMITY123456789@#";
  let password = "";
  
  for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
  }

  return password;

}

}

export default Common;