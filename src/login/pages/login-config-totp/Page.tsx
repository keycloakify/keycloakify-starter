/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/login-config-totp/Page.tsx" --revert
 */

import { assert } from "tsafe/assert";
import { kcSanitize } from "../../../@keycloakify/login-ui/kcSanitize";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { Template } from "../../components/Template";
import { LogoutOtherSessions } from "../../components/LogoutOtherSessions";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login-config-totp.ftl");

    const { msg, msgStr, advancedMsg } = useI18n();

    const { kcClsx } = useKcClsx();

    return (
        <Template
            headerNode={msg("loginTotpTitle")}
            displayMessage={!kcContext.messagesPerField.existsError("totp", "userLabel")}
        >
            <>
                <ol id="kc-totp-settings">
                    <li>
                        <p>{msg("loginTotpStep1")}</p>

                        <ul id="kc-totp-supported-apps">
                            {kcContext.totp.supportedApplications.map(app => (
                                <li key={app}>{advancedMsg(app)}</li>
                            ))}
                        </ul>
                    </li>

                    {kcContext.mode == "manual" ? (
                        <>
                            <li>
                                <p>{msg("loginTotpManualStep2")}</p>
                                <p>
                                    <span id="kc-totp-secret-key">
                                        {kcContext.totp.totpSecretEncoded}
                                    </span>
                                </p>
                                <p>
                                    <a href={kcContext.totp.qrUrl} id="mode-barcode">
                                        {msg("loginTotpScanBarcode")}
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p>{msg("loginTotpManualStep3")}</p>
                                <ul>
                                    <li id="kc-totp-type">
                                        {msg("loginTotpType")}:{" "}
                                        {msg(`loginTotp.${kcContext.totp.policy.type}`)}
                                    </li>
                                    <li id="kc-totp-algorithm">
                                        {msg("loginTotpAlgorithm")}:{" "}
                                        {kcContext.totp.policy.getAlgorithmKey()}
                                    </li>
                                    <li id="kc-totp-digits">
                                        {msg("loginTotpDigits")}: {kcContext.totp.policy.digits}
                                    </li>
                                    {kcContext.totp.policy.type === "totp" ? (
                                        <li id="kc-totp-period">
                                            {msg("loginTotpInterval")}: {kcContext.totp.policy.period}
                                        </li>
                                    ) : (
                                        <li id="kc-totp-counter">
                                            {msg("loginTotpCounter")}:{" "}
                                            {kcContext.totp.policy.initialCounter}
                                        </li>
                                    )}
                                </ul>
                            </li>
                        </>
                    ) : (
                        <li>
                            <p>{msg("loginTotpStep2")}</p>
                            <img
                                id="kc-totp-secret-qr-code"
                                src={`data:image/png;base64, ${kcContext.totp.totpSecretQrCode}`}
                                alt="Figure: Barcode"
                            />
                            <br />
                            <p>
                                <a href={kcContext.totp.manualUrl} id="mode-manual">
                                    {msg("loginTotpUnableToScan")}
                                </a>
                            </p>
                        </li>
                    )}
                    <li>
                        <p>{msg("loginTotpStep3")}</p>
                        <p>{msg("loginTotpStep3DeviceName")}</p>
                    </li>
                </ol>

                <form
                    action={kcContext.url.loginAction}
                    className={kcClsx("kcFormClass")}
                    id="kc-totp-settings-form"
                    method="post"
                >
                    <div className={kcClsx("kcFormGroupClass")}>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <label htmlFor="totp" className={kcClsx("kcLabelClass")}>
                                {msg("authenticatorCode")}
                            </label>{" "}
                            <span className="required">*</span>
                        </div>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <input
                                type="text"
                                id="totp"
                                name="totp"
                                autoComplete="off"
                                className={kcClsx("kcInputClass")}
                                aria-invalid={kcContext.messagesPerField.existsError("totp")}
                            />

                            {kcContext.messagesPerField.existsError("totp") && (
                                <span
                                    id="input-error-otp-code"
                                    className={kcClsx("kcInputErrorMessageClass")}
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(kcContext.messagesPerField.get("totp"))
                                    }}
                                />
                            )}
                        </div>
                        <input
                            type="hidden"
                            id="totpSecret"
                            name="totpSecret"
                            value={kcContext.totp.totpSecret}
                        />
                        {kcContext.mode && <input type="hidden" id="mode" value={kcContext.mode} />}
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <label htmlFor="userLabel" className={kcClsx("kcLabelClass")}>
                                {msg("loginTotpDeviceName")}
                            </label>{" "}
                            {kcContext.totp.otpCredentials.length >= 1 && (
                                <span className="required">*</span>
                            )}
                        </div>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <input
                                type="text"
                                id="userLabel"
                                name="userLabel"
                                autoComplete="off"
                                className={kcClsx("kcInputClass")}
                                aria-invalid={kcContext.messagesPerField.existsError("userLabel")}
                            />
                            {kcContext.messagesPerField.existsError("userLabel") && (
                                <span
                                    id="input-error-otp-label"
                                    className={kcClsx("kcInputErrorMessageClass")}
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(kcContext.messagesPerField.get("userLabel"))
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <LogoutOtherSessions />
                    </div>

                    {kcContext.isAppInitiatedAction ? (
                        <>
                            <input
                                type="submit"
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonLargeClass"
                                )}
                                id="saveTOTPBtn"
                                value={msgStr("doSubmit")}
                            />
                            <button
                                type="submit"
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonDefaultClass",
                                    "kcButtonLargeClass",
                                    "kcButtonLargeClass"
                                )}
                                id="cancelTOTPBtn"
                                name="cancel-aia"
                                value="true"
                            >
                                {msg("doCancel")}
                            </button>
                        </>
                    ) : (
                        <input
                            type="submit"
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonPrimaryClass",
                                "kcButtonLargeClass"
                            )}
                            id="saveTOTPBtn"
                            value={msgStr("doSubmit")}
                        />
                    )}
                </form>
            </>
        </Template>
    );
}
