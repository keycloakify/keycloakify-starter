import type { PageProps } from "./PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, brokerContext, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("emailLinkIdpTitle", idpAlias)}
        >
            <p id="instruction1" className="instruction">
                {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
            </p>
            <p id="instruction2" className="instruction">
                {msg("emailLinkIdp2")} <a href={url.loginAction}>{msg("doClickHere")}</a> {msg("emailLinkIdp3")}
            </p>
            <p id="instruction3" className="instruction">
                {msg("emailLinkIdp4")} <a href={url.loginAction}>{msg("doClickHere")}</a> {msg("emailLinkIdp5")}
            </p>
        </Template>
    );
}
