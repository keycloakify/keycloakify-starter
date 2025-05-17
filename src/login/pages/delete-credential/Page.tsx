import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";
import { useKcClsx } from "../../_internals/useKcClsx";

export function Page() {
    const { kcContext } = useKcContext("delete-credential.ftl");

    const { msgStr, msg } = useI18n();

    const { kcClsx } = useKcClsx();

    return (
        <Template
            displayMessage={false}
            headerNode={msg("deleteCredentialTitle", kcContext.credentialLabel)}
        >
            <div id="kc-delete-text">
                {msg("deleteCredentialMessage", kcContext.credentialLabel)}
            </div>
            <form
                className="form-actions"
                action={kcContext.url.loginAction}
                method="POST"
            >
                <input
                    className={kcClsx(
                        "kcButtonClass",
                        "kcButtonPrimaryClass",
                        "kcButtonLargeClass"
                    )}
                    name="accept"
                    id="kc-accept"
                    type="submit"
                    value={msgStr("doConfirmDelete")}
                />
                <input
                    className={kcClsx(
                        "kcButtonClass",
                        "kcButtonDefaultClass",
                        "kcButtonLargeClass"
                    )}
                    name="cancel-aia"
                    value={msgStr("doCancel")}
                    id="kc-decline"
                    type="submit"
                />
            </form>
            <div className="clearfix" />
        </Template>
    );
}
