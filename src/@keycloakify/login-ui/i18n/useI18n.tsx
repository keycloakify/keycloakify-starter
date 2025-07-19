import type { JSX } from "../tools/JSX";
import { useEffect, useState, createContext, useContext } from "react";
import { kcSanitize } from "../core/kcSanitize";
import { createGetI18n, type KcContextLike } from "../core/i18n/getI18n";
import type { GenericI18n as GenericI18n_noJsx } from "../core/i18n/GenericI18n";
import { Reflect } from "tsafe/Reflect";
import type { GenericI18n } from "./GenericI18n";
import type {
    LanguageTag as LanguageTag_defaultSet,
    MessageKey as MessageKey_defaultSet
} from "../core/i18n/messages_defaultSet/types";

export type ReturnTypeOfCreateUseI18n<
    MessageKey_themeDefined extends string,
    LanguageTag_notInDefaultSet extends string
> = {
    useI18n: () => GenericI18n<
        MessageKey_defaultSet | MessageKey_themeDefined,
        LanguageTag_defaultSet | LanguageTag_notInDefaultSet
    >;
    I18nProvider: (props: { kcContext: KcContextLike; children: JSX.Element }) => JSX.Element;
    ofTypeI18n: GenericI18n<
        MessageKey_defaultSet | MessageKey_themeDefined,
        LanguageTag_defaultSet | LanguageTag_notInDefaultSet
    >;
};

export { KcContextLike };

// eslint-disable-next-line react-refresh/only-export-components
export function createUseI18n<
    ThemeName extends string = string,
    MessageKey_themeDefined extends string = never,
    LanguageTag_notInDefaultSet extends string = never
>(params: {
    extraLanguageTranslations: {
        [languageTag in LanguageTag_notInDefaultSet]: {
            label: string;
            getMessages: () => Promise<{ default: Record<MessageKey_defaultSet, string> }>;
        };
    };
    messagesByLanguageTag_themeDefined: Partial<{
        [languageTag in LanguageTag_defaultSet | LanguageTag_notInDefaultSet]: {
            [key in MessageKey_themeDefined]: string | Record<ThemeName, string>;
        };
    }>;
}): ReturnTypeOfCreateUseI18n<MessageKey_themeDefined, LanguageTag_notInDefaultSet> {
    const { extraLanguageTranslations, messagesByLanguageTag_themeDefined } = params;

    type LanguageTag = LanguageTag_defaultSet | LanguageTag_notInDefaultSet;

    type MessageKey = MessageKey_defaultSet | MessageKey_themeDefined;

    type I18n = GenericI18n<MessageKey, LanguageTag>;

    type Result = { i18n: I18n };

    const { withJsx } = (() => {
        const cache = new WeakMap<
            GenericI18n_noJsx<MessageKey, LanguageTag>,
            GenericI18n<MessageKey, LanguageTag>
        >();

        function renderHtmlString(params: { htmlString: string; msgKey: string }): JSX.Element {
            const { htmlString, msgKey } = params;

            const htmlString_sanitized = kcSanitize(htmlString);

            const Element = (() => {
                if (htmlString_sanitized.includes("<") && htmlString_sanitized.includes(">")) {
                    for (const tagName of ["div", "section", "article", "ul", "ol"]) {
                        if (htmlString_sanitized.includes(`<${tagName}`)) {
                            return "div";
                        }
                    }
                }
                return "span";
            })();

            return (
                <Element
                    data-kc-msg={msgKey}
                    dangerouslySetInnerHTML={{
                        __html: htmlString_sanitized
                    }}
                />
            );
        }

        function withJsx(i18n_noJsx: GenericI18n_noJsx<MessageKey, LanguageTag>): I18n {
            use_cache: {
                const i18n = cache.get(i18n_noJsx);

                if (i18n === undefined) {
                    break use_cache;
                }

                return i18n;
            }

            const i18n: I18n = {
                ...i18n_noJsx,
                msg: (msgKey, ...args) =>
                    renderHtmlString({ htmlString: i18n_noJsx.msgStr(msgKey, ...args), msgKey }),
                advancedMsg: (msgKey, ...args) =>
                    renderHtmlString({ htmlString: i18n_noJsx.advancedMsgStr(msgKey, ...args), msgKey })
            };

            cache.set(i18n_noJsx, i18n);

            return i18n;
        }

        return { withJsx };
    })();

    add_style: {
        const attributeName = "data-kc-msg";

        // Check if already exists in head
        if (document.querySelector(`style[${attributeName}]`) !== null) {
            break add_style;
        }

        const styleElement = document.createElement("style");
        styleElement.attributes.setNamedItem(document.createAttribute(attributeName));
        styleElement.textContent = `div[${attributeName}] { display: inline-block; }`;
        document.head.prepend(styleElement);
    }

    const { getI18n } = createGetI18n({ extraLanguageTranslations, messagesByLanguageTag_themeDefined });

    function useI18n_internal(params: { kcContext: KcContextLike }): Result {
        const { kcContext } = params;

        const { i18n, prI18n_currentLanguage } = getI18n({ kcContext });

        const [i18n_toReturn, setI18n_toReturn] = useState<I18n>(withJsx(i18n));

        useEffect(() => {
            let isActive = true;

            prI18n_currentLanguage?.then(i18n => {
                if (!isActive) {
                    return;
                }

                setI18n_toReturn(withJsx(i18n));
            });

            return () => {
                isActive = false;
            };
        }, []);

        return { i18n: i18n_toReturn };
    }

    const context = createContext<I18n | undefined>(undefined);

    function I18nProvider(props: { kcContext: KcContextLike; children: JSX.Element }) {
        const { kcContext, children } = props;
        const { i18n } = useI18n_internal({ kcContext });

        return <context.Provider value={i18n}>{children}</context.Provider>;
    }

    function useI18n() {
        const i18n = useContext(context);

        if (i18n === undefined) {
            throw new Error("useI18n must be used within an I18nProvider");
        }

        return i18n;
    }

    return { I18nProvider, useI18n, ofTypeI18n: Reflect<I18n>() };
}
