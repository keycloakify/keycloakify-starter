/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/webauthn-register/useScript.tsx" --revert
 */

import { useEffect } from "react";
import { assert } from "tsafe/assert";
import { useInsertScriptTags } from "../../../@keycloakify/login-ui/tools/useInsertScriptTags";
import { waitForElementMountedOnDom } from "../../../@keycloakify/login-ui/tools/waitForElementMountedOnDom";
// NOTE: If you are in a Vite project you can use `import.meta.env.BASE_URL` directly, this is a shim to support Webpack.
import { BASE_URL } from "../../../kc.gen";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";

export function useScript(params: { authButtonId: string }) {
    const { authButtonId } = params;

    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "webauthn-register.ftl");

    const { msgStr, isFetchingTranslations } = useI18n();

    const { insertScriptTags } = useInsertScriptTags({
        effectId: "LoginRecoveryAuthnCodeConfig",
        scriptTags: [
            {
                type: "module",
                textContent: () => `
                    import { registerByWebAuthn } from "${BASE_URL}keycloak-theme/login/js/webauthnRegister.js";
                    const registerButton = document.getElementById('${authButtonId}');
                    registerButton.addEventListener("click", function() {
                        const input = {
                            challenge : '${kcContext.challenge}',
                            userid : '${kcContext.userid}',
                            username : '${kcContext.username}',
                            signatureAlgorithms : ${JSON.stringify(kcContext.signatureAlgorithms)},
                            rpEntityName : ${JSON.stringify(kcContext.rpEntityName)},
                            rpId : ${JSON.stringify(kcContext.rpId)},
                            attestationConveyancePreference : ${JSON.stringify(kcContext.attestationConveyancePreference)},
                            authenticatorAttachment : ${JSON.stringify(kcContext.authenticatorAttachment)},
                            requireResidentKey : ${JSON.stringify(kcContext.requireResidentKey)},
                            userVerificationRequirement : ${JSON.stringify(kcContext.userVerificationRequirement)},
                            createTimeout : ${kcContext.createTimeout},
                            excludeCredentialIds : ${JSON.stringify(kcContext.excludeCredentialIds)},
                            initLabel : ${JSON.stringify(msgStr("webauthn-registration-init-label"))},
                            initLabelPrompt : ${JSON.stringify(msgStr("webauthn-registration-init-label-prompt"))},
                            errmsg : ${JSON.stringify(msgStr("webauthn-unsupported-browser-text"))}
                        };
                        registerByWebAuthn(input);
                    });
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
