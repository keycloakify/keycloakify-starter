
import { useInsertScriptTags } from "../../../../@keycloakify/login-ui/tools/useInsertScriptTags";
import { BASE_URL } from "../../../../kc.gen";
import { useKcContext } from "../../../KcContext";

export function useDefaultScripts(){

    const { kcContext } = useKcContext();

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
            }])
        ]
    });

    return { insertScriptTags };

}