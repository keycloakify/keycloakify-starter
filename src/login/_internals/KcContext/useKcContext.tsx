import { createContext, useContext, type ReactNode } from "react";
import { assert, is } from "tsafe/assert";

export function createUseKcContext<KcContext extends { pageId: string }>() {
    const context = createContext<KcContext | undefined>(undefined);

    function useKcContext<PageId extends KcContext["pageId"] = string>(
        assertPageId?: PageId
    ): {
        kcContext: Extract<KcContext, { pageId: PageId }>;
    } {
        const kcContext = useContext(context);

        if (kcContext === undefined) {
            throw new Error("useKcContext must be used within a KcContextProvider");
        }

        if (assertPageId !== undefined && kcContext.pageId !== assertPageId) {
            throw new Error(
                `useKcContext: expected pageId "${assertPageId}", but got "${kcContext.pageId}"`
            );
        }

        assert(is<Extract<KcContext, { pageId: PageId }>>(kcContext));

        return { kcContext };
    }

    function KcContextProvider(props: { kcContext: KcContext; children: ReactNode }) {
        const { kcContext, children } = props;

        return <context.Provider value={kcContext}>{children}</context.Provider>;
    }

    return { useKcContext, KcContextProvider };
}