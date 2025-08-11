import type { JSX } from "./tools/JSX";
import { useEffect, useState, useMemo, Fragment } from "react";
import { assert, type Equals } from "tsafe/assert";
export { getButtonToDisplayForMultivaluedAttributeField } from "./core/userProfileApi/index";
import type { MessageKey_defaultSet } from "./i18n";
import type { GenericI18n } from "./i18n/GenericI18n";
import type { Attribute, Validators } from "./core/userProfileApi/index";
import * as coreApi from "./core/userProfileApi/index";

type I18n = GenericI18n<MessageKey_defaultSet, string>;

export type FormFieldError = {
    errorMessage: JSX.Element;
    errorMessageStr: string;
    source: FormFieldError.Source;
    fieldIndex: number | undefined;
};

export namespace FormFieldError {
    export type Source = Source.Validator | Source.Other;

    export namespace Source {
        export type Validator = {
            type: "validator";
            name: keyof Validators;
        };
        export type Other = {
            type: "server" | "required field";
        };

    }
}

{
    type A = Omit<FormFieldError, "errorMessage" | "errorMessageStr">;
    type B = Omit<coreApi.FormFieldError, "advancedMsgArgs">;

    assert<Equals<A, B>>();
}


{
    type A = FormFieldError.Source;
    type B = coreApi.FormFieldError.Source;

    assert<Equals<A, B>>();
}

export type FormFieldState = {
    attribute: Attribute;
    displayableErrors: FormFieldError[];
    valueOrValues: string | string[];
};

{
    type A = Omit<FormFieldState, "displayableErrors">;
    type B = Omit<coreApi.FormFieldState, "displayableErrors">;

    assert<Equals<A, B>>();
}

export type FormState = {
    areAllChecksPassed: boolean;
    formFieldStates: FormFieldState[];
};

{
    type A = Omit<FormState, "formFieldStates">;
    type B = Omit<coreApi.FormState, "formFieldStates">;

    assert<Equals<A, B>>();
}

export type FormAction =
    | {
          action: "update";
          name: string;
          valueOrValues: string | string[];
          /** Default false */
          displayErrorsImmediately?: boolean;
      }
    | {
          action: "focus lost";
          name: string;
          fieldIndex: number | undefined;
      };

{
    type A = FormAction;
    type B = coreApi.FormAction;

    assert<Equals<A, B>>();
}

export type KcContextLike = coreApi.KcContextLike;

export type I18nLike = Pick<I18n, "advancedMsg" | "advancedMsgStr">;

export type ParamsOfUseUserProfileForm = {
    kcContext: KcContextLike;
    i18n: I18nLike;
};

{
    type A = Omit<ParamsOfUseUserProfileForm, "i18n">;
    type B = coreApi.ParamsOfGetUserProfileApi;

    assert<Equals<A, B>>();
}

export type ReturnTypeOfUseUserProfileForm = {
    formState: FormState;
    dispatchFormAction: (action: FormAction) => void;
    userProfileApi: coreApi.UserProfileApi;
};

export function useUserProfileForm(params: ParamsOfUseUserProfileForm): ReturnTypeOfUseUserProfileForm {
    const { i18n, kcContext } = params;

    const api = coreApi.getUserProfileApi({ kcContext });

    const [formState_reactless, setFormState_reactless] = useState(() => api.getFormState());

    useEffect(() => {
        const { unsubscribe } = api.subscribeToFormState(() => {
            setFormState_reactless(api.getFormState());
        });

        return () => unsubscribe();
    }, [api]);

    const { advancedMsg, advancedMsgStr } = i18n;

    const formState = useMemo(
        (): FormState => ({
            areAllChecksPassed: formState_reactless.areAllChecksPassed,
            formFieldStates: formState_reactless.formFieldStates.map(formFieldState_reactless => ({
                attribute: formFieldState_reactless.attribute,
                valueOrValues: formFieldState_reactless.valueOrValues,
                displayableErrors: formFieldState_reactless.displayableErrors.map(
                    (formFieldError_reactless, i) => ({
                        errorMessage: (
                            <Fragment key={`${formFieldState_reactless.attribute.name}-${i}`}>
                                {advancedMsg(...formFieldError_reactless.advancedMsgArgs)}
                            </Fragment>
                        ),
                        errorMessageStr: advancedMsgStr(...formFieldError_reactless.advancedMsgArgs),
                        source: formFieldError_reactless.source,
                        fieldIndex: formFieldError_reactless.fieldIndex
                    })
                )
            }))
        }),
        [formState_reactless]
    );

    return {
        formState,
        dispatchFormAction: api.dispatchFormAction,
        userProfileApi: api
    };
}
