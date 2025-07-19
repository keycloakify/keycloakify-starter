/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/webauthn-register/Page.tsx" --revert
 */

import { assert } from "tsafe/assert";
import { useScript } from "./useScript";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";
import { LogoutOtherSessions } from "../../components/LogoutOtherSessions";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "webauthn-register.ftl");

    const { kcClsx } = useKcClsx();

    const { msg, msgStr } = useI18n();

    const authButtonId = "authenticateWebAuthnButton";

    useScript({ authButtonId });

    return (
        <Template
            headerNode={
                <>
                    <span className={kcClsx("kcWebAuthnKeyIcon")} />
                    {msg("webauthn-registration-title")}
                </>
            }
        >
            <form
                id="register"
                className={kcClsx("kcFormClass")}
                action={kcContext.url.loginAction}
                method="post"
            >
                <div className={kcClsx("kcFormGroupClass")}>
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="attestationObject" name="attestationObject" />
                    <input type="hidden" id="publicKeyCredentialId" name="publicKeyCredentialId" />
                    <input type="hidden" id="authenticatorLabel" name="authenticatorLabel" />
                    <input type="hidden" id="transports" name="transports" />
                    <input type="hidden" id="error" name="error" />
                    <LogoutOtherSessions />
                </div>
            </form>
            <input
                type="submit"
                className={kcClsx(
                    "kcButtonClass",
                    "kcButtonPrimaryClass",
                    "kcButtonBlockClass",
                    "kcButtonLargeClass"
                )}
                id={authButtonId}
                value={msgStr("doRegisterSecurityKey")}
            />

            {!kcContext.isSetRetry && kcContext.isAppInitiatedAction && (
                <form
                    action={kcContext.url.loginAction}
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
                        {msg("doCancel")}
                    </button>
                </form>
            )}
        </Template>
    );
}
