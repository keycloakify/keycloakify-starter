import type { ExtendKcContext } from "./_internals/KcContext";
import type { KcEnvName, ThemeName } from "../kc.gen";
import { createContext, useContext, type ReactNode } from "react";
import { assert, is } from "tsafe/assert";

export type KcContextExtension = {
    themeName: ThemeName;
    properties: Record<KcEnvName, string> & {};
    // NOTE: Here you can declare more properties to extend the KcContext
    // See: https://docs.keycloakify.dev/faq-and-help/some-values-you-need-are-missing-from-in-kccontext
};

export type KcContextExtensionPerPage = {};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;

function createUseKcContext<KcContext extends { pageId: string }>() {
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

export const { useKcContext, KcContextProvider } = createUseKcContext<KcContext>();
