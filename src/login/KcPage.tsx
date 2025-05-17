import { Suspense, lazy } from "react";
import { KcContext, KcContextProvider } from "./KcContext";
import { I18nProvider } from "./i18n";
import { KcClsxProvider, type ClassKey } from "./_internals/useKcClsx";
import { assert, type Equals } from "tsafe/assert";

const classes = {} satisfies { [key in ClassKey]?: string };

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    return (
        <KcContextProvider kcContext={kcContext}>
            <KcClsxProvider doUseDefaultCss={true} classes={classes}>
                <I18nProvider kcContext={kcContext}>
                    <Suspense>
                        <Page kcContext={kcContext} />
                    </Suspense>
                </I18nProvider>
            </KcClsxProvider>
        </KcContextProvider>
    );
}

const Page_login = lazy(() => import("./pages/login"));
const Page_register = lazy(() => import("./pages/register"));
const Page_info = lazy(() => import("./pages/info"));
const Page_error = lazy(() => import("./pages/error"));
const Page_login_reset_password = lazy(() => import("./pages/login-reset-password"));
const Page_login_verify_email = lazy(() => import("./pages/login-verify-email"));
const Page_terms = lazy(() => import("./pages/terms"));
const Page_login_oauth2_device_verify_user_code = lazy(
    () => import("./pages/login-oauth2-device-verify-user-code")
);
const Page_login_oauth_grant = lazy(() => import("./pages/login-oauth-grant"));
const Page_login_otp = lazy(() => import("./pages/login-otp"));
const Page_login_password = lazy(() => import("./pages/login-password"));
const Page_login_username = lazy(() => import("./pages/login-username"));
const Page_webauthn_authenticate = lazy(() => import("./pages/webauthn-authenticate"));
const Page_webauthn_register = lazy(() => import("./pages/webauthn-register"));
const Page_login_update_password = lazy(() => import("./pages/login-update-password"));
const Page_login_update_profile = lazy(() => import("./pages/login-update-profile"));
const Page_login_idp_link_confirm = lazy(() => import("./pages/login-idp-link-confirm"));
const Page_login_page_expired = lazy(() => import("./pages/login-page-expired"));
const Page_login_idp_link_email = lazy(() => import("./pages/login-idp-link-email"));
const Page_login_config_totp = lazy(() => import("./pages/login-config-totp"));
const Page_logout_confirm = lazy(() => import("./pages/logout-confirm"));
const Page_idp_review_user_profile = lazy(
    () => import("./pages/idp-review-user-profile")
);
const Page_update_email = lazy(() => import("./pages/update-email"));
const Page_select_authenticator = lazy(() => import("./pages/select-authenticator"));
const Page_saml_post_form = lazy(() => import("./pages/saml-post-form"));
const Page_delete_credential = lazy(() => import("./pages/delete-credential"));
const Page_code = lazy(() => import("./pages/code"));
const Page_delete_account_confirm = lazy(() => import("./pages/delete-account-confirm"));
const Page_frontchannel_logout = lazy(() => import("./pages/frontchannel-logout"));
const Page_login_recovery_authn_code_config = lazy(
    () => import("./pages/login-recovery-authn-code-config")
);
const Page_login_recovery_authn_code_input = lazy(
    () => import("./pages/login-recovery-authn-code-input")
);
const Page_login_reset_otp = lazy(() => import("./pages/login-reset-otp"));
const Page_login_x509_info = lazy(() => import("./pages/login-x509-info"));
const Page_webauthn_error = lazy(() => import("./pages/webauthn-error"));
const Page_login_passkeys_conditional_authenticate = lazy(
    () => import("./pages/login-passkeys-conditional-authenticate")
);
const Page_login_idp_link_confirm_override = lazy(
    () => import("./pages/login-idp-link-confirm-override")
);

function Page(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    switch (kcContext.pageId) {
        case "login.ftl":
            return <Page_login kcContext={kcContext} />;
        case "register.ftl":
            return (
                <Page_register kcContext={kcContext} doMakeUserConfirmPassword={true} />
            );
        case "info.ftl":
            return <Page_info kcContext={kcContext} />;
        case "error.ftl":
            return <Page_error kcContext={kcContext} />;
        case "login-reset-password.ftl":
            return <Page_login_reset_password kcContext={kcContext} />;
        case "login-verify-email.ftl":
            return <Page_login_verify_email kcContext={kcContext} />;
        case "terms.ftl":
            return <Page_terms kcContext={kcContext} />;
        case "login-oauth2-device-verify-user-code.ftl":
            return <Page_login_oauth2_device_verify_user_code kcContext={kcContext} />;
        case "login-oauth-grant.ftl":
            return <Page_login_oauth_grant kcContext={kcContext} />;
        case "login-otp.ftl":
            return <Page_login_otp kcContext={kcContext} />;
        case "login-username.ftl":
            return <Page_login_username kcContext={kcContext} />;
        case "login-password.ftl":
            return <Page_login_password kcContext={kcContext} />;
        case "webauthn-authenticate.ftl":
            return <Page_webauthn_authenticate kcContext={kcContext} />;
        case "webauthn-register.ftl":
            return <Page_webauthn_register kcContext={kcContext} />;
        case "login-update-password.ftl":
            return <Page_login_update_password kcContext={kcContext} />;
        case "login-update-profile.ftl":
            return <Page_login_update_profile kcContext={kcContext} />;
        case "login-idp-link-confirm.ftl":
            return <Page_login_idp_link_confirm kcContext={kcContext} />;
        case "login-idp-link-email.ftl":
            return <Page_login_idp_link_email kcContext={kcContext} />;
        case "login-page-expired.ftl":
            return <Page_login_page_expired kcContext={kcContext} />;
        case "login-config-totp.ftl":
            return <Page_login_config_totp kcContext={kcContext} />;
        case "logout-confirm.ftl":
            return <Page_logout_confirm kcContext={kcContext} />;
        case "idp-review-user-profile.ftl":
            return <Page_idp_review_user_profile kcContext={kcContext} />;
        case "update-email.ftl":
            return <Page_update_email kcContext={kcContext} />;
        case "select-authenticator.ftl":
            return <Page_select_authenticator kcContext={kcContext} />;
        case "saml-post-form.ftl":
            return <Page_saml_post_form kcContext={kcContext} />;
        case "delete-credential.ftl":
            return <Page_delete_credential kcContext={kcContext} />;
        case "code.ftl":
            return <Page_code kcContext={kcContext} />;
        case "delete-account-confirm.ftl":
            return <Page_delete_account_confirm kcContext={kcContext} />;
        case "frontchannel-logout.ftl":
            return <Page_frontchannel_logout kcContext={kcContext} />;
        case "login-recovery-authn-code-config.ftl":
            return <Page_login_recovery_authn_code_config kcContext={kcContext} />;
        case "login-recovery-authn-code-input.ftl":
            return <Page_login_recovery_authn_code_input kcContext={kcContext} />;
        case "login-reset-otp.ftl":
            return <Page_login_reset_otp kcContext={kcContext} />;
        case "login-x509-info.ftl":
            return <Page_login_x509_info kcContext={kcContext} />;
        case "webauthn-error.ftl":
            return <Page_webauthn_error kcContext={kcContext} />;
        case "login-passkeys-conditional-authenticate.ftl":
            return <Page_login_passkeys_conditional_authenticate kcContext={kcContext} />;
        case "login-idp-link-confirm-override.ftl":
            return <Page_login_idp_link_confirm_override kcContext={kcContext} />;
    }

    assert<Equals<typeof kcContext, never>>(false);
}
