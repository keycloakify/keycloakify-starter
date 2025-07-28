import { type ReactNode } from "react";
import { Group } from "../Group";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";
import { PasswordWrapperInner } from "./PasswordWrapperInner";

type Props = {
    className?: string;
    name: string;
    label: ReactNode;
    required?: boolean;

    error: ReactNode;
    rememberMe?: ReactNode;
    forgotPassword?: ReactNode;

    renderInput: (inputProps: {
        id: string;
        type: "text" | "password";
        "aria-invalid": "true" | undefined;
        name: string;
    }) => ReactNode;
};

export function Password(props: Props) {
    const {
        className,
        name,
        label,
        required = false,
        error,
        rememberMe,
        forgotPassword,
        renderInput
    } = props;

    const { kcClsx } = useKcClsx();

    return (
        <Group className={className} name={name} label={label} error={error} required={required}>
            <PasswordWrapperInner
                inputId={name}
                hasError={!!error}
                renderInput={inputProps =>
                    renderInput({
                        ...inputProps,
                        name
                    })
                }
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
