import { createContext, useContext, type ReactNode } from "react";

export type KcContext =
    | import("./pages/account/KcContext").KcContext
    | import("./pages/applications/KcContext").KcContext
    | import("./pages/federatedIdentity/KcContext").KcContext
    | import("./pages/log/KcContext").KcContext
    | import("./pages/password/KcContext").KcContext
    | import("./pages/sessions/KcContext").KcContext
    | import("./pages/totp/KcContext").KcContext;

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
