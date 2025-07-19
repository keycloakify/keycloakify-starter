/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/js/kcNumberUnFormat.js" --public --revert
 */

// @ts-check
import { formatNumber } from "./common.js";
import { registerElementAnnotatedBy } from "./userProfile.js";

const KC_NUMBER_UNFORMAT = 'kcNumberUnFormat';

registerElementAnnotatedBy({
    name: KC_NUMBER_UNFORMAT,
    onAdd(element) {
        for (let form of document.forms) {
            form.addEventListener('submit', (event) => {
                const rawFormat = element.getAttribute(`data-${KC_NUMBER_UNFORMAT}`);
                if (rawFormat) {
                    element.value = formatNumber(element.value, rawFormat);
                }
            });
        }
    },
});
