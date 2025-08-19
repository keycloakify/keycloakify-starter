import { useDefaultCss } from "./useDefaultCss";
import { useSetDocumentTitle } from "./useSetDocumentTitle";
import { useSetRootHtmlElementClassName } from "./useSetRootHtmlElementClassName";
import { useSetBodyClassName } from "./useSetBodyClassName";

export function useInitializeTemplate(params: { bodyClassName?: string }) {
    const { bodyClassName } = params;

    useSetDocumentTitle();
    useSetRootHtmlElementClassName();
    useSetBodyClassName({
        className: bodyClassName
    });
    const { areAllStyleSheetsLoaded } = useDefaultCss();

    return { isReadyToRender: areAllStyleSheetsLoaded };
}
