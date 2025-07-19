/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 * 
 * $ npx keycloakify own --path "login/pages/PageIndex.tsx" --revert
 */

/* eslint-disable */

import { Suspense, lazy } from "react";
import { assert, type Equals } from "tsafe/assert";
import { useKcContext } from "../KcContext";

const Page_login = lazy(() => import("./login"));
const Page_register = lazy(() => import("./register"));
const Page_info = lazy(() => import("./info"));
const Page_error = lazy(() => import("./error"));
const Page_login_reset_password = lazy(() => import("./login-reset-password"));
const Page_login_verify_email = lazy(() => import("./login-verify-email"));
const Page_terms = lazy(() => import("./terms"));
const Page_login_oauth2_device_verify_user_code = lazy(
    () => import("./login-oauth2-device-verify-user-code")
);
const Page_login_oauth_grant = lazy(() => import("./login-oauth-grant"));
const Page_login_otp = lazy(() => import("./login-otp"));
const Page_login_password = lazy(() => import("./login-password"));
const Page_login_username = lazy(() => import("./login-username"));
const Page_webauthn_authenticate = lazy(() => import("./webauthn-authenticate"));
const Page_webauthn_register = lazy(() => import("./webauthn-register"));
const Page_login_update_password = lazy(() => import("./login-update-password"));
const Page_login_update_profile = lazy(() => import("./login-update-profile"));
const Page_login_idp_link_confirm = lazy(() => import("./login-idp-link-confirm"));
const Page_login_page_expired = lazy(() => import("./login-page-expired"));
const Page_login_idp_link_email = lazy(() => import("./login-idp-link-email"));
const Page_login_config_totp = lazy(() => import("./login-config-totp"));
const Page_logout_confirm = lazy(() => import("./logout-confirm"));
const Page_idp_review_user_profile = lazy(() => import("./idp-review-user-profile"));
const Page_update_email = lazy(() => import("./update-email"));
const Page_select_authenticator = lazy(() => import("./select-authenticator"));
const Page_saml_post_form = lazy(() => import("./saml-post-form"));
const Page_delete_credential = lazy(() => import("./delete-credential"));
const Page_code = lazy(() => import("./code"));
const Page_delete_account_confirm = lazy(() => import("./delete-account-confirm"));
const Page_frontchannel_logout = lazy(() => import("./frontchannel-logout"));
const Page_login_recovery_authn_code_config = lazy(() => import("./login-recovery-authn-code-config"));
const Page_login_recovery_authn_code_input = lazy(() => import("./login-recovery-authn-code-input"));
const Page_login_reset_otp = lazy(() => import("./login-reset-otp"));
const Page_login_x509_info = lazy(() => import("./login-x509-info"));
const Page_webauthn_error = lazy(() => import("./webauthn-error"));
const Page_login_passkeys_conditional_authenticate = lazy(
    () => import("./login-passkeys-conditional-authenticate")
);
const Page_login_idp_link_confirm_override = lazy(() => import("./login-idp-link-confirm-override"));

export function PageIndex() {
    const { kcContext } = useKcContext();

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return <Page_login />;
                    case "register.ftl":
                        return <Page_register />;
                    case "info.ftl":
                        return <Page_info />;
                    case "error.ftl":
                        return <Page_error />;
                    case "login-reset-password.ftl":
                        return <Page_login_reset_password />;
                    case "login-verify-email.ftl":
                        return <Page_login_verify_email />;
                    case "terms.ftl":
                        return <Page_terms />;
                    case "login-oauth2-device-verify-user-code.ftl":
                        return <Page_login_oauth2_device_verify_user_code />;
                    case "login-oauth-grant.ftl":
                        return <Page_login_oauth_grant />;
                    case "login-otp.ftl":
                        return <Page_login_otp />;
                    case "login-username.ftl":
                        return <Page_login_username />;
                    case "login-password.ftl":
                        return <Page_login_password />;
                    case "webauthn-authenticate.ftl":
                        return <Page_webauthn_authenticate />;
                    case "webauthn-register.ftl":
                        return <Page_webauthn_register />;
                    case "login-update-password.ftl":
                        return <Page_login_update_password />;
                    case "login-update-profile.ftl":
                        return <Page_login_update_profile />;
                    case "login-idp-link-confirm.ftl":
                        return <Page_login_idp_link_confirm />;
                    case "login-idp-link-email.ftl":
                        return <Page_login_idp_link_email />;
                    case "login-page-expired.ftl":
                        return <Page_login_page_expired />;
                    case "login-config-totp.ftl":
                        return <Page_login_config_totp />;
                    case "logout-confirm.ftl":
                        return <Page_logout_confirm />;
                    case "idp-review-user-profile.ftl":
                        return <Page_idp_review_user_profile />;
                    case "update-email.ftl":
                        return <Page_update_email />;
                    case "select-authenticator.ftl":
                        return <Page_select_authenticator />;
                    case "saml-post-form.ftl":
                        return <Page_saml_post_form />;
                    case "delete-credential.ftl":
                        return <Page_delete_credential />;
                    case "code.ftl":
                        return <Page_code />;
                    case "delete-account-confirm.ftl":
                        return <Page_delete_account_confirm />;
                    case "frontchannel-logout.ftl":
                        return <Page_frontchannel_logout />;
                    case "login-recovery-authn-code-config.ftl":
                        return <Page_login_recovery_authn_code_config />;
                    case "login-recovery-authn-code-input.ftl":
                        return <Page_login_recovery_authn_code_input />;
                    case "login-reset-otp.ftl":
                        return <Page_login_reset_otp />;
                    case "login-x509-info.ftl":
                        return <Page_login_x509_info />;
                    case "webauthn-error.ftl":
                        return <Page_webauthn_error />;
                    case "login-passkeys-conditional-authenticate.ftl":
                        return <Page_login_passkeys_conditional_authenticate />;
                    case "login-idp-link-confirm-override.ftl":
                        return <Page_login_idp_link_confirm_override />;
                }

                assert<Equals<typeof kcContext, never>>;
            })()}
        </Suspense>
    );
}
