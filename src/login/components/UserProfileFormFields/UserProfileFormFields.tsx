import type { JSX } from "keycloakify/tools/JSX";
import { useEffect, Fragment } from "react";
import {
    useUserProfileForm,
    type FormAction,
    type FormFieldError
} from "../../_internals/useUserProfileForm";
import { GroupLabel } from "./GroupLabel";
import { FieldErrors } from "./FieldErrors";
import { InputFieldByType } from "./InputFieldByType";
import type { Attribute } from "../../_internals/KcContext";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { useKcClsx } from "../../_internals/useKcClsx";
import { DO_MAKE_USER_CONFIRM_PASSWORD } from "./DO_MAKE_USER_CONFIRM_PASSWORD";
import { assert } from "tsafe/assert";

export type UserProfileFormFieldsProps = {
    onIsFormSubmittableValueChange: (isFormSubmittable: boolean) => void;
    BeforeField?: (props: BeforeAfterFieldProps) => JSX.Element | null;
    AfterField?: (props: BeforeAfterFieldProps) => JSX.Element | null;
};

type BeforeAfterFieldProps = {
    attribute: Attribute;
    dispatchFormAction: React.Dispatch<FormAction>;
    displayableErrors: FormFieldError[];
    valueOrValues: string | string[];
};


export function UserProfileFormFields(props: UserProfileFormFieldsProps) {
    const { onIsFormSubmittableValueChange, BeforeField, AfterField } = props;

    const { kcContext } = useKcContext();

    assert("profile" in kcContext);

    const i18n = useI18n();

    const { advancedMsg } = i18n;

    const {
        formState: { formFieldStates, isFormSubmittable },
        dispatchFormAction
    } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword: DO_MAKE_USER_CONFIRM_PASSWORD,
    });

    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);

    const { kcClsx } = useKcClsx();

    const groupNameRef = { current: "" };

    return (
        <>
            {formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => {
                return (
                    <Fragment key={attribute.name}>
                        <GroupLabel
                            attribute={attribute}
                            groupNameRef={groupNameRef}
                        />
                        {BeforeField !== undefined && (
                            <BeforeField
                                attribute={attribute}
                                dispatchFormAction={dispatchFormAction}
                                displayableErrors={displayableErrors}
                                valueOrValues={valueOrValues}
                            />
                        )}
                        <div
                            className={kcClsx("kcFormGroupClass")}
                            style={{
                                display:
                                    attribute.annotations.inputType === "hidden"
                                        ? "none"
                                        : undefined
                            }}
                        >
                            <div className={kcClsx("kcLabelWrapperClass")}>
                                <label
                                    htmlFor={attribute.name}
                                    className={kcClsx("kcLabelClass")}
                                >
                                    {advancedMsg(attribute.displayName ?? "")}
                                </label>
                                {attribute.required && <> *</>}
                            </div>
                            <div className={kcClsx("kcInputWrapperClass")}>
                                {attribute.annotations.inputHelperTextBefore !==
                                    undefined && (
                                    <div
                                        className={kcClsx("kcInputHelperTextBeforeClass")}
                                        id={`form-help-text-before-${attribute.name}`}
                                        aria-live="polite"
                                    >
                                        {advancedMsg(
                                            attribute.annotations.inputHelperTextBefore
                                        )}
                                    </div>
                                )}
                                <InputFieldByType
                                    attribute={attribute}
                                    valueOrValues={valueOrValues}
                                    displayableErrors={displayableErrors}
                                    dispatchFormAction={dispatchFormAction}
                                />
                                <FieldErrors
                                    attribute={attribute}
                                    displayableErrors={displayableErrors}
                                    fieldIndex={undefined}
                                />
                                {attribute.annotations.inputHelperTextAfter !==
                                    undefined && (
                                    <div
                                        className={kcClsx("kcInputHelperTextAfterClass")}
                                        id={`form-help-text-after-${attribute.name}`}
                                        aria-live="polite"
                                    >
                                        {advancedMsg(
                                            attribute.annotations.inputHelperTextAfter
                                        )}
                                    </div>
                                )}
                                {AfterField !== undefined && (
                                    <AfterField
                                        attribute={attribute}
                                        dispatchFormAction={dispatchFormAction}
                                        displayableErrors={displayableErrors}
                                        valueOrValues={valueOrValues}
                                    />
                                )}
                                {/* NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook */}
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </>
    );
}









