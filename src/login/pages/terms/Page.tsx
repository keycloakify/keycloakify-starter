import { useKcClsx } from "../../_internals/useKcClsx";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {

    const { kcContext } = useKcContext("terms.ftl");

    const { kcClsx } = useKcClsx();

    const { msg, msgStr }= useI18n();

    const { url } = kcContext;

    return (
        <Template
           
            displayMessage={false}
            headerNode={msg("termsTitle")}
        >
            <div id="kc-terms-text">{msg("termsText")}</div>
            <form className="form-actions" action={url.loginAction} method="POST">
                <input
                    className={kcClsx("kcButtonClass", "kcButtonClass", "kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                    name="accept"
                    id="kc-accept"
                    type="submit"
                    value={msgStr("doAccept")}
                />
                <input
                    className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                    name="cancel"
                    id="kc-decline"
                    type="submit"
                    value={msgStr("doDecline")}
                />
            </form>
            <div className="clearfix" />
        </Template>
    );
}
