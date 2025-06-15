import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReactElement } from "react";
import { Label } from "@/components/ui/label";

const header = (msg: ReactElement<any, any>) => {
    return (
        <CardHeader>
            <CardTitle id="card-title">
                Forgot your password?
            </CardTitle>
            <CardDescription id="card-description">{msg}</CardDescription>
        </CardHeader>
    );
};

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            headerNode={header(realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction"))}
        >
            <CardContent>
                <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                    <div className={kcClsx("kcFormGroupClass")}>
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="username">
                                {!realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                      ? msg("usernameOrEmail")
                                      : msg("email")}
                            </Label>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                autoFocus
                                defaultValue={auth.attemptedUsername ?? ""}
                                aria-invalid={messagesPerField.existsError("username")}
                            />
                            {messagesPerField.existsError("username") && (
                                <span
                                    id="input-error-username"
                                    className={kcClsx("kcInputErrorMessageClass")}
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.get("username"))
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <div id="kc-form-options">
                            <div>
                                <span>
                                    <a className="text-sm" href={url.loginUrl}>{msg("backToLogin")}</a>
                                </span>
                            </div>
                        </div>

                        <div id="kc-form-buttons" className="py-6">
                            <Button id="kc-submit" className="w-full" type="submit" value={msgStr("doSubmit")}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Template>
    );
}
