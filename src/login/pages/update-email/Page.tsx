import { useState } from "react";
import { useKcClsx } from "../../_internals/useKcClsx";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";
import { UserProfileFormFields } from "../../components/UserProfileFormFields";
import { LogoutOtherSessions } from "../../components/LogoutOtherSessions";

export function Page() {

    const { kcContext } = useKcContext("update-email.ftl");

    const { kcClsx } = useKcClsx();

    const { msg, msgStr }= useI18n();

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <Template
           
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
            headerNode={msg("updateEmailTitle")}
        >
            <form id="kc-update-email-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <UserProfileFormFields onIsFormSubmittableValueChange={setIsFormSubmittable} />

                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")} />
                    </div>

                    <LogoutOtherSessions />

                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <input
                            disabled={!isFormSubmittable}
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonPrimaryClass",
                                isAppInitiatedAction && "kcButtonBlockClass",
                                "kcButtonLargeClass"
                            )}
                            type="submit"
                            value={msgStr("doSubmit")}
                        />
                        {isAppInitiatedAction && (
                            <button
                                className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                                type="submit"
                                name="cancel-aia"
                                value="true"
                            >
                                {msg("doCancel")}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}
