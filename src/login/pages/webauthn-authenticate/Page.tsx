/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/webauthn-authenticate/Page.tsx" --revert
 */

import { Fragment } from "react";
import { assert } from "tsafe/assert";
import { clsx } from "../../../@keycloakify/login-ui/tools/clsx";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { useScript } from "./useScript";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "webauthn-authenticate.ftl");

    const { kcClsx } = useKcClsx();

    const { url, realm, registrationDisabled, authenticators, shouldDisplayAuthenticators } = kcContext;

    const { msg, msgStr, advancedMsg } = useI18n();

    const authButtonId = "authenticateWebAuthnButton";

    useScript({ authButtonId });

    return (
        <Template
            displayInfo={realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration">
                    <span>
                        {msg("noAccount")}{" "}
                        <a tabIndex={6} href={url.registrationUrl}>
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
            headerNode={msg("webauthn-login-title")}
        >
            <div id="kc-form-webauthn" className={kcClsx("kcFormClass")}>
                <form id="webauth" action={url.loginAction} method="post">
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="authenticatorData" name="authenticatorData" />
                    <input type="hidden" id="signature" name="signature" />
                    <input type="hidden" id="credentialId" name="credentialId" />
                    <input type="hidden" id="userHandle" name="userHandle" />
                    <input type="hidden" id="error" name="error" />
                </form>
                <div className={clsx(kcClsx("kcFormGroupClass"), "no-bottom-margin")}>
                    {authenticators && (
                        <>
                            <form id="authn_select" className={kcClsx("kcFormClass")}>
                                {authenticators.authenticators.map((authenticator, i) => (
                                    <input
                                        key={i}
                                        type="hidden"
                                        name="authn_use_chk"
                                        value={authenticator.credentialId}
                                    />
                                ))}
                            </form>

                            {shouldDisplayAuthenticators && (
                                <>
                                    {authenticators.authenticators.length > 1 && (
                                        <p className={kcClsx("kcSelectAuthListItemTitle")}>
                                            {msg("webauthn-available-authenticators")}
                                        </p>
                                    )}
                                    <div className={kcClsx("kcFormOptionsClass")}>
                                        {authenticators.authenticators.map((authenticator, i) => (
                                            <div
                                                key={i}
                                                id={`kc-webauthn-authenticator-item-${i}`}
                                                className={kcClsx("kcSelectAuthListItemClass")}
                                            >
                                                <div className={kcClsx("kcSelectAuthListItemIconClass")}>
                                                    <i
                                                        className={clsx(
                                                            (() => {
                                                                const className = kcClsx(
                                                                    authenticator.transports
                                                                        .iconClass as any
                                                                );
                                                                if (
                                                                    className ===
                                                                    authenticator.transports.iconClass
                                                                ) {
                                                                    return kcClsx(
                                                                        "kcWebAuthnDefaultIcon"
                                                                    );
                                                                }
                                                                return className;
                                                            })(),
                                                            kcClsx(
                                                                "kcSelectAuthListItemIconPropertyClass"
                                                            )
                                                        )}
                                                    />
                                                </div>
                                                <div
                                                    className={kcClsx(
                                                        "kcSelectAuthListItemArrowIconClass"
                                                    )}
                                                >
                                                    <div
                                                        id={`kc-webauthn-authenticator-label-${i}`}
                                                        className={kcClsx(
                                                            "kcSelectAuthListItemHeadingClass"
                                                        )}
                                                    >
                                                        {advancedMsg(authenticator.label)}
                                                    </div>
                                                    {authenticator.transports.displayNameProperties
                                                        ?.length && (
                                                        <div
                                                            id={`kc-webauthn-authenticator-transport-${i}`}
                                                            className={kcClsx(
                                                                "kcSelectAuthListItemDescriptionClass"
                                                            )}
                                                        >
                                                            {authenticator.transports.displayNameProperties
                                                                .map((displayNameProperty, i, arr) => ({
                                                                    displayNameProperty,
                                                                    hasNext: i !== arr.length - 1
                                                                }))
                                                                .map(
                                                                    ({
                                                                        displayNameProperty,
                                                                        hasNext
                                                                    }) => (
                                                                        <Fragment
                                                                            key={displayNameProperty}
                                                                        >
                                                                            {advancedMsg(
                                                                                displayNameProperty
                                                                            )}
                                                                            {hasNext && <span>, </span>}
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
                                                            {msg("webauthn-createdAt-label")}
                                                        </span>
                                                        <span
                                                            id={`kc-webauthn-authenticator-created-${i}`}
                                                        >
                                                            {authenticator.createdAt}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={kcClsx(
                                                            "kcSelectAuthListItemFillClass"
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <input
                            id={authButtonId}
                            type="button"
                            autoFocus
                            value={msgStr("webauthn-doAuthenticate")}
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
        </Template>
    );
}
