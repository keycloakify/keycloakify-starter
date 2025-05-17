import { useContext, createContext, useMemo, type ReactNode } from "react";
import { getKcClsx, type KcClsx, type ClassKey } from "./core/kcClsx";

const context = createContext<{ kcClsx: KcClsx; doUseDefaultCss: boolean } | undefined>(
    undefined
);

export function KcClsxProvider(props: {
    doUseDefaultCss: boolean;
    classes: Partial<Record<ClassKey, string>> | undefined;
    children: ReactNode;
}) {
    const { doUseDefaultCss, classes, children } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const contextValue = useMemo(
        () => ({ kcClsx, doUseDefaultCss }),
        [kcClsx, doUseDefaultCss]
    );

    return <context.Provider value={contextValue}>{children}</context.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useKcClsx() {
    const contextValue = useContext(context);

    if (contextValue === undefined) {
        throw new Error("useKcClsx must be used within a KcClsxProvider");
    }

    return contextValue;
}
