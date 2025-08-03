import { type ReactNode, type CSSProperties, useId, useReducer } from "react";
import { Group } from "./Group";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { clsx } from "../../../@keycloakify/login-ui/tools/clsx";
import { useI18n } from "../../i18n";
import { ErrorIcon } from "./ErrorIcon";

type Props = {
    className?: string;
    style: CSSProperties;
    label: ReactNode;
    required?: boolean;

    error: ReactNode;
    rememberMe?: ReactNode;
    forgotPassword?: ReactNode;

    renderInput: (inputProps: {
        id: string;
        type: "text" | "password";
        "aria-invalid": "true" | undefined;
    }) => ReactNode;
};

export function Password(props: Props) {
    const {
        className,
        style,
        label,
        required = false,
        error,
        rememberMe,
        forgotPassword,
        renderInput
    } = props;

    const { kcClsx } = useKcClsx();

    const inputId = `password-${useId()}`;

    const { msgStr } = useI18n();

    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer(
        isPasswordRevealed => !isPasswordRevealed,
        false
    );

    return (
        <Group
            className={className}
            style={style}
            inputId={inputId}
            label={label}
            error={error}
            required={required}
        >
            <div className={clsx(kcClsx("kcInputGroup"), className)}>
                <div className={kcClsx("kcInputGroupItemClass", "kcFill")}>
                    <span className={kcClsx("kcInputClass", !!error && "kcError")}>
                        {renderInput({
                            id: inputId,
                            type: isPasswordRevealed ? "text" : "password",
                            "aria-invalid": !!error ? "true" : undefined
                        })}
                        {!!error && <ErrorIcon />}
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
            <div className={kcClsx("kcFormHelperTextClass")} aria-live="polite">
                <div className={kcClsx("kcInputHelperTextClass")}>
                    {rememberMe ?? null}
                    {forgotPassword && (
                        <div className={kcClsx("kcInputHelperTextItemClass")}>
                            <span className={kcClsx("kcInputHelperTextItemTextClass")}>
                                {forgotPassword}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Group>
    );
}
