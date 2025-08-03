
    add_password_and_password_confirm: {
        if (!kcContext.passwordRequired) {
            break add_password_and_password_confirm;
        }

        attributes.forEach((attribute, i) => {
            if (
                attribute.name !== (kcContext.realm.registrationEmailAsUsername ? "email" : "username")
            ) {
                // NOTE: We want to add password and password-confirm after the field that identifies the user.
                // It's either email or username.
                return;
            }

            attributes.splice(
                i + 1,
                0,
                {
                    name: "password",
                    displayName: id<`\${${MessageKey_defaultSet}}`>("${password}"),
                    required: true,
                    readOnly: false,
                    validators: {},
                    annotations: {},
                    autocomplete: "new-password",
                    html5DataAnnotations: {}
                },
                {
                    name: "password-confirm",
                    displayName: id<`\${${MessageKey_defaultSet}}`>("${passwordConfirm}"),
                    required: true,
                    readOnly: false,
                    validators: {},
                    annotations: {},
                    html5DataAnnotations: {},
                    autocomplete: "new-password"
                }
            );
        });
    }


                        case "passwordPolicy":
                            switch (error.source.name) {
                                case "length":
                                    return hasLostFocusAtLeastOnce;
                                case "maxLength":
                                    return hasLostFocusAtLeastOnce;
                                case "digits":
                                    return hasLostFocusAtLeastOnce;
                                case "lowerCase":
                                    return hasLostFocusAtLeastOnce;
                                case "upperCase":
                                    return hasLostFocusAtLeastOnce;
                                case "specialChars":
                                    return hasLostFocusAtLeastOnce;
                                case "notUsername":
                                    return true;
                                case "notEmail":
                                    return true;
                                default:
                                    assert<Equals<typeof error.source, never>>(false);
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
                    fieldIndex: undefined,
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
                    fieldIndex: undefined,
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
                    fieldIndex: undefined,
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
                    fieldIndex: undefined,
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
                    fieldIndex: undefined,
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
                    fieldIndex: undefined,
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