
class LoadPage{
  static renderPages(customElement ,homepageElem){
    const homePage = homepageElem;
    if (homePage){
    const mainContainer = homePage.shadowRoot.querySelector('#main-content-container');
    if (mainContainer.children.length > 0) {
        mainContainer.replaceChildren();
        this.addPage(customElement, mainContainer);
        

        
    } else {
        this.addPage(customElement, mainContainer);
    }
    

    }
    return homePage;

};
// Add page to the main container 
static addPage(customElement , mainContainer){
    const customPage = document.createElement(customElement);
    mainContainer.appendChild(customPage);

};

static changeHeaderRoutes(homePage,path){
    // change the nav header here 
    // const homePage = value;
    
    const homepageShadowRoot = homePage.shadowRoot;
    const navBar = homepageShadowRoot.querySelector('my-navbar');
    const navBarShadowRoot = navBar.shadowRoot;
    const header = navBarShadowRoot.querySelector('#navHeader');

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