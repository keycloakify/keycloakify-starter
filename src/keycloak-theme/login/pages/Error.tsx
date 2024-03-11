import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { HeaderNode } from "../components/header-node";
import { BackTo } from "../components/back-to-login";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { message, client } = kcContext;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false}
            headerNode={
                <HeaderNode
                    title="We are sorry..."
                    subtitle={message.summary}
                />
            }>

            {client !== undefined && client.baseUrl !== undefined && (
                <BackTo loginUrl={client.baseUrl} target="BuildBetter" />
            )}
        </Template >
    );
}
