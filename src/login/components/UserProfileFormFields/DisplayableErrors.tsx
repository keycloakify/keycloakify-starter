import { Fragment } from "react";
import type { FormFieldError } from "../../../@keycloakify/login-ui/useUserProfileForm";

type Props = {
    displayableErrors: FormFieldError[];
    fieldIndex?: number;
};

export function DisplayableErrors(props: Props) {
    const { fieldIndex } = props;

    const displayableErrors = props.displayableErrors.filter(error => error.fieldIndex === fieldIndex);

    if (displayableErrors.length === 0) {
        return null;
    }

    return (
        <>
            {displayableErrors.map(({ errorMessage }, i, arr) => (
                <Fragment key={i}>
                    {errorMessage}
                    {arr.length - 1 !== i && <br />}
                </Fragment>
            ))}
        </>
    );
}
