import { getKcClsx } from "../_internals/kcClsx";
import type { PageProps } from "./PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import type { KcContext } from "./KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page(props: { kcContext: KcContext }) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msgStr, msg } = i18n;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, credentialLabel } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("deleteCredentialTitle", credentialLabel)}
        >
            <div id="kc-delete-text">{msg("deleteCredentialMessage", credentialLabel)}</div>
            <form className="form-actions" action={url.loginAction} method="POST">
                <input
                    className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                    name="accept"
                    id="kc-accept"
                    type="submit"
                    value={msgStr("doConfirmDelete")}
                />
                <input
                    className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
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
