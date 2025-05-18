import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";
import { useKcContext } from "../../KcContext";


export function Page() {

    const { kcContext } = useKcContext("login-idp-link-email.ftl");

    const { msg }= useI18n();

    return (
        <Template
           
            headerNode={msg("emailLinkIdpTitle", kcContext.idpAlias)}
        >
            <p id="instruction1" className="instruction">
                {msg("emailLinkIdp1", kcContext.idpAlias, kcContext.brokerContext.username, kcContext.realm.displayName)}
            </p>
            <p id="instruction2" className="instruction">
                {msg("emailLinkIdp2")} <a href={kcContext.url.loginAction}>{msg("doClickHere")}</a> {msg("emailLinkIdp3")}
            </p>
            <p id="instruction3" className="instruction">
                {msg("emailLinkIdp4")} <a href={kcContext.url.loginAction}>{msg("doClickHere")}</a> {msg("emailLinkIdp5")}
            </p>
        </Template>
    );
}
