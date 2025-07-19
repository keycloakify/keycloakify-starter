/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/saml-post-form/Page.tsx" --revert
 */

import { assert } from "tsafe/assert";
import { useEffect, useState } from "react";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "saml-post-form.ftl");

    const { msgStr, msg } = useI18n();

    const { samlPost } = kcContext;

    const [htmlFormElement, setHtmlFormElement] = useState<HTMLFormElement | null>(null);

    useEffect(() => {
        if (htmlFormElement === null) {
            return;
        }

        // Storybook
        if (samlPost.url === "#") {
            alert("In a real Keycloak the user would be redirected immediately");
            return;
        }

        htmlFormElement.submit();
    }, [htmlFormElement]);
    return (
        <Template headerNode={msg("saml.post-form.title")}>
            <p>{msg("saml.post-form.message")}</p>
            <form name="saml-post-binding" method="post" action={samlPost.url} ref={setHtmlFormElement}>
                {samlPost.SAMLRequest && (
                    <input type="hidden" name="SAMLRequest" value={samlPost.SAMLRequest} />
                )}
                {samlPost.SAMLResponse && (
                    <input type="hidden" name="SAMLResponse" value={samlPost.SAMLResponse} />
                )}
                {samlPost.relayState && (
                    <input type="hidden" name="RelayState" value={samlPost.relayState} />
                )}
                <noscript>
                    <p>{msg("saml.post-form.js-disabled")}</p>
                    <input type="submit" value={msgStr("doContinue")} />
                </noscript>
            </form>
        </Template>
    );
}
