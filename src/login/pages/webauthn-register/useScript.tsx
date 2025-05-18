import { useEffect } from "react";
import { useInsertScriptTags } from "keycloakify/tools/useInsertScriptTags";
import { waitForElementMountedOnDom } from "keycloakify/tools/waitForElementMountedOnDom";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";

export function useScript(params: { authButtonId: string; }) {
    const { authButtonId } = params;

    const { kcContext } = useKcContext("webauthn-register.ftl");

    const { msgStr, isFetchingTranslations }= useI18n();

    const { insertScriptTags } = useInsertScriptTags({
        componentOrHookName: "LoginRecoveryAuthnCodeConfig",
        scriptTags: [
            {
                type: "module",
                textContent: () => `
                    import { registerByWebAuthn } from "${kcContext.url.resourcesPath}/js/webauthnRegister.js";
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
