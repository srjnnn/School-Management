
class LoadPage{
  static renderPages(customElement ,homepageElem, data){
    if (homepageElem){
    const mainContainer = homepageElem.shadowRoot.querySelector('#main-content-container');
    if (mainContainer.children.length > 0) {
        mainContainer.replaceChildren();
        this.addPage(customElement, mainContainer,data);
        

        
    } else {
        this.addPage(customElement, mainContainer);
    }
    

    }
    return homepageElem;

};
// Add page to the main container 
static addPage(customElement , mainContainer , data){
    const customPage = document.createElement(customElement);
    if(data){
        customPage.data = data;
    }
    mainContainer.appendChild(customPage);

};

static changeHeaderRoutes(homePage,path){
    // change the nav header here 
    // const homePage = value;
    
    const homepageShadowRoot = homePage.shadowRoot;
    // const navBar = homepageShadowRoot.querySelector('my-navbar');
    // const navBarShadowRoot = navBar.shadowRoot;

    const header = homepageShadowRoot.querySelector('#navHeader');

    // change the header based on the routes they goooooo... 
    header.innerHTML = path;
};
static changeClassList(sidebarElem, elemHeader) {
    const id = elemHeader.toLowerCase();

    
    // Select all elements with the 'active' class in the sidebar
    const activeButtons = sidebarElem.shadowRoot.querySelectorAll('.active');
    
    // Remove the 'active' class from all of them
    activeButtons.forEach(button => button.classList.remove('active'));

    // Find the specific button with the given id
    const Button = sidebarElem.shadowRoot.querySelector(`#${id}`);
    
    // Add the 'active' class to the selected button
    if (Button) {
        Button.classList.add('active');
    } else {
        console.error("Button not found with id:", id);
    }
}

}
export default LoadPage;