import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { clsx } from "keycloakify/tools/clsx";

export default function LoginIdpLinkConfirmOverride(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-idp-link-confirm-override.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, idpDisplayName } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("confirmOverrideIdpTitle")}>
            <form id="kc-register-form" action={url.loginAction} method="post">
                {msg("pageExpiredMsg1")}{" "}
                <a
                    id="loginRestartLink"
                    href={url.loginRestartFlowUrl}
                    className={"text-primary-600 hover:text-primary-500 inline-flex no-underline hover:no-underline"}
                >
                    {msg("doClickHere")}
                </a>
                <br />
                <br />
                <button
                    type="submit"
                    className={clsx(
                        kcClsx("kcButtonClass", "kcButtonBlockClass", "kcButtonLargeClass"),
                        "rounded-md bg-secondary-600 text-white focus:ring-secondary-600 hover:bg-secondary-700 px-4 py-2 text-sm flex w-1/2 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    )}
                    name="submitAction"
                    id="confirmOverride"
                    value="confirmOverride"
                >
                    {msg("confirmOverrideIdpContinue", idpDisplayName)}
                </button>
            </form>
        </Template>
    );
}
