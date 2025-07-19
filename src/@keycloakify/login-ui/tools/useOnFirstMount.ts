/* eslint-disable */

import { useEffect } from "react";
import { useConst } from "./useConst";
import { id } from "tsafe/id";

/** Callback is guaranteed to be call only once per component mount event in strict mode */
export function useOnFistMount(params: { effect: () => void; isEnabled?: boolean }) {
    const { effect, isEnabled } = params;

    const refHasCallbackBeenCalled = useConst(() => ({ current: id<boolean>(false) }));

    useEffect(() => {
        if (!isEnabled) {
            return;
        }

        if (refHasCallbackBeenCalled.current) {
            return;
        }

        effect();

        refHasCallbackBeenCalled.current = true;
    }, [isEnabled]);
}
