import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginIdpLinkEmail(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-idp-link-email.ftl";
            }
        >,
        I18n
    >
) {
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
            <br />
            <p id="instruction2" className="instruction">
                {msg("emailLinkIdp2")} <br />
                <a href={url.loginAction} className={"text-primary-600 hover:text-primary-500 inline-flex no-underline hover:no-underline"}>
                    {msg("doClickHere")}
                </a>{" "}
                {msg("emailLinkIdp3")}
            </p>
            <br />
            <p id="instruction3" className="instruction">
                {msg("emailLinkIdp4")} <br />
                <a href={url.loginAction} className={"text-primary-600 hover:text-primary-500 inline-flex no-underline hover:no-underline"}>
                    {msg("doClickHere")}
                </a>{" "}
                {msg("emailLinkIdp5")}
            </p>
        </Template>
    );
}
