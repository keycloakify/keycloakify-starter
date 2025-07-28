import { assert } from "tsafe/assert";
import { DisplayableErrors } from "./DisplayableErrors";
import type { InputFieldByTypeProps } from "./InputFieldByType";
import { AddRemoveButtonsMultiValuedAttribute } from "./AddRemoveButtonsMultiValuedAttribute";
import { useI18n } from "../../i18n";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { ErrorContainer } from "../field/Group/ErrorContainer";
import { PasswordWrapperInner } from "../field/Password/PasswordWrapperInner";

export function InputTag(
    props: InputFieldByTypeProps & {
        fieldIndex?: number;
    }
) {
    const { attribute, fieldIndex, dispatchFormAction, valueOrValues, displayableErrors } = props;

    const { advancedMsgStr } = useI18n();
    const { kcClsx } = useKcClsx();

    const inputProps = {
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
        "aria-invalid": displayableErrors.find(error => error.fieldIndex === fieldIndex) !== undefined,
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
    } satisfies React.ComponentProps<"input">;

    return (
        <>
            {(() => {
                if (attribute.name === "password" || attribute.name === "password-confirm") {
                    return (
                        <PasswordWrapperInner
                            hasError={inputProps["aria-invalid"]}
                            inputId={inputProps.id}
                            renderInput={inputProps_password => (
                                <input {...inputProps} {...inputProps_password} />
                            )}
                        />
                    );
                }

                return (
                    <span className={kcClsx("kcInputClass", inputProps["aria-invalid"] && "kcError")}>
                        <input {...inputProps} />
                    </span>
                );
            })()}
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
