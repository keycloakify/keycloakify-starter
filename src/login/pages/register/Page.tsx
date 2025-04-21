import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { KcContext } from "./KcContext";
import { Template } from "../../components/Template";
import { useI18n } from "../../i18n";
import { useKcClsx } from "../../_internals/useKcClsx";
import { UserProfileFormFields } from "../../components/UserProfileFormFields";
import { TermsAcceptance } from "./TermsAcceptance";

export function Page(props: {
    kcContext: KcContext;
    doMakeUserConfirmPassword: boolean;
}) {
    const { kcContext, doMakeUserConfirmPassword } = props;

    const { kcClsx } = useKcClsx();

    const {
        messageHeader,
        url,
        messagesPerField,
        recaptchaRequired,
        recaptchaVisible,
        recaptchaSiteKey,
        recaptchaAction,
        termsAcceptanceRequired
    } = kcContext;

    const { msg, msgStr, advancedMsg } = useI18n();

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            headerNode={
                messageHeader !== undefined
                    ? advancedMsg(messageHeader)
                    : msg("registerTitle")
            }
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
        >
            <form
                id="kc-register-form"
                className={kcClsx("kcFormClass")}
                action={url.registrationAction}
                method="post"
            >
                <UserProfileFormFields
                    kcContext={kcContext}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                {termsAcceptanceRequired && (
                    <TermsAcceptance
                        kcContext={kcContext}
                        areTermsAccepted={areTermsAccepted}
                        onAreTermsAcceptedValueChange={setAreTermsAccepted}
                    />
                )}
                {recaptchaRequired &&
                    (recaptchaVisible || recaptchaAction === undefined) && (
                        <div className="form-group">
                            <div className={kcClsx("kcInputWrapperClass")}>
                                <div
                                    className="g-recaptcha"
                                    data-size="compact"
                                    data-sitekey={recaptchaSiteKey}
                                    data-action={recaptchaAction}
                                ></div>
                            </div>
                        </div>
                    )}
                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")}>
                            <span>
                                <a href={url.loginUrl}>{msg("backToLogin")}</a>
                            </span>
                        </div>
                    </div>

                    {recaptchaRequired &&
                    !recaptchaVisible &&
                    recaptchaAction !== undefined ? (
                        <div
                            id="kc-form-buttons"
                            className={kcClsx("kcFormButtonsClass")}
                        >
                            <button
                                className={clsx(
                                    kcClsx(
                                        "kcButtonClass",
                                        "kcButtonPrimaryClass",
                                        "kcButtonBlockClass",
                                        "kcButtonLargeClass"
                                    ),
                                    "g-recaptcha"
                                )}
                                data-sitekey={recaptchaSiteKey}
                                data-callback={() => {
                                    (
                                        document.getElementById(
                                            "kc-register-form"
                                        ) as HTMLFormElement
                                    ).submit();
                                }}
                                data-action={recaptchaAction}
                                type="submit"
                            >
                                {msg("doRegister")}
                            </button>
                        </div>
                    ) : (
                        <div
                            id="kc-form-buttons"
                            className={kcClsx("kcFormButtonsClass")}
                        >
                            <input
                                disabled={
                                    !isFormSubmittable ||
                                    (termsAcceptanceRequired && !areTermsAccepted)
                                }
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonBlockClass",
                                    "kcButtonLargeClass"
                                )}
                                type="submit"
                                value={msgStr("doRegister")}
                            />
                        </div>
                    )}
                </div>
            </form>
        </Template>
    );
}
