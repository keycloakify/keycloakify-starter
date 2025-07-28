/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "login/components/UserProfileFormFields/InputFieldByType.tsx" --revert
 */

import { TextareaTag } from "./TextareaTag";
import { SelectTag } from "./SelectTag";
import { InputTagSelects } from "./InputTagSelects";
import { InputTag } from "./InputTag";
import type { FormAction, FormFieldError } from "../../../@keycloakify/login-ui/useUserProfileForm";
import type { Attribute } from "../../../@keycloakify/login-ui/KcContext";
import { PasswordWrapperInner } from "../field/Password/PasswordWrapperInner";

export type InputFieldByTypeProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
};

export function InputFieldByType(props: InputFieldByTypeProps) {
    const { attribute, valueOrValues } = props;

    switch (attribute.annotations.inputType) {
        // NOTE: Unfortunately, keycloak won't let you define input type="hidden" in the Admin Console.
        // sometimes in the future it might.
        case "hidden":
            return <input type="hidden" name={attribute.name} value={valueOrValues} />;
        case "textarea":
            return <TextareaTag {...props} />;
        case "select":
        case "multiselect":
            return <SelectTag {...props} />;
        case "select-radiobuttons":
        case "multiselect-checkboxes":
            return <InputTagSelects {...props} />;
        default: {
            if (valueOrValues instanceof Array) {
                return (
                    <>
                        {valueOrValues.map((...[, i]) => (
                            <InputTag key={i} {...props} fieldIndex={i} />
                        ))}
                    </>
                );
            }

            const inputNode = <InputTag {...props} fieldIndex={undefined} />;

            if (attribute.name === "password" || attribute.name === "password-confirm") {
                return (
                    <InputTag
                        {...props}
                        renderInput={inputProps => (
                            <PasswordWrapperInner
                                inputId={inputProps.id}
                                hasError={inputProps["aria-invalid"]}
                                renderInput={inputProps_password => (
                                    <input {...inputProps} {...inputProps_password} />
                                )}
                            />
                        )}
                    />
                );
            }

            return <InputTag {...props} />;

            return inputNode;
        }
    }
}
