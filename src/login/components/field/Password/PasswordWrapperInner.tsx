import { useReducer, type ReactNode } from "react";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";
import { useI18n } from "../../../i18n";
import { ErrorIcon } from "../ErrorIcon";
import { clsx } from "../../../../@keycloakify/login-ui/tools/clsx";

export type Props = {
    className?: string;
    inputId: string;
    hasError: boolean;
    renderInput: (inputProps: {
        id: string;
        type: "text" | "password";
        "aria-invalid": "true" | undefined;
    }) => ReactNode;
};

export function PasswordWrapperInner(props: Props) {
    const { className, inputId, hasError, renderInput } = props;

    const { kcClsx } = useKcClsx();
    const { msgStr } = useI18n();

    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer(
        isPasswordRevealed => !isPasswordRevealed,
        false
    );

    return (
        <div className={clsx(kcClsx("kcInputGroup"), className)}>
            <div className={kcClsx("kcInputGroupItemClass", "kcFill")}>
                <span className={kcClsx("kcInputClass", hasError && "kcError")}>
                    {renderInput({
                        id: inputId,
                        type: isPasswordRevealed ? "text" : "password",
                        "aria-invalid": hasError ? "true" : undefined
                    })}
                    {!!hasError && <ErrorIcon />}
                </span>
            </div>
            <div className={kcClsx("kcInputGroupItemClass")}>
                <button
                    className={kcClsx("kcFormPasswordVisibilityButtonClass")}
                    type="button"
                    aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                    aria-controls={inputId}
                    id={`${inputId}-show-password`}
                    onClick={toggleIsPasswordRevealed}
                >
                    <i
                        className={clsx(isPasswordRevealed ? "fa-eye-slash" : "fa-eye", "fas")}
                        aria-hidden="true"
                    ></i>
                </button>
            </div>
        </div>
    );
}
