/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "login/components/UserProfileFormFields/UserProfileFormFields.tsx" --revert
 */

import { useEffect, Fragment, type ReactNode } from "react";
import {
    useUserProfileForm,
    type FormAction,
    type FormFieldError
} from "../../../@keycloakify/login-ui/useUserProfileForm";
import { GroupLabel } from "./GroupLabel";
import { FieldErrors } from "./FieldErrors";
import { InputFieldByType } from "./InputFieldByType";
import type { Attribute } from "../../../@keycloakify/login-ui/KcContext";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { DO_MAKE_USER_CONFIRM_PASSWORD } from "./DO_MAKE_USER_CONFIRM_PASSWORD";
import { assert } from "tsafe/assert";
import { FieldGroup } from "../FieldGroup";

export type UserProfileFormFieldsProps = {
    onIsFormSubmittableValueChange: (isFormSubmittable: boolean) => void;
    renderBeforeField?: (props: ParamsOfBeforeAfterFields) => ReactNode;
    renderAfterField?: (props: ParamsOfBeforeAfterFields) => ReactNode;
};

type ParamsOfBeforeAfterFields = {
    attribute: Attribute;
    dispatchFormAction: React.Dispatch<FormAction>;
    displayableErrors: FormFieldError[];
    valueOrValues: string | string[];
};

export function UserProfileFormFields(props: UserProfileFormFieldsProps) {
    const { onIsFormSubmittableValueChange, renderBeforeField, renderAfterField } = props;

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
        doMakeUserConfirmPassword: DO_MAKE_USER_CONFIRM_PASSWORD
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
                        <GroupLabel attribute={attribute} groupNameRef={groupNameRef} />
                        {renderBeforeField?.({
                            attribute,
                            dispatchFormAction,
                            displayableErrors,
                            valueOrValues
                        }) ?? null}

                        <FieldGroup
                            name={`${attribute.name}`}
                            label={advancedMsg(attribute.displayName ?? "")}
                            required={attribute.required}
                            style={{
                                display:
                                    attribute.annotations.inputType === "hidden" ? "none" : undefined
                            }}
                            error={<FieldErrors displayableErrors={displayableErrors} />}
                        >
                            {attribute.annotations.inputHelperTextBefore && (
                                <div
                                    className={kcClsx("kcInputHelperTextBeforeClass")}
                                    id={`form-help-text-before-${attribute.name}`}
                                    aria-live="polite"
                                >
                                    {advancedMsg(attribute.annotations.inputHelperTextBefore)}
                                </div>
                            )}
                            <InputFieldByType
                                attribute={attribute}
                                valueOrValues={valueOrValues}
                                displayableErrors={displayableErrors}
                                dispatchFormAction={dispatchFormAction}
                            />
                            {attribute.annotations.inputHelperTextAfter && (
                                <div
                                    className={kcClsx("kcInputHelperTextAfterClass")}
                                    id={`form-help-text-after-${attribute.name}`}
                                    aria-live="polite"
                                >
                                    {advancedMsg(attribute.annotations.inputHelperTextAfter)}
                                </div>
                            )}
                        </FieldGroup>
                        {renderAfterField?.({
                            attribute,
                            dispatchFormAction,
                            displayableErrors,
                            valueOrValues
                        }) ?? null}
                        {/* NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook */}
                    </Fragment>
                );
            })}
        </>
    );
}
