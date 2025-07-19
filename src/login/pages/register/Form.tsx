/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/register/Form.tsx" --revert
 */

import { useState } from "react";
import { assert } from "tsafe/assert";
import { clsx } from "../../../@keycloakify/login-ui/tools/clsx";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { UserProfileFormFields } from "../../components/UserProfileFormFields";
import { TermsAcceptance } from "./TermsAcceptance";

export function Form() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "register.ftl");
    const { kcClsx } = useKcClsx();
    const { msg, msgStr } = useI18n();

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    return (
        <form
            id="kc-register-form"
            className={kcClsx("kcFormClass")}
            action={kcContext.url.registrationAction}
            method="post"
        >
            <UserProfileFormFields onIsFormSubmittableValueChange={setIsFormSubmittable} />
            {kcContext.termsAcceptanceRequired && (
                <TermsAcceptance
                    areTermsAccepted={areTermsAccepted}
                    onAreTermsAcceptedValueChange={setAreTermsAccepted}
                />
            )}
            {kcContext.recaptchaRequired &&
                (kcContext.recaptchaVisible || kcContext.recaptchaAction === undefined) && (
                    <div className="form-group">
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <div
                                className="g-recaptcha"
                                data-size="compact"
                                data-sitekey={kcContext.recaptchaSiteKey}
                                data-action={kcContext.recaptchaAction}
                            ></div>
                        </div>
                    </div>
                )}
            <div className={kcClsx("kcFormGroupClass")}>
                <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                    <div className={kcClsx("kcFormOptionsWrapperClass")}>
                        <span>
                            <a href={kcContext.url.loginUrl}>{msg("backToLogin")}</a>
                        </span>
                    </div>
                </div>

                {kcContext.recaptchaRequired &&
                !kcContext.recaptchaVisible &&
                kcContext.recaptchaAction !== undefined ? (
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
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
                            data-sitekey={kcContext.recaptchaSiteKey}
                            data-callback={() => {
                                (
                                    document.getElementById("kc-register-form") as HTMLFormElement
                                ).submit();
                            }}
                            data-action={kcContext.recaptchaAction}
                            type="submit"
                        >
                            {msg("doRegister")}
                        </button>
                    </div>
                ) : (
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <input
                            disabled={
                                !isFormSubmittable ||
                                (kcContext.termsAcceptanceRequired && !areTermsAccepted)
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
    );
}
