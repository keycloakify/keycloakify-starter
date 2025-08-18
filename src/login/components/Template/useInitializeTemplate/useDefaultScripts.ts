import { useInsertScriptTags } from "../../../../@keycloakify/login-ui/tools/useInsertScriptTags";
import { BASE_URL } from "../../../../kc.gen";
import { useKcContext } from "../../../KcContext.gen";

export function useDefaultScripts() {
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
                textContent: [
                    `import { startSessionPolling, checkAuthSession } from "${BASE_URL}keycloak-theme/login/js/authChecker.js";`,
                    ``,
                    `startSessionPolling("${kcContext.url.ssoLoginInOtherTabsUrl}");`,
                    kcContext.authenticationSession === undefined
                        ? ""
                        : `checkAuthSession("${kcContext.authenticationSession.authSessionIdHash}");`
                ].join("\n")
            }
        ]
    });

    return { insertScriptTags };
}
