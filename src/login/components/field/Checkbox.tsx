import  { type ReactNode, useId } from "react";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { clsx } from "../../../@keycloakify/login-ui/tools/clsx";

type Props = {
    className?: string;
    label: ReactNode;
    required?: boolean;
    renderInput: (inputProps: {
        className: string;
        type: "checkbox";
        id: string;
    }) => ReactNode;
};

export function Checkbox(props: Props) {
    const { className, label, required = false, renderInput } = props;

    const { kcClsx } = useKcClsx();

    const inputId = `checkbox-${useId()}`;

    return (
        <div className={clsx(kcClsx("kcCheckboxClass"), className)}>
            <label htmlFor={inputId} className={kcClsx("kcCheckboxClass")}>
                {renderInput({
                    className: kcClsx("kcCheckboxInputClass"),
                    type: "checkbox",
                    id: inputId
                })}
                <span className={kcClsx("kcCheckboxLabelClass")}>{label}</span>
                {required && (
                    <span className={kcClsx("kcCheckboxLabelRequiredClass")} aria-hidden="true">
                        &#42;
                    </span>
                )}
            </label>
        </div>
    );
}
