import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import { useScript } from "keycloakify/login/pages/WebauthnRegister.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const header = () => {
    return (
        <CardHeader>
            <CardTitle id="card-title">
                Passkey registration
            </CardTitle>
            <CardDescription id="card-description">Click or tap register to begin the registration process</CardDescription>
        </CardHeader>
    );
};

export default function WebauthnRegister(props: PageProps<Extract<KcContext, { pageId: "webauthn-register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { url, isSetRetry, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const authButtonId = "authenticateWebAuthnButton";

    useScript({
        authButtonId,
        kcContext,
        i18n
    });

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={header()}>
            <CardContent>
                <form id="register" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                    <div className={kcClsx("kcFormGroupClass")}>
                        <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                        <input type="hidden" id="attestationObject" name="attestationObject" />
                        <input type="hidden" id="publicKeyCredentialId" name="publicKeyCredentialId" />
                        <input type="hidden" id="authenticatorLabel" name="authenticatorLabel" />
                        <input type="hidden" id="transports" name="transports" />
                        <input type="hidden" id="error" name="error" />
                        <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                    </div>
                </form>

                <Button type="submit" id={authButtonId} className="w-full">
                    {msgStr("doRegisterSecurityKey")}
                </Button>

                {!isSetRetry && isAppInitiatedAction && (
                    <form action={url.loginAction} className={kcClsx("kcFormClass")} id="kc-webauthn-settings-form" method="post">
                        <Button type="submit" id="cancelWebAuthnAIA" name="cancel-aia" value="true" variant="outline" className="w-full">
                            {msg("doCancel")}
                        </Button>
                    </form>
                )}
            </CardContent>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;

    const { msg } = i18n;

    return (
        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <Switch id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} className="data-[state=checked]:bg-primary dark:bg-primary"></Switch>
                    <Label htmlFor="logout-sessions">{msg("logoutOtherSessions")}</Label>
                </div>
            </div>
        </div>
    );
}
