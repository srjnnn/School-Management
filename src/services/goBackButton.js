class goBackButton{
  static pagesRendered =[];
  static pagesRenderedHeader = [];
  static sidebarElement;
  static savePagesRendered(pageName,pageHeader){
    if(pageName,pageHeader){
      this.pagesRendered.push(pageName);
      this.pagesRenderedHeader.push(pageHeader);
    }
  };
  static getPagesRendered(){
    return this.pagesRendered ;
  }
  static getPagesHeader(){
    return this.pagesRenderedHeader;
  }
   // queries whether it is the first page or not 
static getEventDetails(host){
  const history = this.getPagesRendered();
  const Header = this.getPagesHeader();
  if(history.length === 1 && Header.length ===1){
    const BackButton = host.shadowRoot.querySelector('#backButton');
    BackButton.classList.add('hidden');
  }else{
    const BackButton = host.shadowRoot.querySelector('#backButton');
    BackButton.classList.remove('hidden');
  }
};
static saveSidebarElement(sidebar){
  this.sidebarElement = sidebar;
};
static getSidebarElement(){
  return this.sidebarElement;
}

}
export default goBackButton;