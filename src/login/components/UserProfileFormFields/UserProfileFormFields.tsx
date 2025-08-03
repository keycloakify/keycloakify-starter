import { useEffect, Fragment, type ReactNode } from "react";
import {
    useUserProfileForm,
    type ReturnTypeOfUseUserProfileForm
} from "../../../@keycloakify/login-ui/useUserProfileForm";
import { GroupLabel } from "./GroupLabel";
import { DisplayableErrors } from "./DisplayableErrors";
import { InputFieldByType } from "./InputFieldByType";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { assert } from "tsafe/assert";
import { Group } from "../field/Group";

export type UserProfileFormFieldsProps = {
    onAreAllChecksPassedValueChange: (areAllChecksPassed: boolean) => void;
    renderBeforeField?: (props: ParamsOfBeforeAfterFields) => ReactNode;
    renderAfterField?: (props: ParamsOfBeforeAfterFields) => ReactNode;
};

type ParamsOfBeforeAfterFields = {
    attributeName: string;
    userProfileForm: ReturnTypeOfUseUserProfileForm;
};

export function UserProfileFormFields(props: UserProfileFormFieldsProps) {
    const { onAreAllChecksPassedValueChange, renderBeforeField, renderAfterField } = props;

    const { kcContext } = useKcContext();

    assert("profile" in kcContext);

    const i18n = useI18n();

    const { advancedMsg } = i18n;

    const userProfileForm = useUserProfileForm({
        kcContext,
        i18n
    });
    const {
        formState: { formFieldStates, areAllChecksPassed },
        dispatchFormAction
    } = userProfileForm;

    useEffect(() => {
        onAreAllChecksPassedValueChange(areAllChecksPassed);
    }, [areAllChecksPassed]);

    const { kcClsx } = useKcClsx();

    const groupNameRef = { current: "" };

    return (
        <>
            {formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => {
                return (
                    <Fragment key={attribute.name}>
                        <GroupLabel attribute={attribute} groupNameRef={groupNameRef} />
                        {renderBeforeField?.({
                            userProfileForm,
                            attributeName: attribute.name
                        }) ?? null}

                        <Group
                            inputId={attribute.name}
                            label={advancedMsg(attribute.displayName ?? "")}
                            required={attribute.required}
                            style={{
                                display:
                                    attribute.annotations.inputType === "hidden" ? "none" : undefined
                            }}
                            error={<DisplayableErrors displayableErrors={displayableErrors} />}
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
                        </Group>
                        {renderAfterField?.({
                            userProfileForm,
                            attributeName: attribute.name
                        }) ?? null}
                        {/* NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook */}
                    </Fragment>
                );
            })}
        </>
    );
}
