import { assert } from "keycloakify/tools/assert";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msgStr, msg } = i18n;

    assert(kcContext.message !== undefined);

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={false}
            headerNode={
                <div>       
                    <h1 >{messageHeader !== undefined ? <>{messageHeader}</> : <>{message.summary}</>}</h1>
                </div>
            }
        >
            <div id="kc-info-message">
                <p className="instruction">
                    {message.summary}

                    {requiredActions !== undefined && (
                        <b>{requiredActions.map(requiredAction => msgStr(`requiredAction.${requiredAction}` as const)).join(",")}</b>
                    )}
                </p>
                <p className="instruction mt-3">
                    
                {!skipLink && pageRedirectUri !== undefined ? (
                    <a href={pageRedirectUri}>Back to BuildBetter</a>
                ) : actionUri !== undefined ? (
                    <a href={actionUri}>{msg("proceedWithAction")}</a>
                ) : (
                    client.baseUrl !== undefined && (
                        <a href={client.baseUrl}>Back to BuildBetter</a>
                    )
                )}
                </p>
            </div>
        </Template>
    );
}
