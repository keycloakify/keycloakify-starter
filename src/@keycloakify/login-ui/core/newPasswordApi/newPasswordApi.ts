/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../tools/Array.prototype.every";
import { assert, type Equals } from "tsafe/assert";
import type { KcContext, PasswordPolicies } from "../KcContext/KcContext";
import type { KcContextLike as KcContextLike_i18n } from "../i18n/getI18n";
import type { MessageKey as MessageKey_defaultSet } from "../i18n/messages_defaultSet/types";
import { persistPasswordOnFormSubmit, getPersistedPassword } from "./passwordRestoration";
import { createGetInputValue } from "./getInputValue";
import type * as userProfileApi from "../userProfileApi";

export type Attribute = {
    name: string;
    annotations: {
        inputType: "hidden" | undefined;
    };
    value: string | undefined;
};

export type FormFieldError = {
    advancedMsgArgs: readonly [string, ...string[]];
    source: FormFieldError.Source;
};

export namespace FormFieldError {
    export type Source = Source.PasswordPolicy | Source.Other | Source.Server;

    export namespace Source {
        export type PasswordPolicy = {
            type: "passwordPolicy";
            name: keyof PasswordPolicies;
        };

        export type Other = {
            type: "passwordConfirmMatchesPassword";
        };

        export type Server = {
            type: "server";
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


export type UserProfileApi = {
    getFormState: () => FormState;
    subscribeToFormState: (callback: () => void) => { unsubscribe: () => void };
    dispatchFormAction: (action: FormAction) => void;
};

const cachedUserProfileApiByKcContext = new WeakMap<KcContextLike, UserProfileApi>();

export type UserProfileApiLike = Omit<userProfileApi.UserProfileApi, "dispatchFormAction">;;

assert<userProfileApi.UserProfileApi extends UserProfileApiLike ? true : false>();


export type ParamsOfGetUserProfileApi = {
    kcContext: KcContextLike;
    fieldName: string;
    confirmationFieldName: string;
    makeConfirmationFieldHiddenAndAutoFilled: boolean;
    userProfileApi: UserProfileApiLike | undefined;
};

export function getNewPasswordApi(params: ParamsOfGetUserProfileApi): UserProfileApi {
    const { kcContext } = params;

    use_cache: {
        const userProfileApi_cache = cachedUserProfileApiByKcContext.get(kcContext);

        if (userProfileApi_cache === undefined) {
            break use_cache;
        }

        return userProfileApi_cache;
    }

    const newPasswordApi = getNewPasswordApi_noCache(params);

    cachedUserProfileApiByKcContext.set(kcContext, newPasswordApi);

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

function getNewPasswordApi_noCache(params: ParamsOfGetUserProfileApi): UserProfileApi {
    const { kcContext, userProfileApi, confirmation } = params;

    persistPasswordOnFormSubmit();

    let state: internal.State = getInitialState({ kcContext, requirePasswordConfirmation });
    const callbacks = new Set<() => void>();

    return {
        dispatchFormAction: action => {
            state = reducer({ action, kcContext, doMakeUserConfirmPassword, state });

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

function reducer(params: {
    state: internal.State;
    kcContext: KcContextLike;
    doMakeUserConfirmPassword: boolean;
    action: FormAction;
}): internal.State {
    const { kcContext, doMakeUserConfirmPassword, action } = params;
    let { state } = params;

    const { getErrors } = createGetErrors({ kcContext });

    const formFieldState = state.formFieldStates.find(({ attribute }) => attribute.name === action.name);

    assert(formFieldState !== undefined);

    (() => {
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

                    for (const fieldIndex of action.valueOrValues instanceof Array
                        ? action.valueOrValues.map((...[, index]) => index)
                        : [undefined]) {
                        state = reducer({
                            state,
                            kcContext,
                            doMakeUserConfirmPassword,
                            action: {
                                action: "focus lost",
                                name: action.name,
                                fieldIndex
                            }
                        });
                    }
                }

                update_password_confirm: {
                    if (doMakeUserConfirmPassword) {
                        break update_password_confirm;
                    }

                    if (action.name !== "password") {
                        break update_password_confirm;
                    }

                    state = reducer({
                        state,
                        kcContext,
                        doMakeUserConfirmPassword,
                        action: {
                            action: "update",
                            name: "password-confirm",
                            valueOrValues: action.valueOrValues,
                            displayErrorsImmediately: action.displayErrorsImmediately
                        }
                    });
                }

                trigger_password_confirm_validation_on_password_change: {
                    if (!doMakeUserConfirmPassword) {
                        break trigger_password_confirm_validation_on_password_change;
                    }

                    if (action.name !== "password") {
                        break trigger_password_confirm_validation_on_password_change;
                    }

                    state = reducer({
                        state,
                        kcContext,
                        doMakeUserConfirmPassword,
                        action: {
                            action: "update",
                            name: "password-confirm",
                            valueOrValues: (() => {
                                const formFieldState = state.formFieldStates.find(
                                    ({ attribute }) => attribute.name === "password-confirm"
                                );

                                assert(formFieldState !== undefined);

                                return formFieldState.valueOrValues;
                            })(),
                            displayErrorsImmediately: action.displayErrorsImmediately
                        }
                    });
                }

                return;
            case "focus lost":
                if (formFieldState.hasLostFocusAtLeastOnce instanceof Array) {
                    const { fieldIndex } = action;
                    assert(fieldIndex !== undefined);
                    formFieldState.hasLostFocusAtLeastOnce[fieldIndex] = true;
                    return;
                }

                formFieldState.hasLostFocusAtLeastOnce = true;
                return;
        }
        assert<Equals<typeof action, never>>(false);
    })();

    return { ...state };
}

function createGetErrors(params: { kcContext: KcContextLike_useGetErrors;  }) {
    const { kcContext } = params;

    const { messagesPerField, passwordPolicies } = kcContext;

    const { getInputValue: getUsernameInputValue } = createGetInputValue({
        inputName: "username"
    });

    const {} = createGetInputValue({
        inputName: "email"
    });

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
            if (attributeName !== "password") {
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

                const usernameFormFieldState = formFieldStates.find(
                    formFieldState => formFieldState.attribute.name === "username"
                );

                if (!usernameFormFieldState) {
                    break check_password_policy_x;
                }

                const usernameValue = (() => {
                    let { valueOrValues } = usernameFormFieldState;

                    assert(typeof valueOrValues === "string");

                    unFormat_number: {
                        const { kcNumberUnFormat } = attribute.html5DataAnnotations ?? {};

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
                    fieldIndex: undefined,
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

                const emailFormFieldState = formFieldStates.find(
                    formFieldState => formFieldState.attribute.name === "email"
                );

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
                    fieldIndex: undefined,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }
        }

        password_confirm_matches_password: {
            if (attributeName !== "password-confirm") {
                break password_confirm_matches_password;
            }

            const passwordFormFieldState = formFieldStates.find(
                formFieldState => formFieldState.attribute.name === "password"
            );

            assert(passwordFormFieldState !== undefined);

            assert(typeof passwordFormFieldState.valueOrValues === "string");

            {
                const passwordValue = passwordFormFieldState.valueOrValues;

                if (value === passwordValue) {
                    break password_confirm_matches_password;
                }
            }

            errors.push({
                advancedMsgArgs: [
                    "invalidPasswordConfirmMessage" satisfies MessageKey_defaultSet
                ] as const,
                fieldIndex: undefined,
                source: {
                    type: "other",
                    rule: "passwordConfirmMatchesPassword"
                }
            });
        }

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
                    type: "other",
                    rule: "requiredField"
                }
            });
        }

        return errors;
    }

    return { getErrors };
}

