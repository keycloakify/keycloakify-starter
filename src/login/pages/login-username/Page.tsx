/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/login-username/Page.tsx" --revert
 */

import { assert } from "tsafe/assert";
import { useState } from "react";
import { clsx } from "../../../@keycloakify/login-ui/tools/clsx";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login-username.ftl");

    const { kcClsx } = useKcClsx();

    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField } =
        kcContext;

    const { msg, msgStr } = useI18n();

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration">
                    <span>
                        {msg("noAccount")}
                        <a tabIndex={6} href={url.registrationUrl}>
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
            headerNode={msg("doLogIn")}
            socialProvidersNode={
                <>
                    {realm.password &&
                        social?.providers !== undefined &&
                        social.providers.length !== 0 && (
                            <div
                                id="kc-social-providers"
                                className={kcClsx("kcFormSocialAccountSectionClass")}
                            >
                                <hr />
                                <h2>{msg("identity-provider-login-label")}</h2>
                                <ul
                                    className={kcClsx(
                                        "kcFormSocialAccountListClass",
                                        social.providers.length > 3 && "kcFormSocialAccountListGridClass"
                                    )}
                                >
                                    {social.providers.map((...[p, , providers]) => (
                                        <li key={p.alias}>
                                            <a
                                                id={`social-${p.alias}`}
                                                className={kcClsx(
                                                    "kcFormSocialAccountListButtonClass",
                                                    providers.length > 3 && "kcFormSocialAccountGridItem"
                                                )}
                                                type="button"
                                                href={p.loginUrl}
                                            >
                                                {p.iconClasses && (
                                                    <i
                                                        className={clsx(
                                                            kcClsx("kcCommonLogoIdP"),
                                                            p.iconClasses
                                                        )}
                                                        aria-hidden="true"
                                                    ></i>
                                                )}
                                                <span
                                                    className={clsx(
                                                        kcClsx("kcFormSocialAccountNameClass"),
                                                        p.iconClasses && "kc-social-icon-text"
                                                    )}
                                                >
                                                    {p.displayName}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                </>
            }
        >
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
                                    <label htmlFor="username" className={kcClsx("kcLabelClass")}>
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
                                        aria-invalid={messagesPerField.existsError("username")}
                                    />
                                    {messagesPerField.existsError("username") && (
                                        <span
                                            id="input-error"
                                            className={kcClsx("kcInputErrorMessageClass")}
                                            aria-live="polite"
                                        >
                                            {messagesPerField.getFirstError("username")}
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={3}
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
                            </div>

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <input
                                    tabIndex={4}
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
        </Template>
    );
}
