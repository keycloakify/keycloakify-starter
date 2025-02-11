import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import useSetCookieConsent from "./useSetCookieConsent.tsx";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, advancedMsgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useEffect(() => {
        const url: string | undefined = advancedMsgStr("faviconUrl") || kcContext.properties.TAILCLOAKIFY_FAVICON_URL;

        if (url) {
            let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
            if (!link) {
                link = document.createElement("link");
                link.rel = "icon";
                document.head.appendChild(link);
            }
            link.href = url;
        }
    });

    function loadScript(src: string) {
        return new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.head.appendChild(script);
        });
    }

    useEffect(() => {
        const promisses: Promise<void>[] = [];

        if (kcContext.properties["TAILCLOAKIFY_ADDITIONAL_SCRIPTS"]) {
            const scriptUrls = kcContext.properties["TAILCLOAKIFY_ADDITIONAL_SCRIPTS"].split(";"); // Split the URLs by semicolon
            scriptUrls.forEach(url => promisses.push(loadScript(url)));
        }

        Promise.all(promisses).then(() => {
            if (window.CookieConsent === undefined && kcContext.properties["TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT"])
                useSetCookieConsent(kcContext, i18n);
        });
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const footerImprintUrl = advancedMsgStr("footerImprintUrl") !== "footerImprintUrl" ? advancedMsgStr("footerImprintUrl") : null;
    const footerDataprotectionUrl =
        advancedMsgStr("footerDataprotectionUrl") !== "footerDataprotectionUrl" ? advancedMsgStr("footerDataprotectionUrl") : null;

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div
            className={clsx(
                kcClsx("kcLoginClass"),
                "bg-secondary-100 flex flex-col items-center justify-center min-h-screen sm:py-16 overflow-x-hidden"
            )}
        >
            <div id="kc-header">
                {(advancedMsgStr("backgroundLogoUrl") || kcContext.properties["TAILCLOAKIFY_BACKGROUND_LOGO_URL"]) && (
                    <img
                        alt={"Logo"}
                        src={advancedMsgStr("backgroundLogoUrl") || kcContext.properties["TAILCLOAKIFY_BACKGROUND_LOGO_URL"]}
                        className={"fixed z-10 top-4 left-8"}
                    />
                )}
                {(advancedMsgStr("backgroundVideoUrl") || kcContext.properties["TAILCLOAKIFY_BACKGROUND_VIDEO_URL"]) && (
                    <video
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        playsInline={true}
                        className={"fixed top-0 left-0 right-0 bottom-0 min-h-full min-w-full opacity-20 max-w-none"}
                    >
                        <source
                            src={advancedMsgStr("backgroundLogoUrl") || kcContext.properties["TAILCLOAKIFY_BACKGROUND_VIDEO_URL"]}
                            type="video/mp4"
                        />
                    </video>
                )}
            </div>

            <div className={clsx(kcClsx("kcFormCardClass"), "relative z-10 max-w-md w-full rounded-lg")}>
                <div className={"font-bold text-center text-2xl"}>{msg("loginTitleHtml", realm.displayNameHtml)}</div>
                <header className={clsx(kcClsx("kcFormHeaderClass"))}>
                    {(() => {
                        const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                            <h1 id="kc-page-title" className={"text-center text-xl"}>
                                {headerNode}
                            </h1>
                        ) : (
                            <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
                                <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                                <a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                                    <div className="kc-login-tooltip">
                                        <i className={kcClsx("kcResetFlowIcon")}></i>
                                        <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                    </div>
                                </a>
                            </div>
                        );

                        if (displayRequiredFields) {
                            return (
                                <div className={kcClsx("kcContentWrapperClass")}>
                                    {/*Relocated to Register.tsx, so that it appears below the Register button*/}
                                    {/*<div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>*/}
                                    {/*    <span className="subtitle">*/}
                                    {/*        <span className="required">*</span>*/}
                                    {/*        {msg("requiredFields")}*/}
                                    {/*    </span>*/}
                                    {/*</div>*/}
                                    <div>{node}</div>
                                </div>
                            );
                        }
                        return node;
                    })()}
                </header>
                <div id="kc-content">
                    <div id="kc-content-wrapper">
                        {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div
                                className={clsx(
                                    `alert-${message.type}`,
                                    kcClsx("kcAlertClass"),
                                    `pf-m-${message?.type === "error" ? "danger" : message.type}`,
                                    "p-4 rounded-lg text-sm mb-4 border-transparent"
                                )}
                            >
                                <div className="pf-c-alert__icon">
                                    {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
                                    {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
                                    {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                                    {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
                                </div>
                                <span
                                    className={kcClsx("kcAlertTitleClass")}
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(message.summary)
                                    }}
                                />
                            </div>
                        )}
                        {children}
                        {auth !== undefined && auth.showTryAnotherWayLink && (
                            <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                <div className={kcClsx("kcFormGroupClass")}>
                                    <input type="hidden" name="tryAnotherWay" value="on" />
                                    <a
                                        href="#"
                                        id="try-another-way"
                                        onClick={() => {
                                            document.forms["kc-select-try-another-way-form" as never].submit();
                                            return false;
                                        }}
                                    >
                                        {msg("doTryAnotherWay")}
                                    </a>
                                </div>
                            </form>
                        )}
                        {socialProvidersNode}
                        {displayInfo && (
                            <div className={"space-y-4"}>
                                <div id="kc-info-wrapper">{infoNode}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={"flex justify-around"}></div>
            </div>
            <footer className={"flex justify-between max-w-md w-full mt-8 relative"}>
                <section className={"flex flex-col ml-5"}>
                    {(footerImprintUrl || kcContext.properties["TAILCLOAKIFY_FOOTER_IMPRINT_URL"]) && (
                        <a
                            className={"text-secondary-600 hover:text-secondary-900 text-sm inline-flex no-underline hover:no-underline"}
                            target={"_blank"}
                            rel={"noopener noreferrer"}
                            href={footerImprintUrl || kcContext.properties["TAILCLOAKIFY_FOOTER_IMPRINT_URL"]}
                        >
                            {msg("footerImprintTitle")}
                        </a>
                    )}
                    {(footerDataprotectionUrl || kcContext.properties["TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL"]) && (
                        <a
                            className={"text-secondary-600 hover:text-secondary-900 text-sm inline-flex no-underline hover:no-underline"}
                            target={"_blank"}
                            rel={"noopener noreferrer"}
                            href={footerDataprotectionUrl || kcContext.properties["TAILCLOAKIFY_FOOTER_DATAPROTECTION_URL"]}
                        >
                            {msg("footerDataProtectionTitle")}
                        </a>
                    )}
                    {kcContext.properties["TAILCLOAKIFY_FOOTER_ORESTBIDACOOKIECONSENT"] && (
                        <a
                            className={"text-secondary-600 hover:text-secondary-900 text-sm inline-flex no-underline hover:no-underline"}
                            target={"_blank"}
                            rel={"noopener noreferrer"}
                            type={"button"}
                            onClick={() => window?.CookieConsent?.showPreferences()}
                        >
                            {msg("footerCookiePreferencesTitle")}
                        </a>
                    )}
                </section>

                <section>
                    {enabledLanguages.length > 1 && (
                        <div className={kcClsx("kcLocaleMainClass")} id="kc-locale">
                            <div id="kc-locale-wrapper" className={kcClsx("kcLocaleWrapperClass")}>
                                <div id="kc-locale-dropdown" className={clsx("menu-button-links", kcClsx("kcLocaleDropDownClass"))}>
                                    <button
                                        tabIndex={1}
                                        id="kc-current-locale-link"
                                        aria-label={msgStr("languages")}
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        aria-controls="language-switch1"
                                    >
                                        {currentLanguage.label}
                                    </button>
                                    <ul
                                        role="menu"
                                        tabIndex={-1}
                                        aria-labelledby="kc-current-locale-link"
                                        aria-activedescendant=""
                                        id="language-switch1"
                                        className={kcClsx("kcLocaleListClass")}
                                    >
                                        {enabledLanguages.map(({ languageTag, label, href }, i) => (
                                            <li key={languageTag} className={kcClsx("kcLocaleListItemClass")} role="none">
                                                <a role="menuitem" id={`language-${i + 1}`} className={kcClsx("kcLocaleItemClass")} href={href}>
                                                    {label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </footer>
        </div>
    );
}
