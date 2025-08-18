import { useEffect } from "react";
import { useInsertScriptTags } from "../../../@keycloakify/login-ui/tools/useInsertScriptTags";
import { assert } from "tsafe/assert";
import { waitForElementMountedOnDom } from "../../../@keycloakify/login-ui/tools/waitForElementMountedOnDom";
import { useI18n } from "../../i18n";
import { BASE_URL } from "../../../kc.gen";
import { useKcContext } from "../../KcContext.gen";

export function useScript(params: { authButtonId: string }) {
    const { authButtonId } = params;

    const { kcContext } = useKcContext();
    assert(kcContext.enableWebAuthnConditionalUI);

    const { msgStr, isFetchingTranslations } = useI18n();

    const { insertScriptTags } = useInsertScriptTags({
        effectId: "ConditionalUIData",
        scriptTags: [
            {
                type: "module",
                textContent: () => `

                    import { authenticateByWebAuthn } from "${BASE_URL}keycloak-theme/login/js/webauthnAuthenticate.js";
                    import { initAuthenticate } from "${BASE_URL}keycloak-theme/login/js/passkeysConditionalAuth.js";

                    const args = {
                        isUserIdentified : ${kcContext.isUserIdentified},
                        challenge : '${kcContext.challenge}',
                        userVerification : '${kcContext.userVerification}',
                        rpId : '${kcContext.rpId}',
                        createTimeout : ${kcContext.createTimeout}
                    };

                    document.addEventListener("DOMContentLoaded", (event) => initAuthenticate({errmsg : "${msgStr("passkey-unsupported-browser-text")}", ...args}));
                    const authButton = document.getElementById('${authButtonId}');
                    if (authButton) {
                        authButton.addEventListener("click", (event) => {
                            event.preventDefault();
                            authenticateByWebAuthn({errmsg : "${msgStr("webauthn-unsupported-browser-text")}", ...args});
                        });
                    }

                `
            }
        ]
    });

    useEffect(() => {
        if (isFetchingTranslations) {
            return;
        }

        (async () => {
            await waitForElementMountedOnDom({
                elementId: authButtonId
            });

            insertScriptTags();
        })();
    }, [isFetchingTranslations]);
}
