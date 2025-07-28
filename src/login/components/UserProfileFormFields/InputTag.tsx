import type { ReactNode } from "react";
import { assert } from "tsafe/assert";
import { DisplayableErrors } from "./DisplayableErrors";
import type { InputFieldByTypeProps } from "./InputFieldByType";
import { AddRemoveButtonsMultiValuedAttribute } from "./AddRemoveButtonsMultiValuedAttribute";
import { useI18n } from "../../i18n";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { ErrorContainer } from "../field/Group/ErrorContainer";

export function InputTag(
    props: InputFieldByTypeProps & {
        fieldIndex?: number;
        renderInput?: (
            inputProps: {
                type: string;
                id: string;
                name: string;
                value: string;
                className: string;
                "aria-invalid": boolean;
                disabled: boolean;
                autoComplete: string | undefined;
                placeholder: string | undefined;
                pattern: string | undefined;
                size: number | undefined;
                maxLength: number | undefined;
                minLength: number | undefined;
                max: string | undefined;
                min: string | undefined;
                step: string | undefined;
                onChange: NonNullable<React.ComponentProps<"input">["onChange"]>;
                onBlur: NonNullable<React.ComponentProps<"input">["onBlur"]>;
            } & {
                [key in `data-${string}`]: string;
            }
        ) => ReactNode;
    }
) {
    const { attribute, fieldIndex, dispatchFormAction, valueOrValues, displayableErrors, renderInput = inputProps => <input {...inputProps} /> } =
        props;

    const { advancedMsgStr } = useI18n();
    const { kcClsx } = useKcClsx();

    return (
        <>
            {renderInput({
                type: (() => {
                    const { inputType } = attribute.annotations;

                    if (inputType?.startsWith("html5-")) {
                        return inputType.slice(6);
                    }

                    return inputType ?? "text";
                })(),
                id: attribute.name,
                name: attribute.name,
                value: (() => {
                    if (fieldIndex !== undefined) {
                        assert(valueOrValues instanceof Array);
                        return valueOrValues[fieldIndex];
                    }

                    assert(typeof valueOrValues === "string");

                    return valueOrValues;
                })(),
                className: kcClsx("kcInputClass"),
                "aria-invalid":
                    displayableErrors.find(error => error.fieldIndex === fieldIndex) !== undefined,
                disabled: attribute.readOnly,
                autoComplete: attribute.autocomplete,
                placeholder:
                    attribute.annotations.inputTypePlaceholder === undefined
                        ? undefined
                        : advancedMsgStr(attribute.annotations.inputTypePlaceholder),
                pattern: attribute.annotations.inputTypePattern,
                size:
                    attribute.annotations.inputTypeSize === undefined
                        ? undefined
                        : parseInt(`${attribute.annotations.inputTypeSize}`),
                maxLength:
                    attribute.annotations.inputTypeMaxlength === undefined
                        ? undefined
                        : parseInt(`${attribute.annotations.inputTypeMaxlength}`),
                minLength:
                    attribute.annotations.inputTypeMinlength === undefined
                        ? undefined
                        : parseInt(`${attribute.annotations.inputTypeMinlength}`),
                max: attribute.annotations.inputTypeMax,
                min: attribute.annotations.inputTypeMin,
                step: attribute.annotations.inputTypeStep,
                ...Object.fromEntries(
                    Object.entries(attribute.html5DataAnnotations ?? {}).map(([key, value]) => [
                        `data-${key}`,
                        value
                    ])
                ),
                onChange: event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            if (fieldIndex !== undefined) {
                                assert(valueOrValues instanceof Array);

                                return valueOrValues.map((value, i) => {
                                    if (i === fieldIndex) {
                                        return event.target.value;
                                    }

                                    return value;
                                });
                            }

                            return event.target.value;
                        })()
                    }),

                onBlur: () =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: fieldIndex
                    })
            })}
            {(() => {
                if (fieldIndex === undefined) {
                    return null;
                }

                assert(valueOrValues instanceof Array);

                const values = valueOrValues;

                return (
                    <>
                        <ErrorContainer name={fieldIndex === undefined ? "" : `-${fieldIndex}`}>
                            <DisplayableErrors
                                displayableErrors={displayableErrors}
                                fieldIndex={fieldIndex}
                            />
                        </ErrorContainer>
                        <AddRemoveButtonsMultiValuedAttribute
                            attribute={attribute}
                            values={values}
                            fieldIndex={fieldIndex}
                            dispatchFormAction={dispatchFormAction}
                        />
                    </>
                );
            })()}
        </>
    );
}
