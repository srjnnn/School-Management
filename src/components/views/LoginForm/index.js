import { loadTemplate } from "../../../utils/loadTemplate.js";
class LoginformComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.LoginTemplateContent = "";
        this.onEmailChange = null;
        this.onPassChange = null;
    }

    async connectedCallback() {
        this.LoginTemplateContent = await loadTemplate(
            "templates/views/LoginForm.html"
        );

        this.render();
        this.passProps();
    }

    render() {
        this.shadowRoot.innerHTML = this.LoginTemplateContent;

        // Create custom input and button elements
        const inputelement = document.createElement('my-input');
        const inputelement1 = document.createElement('my-input');
        const buttonelement = document.createElement('my-button');

        // Select containers to append elements
        const inputfield = this.shadowRoot.querySelector('.inputContainer');
        const buttonContainer = this.shadowRoot.querySelector('.loginButton');
        const passwordField = this.shadowRoot.querySelector('.passwordContainer');


        // Append elements to the container
        inputfield.appendChild(inputelement);
        buttonContainer.appendChild(buttonelement);
        passwordField.appendChild(inputelement1);

        
        // Set styles on the button
        buttonelement.setStyle({ height: '2.5rem', width: '6rem', val: 'Login' });

        inputelement.id = "email-input";
        inputelement1.id ="password-input"
        buttonContainer.id = "bbb"
        // Set Styles to the Input field 
        inputelement.setAttr({height : '2.4rem', width: '16rem' ,val: 'Enter the username' });
        inputelement1.setAttr({height : '2.4rem', width: '16rem' ,val: 'Enter the password' });

    }

    addProps(props) {
        // console.log("ading props", props);
        const {onEmailChange} = props;
        this.onEmailChange = onEmailChange;
        const {onPassChange} = props;
        this.onPassChange = onPassChange;
        const {onButtonChange} = props;
        this.onButtonChange = onButtonChange;
    }
 

    passProps() {
        const inputfield = this.shadowRoot.querySelector('#email-input');
        inputfield.onValueChange = this.onEmailChange;
        // inputfield.handleEvents();
        const inputfield1 = this.shadowRoot.querySelector('#password-input');
        inputfield1.onValueChange = this.onPassChange;
        console.log("email input", inputfield.onValueChange);
        // Button
        const buttonElement = this.shadowRoot.querySelector('#bbb');
        buttonElement.onValueChange = this.onButtonChange;
        
    }
}

const Lgnform = customElements.define("my-loginform", LoginformComponent);
export default Lgnform;
