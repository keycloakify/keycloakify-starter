import { createContext, useContext, type ReactNode } from "react";

export type KcContext =
    | import("./pages/login/KcContext").KcContext
    | import("./pages/register/KcContext").KcContext;

const context = createContext<KcContext | undefined>(undefined);

export function useKcContext(): { kcContext: KcContext } {
    const kcContext = useContext(context);

    if (kcContext === undefined) {
        throw new Error("useKcContext must be used within a KcContextProvider");
    }

    return { kcContext };
}

export function KcContextProvider(props: { kcContext: KcContext; children: ReactNode }) {
    const { kcContext, children } = props;

    return <context.Provider value={kcContext}>{children}</context.Provider>;
}
