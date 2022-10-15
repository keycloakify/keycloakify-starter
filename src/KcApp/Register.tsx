// This is a copy paste from https://github.com/InseeFrLab/keycloakify/blob/main/src/lib/components/Register.tsx
// It is now up to us to implement a special behavior to leverage the non standard authorizedMailDomains
// provided by the plugin: https://github.com/micedre/keycloak-mail-whitelisting installed on our keycloak server.
// Note that it is no longer recommended to use register.ftl, it's best to use register-user-profile.ftl
// See: https://docs.keycloakify.dev/realtime-input-validation

import { memo } from "react";
import Template from "keycloakify/lib/components/Template";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";
import { clsx } from "keycloakify/lib/tools/clsx";
import type { I18n } from "./i18n";

type KcContext_Register = Extract<KcContext, { pageId: "register.ftl"; }>;

const Register = memo(({ kcContext, i18n, ...props }: { kcContext: KcContext_Register; i18n: I18n; } & KcProps) => {
    const { url, messagesPerField, register, realm, passwordRequired, recaptchaRequired, recaptchaSiteKey } = kcContext;

    const { msg, msgStr } = i18n;

	console.log(`NOTE: It is up to you do do something meaningful with ${kcContext.authorizedMailDomains}`)

    return (
        <Template
            {...{ kcContext, i18n, ...props }}
            doFetchDefaultThemeResources={true}
            headerNode={msg("registerTitle")}
            formNode={
                <form id="kc-register-form" className={clsx(props.kcFormClass)} action={url.registrationAction} method="post">
                    <div className={clsx(props.kcFormGroupClass, messagesPerField.printIfExists("firstName", props.kcFormGroupErrorClass))}>
                        <div className={clsx(props.kcLabelWrapperClass)}>
                            <label htmlFor="firstName" className={clsx(props.kcLabelClass)}>
                                {msg("firstName")}
                            </label>
                        </div>
                        <div className={clsx(props.kcInputWrapperClass)}>
                            <input
                                type="text"
                                id="firstName"
                                className={clsx(props.kcInputClass)}
                                name="firstName"
                                defaultValue={register.formData.firstName ?? ""}
                            />
                        </div>
                    </div>

                    <div className={clsx(props.kcFormGroupClass, messagesPerField.printIfExists("lastName", props.kcFormGroupErrorClass))}>
                        <div className={clsx(props.kcLabelWrapperClass)}>
                            <label htmlFor="lastName" className={clsx(props.kcLabelClass)}>
                                {msg("lastName")}
                            </label>
                        </div>
                        <div className={clsx(props.kcInputWrapperClass)}>
                            <input
                                type="text"
                                id="lastName"
                                className={clsx(props.kcInputClass)}
                                name="lastName"
                                defaultValue={register.formData.lastName ?? ""}
                            />
                        </div>
                    </div>

                    <div className={clsx(props.kcFormGroupClass, messagesPerField.printIfExists("email", props.kcFormGroupErrorClass))}>
                        <div className={clsx(props.kcLabelWrapperClass)}>
                            <label htmlFor="email" className={clsx(props.kcLabelClass)}>
                                {msg("email")}
                            </label>
                        </div>
                        <div className={clsx(props.kcInputWrapperClass)}>
                            <input
                                type="text"
                                id="email"
                                className={clsx(props.kcInputClass)}
                                name="email"
                                defaultValue={register.formData.email ?? ""}
                                autoComplete="email"
                            />
                        </div>
                    </div>
                    {!realm.registrationEmailAsUsername && (
                        <div className={clsx(props.kcFormGroupClass, messagesPerField.printIfExists("username", props.kcFormGroupErrorClass))}>
                            <div className={clsx(props.kcLabelWrapperClass)}>
                                <label htmlFor="username" className={clsx(props.kcLabelClass)}>
                                    {msg("username")}
                                </label>
                            </div>
                            <div className={clsx(props.kcInputWrapperClass)}>
                                <input
                                    type="text"
                                    id="username"
                                    className={clsx(props.kcInputClass)}
                                    name="username"
                                    defaultValue={register.formData.username ?? ""}
                                    autoComplete="username"
                                />
                            </div>
                        </div>
                    )}
                    {passwordRequired && (
                        <>
                            <div className={clsx(props.kcFormGroupClass, messagesPerField.printIfExists("password", props.kcFormGroupErrorClass))}>
                                <div className={clsx(props.kcLabelWrapperClass)}>
                                    <label htmlFor="password" className={clsx(props.kcLabelClass)}>
                                        {msg("password")}
                                    </label>
                                </div>
                                <div className={clsx(props.kcInputWrapperClass)}>
                                    <input
                                        type="password"
                                        id="password"
                                        className={clsx(props.kcInputClass)}
                                        name="password"
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>

                            <div
                                className={clsx(
                                    props.kcFormGroupClass,
                                    messagesPerField.printIfExists("password-confirm", props.kcFormGroupErrorClass)
                                )}
                            >
                                <div className={clsx(props.kcLabelWrapperClass)}>
                                    <label htmlFor="password-confirm" className={clsx(props.kcLabelClass)}>
                                        {msg("passwordConfirm")}
                                    </label>
                                </div>
                                <div className={clsx(props.kcInputWrapperClass)}>
                                    <input type="password" id="password-confirm" className={clsx(props.kcInputClass)} name="password-confirm" />
                                </div>
                            </div>
                        </>
                    )}
                    {recaptchaRequired && (
                        <div className="form-group">
                            <div className={clsx(props.kcInputWrapperClass)}>
                                <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}></div>
                            </div>
                        </div>
                    )}
                    <div className={clsx(props.kcFormGroupClass)}>
                        <div id="kc-form-options" className={clsx(props.kcFormOptionsClass)}>
                            <div className={clsx(props.kcFormOptionsWrapperClass)}>
                                <span>
                                    <a href={url.loginUrl}>{msg("backToLogin")}</a>
                                </span>
                            </div>
                        </div>

                        <div id="kc-form-buttons" className={clsx(props.kcFormButtonsClass)}>
                            <input
                                className={clsx(props.kcButtonClass, props.kcButtonPrimaryClass, props.kcButtonBlockClass, props.kcButtonLargeClass)}
                                type="submit"
                                value={msgStr("doRegister")}
                            />
                        </div>
                    </div>
                </form>
            }
        />
    );
});

export default Register;
