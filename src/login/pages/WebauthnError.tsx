import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";

const header = () => {
    return (
        <CardHeader>
            <CardTitle id="card-title">
                This is awkward...
            </CardTitle>
            <CardDescription id="card-description">There was an issue authenticating with your passkey</CardDescription>
        </CardHeader>
    );
};

export default function WebauthnError(props: PageProps<Extract<KcContext, { pageId: "webauthn-error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage
            headerNode={header()}
        >
            <CardContent>
                <form id="kc-error-credential-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                    <input type="hidden" id="executionValue" name="authenticationExecution" />
                    <input type="hidden" id="isSetRetry" name="isSetRetry" />
                </form>
                <Button
                    tabIndex={4}
                    onClick={() => {
                        // @ts-expect-error: Trusted Keycloak's code
                        document.getElementById("isSetRetry").value = "retry";
                        // @ts-expect-error: Trusted Keycloak's code
                        document.getElementById("executionValue").value = "${execution}";
                        // @ts-expect-error: Trusted Keycloak's code
                        document.getElementById("kc-error-credential-form").submit();
                    }}
                    name="try-again"
                    id="kc-try-again"
                    className="w-full"
                >{msg("doTryAgain")}</Button>
                {isAppInitiatedAction && (
                    <form action={url.loginAction} className={kcClsx("kcFormClass")} id="kc-webauthn-settings-form" method="post">
                        <Button
                            type="submit"
                            id="cancelWebAuthnAIA"
                            name="cancel-aia"
                            value="true"
                            variant="outline"
                            className="w-full"
                        >
                            {msgStr("doCancel")}
                        </Button>
                    </form>
                )}
            </CardContent>
        </Template>
    );
}
