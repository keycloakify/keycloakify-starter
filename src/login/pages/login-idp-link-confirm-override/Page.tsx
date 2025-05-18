import { useKcClsx } from "../../_internals/useKcClsx";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";
import { useKcContext } from "../../KcContext";

export function Page() {

    const { kcContext } = useKcContext("login-idp-link-confirm-override.ftl");


    const { kcClsx } = useKcClsx();

    const { msg }= useI18n();

    return (
        <Template headerNode={msg("confirmOverrideIdpTitle")}>
            <form id="kc-register-form" action={kcContext.url.loginAction} method="post">
                {msg("pageExpiredMsg1")}{" "}
                <a id="loginRestartLink" href={kcContext.url.loginRestartFlowUrl}>
                    {msg("doClickHere")}
                </a>
                <br />
                <br />
                <button
                    type="submit"
                    className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                    name="submitAction"
                    id="confirmOverride"
                    value="confirmOverride"
                >
                    {msg("confirmOverrideIdpContinue", kcContext.idpDisplayName)}
                </button>
            </form>
        </Template>
    );
}
