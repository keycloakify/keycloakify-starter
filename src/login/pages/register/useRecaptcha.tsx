import { type ReactNode, useLayoutEffect } from "react";
import { useKcContext } from "../../KcContext";
import { assert } from "tsafe/assert";

type Recaptcha = {
    recaptchaPlaceholder: ReactNode;
    submitButtonProps: {
        className: string;
        "data-sitekey": string;
        "data-callback": string;
        "data-action": string | undefined;
    };
};

const RECAPTCHA_CALLBACK_FUNCTION_NAME = "onSubmitRecaptcha";

export function useRecaptchaIfEnabled(): Recaptcha | undefined {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "register.ftl");

    if (!kcContext.recaptchaRequired) {
        return undefined;
    }

    // NOTE: This variable name is misleading, what it mean is
    // "Is Recaptcha handled manually and setup somewhere else"
    // Unless you have a Java extension that set this to true manually
    // you can ignore, it will always be false.
    if (kcContext.recaptchaVisible === true) {
        return undefined;
    }

    assert(kcContext.recaptchaSiteKey !== undefined);

    return {
        recaptchaPlaceholder: <RecaptchaPlaceholder />,
        submitButtonProps: {
            className: "g-recaptcha",
            "data-sitekey": kcContext.recaptchaSiteKey,
            "data-callback": RECAPTCHA_CALLBACK_FUNCTION_NAME,
            "data-action": kcContext.recaptchaAction
        }
    };
}

function RecaptchaPlaceholder() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "register.ftl");

    useLayoutEffect(() => {
        function callback() {
            const button = document.querySelector<HTMLButtonElement>("button.g-recaptcha");

            assert(button !== null);

            const form = button.closest("form");

            assert(form !== null);

            form.requestSubmit();
        }
        //@ts-expect-error
        window[RECAPTCHA_CALLBACK_FUNCTION_NAME] = callback;

        return () => {
            //@ts-expect-error
            delete window[RECAPTCHA_CALLBACK_FUNCTION_NAME];
        };
    }, []);

    return (
        <div
            className="g-recaptcha"
            data-size="compact"
            data-sitekey={kcContext.recaptchaSiteKey}
            data-action={kcContext.recaptchaAction}
        />
    );
}
