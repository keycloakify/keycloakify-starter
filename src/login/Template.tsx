import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import plantPngUrl from "./assets/img/plant.png";
import ellipsePngUrl from "./assets/img/ellipse.png";
import logo1PngUrl from "./assets/img/logo_1.png";
import logo2PngUrl from "./assets/img/logo_2.png";

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

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden" style={{backgroundColor: 'var(--color-beige-dark)'}}>
            <div className="flex w-full h-full items-stretch justify-center gap-0">
                {/* Left side - Plant illustration */}
                <div className="flex items-center justify-center relative overflow-hidden" style={{width: '50%', borderRadius: '32px 32px 32px 32px', backgroundColor: 'var(--color-green-dark)', margin: '24px 0 24px 24px'}}>
                    {/* Ellipse background */}
                    <div className="absolute pointer-events-none" style={{top: '62%', left: '50%', transform: 'translateX(-50%)', width: '110%', height: '70%'}}>
                        <img src={ellipsePngUrl}alt="" className="w-full h-full object-cover"/>
                    </div>
                    {/* Plant illustration */}
                    <div className="relative z-10 flex items-center justify-center w-full h-full">
                        <img src={plantPngUrl} alt="Plant" className="w-auto h-auto object-contain" style={{maxWidth: '75%', maxHeight: '75%'}} />
                    </div>
                </div>

                {/* Right side - Form */}
                <div className={clsx("flex flex-col items-center relative", kcClsx("kcLoginClass"))} style={{width: '50%', borderRadius: '0 32px 32px 0', backgroundColor: 'var(--color-beige-dark)', margin: '24px 24px 24px 0', padding: '48px 0'}}>
                    <div className="w-full flex-1 flex items-center justify-center">
                <style>{`.template-input-scope input[type="text"], .template-input-scope input[type="password"], .template-input-scope input[type="email"], .template-input-scope input, .template-input-scope textarea { background-color: var(--color-beige-dark) !important; color: var(--color-text-primary) !important; border: 1px solid var(--color-green-dark) !important; }`}</style>
                <div className="w-full template-input-scope" style={{maxWidth: '440px'}}>
                    {/* Header */}
                    <header className="mb-6">
                        {(() => {
                            const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                <h1 id="kc-page-title" className="text-3xl font-normal mb-2" style={{color: 'var(--color-text-primary)'}}>{headerNode}</h1>
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
                                        <div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>
                                            <span className="subtitle">
                                                <span className="required">*</span>
                                                {msg("requiredFields")}
                                            </span>
                                        </div>
                                        <div className="col-md-10">{node}</div>
                                    </div>
                                );
                            }

                            return node;
                        })()}
                    </header>

                    {/* Messages */}
                    {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                        <div
                            className={clsx(
                                `alert-${message.type}`,
                                kcClsx("kcAlertClass"),
                                `pf-m-${message?.type === "error" ? "danger" : message.type}`,
                                "mb-6"
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

                    {/* Main content */}
                    <div id="kc-content">
                        <div id="kc-content-wrapper">
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
                        </div>
                    </div>
                    {socialProvidersNode}
                    {displayInfo && (
                        <div id="kc-info" className={kcClsx("kcSignUpClass")}>
                            <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
                                {infoNode}
                            </div>
                        </div>
                    )}
                </div>
                </div>
                    {/* Logo at bottom */}
                    <div className="w-full flex justify-center" style={{marginTop: '32px'}}>
                        <div className="flex flex-nowrap items-center gap-1 whitespace-nowrap">
                            <img src={logo1PngUrl} alt="" className="h-5 w-auto object-contain inline-block" style={{maxHeight: '24px'}} />
                            <img src={logo2PngUrl} alt="" className="h-5 w-auto object-contain inline-block" style={{maxHeight: '24px'}} />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
