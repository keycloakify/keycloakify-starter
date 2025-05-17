import { Fragment } from "react";
import type { FormFieldError } from "../../_internals/useUserProfileForm";
import type { Attribute } from "../../_internals/KcContext";
import { useKcClsx } from "../../_internals/useKcClsx";

export function FieldErrors(props: {
    attribute: Attribute;
    displayableErrors: FormFieldError[];
    fieldIndex: number | undefined;
}) {
    const { attribute, fieldIndex } = props;

    const displayableErrors = props.displayableErrors.filter(
        error => error.fieldIndex === fieldIndex
    );

    const { kcClsx } = useKcClsx();

    if (displayableErrors.length === 0) {
        return null;
    }

    return (
        <span
            id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`}
            className={kcClsx("kcInputErrorMessageClass")}
            aria-live="polite"
        >
            {displayableErrors
                .filter(error => error.fieldIndex === fieldIndex)
                .map(({ errorMessage }, i, arr) => (
                    <Fragment key={i}>
                        {errorMessage}
                        {arr.length - 1 !== i && <br />}
                    </Fragment>
                ))}
        </span>
    );
}
