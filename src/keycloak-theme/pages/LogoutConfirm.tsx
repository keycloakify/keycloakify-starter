import React from "react";
import { clsx } from "keycloakify/lib/tools/clsx";
import type { PageProps } from "keycloakify/lib/KcProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doFetchDefaultThemeResources = true, Template, ...kcProps } = props;

    const { url, client, logoutConfirm } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}
            displayMessage={false}
            headerNode={msg("logoutConfirmTitle")}
            formNode={
                <>
                    <div id="kc-logout-confirm" className="content-area">
                        <p className="instruction">{msg("logoutConfirmHeader")}</p>
                        <form className="form-actions" action={url.logoutConfirmAction} method="POST">
                            <input type="hidden" name="session_code" value={logoutConfirm.code} />
                            <div className={clsx(kcProps.kcFormGroupClass)}>
                                <div id="kc-form-options">
                                    <div className={clsx(kcProps.kcFormOptionsWrapperClass)}></div>
                                </div>
                                <div id="kc-form-buttons" className={clsx(kcProps.kcFormGroupClass)}>
                                    <input
                                        tabIndex={4}
                                        className={clsx(
                                            kcProps.kcButtonClass,
                                            kcProps.kcButtonPrimaryClass,
                                            kcProps.kcButtonBlockClass,
                                            kcProps.kcButtonLargeClass
                                        )}
                                        name="confirmLogout"
                                        id="kc-logout"
                                        type="submit"
                                        value={msgStr("doLogout")}
                                    />
                                </div>
                            </div>
                        </form>
                        <div id="kc-info-message">
                            {!logoutConfirm.skipLink && client.baseUrl && (
                                <p>
                                    <a href={client.baseUrl} dangerouslySetInnerHTML={{ __html: msgStr("backToApplication") }} />
                                </p>
                            )}
                        </div>
                    </div>
                </>
            }
        />
    );
}
