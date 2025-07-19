/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/components/UserProfileFormFields/InputTagSelects.tsx" --revert
 */

import { assert } from "tsafe/assert";
import type { InputFieldByTypeProps } from "./InputFieldByType";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { InputLabel } from "./InputLabel";

export function InputTagSelects(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, valueOrValues } = props;

    const { kcClsx } = useKcClsx();

    const { classDiv, classInput, classLabel, inputType } = (() => {
        const { inputType } = attribute.annotations;

        assert(inputType === "select-radiobuttons" || inputType === "multiselect-checkboxes");

        switch (inputType) {
            case "select-radiobuttons":
                return {
                    inputType: "radio",
                    classDiv: kcClsx("kcInputClassRadio"),
                    classInput: kcClsx("kcInputClassRadioInput"),
                    classLabel: kcClsx("kcInputClassRadioLabel")
                };
            case "multiselect-checkboxes":
                return {
                    inputType: "checkbox",
                    classDiv: kcClsx("kcInputClassCheckbox"),
                    classInput: kcClsx("kcInputClassCheckboxInput"),
                    classLabel: kcClsx("kcInputClassCheckboxLabel")
                };
        }
    })();

    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;

            if (inputOptionsFromValidation === undefined) {
                break walk;
            }

            const validator = (attribute.validators as Record<string, { options?: string[] }>)[
                inputOptionsFromValidation
            ];

            if (validator === undefined) {
                break walk;
            }

            if (validator.options === undefined) {
                break walk;
            }

            return validator.options;
        }

        return attribute.validators.options?.options ?? [];
    })();

    return (
        <>
            {options.map(option => (
                <div key={option} className={classDiv}>
                    <input
                        type={inputType}
                        id={`${attribute.name}-${option}`}
                        name={attribute.name}
                        value={option}
                        className={classInput}
                        aria-invalid={props.displayableErrors.length !== 0}
                        disabled={attribute.readOnly}
                        checked={
                            valueOrValues instanceof Array
                                ? valueOrValues.includes(option)
                                : valueOrValues === option
                        }
                        onChange={event =>
                            dispatchFormAction({
                                action: "update",
                                name: attribute.name,
                                valueOrValues: (() => {
                                    const isChecked = event.target.checked;

                                    if (valueOrValues instanceof Array) {
                                        const newValues = [...valueOrValues];

                                        if (isChecked) {
                                            newValues.push(option);
                                        } else {
                                            newValues.splice(newValues.indexOf(option), 1);
                                        }

                                        return newValues;
                                    }

                                    return event.target.checked ? option : "";
                                })()
                            })
                        }
                        onBlur={() =>
                            dispatchFormAction({
                                action: "focus lost",
                                name: attribute.name,
                                fieldIndex: undefined
                            })
                        }
                    />
                    <label
                        htmlFor={`${attribute.name}-${option}`}
                        className={`${classLabel}${attribute.readOnly ? ` ${kcClsx("kcInputClassRadioCheckboxLabelDisabled")}` : ""}`}
                    >
                        <InputLabel attribute={attribute} option={option} />
                    </label>
                </div>
            ))}
        </>
    );
}
