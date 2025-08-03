import { type ReactNode, useId } from "react";
import { Group } from "../Group";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";
import { PasswordWrapperInner } from "./PasswordWrapperInner";

type Props = {
    className?: string;
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
        label,
        required = false,
        error,
        rememberMe,
        forgotPassword,
        renderInput
    } = props;

    const { kcClsx } = useKcClsx();

    const inputId = `password-${useId()}`;

    return (
        <Group className={className} inputId={inputId} label={label} error={error} required={required}>
            <PasswordWrapperInner
                inputId={inputId}
                hasError={!!error}
                renderInput={renderInput}
            />
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
