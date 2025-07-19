import { useOnFistMount } from "./useOnFirstMount";

// NOTE: This context has to be shared in storybook between the login
// and potential multi page account theme.
const GLOBAL_CONTEXT_KEY = "__keycloakify.useExclusiveAppInstanceEffect.globalContext";

declare global {
    interface Window {
        [GLOBAL_CONTEXT_KEY]: {
            alreadyRanEffectId: Set<string>;
        };
    }
}

window[GLOBAL_CONTEXT_KEY] ??= {
    alreadyRanEffectId: new Set()
};

const globalContext = window[GLOBAL_CONTEXT_KEY];

const { alreadyRanEffectId } = globalContext;

export function useExclusiveAppInstanceEffect(params: {
    isEnabled?: boolean;
    effectId: string;
    effect: () => void;
}) {
    const { effectId, effect, isEnabled = true } = params;

    useOnFistMount({
        // NOTE: Why `|| alreadyRanEffectId.has(effectId)`?
        // Because if we had already an effect with the same id it means that an effect has been ran
        // and it must be cleared, we might have some stylesheet present on the document for example.
        // it happen when one Template need to load CSS or Scripts and the other does not.
        isEnabled: isEnabled || alreadyRanEffectId.has(effectId),
        effect: () => {
            const isAlreadyRan = alreadyRanEffectId.has(effectId);

            if (isAlreadyRan) {
                // NOTE: Special case for Storybook, we want to avoid infinite reload loop.
                if (new URL(window.location.href).searchParams.get("viewMode") === "docs") {
                    return;
                }

                window.location.reload();
                return;
            }

            alreadyRanEffectId.add(effectId);

            effect();
        }
    });
}
