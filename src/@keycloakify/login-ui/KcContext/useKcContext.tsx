import { createContext, useContext, type ReactNode } from "react";

export function createUseKcContext<KcContext extends {}>() {
    const context = createContext<KcContext | undefined>(undefined);

    function useKcContext(): { kcContext: KcContext } {
        const kcContext = useContext(context);

        if (kcContext === undefined) {
            throw new Error("useKcContext must be used within a KcContextProvider");
        }

        return { kcContext };
    }

    function KcContextProvider(props: { kcContext: KcContext; children: ReactNode }) {
        const { kcContext, children } = props;

        return <context.Provider value={kcContext}>{children}</context.Provider>;
    }

    return { useKcContext, KcContextProvider };
}
