/* eslint-disable */

import { useReducer } from "react";
import { useExclusiveAppInstanceEffect } from "./useExclusiveAppInstanceEffect";

/**
 * NOTE: The component that use this hook can only be mounded once!
 * And can't rerender with different hrefs.
 * If it's mounted again the page will be reloaded.
 * This simulates the behavior of a server rendered page that imports css stylesheet in the head.
 */
export function useInsertLinkTags(params: { effectId: string; hrefs: string[] }) {
    const { hrefs, effectId } = params;

    const [areAllStyleSheetsLoaded, setAllStyleSheetsLoaded] = useReducer(
        () => true,
        hrefs.length === 0 ? true : false
    );

    useExclusiveAppInstanceEffect({
        isEnabled: hrefs.length !== 0,
        effectId: `useInsertLinkTags_${effectId}`,
        effect: async () => {
            let lastMountedHtmlElement: HTMLLinkElement | undefined = undefined;

            const prs: Promise<void>[] = [];

            for (const href of hrefs) {
                const htmlElement = document.createElement("link");

                prs.push(
                    new Promise<void>(resolve => htmlElement.addEventListener("load", () => resolve()))
                );

                htmlElement.rel = "stylesheet";

                htmlElement.href = href;

                if (lastMountedHtmlElement !== undefined) {
                    lastMountedHtmlElement.insertAdjacentElement("afterend", htmlElement);
                } else {
                    document.head.prepend(htmlElement);
                }

                lastMountedHtmlElement = htmlElement;
            }

            await Promise.all(prs);

            setAllStyleSheetsLoaded();
        }
    });

    return { areAllStyleSheetsLoaded };
}
