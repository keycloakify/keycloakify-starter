/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/login-passkeys-conditional-authenticate/Page.tsx" --revert
 */

import { assert } from "tsafe/assert";
import { Fragment } from "react";
import { clsx } from "../../../@keycloakify/login-ui/tools/clsx";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { useScript } from "./useScript";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login-passkeys-conditional-authenticate.ftl");

    const {
        messagesPerField,
        login,
        url,
        usernameHidden,
        shouldDisplayAuthenticators,
        authenticators,
        registrationDisabled,
        realm
    } = kcContext;

    const { msg, msgStr, advancedMsg } = useI18n();

    const { kcClsx } = useKcClsx();

    const authButtonId = "authenticateWebAuthnButton";

    useScript({ authButtonId });

    return (
        <Template
            headerNode={msg("passkey-login-title")}
            infoNode={
                realm.registrationAllowed &&
                !registrationDisabled && (
                    <div id="kc-registration">
                        <span>
                            ${msg("noAccount")}{" "}
                            <a tabIndex={6} href={url.registrationUrl}>
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                )
            }
        >
            <form id="webauth" action={url.loginAction} method="post">
                <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                <input type="hidden" id="authenticatorData" name="authenticatorData" />
                <input type="hidden" id="signature" name="signature" />
                <input type="hidden" id="credentialId" name="credentialId" />
                <input type="hidden" id="userHandle" name="userHandle" />
                <input type="hidden" id="error" name="error" />
            </form>

            <div className={kcClsx("kcFormGroupClass")} style={{ marginBottom: 0 }}>
                {authenticators !== undefined && Object.keys(authenticators).length !== 0 && (
                    <>
                        <form id="authn_select" className={kcClsx("kcFormClass")}>
                            {authenticators.authenticators.map((authenticator, i) => (
                                <input
                                    key={i}
                                    type="hidden"
                                    name="authn_use_chk"
                                    readOnly
                                    value={authenticator.credentialId}
                                />
                            ))}
                        </form>
                        {shouldDisplayAuthenticators && (
                            <>
                                {authenticators.authenticators.length > 1 && (
                                    <p className={kcClsx("kcSelectAuthListItemTitle")}>
                                        {msg("passkey-available-authenticators")}
                                    </p>
                                )}
                                <div className={kcClsx("kcFormClass")}>
                                    {authenticators.authenticators.map((authenticator, i) => (
                                        <div
                                            key={i}
                                            id={`kc-webauthn-authenticator-item-${i}`}
                                            className={kcClsx("kcSelectAuthListItemClass")}
                                        >
                                            <i
                                                className={clsx(
                                                    (() => {
                                                        const className = kcClsx(
                                                            authenticator.transports.iconClass as any
                                                        );
                                                        if (
                                                            className ===
                                                            authenticator.transports.iconClass
                                                        ) {
                                                            return kcClsx("kcWebAuthnDefaultIcon");
                                                        }
                                                        return className;
                                                    })(),
                                                    kcClsx("kcSelectAuthListItemIconPropertyClass")
                                                )}
                                            />
                                            <div className={kcClsx("kcSelectAuthListItemBodyClass")}>
                                                <div
                                                    id={`kc-webauthn-authenticator-label-${i}`}
                                                    className={kcClsx(
                                                        "kcSelectAuthListItemHeadingClass"
                                                    )}
                                                >
                                                    {advancedMsg(authenticator.label)}
                                                </div>
                                                {authenticator.transports !== undefined &&
                                                    authenticator.transports.displayNameProperties !==
                                                        undefined &&
                                                    authenticator.transports.displayNameProperties
                                                        .length !== 0 && (
                                                        <div
                                                            id={`kc-webauthn-authenticator-transport-${i}`}
                                                            className={kcClsx(
                                                                "kcSelectAuthListItemDescriptionClass"
                                                            )}
                                                        >
                                                            {authenticator.transports.displayNameProperties.map(
                                                                (nameProperty, i, arr) => (
                                                                    <Fragment key={i}>
                                                                        <span key={i}>
                                                                            {" "}
                                                                            {advancedMsg(
                                                                                nameProperty
                                                                            )}{" "}
                                                                        </span>
                                                                        {i !== arr.length - 1 && (
                                                                            <span>, </span>
                                                                        )}
                                                                    </Fragment>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                <div
                                                    className={kcClsx(
                                                        "kcSelectAuthListItemDescriptionClass"
                                                    )}
                                                >
                                                    <span
                                                        id={`kc-webauthn-authenticator-createdlabel-${i}`}
                                                    >
                                                        {msg("passkey-createdAt-label")}
                                                    </span>
                                                    <span id={`kc-webauthn-authenticator-created-${i}`}>
                                                        {authenticator.createdAt}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={kcClsx("kcSelectAuthListItemFillClass")} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
                <div id="kc-form">
                    <div id="kc-form-wrapper">
                        {realm.password && (
                            <form
                                id="kc-form-login"
                                action={url.loginAction}
                                method="post"
                                style={{ display: "none" }}
                                onSubmit={event => {
                                    try {
                                        // @ts-expect-error: Ok
                                        event.target.login.disabled = true;
                                    } catch {}

                                    return true;
                                }}
                            >
                                {!usernameHidden && (
                                    <div className={kcClsx("kcFormGroupClass")}>
                                        <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                            {msg("passkey-autofill-select")}
                                        </label>
                                        <input
                                            tabIndex={1}
                                            id="username"
                                            aria-invalid={messagesPerField.existsError("username")}
                                            className={kcClsx("kcInputClass")}
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            autoComplete="username webauthn"
                                            type="text"
                                            autoFocus
                                        />
                                        {messagesPerField.existsError("username") && (
                                            <span
                                                id="input-error-username"
                                                className={kcClsx("kcInputErrorMessageClass")}
                                                aria-live="polite"
                                            >
                                                {messagesPerField.get("username")}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </form>
                        )}
                        <div
                            id="kc-form-passkey-button"
                            className={kcClsx("kcFormButtonsClass")}
                            style={{ display: "none" }}
                        >
                            <input
                                id={authButtonId}
                                type="button"
                                autoFocus
                                value={msgStr("passkey-doAuthenticate")}
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonBlockClass",
                                    "kcButtonLargeClass"
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    );
}
