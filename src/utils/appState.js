class appState {

  static setUserType(type){
      localStorage.removeItem("userState");
      localStorage.setItem("userState" , type);
  }
  static getUserType(){
    this.userType = localStorage.getItem("userState") || "";
    return this.userType;
  }
};
export default appState;