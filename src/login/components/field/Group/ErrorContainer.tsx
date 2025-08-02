import { type ReactNode, useId } from "react";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";

type Props = {
    className?: string;
    children: ReactNode;
};

export function ErrorContainer(props: Props) {
    const { className, children } = props;

    const { kcClsx } = useKcClsx();

    const inputId = `input-error-container-${useId()}`;

    return (
        <div className={className} id={inputId}>
            <div className={kcClsx("kcFormHelperTextClass")} aria-live="polite">
                <div className={kcClsx("kcInputHelperTextClass")}>
                    <div
                        className={kcClsx("kcInputHelperTextItemClass", "kcError")}
                        id={inputId}
                    >
                        <span className={kcClsx("kcInputErrorMessageClass")}>{children}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
