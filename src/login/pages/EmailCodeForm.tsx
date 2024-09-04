import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useState } from "react";

export default function EmailCodeForm(props: PageProps<Extract<KcContext, { pageId: "email-code-form.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [resendClicked, setResendClicked] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form id="kc-otp-login-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <label id="emailCodeLabel" htmlFor="emailCode" className={kcClsx("kcLabelClass")} hidden aria-hidden>
                            {msg("loginOtpOneTime")}
                        </label>
                    </div>

                    <div className={kcClsx("kcInputWrapperClass")}>
                        <input
                            id="emailCode"
                            name="emailCode"
                            autoComplete="off"
                            type="text"
                            placeholder={msgStr("loginOtpOneTime")}
                            className={kcClsx("kcInputClass")}
                            autoFocus
                            aria-invalid={messagesPerField.existsError("emailCode") ? "true" : "false"}
                            aria-labelledby="emailCodeLabel"
                        />
                        {messagesPerField.existsError("emailCode") && (
                            <span
                                id="input-error-otp-code"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("emailCode")
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className={kcClsx("kcFormGroupClass")}>
                    {!resendClicked && (
                        <div className="flex items-center h-[44px]">
                            <div onClick={() => setResendClicked(true)} className="text-[#777] text-sm w-fit cursor-pointer">
                                <span>{msg("noCodeQuestion")}</span>
                            </div>
                        </div>
                    )}
                    {resendClicked && <input className={kcClsx("kcButtonDefaultClass")} name="resend" type="submit" value={msgStr("resendCode")} />}
                </div>

                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcFormButtonsWrapperClass")}>
                        <input
                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                            name="login"
                            type="submit"
                            value={msgStr("doLogIn")}
                        />
                        {/* <input
                                className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                                name="cancel"
                                type="submit"
                                value={msgStr("doCancel")}
                            /> */}
                    </div>
                </div>
            </form>
        </Template>
    );
}
