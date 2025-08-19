import { assert } from "tsafe/assert";
import { clsx } from "@keycloakify/account-multi-page-ui/tools/clsx";
import { kcSanitize } from "@keycloakify/account-multi-page-ui/kcSanitize";
import { useKcClsx } from "@keycloakify/account-multi-page-ui/useKcClsx";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "totp.ftl");

    const { kcClsx } = useKcClsx();

    const { msg, msgStr, advancedMsg } = useI18n();

    return (
        <Template active="totp">
            <>
                <div className="row">
                    <div className="col-md-10">
                        <h2>{msg("authenticatorTitle")}</h2>
                    </div>
                    {kcContext.totp.otpCredentials.length === 0 && (
                        <div className="subtitle col-md-2">
                            <span className="required">*</span>
                            {msg("requiredFields")}
                        </div>
                    )}
                </div>
                {kcContext.totp.enabled && (
                    <table className="table table-bordered table-striped">
                        <thead>
                            {kcContext.totp.otpCredentials.length > 1 ? (
                                <tr>
                                    <th colSpan={4}>{msg("configureAuthenticators")}</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th colSpan={3}>{msg("configureAuthenticators")}</th>
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {kcContext.totp.otpCredentials.map((credential, index) => (
                                <tr key={index}>
                                    <td className="provider">{msg("mobile")}</td>
                                    {kcContext.totp.otpCredentials.length > 1 && (
                                        <td className="provider">{credential.id}</td>
                                    )}
                                    <td className="provider">{credential.userLabel || ""}</td>
                                    <td className="action">
                                        <form
                                            action={kcContext.url.totpUrl}
                                            method="post"
                                            className="form-inline"
                                        >
                                            <input
                                                type="hidden"
                                                id="stateChecker"
                                                name="stateChecker"
                                                value={kcContext.stateChecker}
                                            />
                                            <input
                                                type="hidden"
                                                id="submitAction"
                                                name="submitAction"
                                                value="Delete"
                                            />
                                            <input
                                                type="hidden"
                                                id="credentialId"
                                                name="credentialId"
                                                value={credential.id}
                                            />
                                            <button
                                                id={`remove-mobile-${index}`}
                                                className="btn btn-default"
                                            >
                                                <i className="pficon pficon-delete"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {!kcContext.totp.enabled && (
                    <div>
                        <hr />
                        <ol id="kc-totp-settings">
                            <li>
                                <p>{msg("totpStep1")}</p>

                                <ul id="kc-totp-supported-apps">
                                    {kcContext.totp.supportedApplications?.map(app => (
                                        <li key={app}>{advancedMsg(app)}</li>
                                    ))}
                                </ul>
                            </li>

                            {kcContext.mode && kcContext.mode == "manual" ? (
                                <>
                                    <li>
                                        <p>{msg("totpManualStep2")}</p>
                                        <p>
                                            <span id="kc-totp-secret-key">
                                                {kcContext.totp.totpSecretEncoded}
                                            </span>
                                        </p>
                                        <p>
                                            <a href={kcContext.totp.qrUrl} id="mode-barcode">
                                                {msg("totpScanBarcode")}
                                            </a>
                                        </p>
                                    </li>
                                    <li>
                                        <p>{msg("totpManualStep3")}</p>
                                        <ul>
                                            <li id="kc-totp-type">
                                                {msg("totpType")}:{" "}
                                                {msg(`totp.${kcContext.totp.policy.type}`)}
                                            </li>
                                            <li id="kc-totp-algorithm">
                                                {msg("totpAlgorithm")}:{" "}
                                                {kcContext.totp.policy.getAlgorithmKey()}
                                            </li>
                                            <li id="kc-totp-digits">
                                                {msg("totpDigits")}: {kcContext.totp.policy.digits}
                                            </li>
                                            {kcContext.totp.policy.type === "totp" ? (
                                                <li id="kc-totp-period">
                                                    {msg("totpInterval")}: {kcContext.totp.policy.period}
                                                </li>
                                            ) : (
                                                <li id="kc-totp-counter">
                                                    {msg("totpCounter")}:{" "}
                                                    {kcContext.totp.policy.initialCounter}
                                                </li>
                                            )}
                                        </ul>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <p>{msg("totpStep2")}</p>
                                    <p>
                                        <img
                                            id="kc-totp-secret-qr-code"
                                            src={`data:image/png;base64, ${kcContext.totp.totpSecretQrCode}`}
                                            alt="Figure: Barcode"
                                        />
                                    </p>
                                    <p>
                                        <a href={kcContext.totp.manualUrl} id="mode-manual">
                                            {msg("totpUnableToScan")}
                                        </a>
                                    </p>
                                </li>
                            )}
                            <li>
                                <p>{msg("totpStep3")}</p>
                                <p>{msg("totpStep3DeviceName")}</p>
                            </li>
                        </ol>
                        <hr />
                        <form
                            action={kcContext.url.totpUrl}
                            className={kcClsx("kcFormClass")}
                            id="kc-totp-settings-form"
                            method="post"
                        >
                            <input
                                type="hidden"
                                id="stateChecker"
                                name="stateChecker"
                                value={kcContext.stateChecker}
                            />
                            <div className={kcClsx("kcFormGroupClass")}>
                                <div className="col-sm-2 col-md-2">
                                    <label htmlFor="totp" className="control-label">
                                        {msg("authenticatorCode")}
                                    </label>
                                    <span className="required">*</span>
                                </div>
                                <div className="col-sm-10 col-md-10">
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
                                                __html: kcSanitize(
                                                    kcContext.messagesPerField.get("totp")
                                                )
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
                                {kcContext.mode && (
                                    <input type="hidden" id="mode" value={kcContext.mode} />
                                )}
                            </div>

                            <div className={kcClsx("kcFormGroupClass")}>
                                <div className="col-sm-2 col-md-2">
                                    <label htmlFor="userLabel" className={kcClsx("kcLabelClass")}>
                                        {msg("totpDeviceName")}
                                    </label>
                                    {kcContext.totp.otpCredentials.length >= 1 && (
                                        <span className="required">*</span>
                                    )}
                                </div>
                                <div className="col-sm-10 col-md-10">
                                    <input
                                        type="text"
                                        id="userLabel"
                                        name="userLabel"
                                        autoComplete="off"
                                        className={kcClsx("kcInputClass")}
                                        aria-invalid={kcContext.messagesPerField.existsError(
                                            "userLabel"
                                        )}
                                    />
                                    {kcContext.messagesPerField.existsError("userLabel") && (
                                        <span
                                            id="input-error-otp-label"
                                            className={kcClsx("kcInputErrorMessageClass")}
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(
                                                    kcContext.messagesPerField.get("userLabel")
                                                )
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            <div
                                id="kc-form-buttons"
                                className={clsx(kcClsx("kcFormGroupClass"), "text-right")}
                            >
                                <div className={kcClsx("kcInputWrapperClass")}>
                                    <input
                                        type="submit"
                                        className={kcClsx(
                                            "kcButtonClass",
                                            "kcButtonPrimaryClass",
                                            "kcButtonLargeClass"
                                        )}
                                        id="saveTOTPBtn"
                                        value={msgStr("doSave")}
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
                                        name="submitAction"
                                        value="Cancel"
                                    >
                                        {msg("doCancel")}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </>
        </Template>
    );
}
