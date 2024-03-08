import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { FormInputError } from "./shared/FormInputError";
import { useState, useEffect, FormEventHandler } from "react";
import { useConstCallback } from "keycloakify/tools/useConstCallback";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction, username } = kcContext;
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errors, setErrors] = useState({} as { password: string, passwordConfirm: string });
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const validatePassword = () => {
        if (!password) {
            return "Required";
        } else if (password.length < 8) {
            return "Password must be at least 8 characters";
        }
        return "";
    };
    const validatePasswordConfirm = () => {
        if (!passwordConfirm) {
            return "Required";
        } else if (password !== passwordConfirm) {
            return "Passwords do not match";
        }
        return "";
    };
    const validateForm = () => {
        setErrors({ password: validatePassword(), passwordConfirm: validatePasswordConfirm() });
    }
    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();
        setWasSubmitted(true);
        const formElement = e.target as HTMLFormElement;
        if (formElement.checkValidity() === true) {
            formElement.submit();
        }
        else {
            validateForm();
        }

    });
    useEffect(() => {
        if (wasSubmitted) {
            validateForm();
        }
    }, [password, passwordConfirm]);

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }}
            headerNode={
                <div>
                    <div className="flex justify-center pb-8">
                        <img src={require("./../assets/resetpassword.png")} />
                    </div>
                    <h1>Set New Password</h1>
                    <p className="text-center">Create your new strong password</p>
                </div>
            }>
            <form id="kc-passwd-update-form" className={getClassName("kcFormClass")} action={url.loginAction} method="post" onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); onSubmit(e) }} noValidate>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    readOnly={true}
                    autoComplete="username"
                    style={{ display: "none" }}
                />
                <input type="password" id="password" name="password" autoComplete="current-password" style={{ display: "none" }} />

                <div
                    className={clsx(
                        getClassName("kcFormGroupClass"),
                        messagesPerField.printIfExists("password", getClassName("kcFormGroupErrorClass"))
                    )}
                >
                    <div className={getClassName("kcInputWrapperClass")}>
                        <input
                            type="password"
                            id="password-new"
                            name="password-new"
                            placeholder="New Password"
                            autoFocus
                            autoComplete="new-password"
                            className={getClassName("kcInputClass")}
                            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                            required
                            minLength={8}
                        />
                        {!!errors.password ? (
                            <FormInputError message={errors.password} />
                        ) : null}
                    </div>
                </div>

                <div
                    className={clsx(
                        getClassName("kcFormGroupClass"),
                        messagesPerField.printIfExists("password-confirm", getClassName("kcFormGroupErrorClass"))
                    )}
                >
                    <div className={getClassName("kcInputWrapperClass")}>
                        <input
                            type="password"
                            id="password-confirm"
                            name="password-confirm"
                            autoComplete="new-password"
                            placeholder="Confirm Password"
                            className={getClassName("kcInputClass")}
                            onChange={(e) => setPasswordConfirm((e.target as HTMLInputElement).value)}
                            required
                            minLength={8}
                        />
                        {!!errors.passwordConfirm ? (
                            <FormInputError message={errors.passwordConfirm} />
                        ) : null}
                    </div>
                </div>

                <div className={getClassName("kcFormGroupClass")}>
                    <div id="kc-form-options" className={getClassName("kcFormOptionsClass")}>
                        <div className={getClassName("kcFormOptionsWrapperClass")}>
                            {isAppInitiatedAction && (
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" checked />
                                        {msgStr("logoutOtherSessions")}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    <div id="kc-form-buttons" className={getClassName("kcFormButtonsClass")}>
                        {isAppInitiatedAction ? (
                            <>
                                <input
                                    className={clsx(
                                        getClassName("kcButtonClass"),
                                        getClassName("kcButtonPrimaryClass"),
                                        getClassName("kcButtonLargeClass")
                                    )}
                                    type="submit"
                                    defaultValue={msgStr("doSubmit")}
                                />
                                <button
                                    className={clsx(
                                        getClassName("kcButtonClass"),
                                        getClassName("kcButtonDefaultClass"),
                                        getClassName("kcButtonLargeClass")
                                    )}
                                    type="submit"
                                    name="cancel-aia"
                                    value="true"
                                >
                                    {msg("doCancel")}
                                </button>
                            </>
                        ) : (
                            <input
                                className={clsx(
                                    getClassName("kcButtonClass"),
                                    getClassName("kcButtonPrimaryClass"),
                                    getClassName("kcButtonBlockClass"),
                                    getClassName("kcButtonLargeClass")
                                )}
                                type="submit"
                                defaultValue={msgStr("doSubmit")}
                            />
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}
