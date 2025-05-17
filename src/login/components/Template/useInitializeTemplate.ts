import { useEffect } from "react";
import { useInsertScriptTags } from "keycloakify/tools/useInsertScriptTags";
import { useInsertLinkTags } from "keycloakify/tools/useInsertLinkTags";
import { useKcContext } from "../../KcContext";
import { useKcClsx } from "../../_internals/useKcClsx";

export function useInitializeTemplate() {
    const { kcContext } = useKcContext();

    const { doUseDefaultCss } = useKcClsx();

    const { areAllStyleSheetsLoaded } = useInsertLinkTags({
        componentOrHookName: "Template",
        hrefs: !doUseDefaultCss
            ? []
            : [
                  `${kcContext.url.resourcesCommonPath}/node_modules/@patternfly/patternfly/patternfly.min.css`,
                  `${kcContext.url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
                  `${kcContext.url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
                  `${kcContext.url.resourcesCommonPath}/lib/pficon/pficon.css`,
                  `${kcContext.url.resourcesPath}/css/login.css`
              ]
    });

    const { insertScriptTags } = useInsertScriptTags({
        componentOrHookName: "Template",
        scriptTags: [
            // NOTE: The importmap is added in by the FTL script because it's too late to add it here.
            {
                type: "module",
                src: `${kcContext.url.resourcesPath}/js/menu-button-links.js`
            },
            ...(kcContext.scripts === undefined
                ? []
                : kcContext.scripts.map(src => ({
                      type: "text/javascript" as const,
                      src
                  }))),
            {
                type: "module",
                textContent: `
                    import { checkCookiesAndSetTimer } from "${kcContext.url.resourcesPath}/js/authChecker.js";

                    checkCookiesAndSetTimer("${kcContext.url.ssoLoginInOtherTabsUrl}");
                `
            }
        ]
    });

    useEffect(() => {
        if (areAllStyleSheetsLoaded) {
            insertScriptTags();
        }
    }, [areAllStyleSheetsLoaded]);

    return { isReadyToRender: areAllStyleSheetsLoaded };
}
