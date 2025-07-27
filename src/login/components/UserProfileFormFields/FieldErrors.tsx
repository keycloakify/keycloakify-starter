import { Fragment } from "react";
import type { FormFieldError } from "../../../@keycloakify/login-ui/useUserProfileForm";

export function FieldErrors(props: {
    displayableErrors: FormFieldError[];
    fieldIndex?: number;
}) {
    const { fieldIndex } = props;

    const displayableErrors = props.displayableErrors.filter(error => error.fieldIndex === fieldIndex);

    if (displayableErrors.length === 0) {
        return null;
    }

    return (
        <>
            {/*
        <span
            id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`}
            className={kcClsx("kcInputErrorMessageClass")}
            aria-live="polite"
        >
        */}
            {displayableErrors
                .map(({ errorMessage }, i, arr) => (
                    <Fragment key={i}>
                        {errorMessage}
                        {arr.length - 1 !== i && <br />}
                    </Fragment>
                ))}
            {/*</span>*/}
        </>
    );
}
