import { useState } from "react";
import { PasswordWrapper } from "../../components/PasswordWrapper";
import { useI18n } from "../../i18n";
import type { KcContext } from "../../KcContext";
import { useKcClsx } from "../../_internals/useKcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

export function Form(props: { kcContext: Extract<KcContext, { pageId: "login.ftl" }> }) {
    const { kcContext } = props;

    const { realm, url, usernameHidden, login, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = useI18n();

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const { kcClsx } = useKcClsx();

    return (
        <div id="kc-form">
            <div id="kc-form-wrapper">
                {realm.password && (
                    <form
                        id="kc-form-login"
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                    >
                        {!usernameHidden && (
                            <div className={kcClsx("kcFormGroupClass")}>
                                <label
                                    htmlFor="username"
                                    className={kcClsx("kcLabelClass")}
                                >
                                    {!realm.loginWithEmailAllowed
                                        ? msg("username")
                                        : !realm.registrationEmailAsUsername
                                          ? msg("usernameOrEmail")
                                          : msg("email")}
                                </label>
                                <input
                                    tabIndex={2}
                                    id="username"
                                    className={kcClsx("kcInputClass")}
                                    name="username"
                                    defaultValue={login.username ?? ""}
                                    type="text"
                                    autoFocus
                                    autoComplete="username"
                                    aria-invalid={messagesPerField.existsError(
                                        "username",
                                        "password"
                                    )}
                                />
                                {messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(
                                                messagesPerField.getFirstError(
                                                    "username",
                                                    "password"
                                                )
                                            )
                                        }}
                                    />
                                )}
                            </div>
                        )}

                        <div className={kcClsx("kcFormGroupClass")}>
                            <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                                {msg("password")}
                            </label>
                            <PasswordWrapper passwordInputId="password">
                                <input
                                    tabIndex={3}
                                    id="password"
                                    className={kcClsx("kcInputClass")}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    aria-invalid={messagesPerField.existsError(
                                        "username",
                                        "password"
                                    )}
                                />
                            </PasswordWrapper>
                            {usernameHidden &&
                                messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(
                                                messagesPerField.getFirstError(
                                                    "username",
                                                    "password"
                                                )
                                            )
                                        }}
                                    />
                                )}
                        </div>

                        <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                            <div id="kc-form-options">
                                {realm.rememberMe && !usernameHidden && (
                                    <div className="checkbox">
                                        <label>
                                            <input
                                                tabIndex={5}
                                                id="rememberMe"
                                                name="rememberMe"
                                                type="checkbox"
                                                defaultChecked={!!login.rememberMe}
                                            />{" "}
                                            {msg("rememberMe")}
                                        </label>
                                    </div>
                                )}
                            </div>
                            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                {realm.resetPasswordAllowed && (
                                    <span>
                                        <a
                                            tabIndex={6}
                                            href={url.loginResetCredentialsUrl}
                                        >
                                            {msg("doForgotPassword")}
                                        </a>
                                    </span>
                                )}
                            </div>
                        </div>

                        <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                            <input
                                type="hidden"
                                id="id-hidden-input"
                                name="credentialId"
                                value={auth.selectedCredential}
                            />
                            <input
                                tabIndex={7}
                                disabled={isLoginButtonDisabled}
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonBlockClass",
                                    "kcButtonLargeClass"
                                )}
                                name="login"
                                id="kc-login"
                                type="submit"
                                value={msgStr("doLogIn")}
                            />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
