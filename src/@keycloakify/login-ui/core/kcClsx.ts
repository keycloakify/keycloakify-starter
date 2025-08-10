import { createGetKcClsx } from "./getKcClsx";

export type ClassKey =
    | "kcBodyClass"
    | "kcLogoClass"
    | "kcLogoClass"
    | "kcContainerClass"
    | "kcContentClass"
    | "kcHeaderClass"
    | "kcFeedbackAreaClass"
    | "kcLocaleClass"
    | "kcLocaleMainClass"
    | "kcLocaleListClass"
    | "kcLocaleItemClass"
    | "kcFormAreaClass"
    | "kcFormSocialAccountLinkClass"
    | "kcFormSocialAccountSectionClass"
    | "kcFormHeaderClass"
    | "kcFeedbackErrorIcon"
    | "kcFeedbackWarningIcon"
    | "kcFeedbackSuccessIcon"
    | "kcFeedbackInfoIcon"
    | "kcWebAuthnKeyIcon"
    | "kcWebAuthnUnknownIcon"
    | "kcWebAuthnUSB"
    | "kcWebAuthnNFC"
    | "kcWebAuthnBLE"
    | "kcWebAuthnInternal"
    | "kcFormGroupErrorClass"
    | "kcLabelWrapperClass"
    | "kcInputHelperTextBeforeClass"
    | "kcInputHelperTextAfterClass"
    | "kcInputClassRadio"
    | "kcInputClassRadioInput"
    | "kcInputClassRadioLabel"
    | "kcInputClassCheckbox"
    | "kcInputClassCheckboxInput"
    | "kcInputClassCheckboxLabel"
    | "kcInputClassRadioCheckboxLabelDisabled"
    | "kcInputWrapperClass"
    | "kcFormOptionsClass"
    | "kcFormButtonsClass"
    | "kcTextareaClass"
    | "kcFormSettingClass"
    | "kcSignUpClass"
    | "kcInfoAreaClass"
    | "kcFormGroupHeader"
    | "kcButtonDefaultClass"
    | "kcButtonLargeClass"
    | "kcInputLargeClass"
    | "kcSrOnlyClass"
    | "kcSelectAuthListItemIconPropertyClass"
    | "kcSelectAuthListItemArrowClass"
    | "kcSelectAuthListItemArrowIconClass"
    | "kcSelectAuthListItemTitle"
    | "kcAuthenticatorDefaultClass"
    | "kcAuthenticatorPasswordClass"
    | "kcAuthenticatorOTPClass"
    | "kcAuthenticatorWebAuthnClass"
    | "kcAuthenticatorWebAuthnPasswordlessClass"
    | "kcLoginOTPListInputClass"
    | "kcLogoIdP-facebook"
    | "kcLogoIdP-google"
    | "kcLogoIdP-github"
    | "kcLogoIdP-linkedin"
    | "kcLogoIdP-instagram"
    | "kcLogoIdP-microsoft"
    | "kcLogoIdP-bitbucket"
    | "kcLogoIdP-gitlab"
    | "kcLogoIdP-paypal"
    | "kcLogoIdP-stackoverflow"
    | "kcLogoIdP-twitter"
    | "kcLogoIdP-openshift-v4"
    | "kcRecoveryCodesList"
    | "kcRecoveryCodesActions"
    | "kcRecoveryCodesConfirmation"
    | "kcCheckClass"
    | "kcCheckInputClass"
    | "kcCheckLabelClass"
    | "kcFormPasswordVisibilityIconShow"
    | "kcFormPasswordVisibilityIconHide"
    | "kcFormGroupClass"
    | "kcFormGroupLabelClass"
    | "kcFormLabelClass"
    | "kcFormLabelTextClass"
    | "kcLabelClass"
    | "kcInputClass"
    | "kcInputGroup"
    | "kcFormHelperTextClass"
    | "kcInputHelperTextClass"
    | "kcInputHelperTextItemClass"
    | "kcInputHelperTextItemTextClass"
    | "kcInputGroupItemClass"
    | "kcFill"
    | "kcError"
    | "kcLoginFooterBand"
    | "kcLoginFooterBandItem"
    | "kcCheckboxClass"
    | "kcCheckboxInputClass"
    | "kcCheckboxLabelClass"
    | "kcCheckboxLabelRequiredClass"
    | "kcInputRequiredClass"
    | "kcInputErrorMessageClass"
    | "kcFormControlUtilClass"
    | "kcInputErrorIconStatusClass"
    | "kcInputErrorIconClass"
    | "kcAlertClass"
    | "kcAlertIconClass"
    | "kcAlertTitleClass"
    | "kcAlertDescriptionClass"
    | "kcFormPasswordVisibilityButtonClass"
    | "kcFormControlToggleIcon"
    | "kcFormActionGroupClass"
    | "kcFormReadOnlyClass"
    | "kcPanelClass"
    | "kcPanelMainClass"
    | "kcPanelMainBodyClass"
    | "kcListClass"
    | "kcButtonClass"
    | "kcButtonPrimaryClass"
    | "kcButtonSecondaryClass"
    | "kcButtonBlockClass"
    | "kcButtonLinkClass"
    | "kcCommonLogoIdP"
    | "kcFormSocialAccountListClass"
    | "kcFormSocialAccountListItemClass"
    | "kcFormSocialAccountNameClass"
    | "kcFormSocialAccountListButtonClass"
    | "kcFormSocialAccountListButtonDisabledClass"
    | "kcFormSocialAccountListGridClass"
    | "kcFormSocialAccountGridItem"
    | "kcLoginClass"
    | "kcFormClass"
    | "kcFormCardClass"
    | "kcResetFlowIcon"
    | "kcSelectAuthListClass"
    | "kcSelectAuthListItemWrapperClass"
    | "kcSelectAuthListItemClass"
    | "kcSelectAuthListItemHeadingClass"
    | "kcSelectAuthListItemBodyClass"
    | "kcSelectAuthListItemIconClass"
    | "kcSelectAuthListItemFillClass"
    | "kcSelectAuthListItemDescriptionClass"
    | "kcRecoveryCodesWarning"
    | "kcLogin"
    | "kcLoginContainer"
    | "kcLoginMain"
    | "kcLoginMainHeader"
    | "kcLoginMainFooter"
    | "kcLoginMainFooterBand"
    | "kcLoginMainFooterBandItem"
    | "kcLoginMainFooterHelperText"
    | "kcLoginMainTitle"
    | "kcLoginMainHeaderUtilities"
    | "kcLoginMainBody"
    | "kcContentWrapperClass"
    | "kcWebAuthnDefaultIcon"
    | "kcMarginTopClass"
    | "kcLoginOTPListClass"
    | "kcLoginOTPListItemHeaderClass"
    | "kcLoginOTPListItemIconBodyClass"
    | "kcLoginOTPListItemIconClass"
    | "kcLoginOTPListItemTitleClass"
    | "kcLoginOTPListSelectedClass"
    | "kcDarkModeClass"
    | "kcHtmlClass"
    | "kcFormOptionsWrapperClass";

export const { getKcClsx } = createGetKcClsx<ClassKey>({
    defaultClasses: {
        kcBodyClass: undefined,
        kcFormGroupClass: "pf-v5-c-form__group",
        kcFormGroupLabelClass: "pf-v5-c-form__group-label pf-v5-u-pb-xs",
        kcFormLabelClass: "pf-v5-c-form__label",
        kcFormLabelTextClass: "pf-v5-c-form__label-text",

        kcLabelClass: "pf-v5-c-form__label",
        kcInputClass: "pf-v5-c-form-control",
        kcInputGroup: "pf-v5-c-input-group",
        kcFormHelperTextClass: "pf-v5-c-form__helper-text",
        kcInputHelperTextClass:
            "pf-v5-c-helper-text pf-v5-u-display-flex pf-v5-u-justify-content-space-between",
        kcInputHelperTextItemClass: "pf-v5-c-helper-text__item",
        kcInputHelperTextItemTextClass: "pf-v5-c-helper-text__item-text",
        kcInputGroupItemClass: "pf-v5-c-input-group__item",
        kcFill: "pf-m-fill",
        kcError: "pf-m-error",
        kcLoginFooterBand: "pf-v5-c-login__main-footer-band",
        kcLoginFooterBandItem: "pf-v5-c-login__main-footer-band-item",

        kcCheckboxClass: "pf-v5-c-check",
        kcCheckboxInputClass: "pf-v5-c-check__input",
        kcCheckboxLabelClass: "pf-v5-c-check__label",
        kcCheckboxLabelRequiredClass: "pf-v5-c-check__label-required",

        kcInputRequiredClass: "pf-v5-c-form__label-required",
        kcInputErrorMessageClass: "pf-v5-c-helper-text__item-text pf-m-error kc-feedback-text",
        kcFormControlUtilClass: "pf-v5-c-form-control__utilities",
        kcInputErrorIconStatusClass: "pf-v5-c-form-control__icon pf-m-status",
        kcInputErrorIconClass: "fas fa-exclamation-circle",
        kcAlertClass: "pf-v5-c-alert pf-m-inline pf-v5-u-mb-md",
        kcAlertIconClass: "pf-v5-c-alert__icon",
        kcAlertTitleClass: "pf-v5-c-alert__title",
        kcAlertDescriptionClass: "pf-v5-c-alert__description",
        kcFormPasswordVisibilityButtonClass: "pf-v5-c-button pf-m-control",
        kcFormControlToggleIcon: "pf-v5-c-form-control__toggle-icon",
        kcFormActionGroupClass: "pf-v5-c-form__actions pf-v5-u-pt-xs",
        kcFormReadOnlyClass: "pf-m-readonly",

        kcPanelClass: "pf-v5-c-panel pf-m-raised",
        kcPanelMainClass: "pf-v5-c-panel__main",
        kcPanelMainBodyClass: "pf-v5-c-panel__main-body",
        kcListClass: "pf-v5-c-list",

        kcButtonClass: "pf-v5-c-button",
        kcButtonPrimaryClass: "pf-v5-c-button pf-m-primary",
        kcButtonSecondaryClass: "pf-v5-c-button pf-m-secondary",
        kcButtonBlockClass: "pf-m-block",
        kcButtonLinkClass: "pf-v5-c-button pf-m-link",
        kcCommonLogoIdP: "pf-v5-c-login__main-footer-links-item",
        kcFormSocialAccountListClass: "pf-v5-c-login__main-body pf-v5-u-pl-0 pf-v5-u-pr-0",
        kcFormSocialAccountListItemClass: "pf-v5-u-pb-sm",
        kcFormSocialAccountNameClass: "pf-v5-u-m-auto",
        kcFormSocialAccountListButtonClass:
            "pf-v5-c-button pf-m-secondary pf-m-block pf-v5-u-display-flex pf-v5-u-align-items-center pf-v5-u-justify-content-space-between",
        kcFormSocialAccountListButtonDisabledClass: "pf-m-aria-disabled",
        kcFormSocialAccountListGridClass:
            "pf-v5-l-grid pf-m-gutter pf-m-all-6-col-on-xl pf-m-all-6-col-on-sm",
        kcFormSocialAccountGridItem: "pf-v5-l-grid__item",

        kcLoginClass: "pf-v5-c-login__main",
        kcFormClass: "pf-v5-c-form pf-v5-u-w-100",
        kcFormCardClass: "card-pf",

        kcResetFlowIcon: "pf-icon fas fa-share-square",

        kcSelectAuthListClass: "pf-v5-c-data-list select-auth-container",
        kcSelectAuthListItemWrapperClass: "pf-v5-c-data-list__item pf-m-clickable",
        kcSelectAuthListItemClass: "pf-v5-c-data-list__item-row select-auth-box-parent",
        kcSelectAuthListItemHeadingClass: "pf-v5-u-font-family-heading select-auth-box-headline",
        kcSelectAuthListItemBodyClass:
            "pf-v5-c-data-list__cell pf-m-no-fill pf-v5-u-pt-md pf-v5-u-pb-md",
        kcSelectAuthListItemIconClass:
            "pf-v5-c-data-list__cell pf-m-icon pf-v5-u-display-flex pf-v5-u-pt-0 pf-v5-u-align-items-center",
        kcSelectAuthListItemFillClass: "pf-v5-c-data-list__item-action",
        kcSelectAuthListItemDescriptionClass:
            "pf-v5-c-data-list__cell pf-m-no-fill select-auth-box-desc",

        kcRecoveryCodesWarning:
            "pf-v5-c-alert pf-m-warning pf-m-inline pf-v5-u-mb-md kc-recovery-codes-warning",
        kcLogin: "pf-v5-c-login",
        kcLoginContainer: "pf-v5-c-login__container",
        kcLoginMain: "pf-v5-c-login__main",
        kcLoginMainHeader: "pf-v5-c-login__main-header",
        kcLoginMainFooter: "pf-v5-c-login__main-footer",
        kcLoginMainFooterBand: "pf-v5-c-login__main-footer-band",
        kcLoginMainFooterBandItem: "pf-v5-c-login__main-footer-band-item",
        kcLoginMainFooterHelperText: "pf-v5-u-font-size-sm pf-v5-u-color-200",
        kcLoginMainTitle: "pf-v5-c-title pf-m-3xl",
        kcLoginMainHeaderUtilities: "pf-v5-c-login__main-header-utilities",
        kcLoginMainBody: "pf-v5-c-login__main-body",

        kcContentWrapperClass: "pf-v5-u-mb-md-on-md",
        kcWebAuthnDefaultIcon: "pf-v5-c-icon pf-m-lg",
        kcMarginTopClass: "pf-v5-u-mt-md-on-md",

        kcLoginOTPListClass: "pf-v5-c-tile",
        kcLoginOTPListItemHeaderClass: "pf-v5-c-tile__header pf-m-stacked",
        kcLoginOTPListItemIconBodyClass: "pf-v5-c-tile__icon",
        kcLoginOTPListItemIconClass: "fa fa-mobile",
        kcLoginOTPListItemTitleClass: "pf-v5-c-tile__title",
        kcLoginOTPListSelectedClass: "pf-m-selected",

        kcDarkModeClass: "pf-v5-theme-dark",

        kcHtmlClass: "login-pf",

        kcLogoClass: "login-pf-brand",

        kcContainerClass: "container-fluid",
        kcContentClass: "col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3",

        kcHeaderClass: "login-pf-page-header",
        kcFeedbackAreaClass: "col-md-12",
        kcLocaleClass: "col-xs-12 col-sm-1",

        kcLocaleMainClass: "pf-c-dropdown",
        kcLocaleListClass: "pf-c-dropdown__menu pf-m-align-right",
        kcLocaleItemClass: "pf-c-dropdown__menu-item",

        kcFormAreaClass: "col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2",

        kcFormSocialAccountLinkClass: "pf-c-login__main-footer-links-item-link",
        kcFormSocialAccountSectionClass: "kc-social-section kc-social-gray",
        kcFormHeaderClass: "login-pf-header",

        kcFeedbackErrorIcon: "fa fa-fw fa-exclamation-circle",
        kcFeedbackWarningIcon: "fa fa-fw fa-exclamation-triangle",
        kcFeedbackSuccessIcon: "fa fa-fw fa-check-circle",
        kcFeedbackInfoIcon: "fa fa-fw fa-info-circle",

        kcWebAuthnKeyIcon: "pficon pficon-key",
        kcWebAuthnUnknownIcon: "pficon pficon-key unknown-transport-class",
        kcWebAuthnUSB: "fa fa-usb",
        kcWebAuthnNFC: "fa fa-wifi",
        kcWebAuthnBLE: "fa fa-bluetooth-b",
        kcWebAuthnInternal: "pficon pficon-key",

        kcFormGroupErrorClass: "has-error",
        kcLabelWrapperClass: "col-xs-12 col-sm-12 col-md-12 col-lg-12",
        kcInputHelperTextBeforeClass: "pf-c-form__helper-text pf-c-form__helper-text-before",
        kcInputHelperTextAfterClass: "pf-c-form__helper-text pf-c-form__helper-text-after",
        kcInputClassRadio: "pf-c-radio",
        kcInputClassRadioInput: "pf-c-radio__input",
        kcInputClassRadioLabel: "pf-c-radio__label",
        kcInputClassCheckbox: "pf-c-check",
        kcInputClassCheckboxInput: "pf-c-check__input",
        kcInputClassCheckboxLabel: "pf-c-check__label",
        kcInputClassRadioCheckboxLabelDisabled: "pf-m-disabled",
        kcInputWrapperClass: "col-xs-12 col-sm-12 col-md-12 col-lg-12",
        kcFormOptionsClass: "col-xs-12 col-sm-12 col-md-12 col-lg-12",
        kcFormButtonsClass: "col-xs-12 col-sm-12 col-md-12 col-lg-12",
        kcFormSettingClass: "login-pf-settings",
        kcTextareaClass: "form-control",
        kcSignUpClass: "login-pf-signup",

        kcInfoAreaClass: "col-xs-12 col-sm-4 col-md-4 col-lg-5 details",

        kcFormGroupHeader: "pf-c-form__group",

        kcButtonDefaultClass: "btn-default",
        kcButtonLargeClass: "btn-lg",

        kcInputLargeClass: "input-lg",

        kcSrOnlyClass: "sr-only",

        kcSelectAuthListItemIconPropertyClass: "fa-2x select-auth-box-icon-properties",
        kcSelectAuthListItemArrowClass: "pf-l-split__item select-auth-box-arrow",
        kcSelectAuthListItemArrowIconClass: "fa fa-angle-right fa-lg",
        kcSelectAuthListItemTitle: "select-auth-box-paragraph",

        kcAuthenticatorDefaultClass: "fa fa-list list-view-pf-icon-lg",
        kcAuthenticatorPasswordClass: "fa fa-unlock list-view-pf-icon-lg",
        kcAuthenticatorOTPClass: "fa fa-mobile list-view-pf-icon-lg",
        kcAuthenticatorWebAuthnClass: "fa fa-key list-view-pf-icon-lg",
        kcAuthenticatorWebAuthnPasswordlessClass: "fa fa-key list-view-pf-icon-lg",

        kcLoginOTPListInputClass: "pf-c-tile__input",

        "kcLogoIdP-facebook": "fa fa-facebook",
        "kcLogoIdP-google": "fa fa-google",
        "kcLogoIdP-github": "fa fa-github",
        "kcLogoIdP-linkedin": "fa fa-linkedin",
        "kcLogoIdP-instagram": "fa fa-instagram",
        "kcLogoIdP-microsoft": "fa fa-windows",
        "kcLogoIdP-bitbucket": "fa fa-bitbucket",
        "kcLogoIdP-gitlab": "fa fa-gitlab",
        "kcLogoIdP-paypal": "fa fa-paypal",
        "kcLogoIdP-stackoverflow": "fa fa-stack-overflow",
        "kcLogoIdP-twitter": "fa fa-twitter",
        "kcLogoIdP-openshift-v4": "pf-icon pf-icon-openshift",

        kcRecoveryCodesList: "kc-recovery-codes-list",
        kcRecoveryCodesActions: "kc-recovery-codes-actions",
        kcRecoveryCodesConfirmation: "kc-recovery-codes-confirmation",
        kcCheckClass: "pf-c-check",
        kcCheckInputClass: "pf-c-check__input",
        kcCheckLabelClass: "pf-c-check__label",

        kcFormPasswordVisibilityIconShow: "fa fa-eye",
        kcFormPasswordVisibilityIconHide: "fa fa-eye-slash",

        kcFormOptionsWrapperClass: undefined
    }
});

export type KcClsx = ReturnType<typeof getKcClsx>["kcClsx"];
