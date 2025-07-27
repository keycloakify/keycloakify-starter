import type { ReactNode, CSSProperties } from "react";
import { useKcClsx } from "../../@keycloakify/login-ui/useKcClsx";
import { clsx } from "../../@keycloakify/login-ui/tools/clsx";

type Props = {
    className?: string;
    style?: CSSProperties;
    name: string;
    label: ReactNode;
    error?: ReactNode;
    required?: boolean;
    children: ReactNode;
};

export function FieldGroup(props: Props) {
    const { className, style, name, label, error, required = false, children } = props;

    const { kcClsx } = useKcClsx();

    return (
        <div className={clsx(kcClsx("kcFormGroupClass"), className)} style={style}>
            <div className={kcClsx("kcFormGroupLabelClass")}>
                <label htmlFor={name} className={kcClsx("kcFormLabelClass")}>
                    <span className={kcClsx("kcFormLabelTextClass")}>{label}</span>
                    {required && (
                        <span className={kcClsx("kcInputRequiredClass")} aria-hidden="true">
                            &#42;
                        </span>
                    )}
                </label>
            </div>

            {children}

            <div id={`input-error-container-${name}`}>
                {error !== undefined && (
                    <div className={kcClsx("kcFormHelperTextClass")} aria-live="polite">
                        <div className={kcClsx("kcInputHelperTextClass")}>
                            <div
                                className={kcClsx("kcInputHelperTextItemClass", "kcError")}
                                id={`input-error-${name}`}
                            >
                                <span className={kcClsx("kcInputErrorMessageClass")}>{error}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
