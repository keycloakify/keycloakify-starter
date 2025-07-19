/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/js/kcNumberFormat.js" --public --revert
 */

// @ts-check
import { formatNumber } from "./common.js";
import { registerElementAnnotatedBy } from "./userProfile.js";

const KC_NUMBER_FORMAT = "kcNumberFormat";

registerElementAnnotatedBy({
  name: KC_NUMBER_FORMAT,
  onAdd(element) {
    const formatValue = () => {
      const format = element.getAttribute(`data-${KC_NUMBER_FORMAT}`);
      element.value = formatNumber(element.value, format);
    };

    element.addEventListener("keyup", formatValue);

    formatValue();

    return () => element.removeEventListener("keyup", formatValue);
  },
});
