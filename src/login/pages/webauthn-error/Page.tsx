/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/webauthn-error/Page.tsx" --revert
 */

import { assert } from "tsafe/assert";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "webauthn-error.ftl");

    const { url, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = useI18n();

    const { kcClsx } = useKcClsx();

    return (
        <Template displayMessage headerNode={msg("webauthn-error-title")}>
            <form
                id="kc-error-credential-form"
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
            >
                <input type="hidden" id="executionValue" name="authenticationExecution" />
                <input type="hidden" id="isSetRetry" name="isSetRetry" />
            </form>
            <input
                tabIndex={4}
                onClick={() => {
                    // @ts-expect-error: Trusted Keycloak's code
                    document.getElementById("isSetRetry").value = "retry";
                    // @ts-expect-error: Trusted Keycloak's code
                    document.getElementById("executionValue").value = "${execution}";
                    // @ts-expect-error: Trusted Keycloak's code
                    document.getElementById("kc-error-credential-form").submit();
                }}
                type="button"
                className={kcClsx(
                    "kcButtonClass",
                    "kcButtonPrimaryClass",
                    "kcButtonBlockClass",
                    "kcButtonLargeClass"
                )}
                name="try-again"
                id="kc-try-again"
                value={msgStr("doTryAgain")}
            />
            {isAppInitiatedAction && (
                <form
                    action={url.loginAction}
                    className={kcClsx("kcFormClass")}
                    id="kc-webauthn-settings-form"
                    method="post"
                >
                    <button
                        type="submit"
                        className={kcClsx(
                            "kcButtonClass",
                            "kcButtonDefaultClass",
                            "kcButtonBlockClass",
                            "kcButtonLargeClass"
                        )}
                        id="cancelWebAuthnAIA"
                        name="cancel-aia"
                        value="true"
                    >
                        {msgStr("doCancel")}
                    </button>
                </form>
            )}
        </Template>
    );
}
