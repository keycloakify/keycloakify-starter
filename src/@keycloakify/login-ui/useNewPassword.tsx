import type { JSX } from "./tools/JSX";
import type { PasswordPolicies } from "./core/KcContext/KcContext";
import { useEffect, useState, useMemo, Fragment } from "react";
import { assert, type Equals } from "tsafe/assert";
import type { MessageKey_defaultSet } from "./i18n";
import type { GenericI18n } from "./i18n/GenericI18n";
import * as coreApi from "./core/newPasswordApi/index";
import * as userProfileForm from "./useUserProfileForm";

type I18n = GenericI18n<MessageKey_defaultSet, string>;

export type FormFieldError = {
    errorMessage: JSX.Element;
    errorMessageStr: string;
    source: FormFieldError.Source;
};

{
    type A = Omit<FormFieldError, "errorMessage" | "errorMessageStr">;
    type B = Omit<coreApi.FormFieldError, "advancedMsgArgs">;

    assert<Equals<A, B>>();
}

export namespace FormFieldError {
    export type Source = Source.PasswordPolicy | Source.Other | Source.Server;

    export namespace Source {
        export type PasswordPolicy = {
            type: "passwordPolicy";
            name: keyof PasswordPolicies;
        };

        export type Other = {
            type: "passwordConfirmMatchesPassword";
        };

        export type Server = {
            type: "server";
        };
    }
}

{
    type A = FormFieldError.Source;
    type B = coreApi.FormFieldError.Source;

    assert<Equals<A, B>>();
}

export type FormFieldState = {
    attribute: coreApi.Attribute;
    displayableErrors: FormFieldError[];
    value: string;
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
          name: "password" | "password-confirm";
          value: string;
          /** Default false */
          displayErrorsImmediately?: boolean;
      }
    | {
          action: "focus lost";
          name: string;
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
    requirePasswordConfirmation: boolean;
    userProfileApi: coreApi.UserProfileApiLike | undefined;
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
};

export function useNewPassword(params: ParamsOfUseUserProfileForm): ReturnTypeOfUseUserProfileForm {
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
        dispatchFormAction: api.dispatchFormAction
    };
}
