/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/info/Page.tsx" --revert
 */

import { assert } from "tsafe/assert";
import { kcSanitize } from "../../../@keycloakify/login-ui/kcSanitize";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "info.ftl");

    const { advancedMsgStr, msg } = useI18n();

    return (
        <Template
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(kcContext.messageHeader ?? kcContext.message.summary)
                    }}
                />
            }
        >
            <div id="kc-info-message">
                <p
                    className="instruction"
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                            (() => {
                                let html = kcContext.message.summary?.trim();

                                if (kcContext.requiredActions) {
                                    html += " <b>";

                                    html += kcContext.requiredActions
                                        .map(requiredAction =>
                                            advancedMsgStr(`requiredAction.${requiredAction}`)
                                        )
                                        .join(", ");

                                    html += "</b>";
                                }

                                return html;
                            })()
                        )
                    }}
                />
                {(() => {
                    if (kcContext.skipLink) {
                        return null;
                    }

                    if (kcContext.pageRedirectUri) {
                        return (
                            <p>
                                <a href={kcContext.pageRedirectUri}>{msg("backToApplication")}</a>
                            </p>
                        );
                    }
                    if (kcContext.actionUri) {
                        return (
                            <p>
                                <a href={kcContext.actionUri}>{msg("proceedWithAction")}</a>
                            </p>
                        );
                    }

                    if (kcContext.client.baseUrl) {
                        return (
                            <p>
                                <a href={kcContext.client.baseUrl}>{msg("backToApplication")}</a>
                            </p>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
