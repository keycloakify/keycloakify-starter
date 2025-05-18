import { useKcClsx } from "../../_internals/useKcClsx";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";
import { useKcContext } from "../../KcContext";

export function Page() {

    const { kcContext } = useKcContext("login-oauth-grant.ftl");

    const { msg, msgStr, advancedMsg, advancedMsgStr } = useI18n();

    const { kcClsx } = useKcClsx();

    return (
        <Template
            bodyClassName="oauth"
            headerNode={
                <>
                    {kcContext.client.attributes.logoUri && <img src={kcContext.client.attributes.logoUri} />}
                    <p>
                        {kcContext.client.name
                            ? msg("oauthGrantTitle", advancedMsgStr(kcContext.client.name))
                            : msg("oauthGrantTitle", kcContext.client.clientId)}
                    </p>
                </>
            }
        >
            <div id="kc-oauth" className="content-area">
                <h3>{msg("oauthGrantRequest")}</h3>
                <ul>
                    {kcContext.oauth.clientScopesRequested.map(clientScope => (
                        <li key={clientScope.consentScreenText}>
                            <span>
                                {advancedMsg(clientScope.consentScreenText)}
                                {clientScope.dynamicScopeParameter && (
                                    <>
                                        : <b>{clientScope.dynamicScopeParameter}</b>
                                    </>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>

                {kcContext.client.attributes.policyUri ||
                    (kcContext.client.attributes.tosUri && (
                        <h3>
                            {kcContext.client.name
                                ? msg(
                                      "oauthGrantInformation",
                                      advancedMsgStr(kcContext.client.name)
                                  )
                                : msg("oauthGrantInformation", kcContext.client.clientId)}
                            {kcContext.client.attributes.tosUri && (
                                <>
                                    {msg("oauthGrantReview")}
                                    <a href={kcContext.client.attributes.tosUri} target="_blank" rel="noreferrer">
                                        {msg("oauthGrantTos")}
                                    </a>
                                </>
                            )}
                            {kcContext.client.attributes.policyUri && (
                                <>
                                    {msg("oauthGrantReview")}
                                    <a href={kcContext.client.attributes.policyUri} target="_blank" rel="noreferrer">
                                        {msg("oauthGrantPolicy")}
                                    </a>
                                </>
                            )}
                        </h3>
                    ))}

                <form className="form-actions" action={kcContext.url.oauthAction} method="POST">
                    <input type="hidden" name="code" value={kcContext.oauth.code} />
                    <div className={kcClsx("kcFormGroupClass")}>
                        <div id="kc-form-options">
                            <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                        </div>

                        <div id="kc-form-buttons">
                            <div className={kcClsx("kcFormButtonsWrapperClass")}>
                                <input
                                    className={kcClsx(
                                        "kcButtonClass",
                                        "kcButtonPrimaryClass",
                                        "kcButtonLargeClass"
                                    )}
                                    name="accept"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doYes")}
                                />
                                <input
                                    className={kcClsx(
                                        "kcButtonClass",
                                        "kcButtonDefaultClass",
                                        "kcButtonLargeClass"
                                    )}
                                    name="cancel"
                                    id="kc-cancel"
                                    type="submit"
                                    value={msgStr("doNo")}
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="clearfix"></div>
            </div>
        </Template>
    );
}
