/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/login-idp-link-email/Page.tsx" --revert
 */

import { assert } from "tsafe/assert";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";
import { useKcContext } from "../../KcContext";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login-idp-link-email.ftl");

    const { msg } = useI18n();

    return (
        <Template headerNode={msg("emailLinkIdpTitle", kcContext.idpAlias)}>
            <p id="instruction1" className="instruction">
                {msg(
                    "emailLinkIdp1",
                    kcContext.idpAlias,
                    kcContext.brokerContext.username,
                    kcContext.realm.displayName
                )}
            </p>
            <p id="instruction2" className="instruction">
                {msg("emailLinkIdp2")} <a href={kcContext.url.loginAction}>{msg("doClickHere")}</a>{" "}
                {msg("emailLinkIdp3")}
            </p>
            <p id="instruction3" className="instruction">
                {msg("emailLinkIdp4")} <a href={kcContext.url.loginAction}>{msg("doClickHere")}</a>{" "}
                {msg("emailLinkIdp5")}
            </p>
        </Template>
    );
}
