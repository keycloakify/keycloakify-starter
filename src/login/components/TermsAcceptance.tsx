import { type ReactNode, useId } from "react";
import { useKcContext } from "../KcContext.gen";
import { useKcClsx } from "../../@keycloakify/login-ui/useKcClsx";
import { useI18n } from "../i18n";

type Props = {
    hasError: boolean;
    renderInput: (inputProps: { 
        type: "checkbox"; 
        id: string;
        className: string;
        "aria-invalid": true | undefined;
    }) => ReactNode;
};

export function TermsAcceptance(props: Props) {
    const { hasError, renderInput } = props;

    const { kcClsx } = useKcClsx();

    const { kcContext } = useKcContext();

    const { msg } = useI18n();

    const inputId = `termsAccepted-${useId()}`;

    return (
        <>
            <div className="form-group">
                <div className={kcClsx("kcInputWrapperClass")}>
                    {msg("termsTitle")}
                    <div id="kc-registration-terms-text">{msg("termsText")}</div>
                </div>
            </div>
            <div className="form-group">
                <div className={kcClsx("kcLabelWrapperClass")}>
                    {renderInput({
                        type: "checkbox",
                        id: inputId,
                        className: kcClsx("kcCheckboxInputClass"),
                        "aria-invalid": hasError ? true : undefined
                    })}
                    <input
                        type="checkbox"
                        id={inputId}
                        name="termsAccepted"
                        className={kcClsx("kcCheckboxInputClass")}
                        aria-invalid={
                            kcContext.messagesPerField.existsError("termsAccepted") ? true : undefined
                        }
                    />
                    <label htmlFor={inputId} className={kcClsx("kcLabelClass")}>
                        {msg("acceptTerms")}
                    </label>
                </div>
                {kcContext.messagesPerField.existsError("termsAccepted") && (
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <span
                            id="input-error-terms-accepted"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                        >
                            {kcContext.messagesPerField.get("termsAccepted")}
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
