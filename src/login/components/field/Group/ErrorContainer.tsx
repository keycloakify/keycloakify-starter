import type { ReactNode } from "react";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";

type Props = {
    className?: string;
    name: string;
    children: ReactNode;
};

export function ErrorContainer(props: Props) {
    const { className, name, children } = props;

    const { kcClsx } = useKcClsx();

    return (
        <div className={className} id={`input-error-container-${name}`}>
            <div className={kcClsx("kcFormHelperTextClass")} aria-live="polite">
                <div className={kcClsx("kcInputHelperTextClass")}>
                    <div
                        className={kcClsx("kcInputHelperTextItemClass", "kcError")}
                        id={`input-error-${name}`}
                    >
                        <span className={kcClsx("kcInputErrorMessageClass")}>{children}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
