import type { ReactNode } from "react";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";

type Props = {
    className?: string;
    children: ReactNode;
};

export function ErrorContainer(props: Props) {
    const { className, children } = props;

    const { kcClsx } = useKcClsx();

    return (
        <div className={className}>
            <div className={kcClsx("kcFormHelperTextClass")} aria-live="polite">
                <div className={kcClsx("kcInputHelperTextClass")}>
                    <div className={kcClsx("kcInputHelperTextItemClass", "kcError")}>
                        <span className={kcClsx("kcInputErrorMessageClass")}>{children}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
