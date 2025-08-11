/**
 * This file has been claimed for ownership from ../@keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/KcPage.tsx" --revert
 */

// WARNING: There is no reason to own this file.
// If you want to apply CSS level customization, own ./styleLevelCustomization.tsx instead
import type { ReactNode } from "react";
import { assert } from "tsafe/assert";
import { KcClsxProvider } from "../@keycloakify/login-ui/useKcClsx";
import { type KcContext, KcContextProvider } from "./KcContext.gen";
import { I18nProvider } from "./i18n";
import { useExclusiveAppInstanceEffect } from "../@keycloakify/login-ui/tools/useExclusiveAppInstanceEffect";
import { useStyleLevelCustomization } from "./styleLevelCustomization";
import { PageIndex } from "./pages/PageIndex.gen";

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    return (
        <KcContextProvider kcContext={kcContext}>
            <I18nProvider kcContext={kcContext}>
                <StyleLevelCustomization>
                    <PageIndex />
                </StyleLevelCustomization>
            </I18nProvider>
        </KcContextProvider>
    );
}

function StyleLevelCustomization(props: { children: ReactNode }) {
    const { children } = props;

    const { doUseDefaultCss, classes, loadCustomStylesheet, Provider } = useStyleLevelCustomization();

    useExclusiveAppInstanceEffect({
        effectId: "loadCustomStylesheet",
        isEnabled: loadCustomStylesheet !== undefined,
        effect: () => {
            assert(loadCustomStylesheet !== undefined);
            loadCustomStylesheet();
        }
    });

    return (
        <KcClsxProvider doUseDefaultCss={doUseDefaultCss} classes={classes}>
            {Provider === undefined ? children : <Provider>{children}</Provider>}
        </KcClsxProvider>
    );
}
