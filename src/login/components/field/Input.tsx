import { type ReactNode, useId } from "react";
import { Group } from "./Group";
import { ErrorIcon } from "./ErrorIcon";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";

export type Props = {
    className?: string;
    label: ReactNode;
    required?: boolean;
    error: ReactNode;
    renderInput: (inputProps: {
        type: "text";
        id: string;
        "aria-invalid": true | undefined;
    }) => ReactNode;
};

export function Input(props: Props) {
    const {
        className,
        label,
        required = false,
        //autoComplete = "off",
        error,
        renderInput
    } = props;

    const { kcClsx } = useKcClsx();

    const inputId = `input-${useId()}`;

    return (
        <Group className={className} inputId={inputId} label={label} error={error} required={required}>
            <span className={kcClsx("kcInputClass", !!error && "kcError")}>
                {renderInput({
                    type: "text",
                    id: inputId,
                    "aria-invalid": !!error ? true : undefined
                })}
            </span>

            {error && <ErrorIcon />}
        </Group>
    );
}
