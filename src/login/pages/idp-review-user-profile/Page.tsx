import { useState } from "react";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";
import { useKcClsx } from "../../_internals/useKcClsx";
import { UserProfileFormFields } from "../../components/UserProfileFormFields";

export function Page() {
    const { kcContext } = useKcContext("idp-review-user-profile.ftl");

    const { kcClsx } = useKcClsx();

    const { msg, msgStr } = useI18n();

    const [isFomSubmittable, setIsFomSubmittable] = useState(false);

    return (
        <Template
            displayMessage={kcContext.messagesPerField.exists("global")}
            displayRequiredFields
            headerNode={msg("loginIdpReviewProfileTitle")}
        >
            <form
                id="kc-idp-review-profile-form"
                className={kcClsx("kcFormClass")}
                action={kcContext.url.loginAction}
                method="post"
            >
                <UserProfileFormFields
                    onIsFormSubmittableValueChange={setIsFomSubmittable}
                />
                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")} />
                    </div>
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <input
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonPrimaryClass",
                                "kcButtonBlockClass",
                                "kcButtonLargeClass"
                            )}
                            type="submit"
                            value={msgStr("doSubmit")}
                            disabled={!isFomSubmittable}
                        />
                    </div>
                </div>
            </form>
        </Template>
    );
}
