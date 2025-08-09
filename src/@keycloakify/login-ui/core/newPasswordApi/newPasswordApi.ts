/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../tools/Array.prototype.every";
import { assert, type Equals } from "tsafe/assert";
import type { KcContext, PasswordPolicies } from "../KcContext/KcContext";
import type { KcContextLike as KcContextLike_i18n } from "../i18n/getI18n";
import type { MessageKey as MessageKey_defaultSet } from "../i18n/messages_defaultSet/types";
import { persistPasswordOnFormSubmit, getPersistedPassword } from "./passwordRestoration";
import { formatNumber } from "../userProfileApi/kcNumberUnFormat";

export type Attribute = {
    name: string;
    annotations: {
        inputType: "hidden" | undefined;
    };
    value: string | undefined;
    required: true;
};

export type FormFieldError = {
    advancedMsgArgs: readonly [string, ...string[]];
    source: FormFieldError.Source;
};

export namespace FormFieldError {
    export type Source = Source.PasswordPolicy | Source.Other;

    export namespace Source {
        export type PasswordPolicy = {
            type: "passwordPolicy";
            name: keyof PasswordPolicies;
        };

        export type Other = {
            type: "server" | "required field" | "passwordConfirmMatchesPassword";
        };

    }
}

export type FormFieldState = {
    attribute: Attribute;
    displayableErrors: FormFieldError[];
    value: string;
};

export type FormState = {
    areAllChecksPassed: boolean;
    formFieldStates: FormFieldState[];
};

export type FormAction =
    | {
          action: "update";
          name: string;
          value: string;
          /** Default false */
          displayErrorsImmediately?: boolean;
      }
    | {
          action: "focus lost";
          name: string;
      };

export type KcContextLike = KcContextLike_i18n &
    KcContextLike_useGetErrors;

type KcContextLike_useGetErrors = KcContextLike_i18n & {
    passwordPolicies?: PasswordPolicies;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
};

assert<
    KcContext.Register extends KcContextLike
        ? true
        : false
>();
assert<
    KcContext.LoginUpdatePassword extends KcContextLike
        ? true
        : false
>();


export type NewPasswordApi = {
    getFormState: () => FormState;
    subscribeToFormState: (callback: () => void) => { unsubscribe: () => void };
    dispatchFormAction: (action: FormAction) => void;
};

const cache = new WeakMap<KcContextLike, NewPasswordApi>();



export type ParamsOfGetUserProfileApi = {
    kcContext: KcContextLike;
    passwordFieldName: string;
    passwordConfirmFieldName: string;
    makeConfirmationFieldHiddenAndAutoFilled: boolean;
    userProfileApi:
        | Omit<import("../userProfileApi").UserProfileApi, "dispatchFormAction">
        | undefined;
};

export function getNewPasswordApi(params: ParamsOfGetUserProfileApi): NewPasswordApi {
    const { kcContext } = params;

    use_cache: {
        const userProfileApi_cache = cache.get(kcContext);

        if (userProfileApi_cache === undefined) {
            break use_cache;
        }

        return userProfileApi_cache;
    }

    const newPasswordApi = getNewPasswordApi_noCache(params);

    cache.set(kcContext, newPasswordApi);

    return newPasswordApi;
}


namespace internal {
    export type FormFieldState = {
        attribute: Attribute;
        errors: FormFieldError[];
        hasLostFocusAtLeastOnce: boolean;
        value: string;
    };

    export type State = {
        formFieldStates: FormFieldState[];
    };
}

function getNewPasswordApi_noCache(params: ParamsOfGetUserProfileApi): NewPasswordApi {
    const {
        kcContext,
        passwordFieldName,
        passwordConfirmFieldName,
        makeConfirmationFieldHiddenAndAutoFilled,
        userProfileApi
    } = params;

    persistPasswordOnFormSubmit();

    const { getErrors } = createGetErrors({
        kcContext,
        passwordFieldName,
        passwordConfirmFieldName,
        userProfileApi
    });
    const { reducer } = createReducer({
        getErrors,
        makeConfirmationFieldHiddenAndAutoFilled,
        passwordConfirmFieldName,
        passwordFieldName
    });

    let state = getInitialState({ kcContext, requirePasswordConfirmation });
    const callbacks = new Set<() => void>();

    const api: NewPasswordApi = {
        dispatchFormAction: action => {
            state = reducer({ state, action });

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

    userProfileApi?.subscribeToFormState(() => {
        api.dispatchFormAction({
            action: "update",
            name: passwordFieldName,
            value: (() => {
                const formFieldState = api
                    .getFormState()
                    .formFieldStates.find(({ attribute }) => attribute.name === passwordFieldName);
                assert(formFieldState !== undefined);
                return formFieldState.value;
            })()
        });
    });

    return api;
}

function getInitialState(params: {
    kcContext: KcContextLike;
    requirePasswordConfirmation: boolean;
}): internal.State {
    const { kcContext, requirePasswordConfirmation } = params;

    const { getErrors } = createGetErrors({ kcContext });

    const defaultValue = getPersistedPassword();

    const attributes: Attribute[] = [
        {
            name: "password",
            annotations: {
                inputType: undefined
            },
            value: defaultValue
        },
        {
            name: "password-confirm",
            annotations: {
                inputType: requirePasswordConfirmation ? undefined : "hidden"
            },
            value: defaultValue
        }
    ];

    const initialFormFieldState: {
        attribute: Attribute;
        value: string;
    }[] = [];

    for (const attribute of attributes) {
        initialFormFieldState.push({
            attribute,
            value: attribute.value ?? ""
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
            ({ errors, hasLostFocusAtLeastOnce, attribute, value }) => ({
                displayableErrors: errors.filter(error => {
                    switch (error.source.type) {
                        case "passwordConfirmMatchesPassword":
                            return hasLostFocusAtLeastOnce;
                        case "passwordPolicy":
                            switch (error.source.name) {
                                case "length":
                                case "maxLength":
                                case "digits":
                                case "lowerCase":
                                case "upperCase":
                                case "specialChars":
                                    return hasLostFocusAtLeastOnce;
                                case "notUsername":
                                case "notEmail":
                                    return true;
                            }
                            assert<Equals<typeof error.source.name, never>>;
                            break;
                    }
                }),
                attribute,
                value
            })
        ),
        areAllChecksPassed: state.formFieldStates.every(({ errors }) => errors.length === 0)
    };
}

function createReducer(params: {
    passwordFieldName: string;
    passwordConfirmFieldName: string;
    getErrors: ReturnType<typeof createGetErrors>["getErrors"];
    makeConfirmationFieldHiddenAndAutoFilled: boolean;
}) {
    const {
        passwordFieldName,
        passwordConfirmFieldName,
        getErrors,
        makeConfirmationFieldHiddenAndAutoFilled
    } = params;

    function reducer(params: { state: internal.State; action: FormAction }): internal.State {
        const { action } = params;
        let { state } = params;

        const formFieldState = state.formFieldStates.find(
            ({ attribute }) => attribute.name === action.name
        );

        assert(formFieldState !== undefined);

        switch (action.action) {
            case "update":
                formFieldState.value = action.value;

                formFieldState.errors = getErrors({
                    attributeName: action.name,
                    formFieldStates: state.formFieldStates
                });

                simulate_focus_lost: {
                    const { displayErrorsImmediately = false } = action;

                    if (!displayErrorsImmediately) {
                        break simulate_focus_lost;
                    }

                    state = reducer({
                        state,
                        action: {
                            action: "focus lost",
                            name: action.name
                        }
                    });
                }

                update_password_confirm: {
                    if (!makeConfirmationFieldHiddenAndAutoFilled) {
                        break update_password_confirm;
                    }

                    if (action.name !== passwordConfirmFieldName) {
                        break update_password_confirm;
                    }

                    state = reducer({
                        state,
                        action: {
                            action: "update",
                            name: passwordConfirmFieldName,
                            value: action.value,
                            displayErrorsImmediately: action.displayErrorsImmediately
                        }
                    });
                }

                trigger_password_confirm_validation_on_password_change: {
                    if (makeConfirmationFieldHiddenAndAutoFilled) {
                        break trigger_password_confirm_validation_on_password_change;
                    }

                    if (action.name !== passwordFieldName) {
                        break trigger_password_confirm_validation_on_password_change;
                    }

                    state = reducer({
                        state,
                        action: {
                            action: "update",
                            name: passwordConfirmFieldName,
                            value: (() => {
                                const formFieldState = state.formFieldStates.find(
                                    ({ attribute }) => attribute.name === passwordConfirmFieldName
                                );

                                assert(formFieldState !== undefined);

                                return formFieldState.value;
                            })(),
                            displayErrorsImmediately: action.displayErrorsImmediately
                        }
                    });
                }

                break;
            case "focus lost":
                formFieldState.hasLostFocusAtLeastOnce = true;
                break;
            default:
                assert<Equals<typeof action, never>>(false);
        }

        return { ...state };
    }

    return { reducer };
}

function createGetErrors(params: {
    kcContext: KcContextLike_useGetErrors;
    userProfileApi: ParamsOfGetUserProfileApi["userProfileApi"] | undefined;
    passwordFieldName: string;
    passwordConfirmFieldName: string;
}) {
    const { kcContext, userProfileApi, passwordFieldName, passwordConfirmFieldName } = params;

    const { messagesPerField, passwordPolicies } = kcContext;

    function getErrors(params: {
        attributeName: string;
        formFieldStates: {
            attribute: Attribute;
            value: string;
        }[];
    }): FormFieldError[] {
        const { attributeName, formFieldStates } = params;

        const formFieldState = formFieldStates.find(({ attribute }) => attribute.name === attributeName);

        assert(formFieldState !== undefined);

        const { attribute, value } = formFieldState;

        assert(attribute !== undefined);

        server_side_error: {
            {
                const defaultValue = attribute.value ?? "";

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
                    source: {
                        type: "server"
                    }
                }
            ];
        }

        const errors: FormFieldError[] = [];

        check_password_policies: {
            if (attributeName !== passwordFieldName) {
                break check_password_policies;
            }

            if (passwordPolicies === undefined) {
                break check_password_policies;
            }

            check_password_policy_x: {
                const policyName = "length";

                const policy = passwordPolicies[policyName];

                if (!policy) {
                    break check_password_policy_x;
                }

                const minLength = policy;

                if (value.length >= minLength) {
                    break check_password_policy_x;
                }

                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordMinLengthMessage" satisfies MessageKey_defaultSet,
                        `${minLength}`
                    ] as const,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }

            check_password_policy_x: {
                const policyName = "maxLength";

                const policy = passwordPolicies[policyName];

                if (!policy) {
                    break check_password_policy_x;
                }

                const maxLength = policy;

                if (value.length <= maxLength) {
                    break check_password_policy_x;
                }

                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordMaxLengthMessage" satisfies MessageKey_defaultSet,
                        `${maxLength}`
                    ] as const,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }

            check_password_policy_x: {
                const policyName = "digits";

                const policy = passwordPolicies[policyName];

                if (!policy) {
                    break check_password_policy_x;
                }

                const minNumberOfDigits = policy;

                if (value.split("").filter(char => !isNaN(parseInt(char))).length >= minNumberOfDigits) {
                    break check_password_policy_x;
                }

                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordMinDigitsMessage" satisfies MessageKey_defaultSet,
                        `${minNumberOfDigits}`
                    ] as const,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }

            check_password_policy_x: {
                const policyName = "lowerCase";

                const policy = passwordPolicies[policyName];

                if (!policy) {
                    break check_password_policy_x;
                }

                const minNumberOfLowerCaseChar = policy;

                if (
                    value
                        .split("")
                        .filter(char => char === char.toLowerCase() && char !== char.toUpperCase())
                        .length >= minNumberOfLowerCaseChar
                ) {
                    break check_password_policy_x;
                }

                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordMinLowerCaseCharsMessage" satisfies MessageKey_defaultSet,
                        `${minNumberOfLowerCaseChar}`
                    ] as const,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }

            check_password_policy_x: {
                const policyName = "upperCase";

                const policy = passwordPolicies[policyName];

                if (!policy) {
                    break check_password_policy_x;
                }

                const minNumberOfUpperCaseChar = policy;

                if (
                    value
                        .split("")
                        .filter(char => char === char.toUpperCase() && char !== char.toLowerCase())
                        .length >= minNumberOfUpperCaseChar
                ) {
                    break check_password_policy_x;
                }

                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordMinUpperCaseCharsMessage" satisfies MessageKey_defaultSet,
                        `${minNumberOfUpperCaseChar}`
                    ] as const,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }

            check_password_policy_x: {
                const policyName = "specialChars";

                const policy = passwordPolicies[policyName];

                if (!policy) {
                    break check_password_policy_x;
                }

                const minNumberOfSpecialChar = policy;

                if (
                    value.split("").filter(char => !char.match(/[a-zA-Z0-9]/)).length >=
                    minNumberOfSpecialChar
                ) {
                    break check_password_policy_x;
                }

                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordMinSpecialCharsMessage" satisfies MessageKey_defaultSet,
                        `${minNumberOfSpecialChar}`
                    ] as const,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }

            check_password_policy_x: {
                const policyName = "notUsername";

                const notUsername = passwordPolicies[policyName];

                if (!notUsername) {
                    break check_password_policy_x;
                }

                if (userProfileApi === undefined) {
                    break check_password_policy_x;
                }

                const usernameFormFieldState = userProfileApi
                    .getFormState()
                    .formFieldStates.find(({ attribute }) => attribute.name === "username");

                if (usernameFormFieldState === undefined) {
                    break check_password_policy_x;
                }

                const usernameValue = (() => {
                    let { valueOrValues } = usernameFormFieldState;

                    assert(typeof valueOrValues === "string");

                    unFormat_number: {
                        const { kcNumberUnFormat } =
                            usernameFormFieldState.attribute.html5DataAnnotations ?? {};

                        if (!kcNumberUnFormat) {
                            break unFormat_number;
                        }

                        valueOrValues = formatNumber(valueOrValues, kcNumberUnFormat);
                    }

                    return valueOrValues;
                })();

                if (usernameValue === "") {
                    break check_password_policy_x;
                }

                if (value !== usernameValue) {
                    break check_password_policy_x;
                }

                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordNotUsernameMessage" satisfies MessageKey_defaultSet
                    ] as const,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }

            check_password_policy_x: {
                const policyName = "notEmail";

                const notEmail = passwordPolicies[policyName];

                if (!notEmail) {
                    break check_password_policy_x;
                }

                if (userProfileApi === undefined) {
                    break check_password_policy_x;
                }

                const emailFormFieldState = userProfileApi
                    .getFormState()
                    .formFieldStates.find(formFieldState => formFieldState.attribute.name === "email");

                if (!emailFormFieldState) {
                    break check_password_policy_x;
                }

                assert(typeof emailFormFieldState.valueOrValues === "string");

                {
                    const emailValue = emailFormFieldState.valueOrValues;

                    if (emailValue === "") {
                        break check_password_policy_x;
                    }

                    if (value !== emailValue) {
                        break check_password_policy_x;
                    }
                }

                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordNotEmailMessage" satisfies MessageKey_defaultSet
                    ] as const,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }
        }

        password_confirm_matches_password: {
            if (attributeName !== passwordConfirmFieldName) {
                break password_confirm_matches_password;
            }

            const passwordFormFieldState = formFieldStates.find(
                formFieldState => formFieldState.attribute.name === passwordFieldName
            );

            assert(passwordFormFieldState !== undefined);

            {
                const passwordValue = passwordFormFieldState.value;

                if (value === passwordValue) {
                    break password_confirm_matches_password;
                }
            }

            errors.push({
                advancedMsgArgs: [
                    "invalidPasswordConfirmMessage" satisfies MessageKey_defaultSet
                ] as const,
                source: {
                    type: "passwordConfirmMatchesPassword"
                }
            });
        }

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
                source: {
                    type: "required field"
                }
            });
        }

        return errors;
    }

    return { getErrors };
}

