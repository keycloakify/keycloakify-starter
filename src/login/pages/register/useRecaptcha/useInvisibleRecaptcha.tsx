import { useLayoutEffect } from "react";
import { assert } from "tsafe/assert";
import { useKcContext } from "../../../KcContext";

type Recaptcha = {
    submitButtonProps: {
        className: string;
        "data-sitekey": string;
        "data-callback": string;
        "data-action": string | undefined;
    };
};

const RECAPTCHA_CALLBACK_FUNCTION_NAME = "onRecaptchaSuccess";

export function useInvisibleRecaptchaIfEnabled(): Recaptcha | undefined {

    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "register.ftl");

    const isEnabled = kcContext.recaptchaRequired && !kcContext.recaptchaVisible;

    useLayoutEffect(() => {
        if (!isEnabled) {
            return;
        }

        Object.assign(window, {
            [RECAPTCHA_CALLBACK_FUNCTION_NAME]: () => {
                const button = document.querySelector<HTMLButtonElement>("button.g-recaptcha");

                assert(button !== null);

                const form = button.closest("form");

                assert(form !== null);

                form.requestSubmit();
            }
        });

        return () => {
            //@ts-expect-error: We know what we are doing
            delete window[RECAPTCHA_CALLBACK_FUNCTION_NAME];
        };
    }, []);

    if( !isEnabled ){
        return undefined;
    }

    assert(kcContext.recaptchaSiteKey !== undefined);

    return {
        submitButtonProps: {
            className: "g-recaptcha",
            "data-sitekey": kcContext.recaptchaSiteKey,
            "data-callback": RECAPTCHA_CALLBACK_FUNCTION_NAME,
            "data-action": kcContext.recaptchaAction
        }
    };
}
