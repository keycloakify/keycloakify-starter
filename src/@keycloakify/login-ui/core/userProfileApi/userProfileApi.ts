/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../tools/Array.prototype.every";
import { assert, type Equals } from "tsafe/assert";
import type { KcContextLike as KcContextLike_i18n } from "../i18n/getI18n";
import type { MessageKey as MessageKey_defaultSet } from "../i18n/messages_defaultSet/types";
import { emailRegexp } from "../../tools/emailRegExp";
import { formatNumber, unFormatNumberOnSubmit } from "./kcNumberUnFormat";
import { structuredCloneButFunctions } from "../../tools/structuredCloneButFunctions";
import { id } from "tsafe/id";

export type FormFieldError = {
    advancedMsgArgs: readonly [string, ...string[]];
    source: FormFieldError.Source;
    fieldIndex: number | undefined;
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

// @keycloakify: remove start
{
    type Actual = Validators;
    type Expected = import("../../../../login/components/Template/KcContextCommon").Validators;
    assert<Equals<Actual, Expected>>;
}
// @keycloakify: remove end

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

export namespace FormFieldError {
    export type Source = Source.Validator | Source.Other;

    export namespace Source {
        export type Validator = {
            type: "validator";
            name: keyof Validators;
        };
        export type Other = {
            type: "server" | "required field";
        };
    }
}

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

// @keycloakify: remove start
{
    type Actual = Attribute;
    type Expected = import("../../../../login/components/Template/KcContextCommon").Attribute;
    assert<Equals<Actual, Expected>>;
}
// @keycloakify: remove end

export type FormFieldState = {
    attribute: Attribute;
    displayableErrors: FormFieldError[];
    valueOrValues: string | string[];
};

export type FormState = {
    areAllChecksPassed: boolean;
    formFieldStates: FormFieldState[];
};

export type FormAction =
    | {
          action: "update";
          name: string;
          valueOrValues: string | string[];
          /** Default false */
          displayErrorsImmediately?: boolean;
      }
    | {
          action: "focus lost";
          name: string;
          fieldIndex: number | undefined;
      };

export type KcContextLike = KcContextLike_i18n &
    KcContextLike_useGetErrors & {
        profile: {
            attributesByName: Record<string, Attribute>;
            html5DataAnnotations?: Record<string, string>;
        };
        realm: { registrationEmailAsUsername: boolean };
    };

type KcContextLike_useGetErrors = KcContextLike_i18n & {
    messagesPerField: {
        existsError: (fieldName: string, ...otherFiledNames: string[]) => boolean;
        get: (fieldName: string) => string;
    };
};

// @keycloakify: remove start
{
    type KcContext = import("../../../../login/KcContext.gen").KcContext;
    assert<Extract<KcContext, { pageId: "register.ftl" }> extends KcContextLike ? true : false>();
}
// @keycloakify: remove end

export type UserProfileApi = {
    getFormState: () => FormState;
    subscribeToFormState: (callback: () => void) => { unsubscribe: () => void };
    dispatchFormAction: (action: FormAction) => void;
};

const cachedUserProfileApiByKcContext = new WeakMap<KcContextLike, UserProfileApi>();

export type ParamsOfGetUserProfileApi = {
    kcContext: KcContextLike;
};

export function getUserProfileApi(params: ParamsOfGetUserProfileApi): UserProfileApi {
    const { kcContext } = params;

    use_cache: {
        const userProfileApi_cache = cachedUserProfileApiByKcContext.get(kcContext);

        if (userProfileApi_cache === undefined) {
            break use_cache;
        }

        return userProfileApi_cache;
    }

    const userProfileApi = getUserProfileApi_noCache({ kcContext });

    cachedUserProfileApiByKcContext.set(kcContext, userProfileApi);

    return userProfileApi;
}

namespace internal {
    export type FormFieldState = {
        attribute: Attribute;
        errors: FormFieldError[];
        hasLostFocusAtLeastOnce: boolean | boolean[];
        valueOrValues: string | string[];
    };

    export type State = {
        formFieldStates: FormFieldState[];
    };
}

function getUserProfileApi_noCache(params: ParamsOfGetUserProfileApi): UserProfileApi {
    const { kcContext } = params;

    unFormatNumberOnSubmit();

    const { getErrors } = createGetErrors({ kcContext });
    const { reducer } = createReducer({ getErrors });

    let state = getInitialState({ kcContext, getErrors });
    const callbacks = new Set<() => void>();

    return {
        dispatchFormAction: action => {
            state = reducer({ action, state });
            callbacks.forEach(callback => callback());
        },
        getFormState: () => formStateSelector({ state }),
        subscribeToFormState: callback => {
            callbacks.add(callback);
            return {
                unsubscribe: () => {
                    callbacks.delete(callback);
                }
            };
        }
    };
}

function getInitialState(params: {
    kcContext: KcContextLike;
    getErrors: ReturnType<typeof createGetErrors>["getErrors"];
}): internal.State {
    const { kcContext, getErrors } = params;

    // NOTE: We don't use te kcContext.profile.attributes directly because
    // want to apply some retro-compatibility and consistency patches.
    const attributes: Attribute[] = (() => {
        mock_user_profile_attributes_for_older_keycloak_versions: {
            if (
                "profile" in kcContext &&
                "attributesByName" in kcContext.profile &&
                Object.keys(kcContext.profile.attributesByName).length !== 0
            ) {
                break mock_user_profile_attributes_for_older_keycloak_versions;
            }

            if (
                "register" in kcContext &&
                kcContext.register instanceof Object &&
                "formData" in kcContext.register
            ) {
                //NOTE: Handle legacy register.ftl page
                return (["firstName", "lastName", "email", "username"] as const)
                    .filter(name =>
                        name !== "username" ? true : !kcContext.realm.registrationEmailAsUsername
                    )
                    .map(name =>
                        id<Attribute>({
                            name: name,
                            displayName: id<`\${${MessageKey_defaultSet}}`>(`\${${name}}`),
                            required: true,
                            value: (kcContext.register as any).formData[name] ?? "",
                            html5DataAnnotations: {},
                            readOnly: false,
                            validators: {},
                            annotations: {},
                            autocomplete: (() => {
                                switch (name) {
                                    case "email":
                                        return "email";
                                    case "username":
                                        return "username";
                                    default:
                                        return undefined;
                                }
                            })()
                        })
                    );
            }

            if ("user" in kcContext && kcContext.user instanceof Object) {
                //NOTE: Handle legacy login-update-profile.ftl
                return (["username", "email", "firstName", "lastName"] as const)
                    .filter(name =>
                        name !== "username" ? true : (kcContext.user as any).editUsernameAllowed
                    )
                    .map(name =>
                        id<Attribute>({
                            name: name,
                            displayName: id<`\${${MessageKey_defaultSet}}`>(`\${${name}}`),
                            required: true,
                            value: (kcContext as any).user[name] ?? "",
                            html5DataAnnotations: {},
                            readOnly: false,
                            validators: {},
                            annotations: {},
                            autocomplete: (() => {
                                switch (name) {
                                    case "email":
                                        return "email";
                                    case "username":
                                        return "username";
                                    default:
                                        return undefined;
                                }
                            })()
                        })
                    );
            }

            if ("email" in kcContext && kcContext.email instanceof Object) {
                //NOTE: Handle legacy update-email.ftl
                return [
                    id<Attribute>({
                        name: "email",
                        displayName: id<`\${${MessageKey_defaultSet}}`>(`\${email}`),
                        required: true,
                        value: (kcContext.email as any).value ?? "",
                        html5DataAnnotations: {},
                        readOnly: false,
                        validators: {},
                        annotations: {},
                        autocomplete: "email"
                    })
                ];
            }

            assert(false, "Unable to mock user profile from the current kcContext");
        }

        return Object.values(kcContext.profile.attributesByName).map(structuredCloneButFunctions);
    })();

    /* See: https://github.com/keycloak/keycloak/issues/38029 and https://github.com/keycloakify/keycloakify/issues/837 */
    add_locale_attribute_for_keycloak_prior_to_26_2_0: {
        if (kcContext.locale === undefined) {
            break add_locale_attribute_for_keycloak_prior_to_26_2_0;
        }

        if (attributes.find(attribute => attribute.name === "locale") !== undefined) {
            break add_locale_attribute_for_keycloak_prior_to_26_2_0;
        }

        attributes.push(
            id<Attribute>({
                validators: {},
                displayName: "locale",
                values: [],
                annotations: {},
                required: false,
                html5DataAnnotations: {},
                multivalued: false,
                readOnly: false,
                name: "locale"
            })
        );
    }

    attributes.forEach(attribute => {
        if (attribute.name === "locale") {
            assert(kcContext.locale !== undefined);
            attribute.annotations.inputType = "hidden";
            attribute.value = kcContext.locale.currentLanguageTag;
            delete attribute.values;
        }

        patch_legacy_group: {
            if (typeof attribute.group !== "string") {
                break patch_legacy_group;
            }

            const { group, groupDisplayHeader, groupDisplayDescription, groupAnnotations } =
                attribute as Attribute & {
                    group: string;
                    groupDisplayHeader?: string;
                    groupDisplayDescription?: string;
                    groupAnnotations: Record<string, string>;
                };

            delete attribute.group;
            // @ts-expect-error: We know what we are doing
            delete attribute.groupDisplayHeader;
            // @ts-expect-error: We know what we are doing
            delete attribute.groupDisplayDescription;
            // @ts-expect-error: We know what we are doing
            delete attribute.groupAnnotations;

            if (group === "") {
                break patch_legacy_group;
            }

            attribute.group = {
                name: group,
                displayHeader: groupDisplayHeader,
                displayDescription: groupDisplayDescription,
                annotations: groupAnnotations,
                html5DataAnnotations: {}
            };
        }

        // Attributes with options rendered by default as select inputs
        if (
            attribute.validators.options !== undefined &&
            attribute.annotations.inputType === undefined
        ) {
            attribute.annotations.inputType = "select";
        }

        // Consistency patch on values/value property
        {
            if (getIsMultivaluedSingleField({ attribute })) {
                attribute.multivalued = true;
            }

            if (attribute.multivalued) {
                attribute.values ??= attribute.value !== undefined ? [attribute.value] : [];
                delete attribute.value;
            } else {
                attribute.value ??= attribute.values?.[0];
                delete attribute.values;
            }
        }
    });

    const initialFormFieldState: {
        attribute: Attribute;
        valueOrValues: string | string[];
    }[] = [];

    for (const attribute of attributes) {
        handle_multi_valued_attribute: {
            if (!attribute.multivalued) {
                break handle_multi_valued_attribute;
            }

            const values = attribute.values?.length ? attribute.values : [""];

            apply_validator_min_range: {
                if (getIsMultivaluedSingleField({ attribute })) {
                    break apply_validator_min_range;
                }

                const validator = attribute.validators.multivalued;

                if (validator === undefined) {
                    break apply_validator_min_range;
                }

                const { min: minStr } = validator;

                if (!minStr) {
                    break apply_validator_min_range;
                }

                const min = parseInt(`${minStr}`);

                for (let index = values.length; index < min; index++) {
                    values.push("");
                }
            }

            initialFormFieldState.push({
                attribute,
                valueOrValues: values
            });

            continue;
        }

        initialFormFieldState.push({
            attribute,
            valueOrValues: attribute.value ?? ""
        });
    }

    const initialState: internal.State = {
        formFieldStates: initialFormFieldState.map(({ attribute, valueOrValues }) => ({
            attribute,
            errors: getErrors({
                attributeName: attribute.name,
                formFieldStates: initialFormFieldState
            }),
            hasLostFocusAtLeastOnce:
                valueOrValues instanceof Array && !getIsMultivaluedSingleField({ attribute })
                    ? valueOrValues.map(() => false)
                    : false,
            valueOrValues: valueOrValues
        }))
    };

    return initialState;
}

const formStateByState = new WeakMap<internal.State, FormState>();

function formStateSelector(params: { state: internal.State }): FormState {
    const { state } = params;

    use_memoized_value: {
        const formState = formStateByState.get(state);
        if (formState === undefined) {
            break use_memoized_value;
        }
        return formState;
    }

    return {
        formFieldStates: state.formFieldStates.map(
            ({
                errors,
                hasLostFocusAtLeastOnce: hasLostFocusAtLeastOnceOrArr,
                attribute,
                ...valueOrValuesWrap
            }) => ({
                displayableErrors: errors.filter(error => {
                    const hasLostFocusAtLeastOnce =
                        typeof hasLostFocusAtLeastOnceOrArr === "boolean"
                            ? hasLostFocusAtLeastOnceOrArr
                            : error.fieldIndex !== undefined
                              ? hasLostFocusAtLeastOnceOrArr[error.fieldIndex]
                              : hasLostFocusAtLeastOnceOrArr[hasLostFocusAtLeastOnceOrArr.length - 1];

                    switch (error.source.type) {
                        case "server":
                            return true;
                        case "required field":
                            return hasLostFocusAtLeastOnce;
                        case "validator":
                            switch (error.source.name) {
                                case "length":
                                case "pattern":
                                case "email":
                                case "integer":
                                case "multivalued":
                                case "options":
                                    return hasLostFocusAtLeastOnce;
                                default:
                                    assert<Equals<typeof error.source.name, never>>(false);
                            }
                        default:
                            assert<Equals<typeof error.source, never>>(false);
                    }
                }),
                attribute,
                ...valueOrValuesWrap
            })
        ),
        areAllChecksPassed: state.formFieldStates.every(({ errors }) => errors.length === 0)
    };
}

function createReducer(params: { getErrors: ReturnType<typeof createGetErrors>["getErrors"] }) {
    const { getErrors } = params;

    function reducer(params: { state: internal.State; action: FormAction }): internal.State {
        const { action } = params;
        let { state } = params;

        const formFieldState = state.formFieldStates.find(
            ({ attribute }) => attribute.name === action.name
        );

        assert(formFieldState !== undefined);

        switch (action.action) {
            case "update":
                formFieldState.valueOrValues = action.valueOrValues;

                apply_formatters: {
                    const { attribute } = formFieldState;

                    const { kcNumberFormat } = attribute.html5DataAnnotations ?? {};

                    if (!kcNumberFormat) {
                        break apply_formatters;
                    }

                    if (formFieldState.valueOrValues instanceof Array) {
                        formFieldState.valueOrValues = formFieldState.valueOrValues.map(value =>
                            formatNumber(value, kcNumberFormat)
                        );
                    } else {
                        formFieldState.valueOrValues = formatNumber(
                            formFieldState.valueOrValues,
                            kcNumberFormat
                        );
                    }
                }

                formFieldState.errors = getErrors({
                    attributeName: action.name,
                    formFieldStates: state.formFieldStates
                });

                simulate_focus_lost: {
                    const { displayErrorsImmediately = false } = action;

                    if (!displayErrorsImmediately) {
                        break simulate_focus_lost;
                    }

                    for (const fieldIndex of action.valueOrValues instanceof Array
                        ? action.valueOrValues.map((...[, index]) => index)
                        : [undefined]) {
                        state = reducer({
                            state,
                            action: {
                                action: "focus lost",
                                name: action.name,
                                fieldIndex
                            }
                        });
                    }
                }
                break;
            case "focus lost":
                if (formFieldState.hasLostFocusAtLeastOnce instanceof Array) {
                    const { fieldIndex } = action;
                    assert(fieldIndex !== undefined);
                    formFieldState.hasLostFocusAtLeastOnce[fieldIndex] = true;
                    break;
                }

                formFieldState.hasLostFocusAtLeastOnce = true;
                break;
            default:
                assert<Equals<typeof action, never>>(false);
        }

        return { ...state };
    }

    return { reducer };
}

function createGetErrors(params: { kcContext: KcContextLike_useGetErrors }) {
    const { kcContext } = params;

    const { messagesPerField } = kcContext;

    function getErrors(params: {
        attributeName: string;
        formFieldStates: {
            attribute: Attribute;
            valueOrValues: string | string[];
        }[];
    }): FormFieldError[] {
        const { attributeName, formFieldStates } = params;

        const formFieldState = formFieldStates.find(({ attribute }) => attribute.name === attributeName);

        assert(formFieldState !== undefined);

        const { attribute } = formFieldState;

        const valueOrValues = (() => {
            let { valueOrValues } = formFieldState;

            unFormat_number: {
                const { kcNumberUnFormat } = attribute.html5DataAnnotations ?? {};

                if (!kcNumberUnFormat) {
                    break unFormat_number;
                }

                if (valueOrValues instanceof Array) {
                    valueOrValues = valueOrValues.map(value => formatNumber(value, kcNumberUnFormat));
                } else {
                    valueOrValues = formatNumber(valueOrValues, kcNumberUnFormat);
                }
            }

            return valueOrValues;
        })();

        assert(attribute !== undefined);

        server_side_error: {
            if (attribute.multivalued) {
                const defaultValues = attribute.values?.length ? attribute.values : [""];

                assert(valueOrValues instanceof Array);

                const values = valueOrValues;

                if (
                    JSON.stringify(defaultValues) !==
                    JSON.stringify(values.slice(0, defaultValues.length))
                ) {
                    break server_side_error;
                }
            } else {
                const defaultValue = attribute.value ?? "";

                assert(typeof valueOrValues === "string");

                const value = valueOrValues;

                if (defaultValue !== value) {
                    break server_side_error;
                }
            }

            let doesErrorExist: boolean;

            try {
                doesErrorExist = messagesPerField.existsError(attributeName);
            } catch {
                break server_side_error;
            }

            if (!doesErrorExist) {
                break server_side_error;
            }

            const errorMessageStr = messagesPerField.get(attributeName);

            return [
                {
                    advancedMsgArgs: [errorMessageStr],
                    fieldIndex: undefined,
                    source: {
                        type: "server"
                    }
                }
            ];
        }

        handle_multi_valued_multi_fields: {
            if (!attribute.multivalued) {
                break handle_multi_valued_multi_fields;
            }

            if (getIsMultivaluedSingleField({ attribute })) {
                break handle_multi_valued_multi_fields;
            }

            assert(valueOrValues instanceof Array);

            const values = valueOrValues;

            const errors = values
                .map((...[, index]) => {
                    const specificValueErrors = getErrors({
                        attributeName,
                        formFieldStates: formFieldStates.map(formFieldState => {
                            if (formFieldState.attribute.name === attributeName) {
                                assert(formFieldState.valueOrValues instanceof Array);
                                return {
                                    attribute: {
                                        ...attribute,
                                        annotations: {
                                            ...attribute.annotations,
                                            inputType: undefined
                                        },
                                        multivalued: false
                                    },
                                    valueOrValues: formFieldState.valueOrValues[index]
                                };
                            }

                            return formFieldState;
                        })
                    });

                    return specificValueErrors
                        .filter(error => {
                            if (error.source.type === "required field") {
                                return false;
                            }

                            return true;
                        })
                        .map(
                            (error): FormFieldError => ({
                                ...error,
                                fieldIndex: index
                            })
                        );
                })
                .reduce((acc, errors) => [...acc, ...errors], []);

            required_field: {
                if (!attribute.required) {
                    break required_field;
                }

                if (values.every(value => value !== "")) {
                    break required_field;
                }

                errors.push({
                    advancedMsgArgs: [
                        "error-user-attribute-required" satisfies MessageKey_defaultSet
                    ] as const,
                    fieldIndex: undefined,
                    source: {
                        type: "required field"
                    }
                });
            }

            return errors;
        }

        handle_multi_valued_single_field: {
            if (!attribute.multivalued) {
                break handle_multi_valued_single_field;
            }

            if (!getIsMultivaluedSingleField({ attribute })) {
                break handle_multi_valued_single_field;
            }

            const validatorName = "multivalued";

            const validator = attribute.validators[validatorName];

            if (validator === undefined) {
                return [];
            }

            const { min: minStr } = validator;

            const min = minStr ? parseInt(`${minStr}`) : attribute.required ? 1 : 0;

            assert(!isNaN(min));

            const { max: maxStr } = validator;

            const max = !maxStr ? Infinity : parseInt(`${maxStr}`);

            assert(!isNaN(max));

            assert(valueOrValues instanceof Array);

            const values = valueOrValues;

            if (min <= values.length && values.length <= max) {
                return [];
            }

            return [
                {
                    advancedMsgArgs: [
                        "error-invalid-multivalued-size" satisfies MessageKey_defaultSet,
                        `${min}`,
                        `${max}`
                    ] as const,
                    fieldIndex: undefined,
                    source: {
                        type: "validator",
                        name: validatorName
                    }
                }
            ];
        }

        assert(typeof valueOrValues === "string");

        const value = valueOrValues;

        const errors: FormFieldError[] = [];

        const { validators } = attribute;

        required_field: {
            if (!attribute.required) {
                break required_field;
            }

            if (value !== "") {
                break required_field;
            }

            errors.push({
                advancedMsgArgs: [
                    "error-user-attribute-required" satisfies MessageKey_defaultSet
                ] as const,
                fieldIndex: undefined,
                source: {
                    type: "required field"
                }
            });
        }

        validator_x: {
            const validatorName = "length";

            const validator = validators[validatorName];

            if (!validator) {
                break validator_x;
            }

            const { "ignore.empty.value": ignoreEmptyValue = false, max, min } = validator;

            if (ignoreEmptyValue && value === "") {
                break validator_x;
            }

            const source: FormFieldError.Source = {
                type: "validator",
                name: validatorName
            };

            if (max && value.length > parseInt(`${max}`)) {
                errors.push({
                    advancedMsgArgs: [
                        "error-invalid-length-too-long" satisfies MessageKey_defaultSet,
                        `${max}`
                    ] as const,
                    fieldIndex: undefined,
                    source
                });
            }

            if (min && value.length < parseInt(`${min}`)) {
                errors.push({
                    advancedMsgArgs: [
                        "error-invalid-length-too-short" satisfies MessageKey_defaultSet,
                        `${min}`
                    ] as const,
                    fieldIndex: undefined,
                    source
                });
            }
        }

        validator_x: {
            const validatorName = "pattern";

            const validator = validators[validatorName];

            if (validator === undefined) {
                break validator_x;
            }

            const {
                "ignore.empty.value": ignoreEmptyValue = false,
                pattern,
                "error-message": errorMessageKey
            } = validator;

            if (ignoreEmptyValue && value === "") {
                break validator_x;
            }

            if (new RegExp(pattern).test(value)) {
                break validator_x;
            }

            const msgArgs = [
                errorMessageKey ?? ("shouldMatchPattern" satisfies MessageKey_defaultSet),
                pattern
            ] as const;

            errors.push({
                advancedMsgArgs: msgArgs,
                fieldIndex: undefined,
                source: {
                    type: "validator",
                    name: validatorName
                }
            });
        }

        validator_x: {
            {
                const lastError = errors[errors.length - 1];
                if (
                    lastError !== undefined &&
                    lastError.source.type === "validator" &&
                    lastError.source.name === "pattern"
                ) {
                    break validator_x;
                }
            }

            const validatorName = "email";

            const validator = validators[validatorName];

            if (validator === undefined) {
                break validator_x;
            }

            const { "ignore.empty.value": ignoreEmptyValue = false } = validator;

            if (ignoreEmptyValue && value === "") {
                break validator_x;
            }

            if (emailRegexp.test(value)) {
                break validator_x;
            }

            errors.push({
                advancedMsgArgs: ["invalidEmailMessage" satisfies MessageKey_defaultSet] as const,
                fieldIndex: undefined,
                source: {
                    type: "validator",
                    name: validatorName
                }
            });
        }

        validator_x: {
            const validatorName = "integer";

            const validator = validators[validatorName];

            if (validator === undefined) {
                break validator_x;
            }

            const { "ignore.empty.value": ignoreEmptyValue = false, max, min } = validator;

            if (ignoreEmptyValue && value === "") {
                break validator_x;
            }

            const intValue = parseInt(value);

            const source: FormFieldError.Source = {
                type: "validator",
                name: validatorName
            };

            if (isNaN(intValue)) {
                const msgArgs = ["mustBeAnInteger"] as const;

                errors.push({
                    advancedMsgArgs: msgArgs,
                    fieldIndex: undefined,
                    source
                });

                break validator_x;
            }

            if (max && intValue > parseInt(`${max}`)) {
                errors.push({
                    advancedMsgArgs: [
                        "error-number-out-of-range-too-big" satisfies MessageKey_defaultSet,
                        `${max}`
                    ] as const,
                    fieldIndex: undefined,
                    source
                });

                break validator_x;
            }

            if (min && intValue < parseInt(`${min}`)) {
                errors.push({
                    advancedMsgArgs: [
                        "error-number-out-of-range-too-small" satisfies MessageKey_defaultSet,
                        `${min}`
                    ] as const,
                    fieldIndex: undefined,
                    source
                });
                break validator_x;
            }
        }

        validator_x: {
            const validatorName = "options";

            const validator = validators[validatorName];

            if (validator === undefined) {
                break validator_x;
            }

            if (value === "") {
                break validator_x;
            }

            if (validator.options.indexOf(value) >= 0) {
                break validator_x;
            }

            errors.push({
                advancedMsgArgs: ["notAValidOption" satisfies MessageKey_defaultSet] as const,
                fieldIndex: undefined,
                source: {
                    type: "validator",
                    name: validatorName
                }
            });
        }

        //TODO: Implement missing validators. See Validators type definition.

        return errors;
    }

    return { getErrors };
}

function getIsMultivaluedSingleField(params: { attribute: Attribute }) {
    const { attribute } = params;

    return attribute.annotations.inputType?.startsWith("multiselect") ?? false;
}

export function getButtonToDisplayForMultivaluedAttributeField(params: {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
}) {
    const { attribute, values, fieldIndex } = params;

    const hasRemove = (() => {
        if (values.length === 1) {
            return false;
        }

        const minCount = (() => {
            const { multivalued } = attribute.validators;

            if (multivalued === undefined) {
                return undefined;
            }

            const minStr = multivalued.min;

            if (minStr === undefined) {
                return undefined;
            }

            return parseInt(`${minStr}`);
        })();

        if (minCount === undefined) {
            return true;
        }

        if (values.length === minCount) {
            return false;
        }

        return true;
    })();

    const hasAdd = (() => {
        if (fieldIndex + 1 !== values.length) {
            return false;
        }

        const maxCount = (() => {
            const { multivalued } = attribute.validators;

            if (multivalued === undefined) {
                return undefined;
            }

            const maxStr = multivalued.max;

            if (maxStr === undefined) {
                return undefined;
            }

            return parseInt(`${maxStr}`);
        })();

        if (maxCount === undefined) {
            return true;
        }

        return values.length !== maxCount;
    })();

    return { hasRemove, hasAdd };
}
