import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "./KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";
import type { KcContext } from "./KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { advancedMsgStr, msg } = useI18n();

    const {
        messageHeader,
        message,
        requiredActions,
        skipLink,
        pageRedirectUri,
        actionUri,
        client
    } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(messageHeader ?? message.summary)
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
                                let html = message.summary?.trim();

                                if (requiredActions) {
                                    html += " <b>";

                                    html += requiredActions
                                        .map(requiredAction =>
                                            advancedMsgStr(
                                                `requiredAction.${requiredAction}`
                                            )
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
                    if (skipLink) {
                        return null;
                    }

                    if (pageRedirectUri) {
                        return (
                            <p>
                                <a href={pageRedirectUri}>{msg("backToApplication")}</a>
                            </p>
                        );
                    }
                    if (actionUri) {
                        return (
                            <p>
                                <a href={actionUri}>{msg("proceedWithAction")}</a>
                            </p>
                        );
                    }

                    if (client.baseUrl) {
                        return (
                            <p>
                                <a href={client.baseUrl}>{msg("backToApplication")}</a>
                            </p>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
