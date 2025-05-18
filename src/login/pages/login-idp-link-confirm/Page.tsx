import { useKcClsx } from "../../_internals/useKcClsx";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext("login-idp-link-confirm.ftl");

    const { kcClsx } = useKcClsx();

    const { msg } = useI18n();

    return (
        <Template headerNode={msg("confirmLinkIdpTitle")}>
            <form id="kc-register-form" action={kcContext.url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <button
                        type="submit"
                        className={kcClsx(
                            "kcButtonClass",
                            "kcButtonDefaultClass",
                            "kcButtonBlockClass",
                            "kcButtonLargeClass"
                        )}
                        name="submitAction"
                        id="updateProfile"
                        value="updateProfile"
                    >
                        {msg("confirmLinkIdpReviewProfile")}
                    </button>
                    <button
                        type="submit"
                        className={kcClsx(
                            "kcButtonClass",
                            "kcButtonDefaultClass",
                            "kcButtonBlockClass",
                            "kcButtonLargeClass"
                        )}
                        name="submitAction"
                        id="linkAccount"
                        value="linkAccount"
                    >
                        {msg("confirmLinkIdpContinue", kcContext.idpAlias)}
                    </button>
                </div>
            </form>
        </Template>
    );
}
