import { useEffect } from "react";
import { clsx } from "@keycloakify/account-multi-page-ui/tools/clsx";
import { kcSanitize } from "@keycloakify/account-multi-page-ui/kcSanitize";
import { useSetClassName } from "@keycloakify/account-multi-page-ui/tools/useSetClassName";
import { useKcClsx } from "@keycloakify/account-multi-page-ui/useKcClsx";
import { useInitializeTemplate } from "./useInitializeTemplate";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";

export function Template(props: {
    active: string;
    kcBodyClass?: string;
    message?: {
        type: "success" | "warning" | "error" | "info";
        summary: string;
    };
    children: React.ReactNode;
}) {
    const { kcContext } = useKcContext();

    const { active, kcBodyClass, message = kcContext.message, children } = props;

    const { msg, msgStr, currentLanguage, enabledLanguages } = useI18n();

    const { kcClsx } = useKcClsx();

    useEffect(() => {
        document.title = msgStr("accountManagementTitle");
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: clsx("admin-console", "user", kcClsx("kcBodyClass"), kcBodyClass)
    });

    const { isReadyToRender } = useInitializeTemplate();

    if (!isReadyToRender) {
        return null;
    }

    return (
        <>
            <header className="navbar navbar-default navbar-pf navbar-main header">
                <nav className="navbar" role="navigation">
                    <div className="navbar-header">
                        <div className="container">
                            <h1 className="navbar-title">Keycloak</h1>
                        </div>
                    </div>
                    <div className="navbar-collapse navbar-collapse-1">
                        <div className="container">
                            <ul className="nav navbar-nav navbar-utility">
                                {enabledLanguages.length > 1 && (
                                    <li>
                                        <div className="kc-dropdown" id="kc-locale-dropdown">
                                            <a href="#" id="kc-current-locale-link">
                                                {currentLanguage.label}
                                            </a>
                                            <ul>
                                                {enabledLanguages.map(({ languageTag, label, href }) => (
                                                    <li key={languageTag} className="kc-dropdown-item">
                                                        <a href={href}>{label}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                )}
                                {kcContext.referrer?.url && (
                                    <li>
                                        <a href={kcContext.referrer.url} id="referrer">
                                            {msg("backTo", kcContext.referrer.name)}
                                        </a>
                                    </li>
                                )}
                                <li>
                                    <a href={kcContext.url.getLogoutUrl()}>{msg("doSignOut")}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="container">
                <div className="bs-sidebar col-sm-3">
                    <ul>
                        <li className={clsx(active === "account" && "active")}>
                            <a href={kcContext.url.accountUrl}>{msg("account")}</a>
                        </li>
                        {kcContext.features.passwordUpdateSupported && (
                            <li className={clsx(active === "password" && "active")}>
                                <a href={kcContext.url.passwordUrl}>{msg("password")}</a>
                            </li>
                        )}
                        <li className={clsx(active === "totp" && "active")}>
                            <a href={kcContext.url.totpUrl}>{msg("authenticator")}</a>
                        </li>
                        {kcContext.features.identityFederation && (
                            <li className={clsx(active === "social" && "active")}>
                                <a href={kcContext.url.socialUrl}>{msg("federatedIdentity")}</a>
                            </li>
                        )}
                        <li className={clsx(active === "sessions" && "active")}>
                            <a href={kcContext.url.sessionsUrl}>{msg("sessions")}</a>
                        </li>
                        <li className={clsx(active === "applications" && "active")}>
                            <a href={kcContext.url.applicationsUrl}>{msg("applications")}</a>
                        </li>
                        {kcContext.features.log && (
                            <li className={clsx(active === "log" && "active")}>
                                <a href={kcContext.url.logUrl}>{msg("log")}</a>
                            </li>
                        )}
                        {kcContext.realm.userManagedAccessAllowed &&
                            kcContext.features.authorization && (
                                <li className={clsx(active === "authorization" && "active")}>
                                    <a href={kcContext.url.resourceUrl}>{msg("myResources")}</a>
                                </li>
                            )}
                    </ul>
                </div>

                <div className="col-sm-9 content-area">
                    {message !== undefined && (
                        <div className={clsx("alert", `alert-${message.type}`)}>
                            {message.type === "success" && <span className="pficon pficon-ok"></span>}
                            {message.type === "error" && (
                                <span className="pficon pficon-error-circle-o"></span>
                            )}
                            <span
                                className="kc-feedback-text"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(message.summary)
                                }}
                            />
                        </div>
                    )}

                    {children}
                </div>
            </div>
        </>
    );
}
