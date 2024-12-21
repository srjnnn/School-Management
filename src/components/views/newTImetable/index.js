import { loadTemplate } from "../../../utils/loadTemplate.js";


class newTimetable extends HTMLElement{
 constructor(){
  super();
  this.attachShadow({mode : "open"});
  this.templateContent = "";
 }
 async connectedCallback(){
  this.templateContent= await loadTemplate("templates/views/newTimetable.html");
  this.render();
  this.addTable();
  this.observe();
 }
 render(){
  this.shadowRoot.innerHTML = this.templateContent;
  
 }
 addTable(){
  const tableContainer = this.shadowRoot.querySelector('.tableContainer');
  const table = document.createElement('my-table');
  tableContainer.appendChild(table);

 }
//  observe(){
//     const observer = new MutationObserver((mutationList , observer)=>{
//       mutationList.forEach((mutation)=>{
//         mutation.addedNodes.forEach((node)=>{
//           if(node.id === "topHeader"){
//             alert("Div found : " + node);
//             observer.disconnect();
//           }
//         });
//       });
//     });
//     observer.observe(this.shadowRoot,{
//       childList:true,
//       subtree : true
//     })
//  }
}

const newTimeTable = customElements.define("new-timetable",newTimetable);
export default newTimeTable;