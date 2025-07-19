/* eslint-disable */

import { useReducer, useCallback } from "react";
import { assert } from "tsafe/assert";
import { useExclusiveAppInstanceEffect } from "./useExclusiveAppInstanceEffect";

export type ScriptTag = ScriptTag.TextContent | ScriptTag.Src;

export namespace ScriptTag {
    type Common = {
        type: "text/javascript" | "module";
    };

    export type TextContent = Common & {
        textContent: string | (() => string);
    };
    export type Src = Common & {
        src: string;
    };
}

export function useInsertScriptTags(params: { effectId: string; scriptTags: ScriptTag[] }) {
    const { scriptTags, effectId } = params;

    const [isInsertScriptTagsCalled, setIsInsertScriptTagsCalledToTrue] = useReducer(() => true, false);

    useExclusiveAppInstanceEffect({
        isEnabled: scriptTags.length !== 0 && isInsertScriptTagsCalled,
        effectId: `useInsertScriptTags_${effectId}`,
        effect: () => {
            for (const scriptTag of scriptTags) {
                // NOTE: Avoid loading same script twice. (Like jQuery for example)
                {
                    const scripts = document.getElementsByTagName("script");
                    for (let i = 0; i < scripts.length; i++) {
                        const script = scripts[i];
                        if ("textContent" in scriptTag) {
                            const textContent =
                                typeof scriptTag.textContent === "function"
                                    ? scriptTag.textContent()
                                    : scriptTag.textContent;

                            if (script.textContent === textContent) {
                                return;
                            }
                            continue;
                        }
                        if ("src" in scriptTag) {
                            if (script.getAttribute("src") === scriptTag.src) {
                                return;
                            }
                            continue;
                        }
                        assert(false);
                    }
                }

                const htmlElement = document.createElement("script");

                htmlElement.type = scriptTag.type;

                (() => {
                    if ("textContent" in scriptTag) {
                        const textContent =
                            typeof scriptTag.textContent === "function"
                                ? scriptTag.textContent()
                                : scriptTag.textContent;

                        htmlElement.textContent = textContent;
                        return;
                    }
                    if ("src" in scriptTag) {
                        htmlElement.src = scriptTag.src;
                        return;
                    }
                    assert(false);
                })();

                document.head.appendChild(htmlElement);
            }
        }
    });

    const insertScriptTags = useCallback(() => {
        setIsInsertScriptTagsCalledToTrue();
    }, []);

    return { insertScriptTags };
}
