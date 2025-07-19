/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/terms/Page.tsx" --revert
 */

import { assert } from "tsafe/assert";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "select-authenticator.ftl");

    const { kcClsx } = useKcClsx();

    const { msg, msgStr } = useI18n();

    const { url } = kcContext;

    return (
        <Template displayMessage={false} headerNode={msg("termsTitle")}>
            <div id="kc-terms-text">{msg("termsText")}</div>
            <form className="form-actions" action={url.loginAction} method="POST">
                <input
                    className={kcClsx(
                        "kcButtonClass",
                        "kcButtonClass",
                        "kcButtonClass",
                        "kcButtonPrimaryClass",
                        "kcButtonLargeClass"
                    )}
                    name="accept"
                    id="kc-accept"
                    type="submit"
                    value={msgStr("doAccept")}
                />
                <input
                    className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                    name="cancel"
                    id="kc-decline"
                    type="submit"
                    value={msgStr("doDecline")}
                />
            </form>
            <div className="clearfix" />
        </Template>
    );
}
