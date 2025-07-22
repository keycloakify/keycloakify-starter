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
import { useInitializeDarkMode } from "../../../@keycloakify/login-ui/useInitializeDarkMode";
import { BASE_URL } from "../../../kc.gen";
import { useKcContext } from "../../KcContext";

export function useInitializeTemplate() {
    const { kcContext } = useKcContext();

    const { doUseDefaultCss, kcClsx } = useKcClsx();

    const { areAllStyleSheetsLoaded } = useInsertLinkTags({
        effectId: "Template",
        hrefs: !doUseDefaultCss
            ? []
            : [
                  `${BASE_URL}keycloak-theme/login/resources-common/vendor/patternfly-v5/patternfly.min.css`,
                  `${BASE_URL}keycloak-theme/login/resources-common/vendor/patternfly-v5/patternfly-addons.css`,
                  `${BASE_URL}keycloak-theme/login/css/login.css`
              ]
    });

    const { insertScriptTags } = useInsertScriptTags({
        effectId: "Template",
        scriptTags: [
            ...(kcContext.scripts === undefined
                ? []
                : kcContext.scripts.map(src => ({
                      type: "text/javascript" as const,
                      src
                  }))),
            {
                type: "module",
                textContent: `
                    import { startSessionPolling } from "${BASE_URL}keycloak-theme/login/js/authChecker.js";

                    startSessionPolling("${kcContext.url.ssoLoginInOtherTabsUrl}");
                `
            },
            ...(kcContext.authenticationSession === undefined ? [] :
            [{
                type: "module" as const,
                textContent: `
                    import { checkAuthSession } from "${BASE_URL}keycloak-theme/login/js/authChecker.js";

                    checkAuthSession("${kcContext.authenticationSession.authSessionIdHash}");
                `
            }]),
            {
                type: "text/javascript",
                textContent: `
                    // Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=1404468
                    const isFirefox = true;
                `
            }
        ]
    });

    useInitializeDarkMode({
        doEnableDarkModeIfPreferred: kcContext.darkMode ?? true,
        htmlDarkModeClassName: kcClsx("kcDarkModeClass")
    });

    useEffect(() => {
        if (areAllStyleSheetsLoaded) {
            insertScriptTags();
        }
    }, [areAllStyleSheetsLoaded]);

    return { isReadyToRender: areAllStyleSheetsLoaded };
}
