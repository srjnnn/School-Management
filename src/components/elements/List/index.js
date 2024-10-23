class listComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `



<style>
           *{
    margin: 0;
    padding: 0;

}
html{
    
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.container{
    height: 549px;
    width: 406px;
    border: 1px solid #32ADE6;
    
}
.container h1{
    text-align: center;

}
.controllerDiv{
    display: flex;
    flex-direction: column;
    gap: 20px;
}



</style>


<div class="container">
<h1>Upcoming Events this Month</h1>

<div class="controllerDiv">
  <h2>Month</h2>
  <p>1 : events</p>
  <p>1 : events</p>
  <p>1 : events</p>
  <p>1 : events</p>
  <p>1 : events</p>
  <p>1 : events</p>
</div>
</div> 
     
     
      `
    }
  }
  
  customElements.define('my-list', listComponent);
