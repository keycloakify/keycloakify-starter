
import { useEffect } from "react";
import { useInitializeDarkMode } from "./useInitializeDarkMode";
import { useDefaultCss } from "./useDefaultCss";
import { useDefaultScripts } from "./useDefaultScripts";
import { useSetDocumentTitle } from "./useSetDocumentTitle";
import { useSetRootHtmlElementClassName } from "./useSetRootHtmlElementClassName";
import { useSetBodyClassName } from "./useSetBodyClassName";
import { useSetBodyPageIdAttribute } from "./useSetBodyPageIdAttribute";
import { useSetBodyId } from "./useSetBodyId";

export function useInitializeTemplate() {

    useInitializeDarkMode();
    useSetDocumentTitle();
    useSetRootHtmlElementClassName();
    useSetBodyClassName();
    useSetBodyPageIdAttribute();
    useSetBodyId();
    const { areAllStyleSheetsLoaded } = useDefaultCss();
    const { insertScriptTags } = useDefaultScripts();

    useEffect(() => {
        if (areAllStyleSheetsLoaded) {
            insertScriptTags();
        }
    }, [areAllStyleSheetsLoaded]);

    return { isReadyToRender: areAllStyleSheetsLoaded };
}
