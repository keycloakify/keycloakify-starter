import { assert, type Equals } from "tsafe/assert";
import { type ThemeName, type KcEnvName, themeNames } from "../../../kc.gen";

export type KcContextCommon = {
    themeName: ThemeName;
    themeVersion: string;
    properties: Record<KcEnvName, string>;
    keycloakifyVersion: string;
    themeType: "account";
    locale?: {
        supported: {
            url: string;
            label: string;
            languageTag: string;
        }[];
        currentLanguageTag: string;
    };
    url: {
        accountUrl: string;
        passwordUrl: string;
        totpUrl: string;
        socialUrl: string;
        sessionsUrl: string;
        applicationsUrl: string;
        logUrl: string;
        logoutUrl: string;
        resourceUrl: string;
        /** @deprecated, not present in recent keycloak version apparently, use kcContext.referrer instead */
        referrerURI?: string;
        getLogoutUrl: () => string;
    };
    features: {
        passwordUpdateSupported: boolean;
        identityFederation: boolean;
        log: boolean;
        authorization: boolean;
    };
    realm: {
        internationalizationEnabled: boolean;
        userManagedAccessAllowed: boolean;
    };
    // Present only if redirected to account page with ?referrer=xxx&referrer_uri=http...
    message?: {
        type: "success" | "warning" | "error" | "info";
        summary: string;
    };
    referrer?: {
        url: string; // The url of the App
        name: string; // Client id
    };
    messagesPerField: {
        /**
         * Return text if message for given field exists. Useful eg. to add css styles for fields with message.
         *
         * @param fieldName to check for
         * @param text to return
         * @return text if message exists for given field, else undefined
         */
        printIfExists: <T extends string>(fieldName: string, text: T) => T | undefined;
        /**
         * Check if exists error message for given fields
         *
         * @param fields
         * @return boolean
         */
        existsError: (fieldName: string) => boolean;
        /**
         * Get message for given field.
         *
         * @param fieldName
         * @return message text or empty string
         */
        get: (fieldName: string) => string;
        /**
         * Check if message for given field exists
         *
         * @param field
         * @return boolean
         */
        exists: (fieldName: string) => boolean;
    };
    account: {
        email?: string;
        firstName: string;
        lastName?: string;
        username?: string;
    };
    "x-keycloakify": {
        messages: Record<string, string>;
    };
};

export const kcContextCommonMock: KcContextCommon = {
    themeVersion: "0.0.0",
    keycloakifyVersion: "0.0.0",
    themeType: "account",
    themeName: themeNames[0],
    url: {
        resourceUrl: "#",
        accountUrl: "#",
        applicationsUrl: "#",
        logoutUrl: "#",
        getLogoutUrl: () => "#",
        logUrl: "#",
        passwordUrl: "#",
        sessionsUrl: "#",
        socialUrl: "#",
        totpUrl: "#"
    },
    realm: {
        internationalizationEnabled: true,
        userManagedAccessAllowed: true
    },
    messagesPerField: {
        printIfExists: () => {
            return undefined;
        },
        existsError: () => false,
        get: key => `Fake error for ${key}`,
        exists: () => false
    },
    locale: {
        supported: (
            [
                /* spell-checker: disable */
                ["de", "Deutsch"],
                ["no", "Norsk"],
                ["ru", "Русский"],
                ["sv", "Svenska"],
                ["pt-BR", "Português (Brasil)"],
                ["lt", "Lietuvių"],
                ["en", "English"],
                ["it", "Italiano"],
                ["fr", "Français"],
                ["zh-CN", "中文简体"],
                ["es", "Español"],
                ["cs", "Čeština"],
                ["ja", "日本語"],
                ["sk", "Slovenčina"],
                ["pl", "Polski"],
                ["ca", "Català"],
                ["nl", "Nederlands"],
                ["tr", "Türkçe"],
                ["ar", "العربية"],
                ["da", "Dansk"],
                ["fi", "Suomi"],
                ["hu", "Magyar"],
                ["lv", "Latviešu"]
                /* spell-checker: enable */
            ] as const
        ).map(([languageTag, label]) => {
            {
                type Got = typeof languageTag;
                type Expected =
                    import("../../../@keycloakify/account-multi-page-ui/core/i18n/messages_defaultSet/types").LanguageTag;

                type Missing = Exclude<Expected, Got>;
                type Unexpected = Exclude<Got, Expected>;

                assert<Equals<Missing, never>>;
                assert<Equals<Unexpected, never>>;
            }

            return {
                languageTag,
                label,
                url: "https://gist.github.com/garronej/52baaca1bb925f2296ab32741e062b8e"
            } as const;
        }),

        currentLanguageTag: "en"
    },
    features: {
        authorization: true,
        identityFederation: true,
        log: true,
        passwordUpdateSupported: true
    },
    referrer: undefined,
    account: {
        firstName: "john",
        lastName: "doe",
        email: "john.doe@code.gouv.fr",
        username: "doe_j"
    },
    properties: {},
    "x-keycloakify": {
        messages: {}
    }
};
