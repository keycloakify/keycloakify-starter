/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/select-authenticator/Page.tsx" --revert
 */

import { assert } from "tsafe/assert";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "select-authenticator.ftl");

    const { url, auth } = kcContext;

    const { kcClsx } = useKcClsx();
    const { msg, advancedMsg } = useI18n();

    return (
        <Template displayInfo={false} headerNode={msg("loginChooseAuthenticator")}>
            <form
                id="kc-select-credential-form"
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
            >
                <div className={kcClsx("kcSelectAuthListClass")}>
                    {auth.authenticationSelections.map((authenticationSelection, i) => (
                        <button
                            key={i}
                            className={kcClsx("kcSelectAuthListItemClass")}
                            type="submit"
                            name="authenticationExecution"
                            value={authenticationSelection.authExecId}
                        >
                            <div className={kcClsx("kcSelectAuthListItemIconClass")}>
                                <i
                                    className={kcClsx(
                                        "kcSelectAuthListItemIconPropertyClass",
                                        authenticationSelection.iconCssClass
                                    )}
                                />
                            </div>
                            <div className={kcClsx("kcSelectAuthListItemBodyClass")}>
                                <div className={kcClsx("kcSelectAuthListItemHeadingClass")}>
                                    {advancedMsg(authenticationSelection.displayName)}
                                </div>
                                <div className={kcClsx("kcSelectAuthListItemDescriptionClass")}>
                                    {advancedMsg(authenticationSelection.helpText)}
                                </div>
                            </div>
                            <div className={kcClsx("kcSelectAuthListItemFillClass")} />
                            <div className={kcClsx("kcSelectAuthListItemArrowClass")}>
                                <i className={kcClsx("kcSelectAuthListItemArrowIconClass")} />
                            </div>
                        </button>
                    ))}
                </div>
            </form>
        </Template>
    );
}
