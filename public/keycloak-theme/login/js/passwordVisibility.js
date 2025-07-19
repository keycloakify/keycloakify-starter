/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/js/passwordVisibility.js" --public --revert
 */

const toggle = (button) =>  {
    const passwordElement = document.getElementById(button.getAttribute('aria-controls'));
    if (passwordElement.type === "password") {
        passwordElement.type = "text";
        button.children.item(0).className = button.dataset.iconHide;
        button.setAttribute("aria-label", button.dataset.labelHide);
    } else if(passwordElement.type === "text") {
        passwordElement.type = "password";
        button.children.item(0).className = button.dataset.iconShow;
        button.setAttribute("aria-label", button.dataset.labelShow);
    }
}

document.querySelectorAll('[data-password-toggle]')
    .forEach(button => button.onclick = () => toggle(button));