import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "./KcContext";
import { useI18n } from "../../i18n";
import { useKcClsx } from "../../_internals/useKcClsx";

export function Form(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { kcClsx } = useKcClsx();

    const { msg, msgStr } = useI18n();

    return (
        <form
            id="kc-reset-password-form"
            className={kcClsx("kcFormClass")}
            action={kcContext.url.loginAction}
            method="post"
        >
            <div className={kcClsx("kcFormGroupClass")}>
                <div className={kcClsx("kcLabelWrapperClass")}>
                    <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                        {!kcContext.realm.loginWithEmailAllowed
                            ? msg("username")
                            : !kcContext.realm.registrationEmailAsUsername
                              ? msg("usernameOrEmail")
                              : msg("email")}
                    </label>
                </div>
                <div className={kcClsx("kcInputWrapperClass")}>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className={kcClsx("kcInputClass")}
                        autoFocus
                        defaultValue={kcContext.auth.attemptedUsername ?? ""}
                        aria-invalid={kcContext.messagesPerField.existsError("username")}
                    />
                    {kcContext.messagesPerField.existsError("username") && (
                        <span
                            id="input-error-username"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(
                                    kcContext.messagesPerField.get("username")
                                )
                            }}
                        />
                    )}
                </div>
            </div>
            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                    <div className={kcClsx("kcFormOptionsWrapperClass")}>
                        <span>
                            <a href={kcContext.url.loginUrl}>{msg("backToLogin")}</a>
                        </span>
                    </div>
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
                    />
                </div>
            </div>
        </form>
    );
}
