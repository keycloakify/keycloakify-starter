import { Fragment } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, buttonVariants } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import clsx from "clsx";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Used https://github.com/encodia/strateco-login/blob/main/src/login/pages/LoginOtp.tsx

const header = () => {
    return (
        <CardHeader>
            <CardTitle>
                <b>Welcome back</b>
            </CardTitle>
            <CardDescription>Enter the code provided by your authenticator</CardDescription>
        </CardHeader>
    );
};

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { otpLogin, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={header()}
        >
            <CardContent>
                <form id="kc-otp-login-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                    {otpLogin.userOtpCredentials.length > 1 && (
                        <div>
                            <div>
                                <div className="grid grid-cols-1  md:grid-cols-2 gap-1 my-5">
                                    {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                                        <Fragment key={index}>
                                            <div className="flex items-center ">
                                                <input
                                                    id={`kc-otp-credential-${index}`}
                                                    className=" "
                                                    type="radio"
                                                    name="selectedCredentialId"
                                                    value={otpCredential.id}
                                                    defaultChecked={otpCredential.id === otpLogin.selectedCredentialId}
                                                />
                                                <label htmlFor={`kc-otp-credential-${index}`} tabIndex={index} className="mx-3">
                                                    <div className="flex space-x-3  text-xl">
                                                        <span>
                                                            <i className={kcClsx("kcLoginOTPListItemIconClass")} aria-hidden="true"></i>
                                                        </span>
                                                        <span className="">{otpCredential.userLabel}</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={kcClsx("kcFormGroupClass")}>
                        <div className={kcClsx("kcLabelWrapperClass")}>
                            <Label htmlFor="otp">
                                {msg("loginOtpOneTime")}
                            </Label>
                        </div>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <Input
                                id="otp"
                                name="otp"
                                autoComplete="off"
                                type="text"
                                className="mt-2"
                                autoFocus
                                aria-invalid={messagesPerField.existsError("totp")}
                            />
                            {messagesPerField.existsError("totp") && (
                                <span
                                    id="input-error-otp-code"
                                    className={kcClsx("kcInputErrorMessageClass")}
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.get("totp"))
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                            <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                        </div>
                        <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                            <Button
                                //className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                className={clsx(buttonVariants(), "w-full")}
                                name="login"
                                id="kc-login"
                                type="submit"
                            ><b>Login</b></Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Template>
    );
}
