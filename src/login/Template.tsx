import { useEffect } from "react";
import { assert } from "keycloakify/tools/assert";
// import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircleIcon, CircleCheck } from "lucide-react";

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

    const { msg, msgStr } = i18n;

    const { realm, auth, url, message, locale, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    useEffect(() => {
        const { currentLanguageTag } = locale ?? {};

        if (currentLanguageTag === undefined) {
            return;
        }

        const html = document.querySelector("html");
        assert(html !== null);
        html.lang = currentLanguageTag;
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
        <div className="bg-muted min-h-screen flex flex-col gap-6 items-center justify-center prose dark:prose-invert max-w-none">
            {import.meta.env.LOGO_URL?.trim() && <img src={`${import.meta.env.LOGO_URL}`} width={300} />}
            <Card className="px-3 md:-[40rem] shadow-2xl w-full min-h-screen  md:w-[30rem] sm:min-h-fit ">
                <CardContent className="space-y-8 mb-2">
                    <header>
                        {(() => {
                            const node = <div id="kc-page-title">{headerNode}</div>;
                            if (displayRequiredFields) {
                                return (
                                    // <div className={kcClsx("kcContentWrapperClass")}>
                                    //     <div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>
                                    //         <span className="subtitle">
                                    //             <span className="required">*</span>
                                    //             {msg("requiredFields")}
                                    //         </span>
                                    //     </div>
                                    //     <div className="col-md-10">{node}</div>
                                    // </div>
                                    <div className={kcClsx("kcContentWrapperClass")}>
                                        <div>{node}</div>
                                    </div>
                                );
                            }

                            return node;
                        })()}
                    </header>
                    <div id="kc-content">
                        <div id="kc-content-wrapper">
                            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                <div className="alertClass mb-3 px-3 w-full">
                                    <Alert
                                        variant={`${message.type}`} // Just added KC specific message types to Alert class
                                        className="kcAlertClass" // eh
                                    >
                                        {message.type === "success" && <CircleCheck />}
                                        {message.type === "warning" && <AlertCircleIcon />}
                                        {message.type === "error" && <AlertCircleIcon />}
                                        {message.type === "info" && <AlertCircleIcon />}

                                        <AlertDescription
                                            className="text-md"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(message.summary)
                                            }}
                                        />
                                    </Alert>
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
                                <div id="kc-info" className={kcClsx("kcSignUpClass")}>
                                    <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
                                        {infoNode}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
