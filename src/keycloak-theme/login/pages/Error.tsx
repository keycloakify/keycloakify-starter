import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client } = kcContext;

    const { msg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} 
            headerNode={
                <div>       
                    <h1 >{msg("errorTitle")}</h1>
                    <p className="text-center">{message.summary}</p>
                </div>
            }>
            <div id="kc-error-message">
                {client !== undefined && client.baseUrl !== undefined && (
                    <p className="instruction">
                        <a id="backToApplication" href={client.baseUrl}>
                            Back to BuildBetter
                        </a>
                    </p>
                )}
            </div>
        </Template>
    );
}
