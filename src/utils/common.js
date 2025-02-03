// All the repeated functions are written here to minimize code

class Common {
// Add success PopUp
 static addSuccessPopup(hostShadowroot,response){
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
    }, 3000);
  }



}
export default Common;