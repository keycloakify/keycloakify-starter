/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/mocks/getKcContextMock.ts" --revert
 */

import { createGetKcContextMock } from "../../@keycloakify/login-ui/KcContext/getKcContextMock";
import type { KcContextExtension, KcContextExtensionPerPage } from "../KcContext";
import { themeNames, kcEnvDefaults } from "../../kc.gen";

const kcContextExtension: KcContextExtension = {
    themeName: themeNames[0],
    properties: {
        ...kcEnvDefaults
    }
};
const kcContextExtensionPerPage: KcContextExtensionPerPage = {};

export const { getKcContextMock } = createGetKcContextMock({
    kcContextExtension,
    kcContextExtensionPerPage,
    overrides: {},
    overridesPerPage: {}
});
