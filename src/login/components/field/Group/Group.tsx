import type { ReactNode, CSSProperties } from "react";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";
import { clsx } from "../../../../@keycloakify/login-ui/tools/clsx";
import { ErrorContainer } from "./ErrorContainer";

type Props = {
    className?: string;
    style?: CSSProperties;
    inputId: string;
    label: ReactNode;
    error?: ReactNode;
    required?: boolean;
    children: ReactNode;
};

export function Group(props: Props) {
    const { className, style, inputId, label, error, required = false, children } = props;

    const { kcClsx } = useKcClsx();

    return (
        <div className={clsx(kcClsx("kcFormGroupClass"), className)} style={style}>
            <div className={kcClsx("kcFormGroupLabelClass")}>
                <label htmlFor={inputId} className={kcClsx("kcFormLabelClass")}>
                    <span className={kcClsx("kcFormLabelTextClass")}>{label}</span>
                    {required && (
                        <span className={kcClsx("kcInputRequiredClass")} aria-hidden="true">
                            &#42;
                        </span>
                    )}
                </label>
            </div>

            {children}

            {error && <ErrorContainer>{error}</ErrorContainer>}
        </div>
    );
}
