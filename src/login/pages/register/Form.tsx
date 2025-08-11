import { useState, useReducer } from "react";
import { assert } from "tsafe/assert";
import { clsx } from "../../../@keycloakify/login-ui/tools/clsx";
import { useKcContext } from "../../KcContext.gen";
import { useI18n } from "../../i18n";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { UserProfileFormFields } from "../../components/UserProfileFormFields";
import { TermsAcceptance } from "../../components/TermsAcceptance";
import { useRecaptchaIfEnabled } from "./useRecaptcha";
import { NewPasswordField } from "../../components/NewPasswordFormField";
import { REQUIRE_CONFIRM_PASSWORD } from "./REQUIRE_CONFIRM_PASSWORD";

export function Form() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "register.ftl");
    const { kcClsx } = useKcClsx();
    const { msg } = useI18n();

    const [areTermsAccepted, setAreTermsAccepted] = useState(false);
    const [areAllUserProfileChecksPassed, setAreAllUserProfileChecksPassed] = useState(false);
    const [areAllNewPasswordChecksPassed, setAreAllNewPasswordChecksPassed] = useState(false);
    const [hasFormBeenSubmitted, setFormSubmitted] = useReducer(()=> true, false);

    const recaptcha = useRecaptchaIfEnabled({ iAmNotARobotSize: "compact" });

    return (
        <form
            id="kc-register-form"
            className={kcClsx("kcFormClass")}
            action={kcContext.url.registrationAction}
            method="post"
            onSubmit={()=> setFormSubmitted()}
        >
            <UserProfileFormFields
                onAreAllChecksPassedValueChange={setAreAllUserProfileChecksPassed}
                renderAfterField={({ attributeName, userProfileForm: { userProfileApi } }) => {
                    if (
                        kcContext.passwordRequired &&
                        (attributeName === "username" ||
                            (attributeName === "email" && kcContext.realm.registrationEmailAsUsername))
                    ) {
                        return (
                            <NewPasswordField
                                testUserPatienceWithConfirmationLikeIts1998={REQUIRE_CONFIRM_PASSWORD}
                                onAreAllCheckPassedValueChange={setAreAllNewPasswordChecksPassed}
                                usecase={{
                                    pageId: "register.ftl",
                                    userProfileApi
                                }}
                            />
                        );
                    }

                    return null;
                }}
            />
            {kcContext.termsAcceptanceRequired && (
                <TermsAcceptance
                    hasError={
                        !areTermsAccepted && kcContext.messagesPerField.existsError("termsAccepted")
                    }
                    renderInput={inputProps => (
                        <input
                            {...inputProps}
                            name="termsAccepted"
                            checked={areTermsAccepted}
                            onChange={e => setAreTermsAccepted(e.target.checked)}
                        />
                    )}
                />
            )}

            {recaptcha?.iAmNotARobotPlaceholder && (
                <div className="form-group">
                    <div className={kcClsx("kcInputWrapperClass")}>
                        {recaptcha.iAmNotARobotPlaceholder}
                    </div>
                </div>
            )}

            <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                <button
                    {...recaptcha?.submitButtonProps}
                    className={clsx(
                        kcClsx(
                            "kcButtonClass",
                            "kcButtonPrimaryClass",
                            "kcButtonBlockClass",
                            "kcButtonLargeClass"
                        ),
                        recaptcha?.submitButtonProps?.className
                    )}
                    type="submit"
                    id="kc-submit"
                    disabled={
                        hasFormBeenSubmitted ||
                        !areAllUserProfileChecksPassed ||
                        !areAllNewPasswordChecksPassed ||
                        (kcContext.termsAcceptanceRequired && !areTermsAccepted) ||
                        recaptcha?.isIAmNotARobotChecked === false
                    }
                >
                    {msg("doRegister")}
                </button>
            </div>

            <div className={clsx(kcClsx("kcFormGroupClass"), "pf-v5-c-login__main-footer-band")}>
                <div
                    id="kc-form-options"
                    className={clsx(
                        kcClsx("kcFormOptionsClass"),
                        "pf-v5-c-login__main-footer-band-item"
                    )}
                >
                    <div className={kcClsx("kcFormOptionsWrapperClass")}>
                        <span>
                            <a href={kcContext.url.loginUrl}>{msg("backToLogin")}</a>
                        </span>
                    </div>
                </div>
            </div>
        </form>
    );
}
