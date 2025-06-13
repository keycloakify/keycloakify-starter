import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, buttonVariants } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const header = () => {
    return (
        <CardHeader>
            <CardTitle id="card-title">
                See ya later
            </CardTitle>
            <CardDescription id="card-description">Do you want to log out?</CardDescription>
        </CardHeader>
    );
};

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, client, logoutConfirm } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={header()}>
            <CardContent>
                <div id="kc-logout-confirm" className="content-area">
                    <form className="form-actions" action={url.logoutConfirmAction} method="POST">
                        <input type="hidden" name="session_code" value={logoutConfirm.code} />
                        <div className={kcClsx("kcFormGroupClass")}>
                            <div id="kc-form-options">
                                <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                            </div>
                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <Button
                                    tabIndex={4}
                                    className={`${buttonVariants({})} w-full`}
                                    name="confirmLogout"
                                    id="kc-logout"
                                    type="submit"
                                    value={msgStr("doLogout")}
                                >
                                    Log out
                                </Button>
                            </div>
                        </div>
                    </form>
                    <div id="kc-info-message">
                        {!logoutConfirm.skipLink && client.baseUrl && (
                            <p>
                                <a href={client.baseUrl}>{msg("backToApplication")}</a>
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Template>
    );
}
