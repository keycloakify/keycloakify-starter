import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { url, client, logoutConfirm } = kcContext;


    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={
            <div>
                <h1 >Log Out</h1>
            </div>
        }>
            <div id="kc-logout-confirm" className="content-area">
                <p className="instruction">Are you sure you want to log out?</p>
                <form className="form-actions" action={url.logoutConfirmAction} method="POST">
                    <input type="hidden" name="session_code" value={logoutConfirm.code} />
                    <div className={getClassName("kcFormGroupClass")}>
                        <div id="kc-form-options">
                            <div className={getClassName("kcFormOptionsWrapperClass")}></div>
                        </div>
                        <div id="kc-form-buttons" className={clsx(getClassName("kcFormButtonsClass"), 'flex justify-start !ml-auto float-none w-auto !p-0')}>
                            <input
                                tabIndex={4}
                                className={clsx(
                                    getClassName("kcButtonClass"),
                                    getClassName("kcButtonPrimaryClass"),
                                    getClassName("kcButtonBlockClass"),
                                    getClassName("kcButtonLargeClass")
                                )}
                                name="confirmLogout"
                                id="kc-logout"
                                type="submit"
                                value={"Yes, Log Out"}
                            />
                        </div>
                    </div>
                </form>
                <div id="kc-info-message">
                    {!logoutConfirm.skipLink && client.baseUrl && (
                        <p className="instruction">
                            <a id="backToApplication" href={client.baseUrl}>
                                Back to BuildBetter
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </Template>
    );
}
