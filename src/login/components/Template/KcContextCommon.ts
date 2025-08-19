import { id } from "tsafe/id";
import { assert, type Equals } from "tsafe/assert";
import type { ThemeName, KcEnvName } from "../../../kc.gen";

export type KcContextCommon = {
    themeVersion: string;
    properties: Record<KcEnvName, string>;

    // NEW:
    darkMode?: boolean;
    authenticationSession?: {
        authSessionIdHash: string;
    };
    social?: Social;

    keycloakifyVersion: string;
    themeType: "login";
    themeName: ThemeName;
    url: {
        loginAction: string;
        loginRestartFlowUrl: string;
        loginUrl: string;
        ssoLoginInOtherTabsUrl: string;
    };
    realm: {
        // NEW
        loginWithEmailAllowed?: boolean;

        name: string;
        displayName: string;
        displayNameHtml: string;
        internationalizationEnabled: boolean;
        registrationEmailAsUsername: boolean;
    };
    /** Undefined if !realm.internationalizationEnabled */
    locale?: {
        supported: {
            url: string;
            label: string;
            languageTag: string;
        }[];
        currentLanguageTag: string;
        rtl?: boolean;
    };
    auth?: {
        showUsername?: boolean;
        showResetCredentials?: boolean;
        showTryAnotherWayLink?: boolean;
        attemptedUsername?: string;
    };
    scripts?: string[];
    message?: {
        type: "success" | "warning" | "error" | "info";
        summary: string;
    };
    client: {
        clientId: string;
        name?: string;
        description?: string;
        attributes: Record<string, string>;
    };
    isAppInitiatedAction?: boolean;
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
        existsError: (fieldName: string, ...otherFiledNames: string[]) => boolean;
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

        getFirstError: (...fieldNames: string[]) => string;
    };
    "x-keycloakify": {
        messages: Record<string, string>;
    };
} & ConditionalUIData;

type ConditionalUIData =
    | {
          enableWebAuthnConditionalUI: true;
          isUserIdentified: "true" | "false";
          challenge: string;
          userVerification: string;
          rpId: string;
          createTimeout: number | string;
      }
    | {
          enableWebAuthnConditionalUI?: false;
      };

export type Social = {
    providers?: {
        loginUrl: string;
        alias: string;
        providerId: string;
        displayName: string;
        iconClasses?: string;
    }[];
};

export type UserProfile = {
    attributesByName: Record<string, Attribute>;
    html5DataAnnotations?: Record<string, string>;
};

export type Attribute = {
    name: string;
    displayName?: string;
    required: boolean;
    value?: string;
    values?: string[];
    group?: {
        annotations: Record<string, string>;
        html5DataAnnotations: Record<string, string>;
        displayHeader?: string;
        name: string;
        displayDescription?: string;
    };
    html5DataAnnotations?: {
        kcNumberFormat?: string;
        kcNumberUnFormat?: string;
    };
    readOnly: boolean;
    validators: Validators;
    annotations: {
        inputType?: string;
        inputTypeSize?: `${number}` | number;
        inputOptionsFromValidation?: string;
        inputOptionLabels?: Record<string, string | undefined>;
        inputOptionLabelsI18nPrefix?: string;
        inputTypeCols?: `${number}` | number;
        inputTypeRows?: `${number}` | number;
        inputTypeMaxlength?: `${number}` | number;
        inputHelperTextBefore?: string;
        inputHelperTextAfter?: string;
        inputTypePlaceholder?: string;
        inputTypePattern?: string;
        inputTypeMinlength?: `${number}` | number;
        inputTypeMax?: string;
        inputTypeMin?: string;
        inputTypeStep?: string;
    };
    multivalued?: boolean;
    autocomplete?:
        | "on"
        | "off"
        | "name"
        | "honorific-prefix"
        | "given-name"
        | "additional-name"
        | "family-name"
        | "honorific-suffix"
        | "nickname"
        | "email"
        | "username"
        | "new-password"
        | "current-password"
        | "one-time-code"
        | "organization-title"
        | "organization"
        | "street-address"
        | "address-line1"
        | "address-line2"
        | "address-line3"
        | "address-level4"
        | "address-level3"
        | "address-level2"
        | "address-level1"
        | "country"
        | "country-name"
        | "postal-code"
        | "cc-name"
        | "cc-given-name"
        | "cc-additional-name"
        | "cc-family-name"
        | "cc-number"
        | "cc-exp"
        | "cc-exp-month"
        | "cc-exp-year"
        | "cc-csc"
        | "cc-type"
        | "transaction-currency"
        | "transaction-amount"
        | "language"
        | "bday"
        | "bday-day"
        | "bday-month"
        | "bday-year"
        | "sex"
        | "tel"
        | "tel-country-code"
        | "tel-national"
        | "tel-area-code"
        | "tel-local"
        | "tel-extension"
        | "impp"
        | "url"
        | "photo";
};

export type Validators = {
    length?: Validators.DoIgnoreEmpty & Validators.Range;
    integer?: Validators.DoIgnoreEmpty & Validators.Range;
    email?: Validators.DoIgnoreEmpty;
    pattern?: Validators.DoIgnoreEmpty & Validators.ErrorMessage & { pattern: string };
    options?: Validators.Options;
    multivalued?: Validators.DoIgnoreEmpty & Validators.Range;
    // NOTE: Following are the validators for which we don't implement client side validation yet
    // or for which the validation can't be performed on the client side.
    /*
    double?: Validators.DoIgnoreEmpty & Validators.Range;
    "up-immutable-attribute"?: {};
    "up-attribute-required-by-metadata-value"?: {};
    "up-username-has-value"?: {};
    "up-duplicate-username"?: {};
    "up-username-mutation"?: {};
    "up-email-exists-as-username"?: {};
    "up-blank-attribute-value"?: Validators.ErrorMessage & { "fail-on-null": boolean; };
    "up-duplicate-email"?: {};
    "local-date"?: Validators.DoIgnoreEmpty;
    "person-name-prohibited-characters"?: Validators.DoIgnoreEmpty & Validators.ErrorMessage;
    uri?: Validators.DoIgnoreEmpty;
    "username-prohibited-characters"?: Validators.DoIgnoreEmpty & Validators.ErrorMessage;
    */
};

export declare namespace Validators {
    export type DoIgnoreEmpty = {
        "ignore.empty.value"?: boolean;
    };

    export type ErrorMessage = {
        "error-message"?: string;
    };

    export type Range = {
        min?: `${number}` | number;
        max?: `${number}` | number;
    };
    export type Options = {
        options: string[];
    };
}

export type PasswordPolicies = {
    /** The minimum length of the password */
    length?: number;
    /** The maximum length of the password */
    maxLength?: number;
    /** The minimum number of digits required in the password */
    digits?: number;
    /** The minimum number of lowercase characters required in the password */
    lowerCase?: number;
    /** The minimum number of uppercase characters required in the password */
    upperCase?: number;
    /** The minimum number of special characters required in the password */
    specialChars?: number;
    /** Whether the password can be the username */
    notUsername?: boolean;
    /** Whether the password can be the email address */
    notEmail?: boolean;
};

export const kcContextCommonMock: KcContextCommon = {
    themeVersion: "0.0.0",
    keycloakifyVersion: "0.0.0",
    themeType: "login",
    themeName: "my-theme-name",
    url: {
        loginAction: "#",
        loginRestartFlowUrl: "#",
        loginUrl: "#",
        ssoLoginInOtherTabsUrl: "#"
    },
    realm: {
        name: "myrealm",
        displayName: "myrealm",
        displayNameHtml: "myrealm",
        internationalizationEnabled: true,
        registrationEmailAsUsername: false
    },
    messagesPerField: {
        get: () => "",
        existsError: () => false,
        printIfExists: function <T>(fieldName: string, text: T) {
            return this.get(fieldName) !== "" ? text : undefined;
        },
        exists: function (fieldName) {
            return this.get(fieldName) !== "";
        },
        getFirstError: function (...fieldNames) {
            for (const fieldName of fieldNames) {
                if (this.existsError(fieldName)) {
                    return this.get(fieldName);
                }
            }
            return "";
        }
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
                ["el", "Ελληνικά"],
                ["fa", "فارسی"],
                ["fi", "Suomi"],
                ["hu", "Magyar"],
                ["ka", "ქართული"],
                ["lv", "Latviešu"],
                ["pt", "Português"],
                ["th", "ไทย"],
                ["uk", "Українська"],
                ["zh-TW", "中文繁體"]
                /* spell-checker: enable */
            ] as const
        ).map(([languageTag, label]) => {
            {
                type Got = typeof languageTag;
                type Expected =
                    import("../../../@keycloakify/login-ui/core/i18n/messages_defaultSet/types").LanguageTag;

                type Missing = Exclude<Expected, Got>;
                type Unexpected = Exclude<Got, Expected>;

                assert<Equals<Missing, never>>();
                assert<Equals<Unexpected, never>>();
            }

            return {
                languageTag,
                label,
                url: "https://gist.github.com/garronej/52baaca1bb925f2296ab32741e062b8e"
            } as const;
        }),

        currentLanguageTag: "en"
    },
    auth: {
        showUsername: false,
        showResetCredentials: false,
        showTryAnotherWayLink: false
    },
    client: {
        clientId: "myApp",
        attributes: {}
    },
    scripts: [],
    isAppInitiatedAction: false,
    properties: {},
    "x-keycloakify": {
        messages: {}
    }
};

export const mockAttributesByName = Object.fromEntries(
    id<Attribute[]>([
        {
            validators: {
                length: {
                    "ignore.empty.value": true,
                    min: "3",
                    max: "255"
                }
            },
            displayName: "${username}",
            annotations: {},
            required: true,
            autocomplete: "username",
            readOnly: false,
            name: "username"
        },
        {
            validators: {
                length: {
                    max: "255",
                    "ignore.empty.value": true
                },
                email: {
                    "ignore.empty.value": true
                },
                pattern: {
                    "ignore.empty.value": true,
                    pattern: "gmail\\.com$"
                }
            },
            displayName: "${email}",
            annotations: {},
            required: true,
            autocomplete: "email",
            readOnly: false,
            name: "email"
        },
        {
            validators: {
                length: {
                    max: "255",
                    "ignore.empty.value": true
                }
            },
            displayName: "${firstName}",
            annotations: {},
            required: true,
            readOnly: false,
            name: "firstName"
        },
        {
            validators: {
                length: {
                    max: "255",
                    "ignore.empty.value": true
                }
            },
            displayName: "${lastName}",
            annotations: {},
            required: true,
            readOnly: false,
            name: "lastName"
        }
    ]).map(attribute => [attribute.name, attribute])
);
