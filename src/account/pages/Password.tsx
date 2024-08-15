import { clsx } from "keycloakify/tools/clsx";
import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useOidc } from "../oidc";

export default function Password(props: PageProps<Extract<KcContext, { pageId: "password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template } = props;

    const classes = {
        ...props.classes,
        kcBodyClass: clsx(props.classes?.kcBodyClass, "password")
    };

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg } = i18n;

    const { goToAuthServer, backFromAuthServer } = useOidc();

    return (
        <Template
            {...{
                kcContext,
                i18n,
                doUseDefaultCss,
                classes
            }}
            active="password"
        >
            {
                /* NOTE: Since we can't have the password policies we simply create a button that
                 * redirects to the login-update-password.ftl page of the login theme.
                 * See: https://github.com/user-attachments/assets/6de0f904-afa9-4ccc-b0d3-88c07f1e80d0
                 */
            }

            <div className="row">
                <div className="col-md-10">
                    <h2>{msg("changePasswordHtmlTitle")}</h2>
                </div>
            </div>
            <div className="form-horizontal">

                <div className="form-group">
                    <div id="kc-form-buttons" className="col-md-offset-2 col-md-10 submit">
                        <button
                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                            onClick={() => goToAuthServer({
                                extraQueryParams: { kc_action: "UPDATE_PASSWORD" }
                            })}
                        >
                            {msg("changePasswordHtmlTitle")}
                        </button>
                        {backFromAuthServer?.extraQueryParams.kc_action === "UPDATE_PASSWORD" && (
                            <p>
                                {(() => {
                                    switch (backFromAuthServer.result.kc_action_status) {
                                        case "success":
                                            return "Password successfully updated";
                                        case "cancelled":
                                            return "Password unchanged";
                                    }
                                })()}
                            </p>
                        )}
                    </div>
                </div>

            </div>


        </Template>
    );
}
