class RestrictUser{
  // A method to identify user type;
  static isSuperUser = false;
// Identify the usertype and return the value in true and false
  static IdentifyUserType(){
    // get the user type from the local storage .....
    const type = localStorage.getItem('userState') || "norm";
    if(type === "super"){
        this.isSuperUser = true;
        return this.isSuperUser;
    } else{
      return this.isSuperUser;
    }   

  };
  // removeEventListners(element,divID){
  //   const ShadowRoot = element.shadowroot.querySelector(`${divID}`);
  //   // 

  // }
  



  // get the routes and console it 
  static getStaticRoutes(mainContentContainer){
    const main = mainContentContainer;
    // const mainContentContainer = Homepage.shadowRoot.querySelector('#main-content-container');
    // console.log("Main content container : " ,mainContentContainer);
    
  }
}
export default RestrictUser;
