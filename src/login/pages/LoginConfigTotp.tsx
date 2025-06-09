import { getKcClsx, KcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const header = () => {
    return (
        <CardHeader>
            <CardTitle>
                <b>Configure 2FA</b>
            </CardTitle>
            <CardDescription>For additional security, please configure 2FA.</CardDescription>
        </CardHeader>
    );
};

export default function LoginConfigTotp(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={header()}
            displayMessage={!messagesPerField.existsError("totp", "userLabel")}
        >
            <CardContent>
                <>
                    <ol id="kc-totp-settings">
                        <li>
                            <p>{msg("loginTotpStep1")}</p>
                            <ul id="kc-totp-supported-apps">
                                {totp.supportedApplications.map(app => (
                                    <li key={app}>{advancedMsg(app)}</li>
                                ))}
                            </ul>
                        </li>

                        {mode == "manual" ? (
                            <>
                                <li>
                                    <p>{msg("loginTotpManualStep2")}</p>
                                    <p>
                                        <span id="kc-totp-secret-key">{totp.totpSecretEncoded}</span>
                                    </p>
                                    <p>
                                        <Button variant="ghost">
                                        <a href={totp.qrUrl} id="mode-barcode">
                                            {msg("loginTotpScanBarcode")}
                                        </a></Button>
                                    </p>
                                </li>
                                <li>
                                    <p>{msg("loginTotpManualStep3")}</p>
                                    <ul>
                                        <li id="kc-totp-type">
                                            {msg("loginTotpType")}: {msg(`loginTotp.${totp.policy.type}`)}
                                        </li>
                                        <li id="kc-totp-algorithm">
                                            {msg("loginTotpAlgorithm")}: {totp.policy.getAlgorithmKey()}
                                        </li>
                                        <li id="kc-totp-digits">
                                            {msg("loginTotpDigits")}: {totp.policy.digits}
                                        </li>
                                        {totp.policy.type === "totp" ? (
                                            <li id="kc-totp-period">
                                                {msg("loginTotpInterval")}: {totp.policy.period}
                                            </li>
                                        ) : (
                                            <li id="kc-totp-counter">
                                                {msg("loginTotpCounter")}: {totp.policy.initialCounter}
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            </>
                        ) : (
                            <li>
                                <p>{msg("loginTotpStep2")}</p>
                                <img id="kc-totp-secret-qr-code" src={`data:image/png;base64, ${totp.totpSecretQrCode}`} alt="Figure: Barcode" />
                                <br />
                                <p>
                                    <Button variant="ghost">
                                        <a href={totp.manualUrl} id="mode-manual">
                                            {msg("loginTotpUnableToScan")}
                                        </a>
                                    </Button>
                                </p>
                            </li>
                        )}
                        <li>
                            <p>{msg("loginTotpStep3")}</p>
                            <p>{msg("loginTotpStep3DeviceName")}</p>
                        </li>
                    </ol>

                    <form action={url.loginAction} className={kcClsx("kcFormClass")} id="kc-totp-settings-form" method="post">
                        <div className={kcClsx("kcFormGroupClass")}>
                            <div className={kcClsx("kcInputWrapperClass")}>
                                <Label htmlFor="totp">{msg("authenticatorCode")}</Label> <span className="required">*</span>
                            </div>
                            <div className={kcClsx("kcInputWrapperClass")}>
                                <Input type="text" id="totp" name="totp" autoComplete="off" aria-invalid={messagesPerField.existsError("totp")} />

                                {messagesPerField.existsError("totp") && (
                                    <span
                                        id="input-error-otp-code"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.get("totp"))
                                        }}
                                    />
                                )}
                            </div>
                            <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                            {mode && <input type="hidden" id="mode" value={mode} />}
                        </div>

                        <div className={kcClsx("kcFormGroupClass")}>
                            <div className={kcClsx("kcInputWrapperClass")}>
                                <Label htmlFor="userLabel">
                                    {msg("loginTotpDeviceName")}
                                </Label>{" "}
                                {totp.otpCredentials.length >= 1 && <span className="required">*</span>}
                            </div>
                            <div className={kcClsx("kcInputWrapperClass")}>
                                <Input
                                    type="text"
                                    id="userLabel"
                                    name="userLabel"
                                    autoComplete="off"
                                    aria-invalid={messagesPerField.existsError("userLabel")}
                                />
                                {messagesPerField.existsError("userLabel") && (
                                    <span
                                        id="input-error-otp-label"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.get("userLabel"))
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={kcClsx("kcFormGroupClass")}>
                            <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                        </div>

                        {isAppInitiatedAction ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    id="saveTOTPBtn"
                                    value={msgStr("doSubmit")}
                                >
                                    Submit
                                </Button>
                                <Button type="submit" id="cancelTOTPBtn" name="cancel-aia" value="true" variant="secondary" className="w-full">
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Button type="submit" id="saveTOTPBtn" className="w-full">
                                Submit
                            </Button>
                        )}
                    </form>
                </>
            </CardContent>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;
    const { msg } = i18n;
    return (
        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
                        {msg("logoutOtherSessions")}
                    </label>
                </div>
            </div>
        </div>
    );
}
