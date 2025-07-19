/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/login-idp-link-confirm-override/Page.tsx" --revert
 */

import { assert } from "tsafe/assert";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";
import { useKcContext } from "../../KcContext";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login-idp-link-confirm-override.ftl");

    const { kcClsx } = useKcClsx();

    const { msg } = useI18n();

    return (
        <Template headerNode={msg("confirmOverrideIdpTitle")}>
            <form id="kc-register-form" action={kcContext.url.loginAction} method="post">
                {msg("pageExpiredMsg1")}{" "}
                <a id="loginRestartLink" href={kcContext.url.loginRestartFlowUrl}>
                    {msg("doClickHere")}
                </a>
                <br />
                <br />
                <button
                    type="submit"
                    className={kcClsx(
                        "kcButtonClass",
                        "kcButtonDefaultClass",
                        "kcButtonBlockClass",
                        "kcButtonLargeClass"
                    )}
                    name="submitAction"
                    id="confirmOverride"
                    value="confirmOverride"
                >
                    {msg("confirmOverrideIdpContinue", kcContext.idpDisplayName)}
                </button>
            </form>
        </Template>
    );
}
