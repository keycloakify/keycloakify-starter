import { useContext, createContext, useMemo, type ReactNode } from "react";
import { getKcClsx, type KcClsx, type ClassKey } from "./core/kcClsx";

export type { ClassKey } from "./core/kcClsx";

const context = createContext<{ kcClsx: KcClsx; doUseDefaultCss: boolean } | undefined>(undefined);

export function KcClsxProvider(props: {
    doUseDefaultCss: boolean;
    classes: Partial<Record<ClassKey, string>> | undefined;
    children: ReactNode;
}) {
    const { doUseDefaultCss, classes, children } = props;

    const contextValue = useMemo(() => {
        const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

        return { kcClsx, doUseDefaultCss };
    }, [classes, doUseDefaultCss]);

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
