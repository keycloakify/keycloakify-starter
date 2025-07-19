/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/frontchannel-logout/Page.tsx" --revert
 */

import { assert } from "tsafe/assert";
import { useEffect } from "react";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "frontchannel-logout.ftl");

    const { msg, msgStr } = useI18n();

    useEffect(() => {
        if (kcContext.logout.logoutRedirectUri) {
            window.location.replace(kcContext.logout.logoutRedirectUri);
        }
    }, []);

    return (
        <Template
            documentTitle={msgStr("frontchannel-logout.title")}
            headerNode={msg("frontchannel-logout.title")}
        >
            <p>{msg("frontchannel-logout.message")}</p>
            <ul>
                {kcContext.logout.clients.map(client => (
                    <li key={client.name}>
                        {client.name}
                        <iframe src={client.frontChannelLogoutUrl} style={{ display: "none" }} />
                    </li>
                ))}
            </ul>
            {kcContext.logout.logoutRedirectUri && (
                <a id="continue" className="btn btn-primary" href={kcContext.logout.logoutRedirectUri}>
                    {msg("doContinue")}
                </a>
            )}
        </Template>
    );
}
