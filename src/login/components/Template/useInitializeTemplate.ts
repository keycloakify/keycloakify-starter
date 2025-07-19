/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/components/Template/useInitializeTemplate.ts" --revert
 */

/* eslint-disable */

import { useEffect } from "react";
import { useInsertScriptTags } from "../../../@keycloakify/login-ui/tools/useInsertScriptTags";
import { useInsertLinkTags } from "../../../@keycloakify/login-ui/tools/useInsertLinkTags";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { BASE_URL } from "../../../kc.gen";
import { useKcContext } from "../../KcContext";

export function useInitializeTemplate() {
    const { kcContext } = useKcContext();

    const { doUseDefaultCss } = useKcClsx();

    const { areAllStyleSheetsLoaded } = useInsertLinkTags({
        effectId: "Template",
        hrefs: !doUseDefaultCss
            ? []
            : [
                  `${BASE_URL}keycloak-theme/login/resources-common/node_modules/@patternfly/patternfly/patternfly.min.css`,
                  `${BASE_URL}keycloak-theme/login/resources-common/node_modules/patternfly/dist/css/patternfly.min.css`,
                  `${BASE_URL}keycloak-theme/login/resources-common/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
                  `${BASE_URL}keycloak-theme/login/resources-common/lib/pficon/pficon.css`,
                  `${BASE_URL}keycloak-theme/login/css/login.css`
              ]
    });

    const { insertScriptTags } = useInsertScriptTags({
        effectId: "Template",
        scriptTags: [
            // NOTE: The importmap is added in by the FTL script because it's too late to add it here.
            {
                type: "module",
                src: `${BASE_URL}keycloak-theme/login/js/menu-button-links.js`
            },
            ...(kcContext.scripts === undefined
                ? []
                : kcContext.scripts.map(src => ({
                      type: "text/javascript" as const,
                      src
                  }))),
            {
                type: "module",
                textContent: `
                    import { checkCookiesAndSetTimer } from "${BASE_URL}keycloak-theme/login/js/authChecker.js";

                    checkCookiesAndSetTimer("${kcContext.url.ssoLoginInOtherTabsUrl}");
                `
            }
        ]
    });

    useEffect(() => {
        if (areAllStyleSheetsLoaded) {
            insertScriptTags();
        }
    }, [areAllStyleSheetsLoaded]);

    return { isReadyToRender: areAllStyleSheetsLoaded };
}
