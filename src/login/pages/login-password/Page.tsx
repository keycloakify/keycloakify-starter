import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { clsx } from "keycloakify/tools/clsx";
import { PasswordWrapper } from "../../components/PasswordWrapper";
import { useKcClsx } from "../../_internals/useKcClsx";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {

    const { kcContext } = useKcContext("login-password.ftl");

    const { kcClsx } = useKcClsx();

    const { msg, msgStr }= useI18n();

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
           
            headerNode={msg("doLogIn")}
            displayMessage={!kcContext.messagesPerField.existsError("password")}
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    <form
                        id="kc-form-login"
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={kcContext.url.loginAction}
                        method="post"
                    >
                        <div className={clsx(kcClsx("kcFormGroupClass"), "no-bottom-margin")}>
                            <hr />
                            <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                                {msg("password")}
                            </label>

                            <PasswordWrapper passwordInputId="password">
                                <input
                                    tabIndex={2}
                                    id="password"
                                    className={kcClsx("kcInputClass")}
                                    name="password"
                                    type="password"
                                    autoFocus
                                    autoComplete="on"
                                    aria-invalid={kcContext.messagesPerField.existsError("username", "password")}
                                />
                            </PasswordWrapper>

                            {kcContext.messagesPerField.existsError("password") && (
                                <span
                                    id="input-error-password"
                                    className={kcClsx("kcInputErrorMessageClass")}
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(kcContext.messagesPerField.get("password"))
                                    }}
                                />
                            )}
                        </div>
                        <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                            <div id="kc-form-options" />
                            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                {kcContext.realm.resetPasswordAllowed && (
                                    <span>
                                        <a tabIndex={5} href={kcContext.url.loginResetCredentialsUrl}>
                                            {msg("doForgotPassword")}
                                        </a>
                                    </span>
                                )}
                            </div>
                        </div>
                        <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                            <input
                                tabIndex={4}
                                className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                name="login"
                                id="kc-login"
                                type="submit"
                                value={msgStr("doLogIn")}
                                disabled={isLoginButtonDisabled}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}

