import { useScript } from "./useScript";
import { useKcContext } from "../../KcContext.gen";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { assert } from "tsafe/assert";
import { useI18n } from "../../i18n";

export function ConditionalUIData() {
    const { kcContext } = useKcContext();

    if (!kcContext.enableWebAuthnConditionalUI) {
        return null;
    }

    return <ActualConditionalUIData />;
}

function ActualConditionalUIData() {
    const { kcContext } = useKcContext();
    assert(kcContext.enableWebAuthnConditionalUI);

    const { msg } = useI18n();

    const authButtonId = "authenticateWebAuthnButton";

    useScript({ authButtonId });

    const { kcClsx } = useKcClsx();

    return (
        <>
            <form id="webauth" action={kcContext.url.loginAction} method="post">
                <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                <input type="hidden" id="authenticatorData" name="authenticatorData" />
                <input type="hidden" id="signature" name="signature" />
                <input type="hidden" id="credentialId" name="credentialId" />
                <input type="hidden" id="userHandle" name="userHandle" />
                <input type="hidden" id="error" name="error" />
            </form>

            <a
                id="authenticateWebAuthnButton"
                href="#"
                className={kcClsx("kcButtonSecondaryClass", "kcButtonBlockClass", "kcMarginTopClass")}
            >
                {msg("webauthn-doAuthenticate")}
            </a>
        </>
    );
}
