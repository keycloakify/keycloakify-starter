import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { I18nProvider } from "./i18n";
import { KcClsxProvider } from "./_internals/useKcClsx";
import { assert, type Equals } from "tsafe/assert";

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    return (
        <KcClsxProvider doUseDefaultCss={true} classes={classes}>
            <I18nProvider kcContext={kcContext}>
                <Suspense>
                    <Page kcContext={kcContext} />
                </Suspense>
            </I18nProvider>
        </KcClsxProvider>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };

const Page_login = lazy(() => import("./pages/login"));
const Page_register = lazy(() => import("./pages/register"));
const Page_info = lazy(() => import("./pages/info"));

const Error = lazy(() => import("./pages/Error"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const Terms = lazy(() => import("./pages/Terms"));
const LoginOauth2DeviceVerifyUserCode = lazy(
    () => import("./pages/LoginOauth2DeviceVerifyUserCode")
);
const LoginOauthGrant = lazy(() => import("./pages/LoginOauthGrant"));
const LoginOtp = lazy(() => import("./pages/LoginOtp"));
const LoginPassword = lazy(() => import("./pages/LoginPassword"));
const LoginUsername = lazy(() => import("./pages/LoginUsername"));
const WebauthnAuthenticate = lazy(() => import("./pages/WebauthnAuthenticate"));
const WebauthnRegister = lazy(() => import("./pages/WebauthnRegister"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const LoginUpdateProfile = lazy(() => import("./pages/LoginUpdateProfile"));
const LoginIdpLinkConfirm = lazy(() => import("./pages/LoginIdpLinkConfirm"));
const LoginPageExpired = lazy(() => import("./pages/LoginPageExpired"));
const LoginIdpLinkEmail = lazy(() => import("./pages/LoginIdpLinkEmail"));
const LoginConfigTotp = lazy(() => import("./pages/LoginConfigTotp"));
const LogoutConfirm = lazy(() => import("./pages/LogoutConfirm"));
const IdpReviewUserProfile = lazy(() => import("./pages/IdpReviewUserProfile"));
const UpdateEmail = lazy(() => import("./pages/UpdateEmail"));
const SelectAuthenticator = lazy(() => import("./pages/SelectAuthenticator"));
const SamlPostForm = lazy(() => import("./pages/SamlPostForm"));
const DeleteCredential = lazy(() => import("./pages/DeleteCredential"));
const Code = lazy(() => import("./pages/Code"));
const DeleteAccountConfirm = lazy(() => import("./pages/DeleteAccountConfirm"));
const FrontchannelLogout = lazy(() => import("./pages/FrontchannelLogout"));
const LoginRecoveryAuthnCodeConfig = lazy(
    () => import("./pages/LoginRecoveryAuthnCodeConfig")
);
const LoginRecoveryAuthnCodeInput = lazy(
    () => import("./pages/LoginRecoveryAuthnCodeInput")
);
const LoginResetOtp = lazy(() => import("./pages/LoginResetOtp"));
const LoginX509Info = lazy(() => import("./pages/LoginX509Info"));
const WebauthnError = lazy(() => import("./pages/WebauthnError"));
const LoginPasskeysConditionalAuthenticate = lazy(
    () => import("./pages/LoginPasskeysConditionalAuthenticate")
);
const LoginIdpLinkConfirmOverride = lazy(
    () => import("./pages/LoginIdpLinkConfirmOverride")
);

function Page(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    switch (kcContext.pageId) {
        case "login.ftl":
            return <Page_login kcContext={kcContext} />;
        case "register.ftl":
            return <Page_register kcContext={kcContext} doMakeUserConfirmPassword={true} />;
        case "info.ftl":
            return <Page_info kcContext={kcContext} />;
        case "error.ftl":
            return <Error kcContext={kcContext} {...rest} />;
        case "login-reset-password.ftl":
            return <LoginResetPassword kcContext={kcContext} {...rest} />;
        case "login-verify-email.ftl":
            return <LoginVerifyEmail kcContext={kcContext} {...rest} />;
        case "terms.ftl":
            return <Terms kcContext={kcContext} {...rest} />;
        case "login-oauth2-device-verify-user-code.ftl":
            return <LoginOauth2DeviceVerifyUserCode kcContext={kcContext} {...rest} />;
        case "login-oauth-grant.ftl":
            return <LoginOauthGrant kcContext={kcContext} {...rest} />;
        case "login-otp.ftl":
            return <LoginOtp kcContext={kcContext} {...rest} />;
        case "login-username.ftl":
            return <LoginUsername kcContext={kcContext} {...rest} />;
        case "login-password.ftl":
            return <LoginPassword kcContext={kcContext} {...rest} />;
        case "webauthn-authenticate.ftl":
            return <WebauthnAuthenticate kcContext={kcContext} {...rest} />;
        case "webauthn-register.ftl":
            return <WebauthnRegister kcContext={kcContext} {...rest} />;
        case "login-update-password.ftl":
            return <LoginUpdatePassword kcContext={kcContext} {...rest} />;
        case "login-update-profile.ftl":
            return <LoginUpdateProfile kcContext={kcContext} {...rest} />;
        case "login-idp-link-confirm.ftl":
            return <LoginIdpLinkConfirm kcContext={kcContext} {...rest} />;
        case "login-idp-link-email.ftl":
            return <LoginIdpLinkEmail kcContext={kcContext} {...rest} />;
        case "login-page-expired.ftl":
            return <LoginPageExpired kcContext={kcContext} {...rest} />;
        case "login-config-totp.ftl":
            return <LoginConfigTotp kcContext={kcContext} {...rest} />;
        case "logout-confirm.ftl":
            return <LogoutConfirm kcContext={kcContext} {...rest} />;
        case "idp-review-user-profile.ftl":
            return <IdpReviewUserProfile kcContext={kcContext} {...rest} />;
        case "update-email.ftl":
            return <UpdateEmail kcContext={kcContext} {...rest} />;
        case "select-authenticator.ftl":
            return <SelectAuthenticator kcContext={kcContext} {...rest} />;
        case "saml-post-form.ftl":
            return <SamlPostForm kcContext={kcContext} {...rest} />;
        case "delete-credential.ftl":
            return <DeleteCredential kcContext={kcContext} {...rest} />;
        case "code.ftl":
            return <Code kcContext={kcContext} {...rest} />;
        case "delete-account-confirm.ftl":
            return <DeleteAccountConfirm kcContext={kcContext} {...rest} />;
        case "frontchannel-logout.ftl":
            return <FrontchannelLogout kcContext={kcContext} {...rest} />;
        case "login-recovery-authn-code-config.ftl":
            return <LoginRecoveryAuthnCodeConfig kcContext={kcContext} {...rest} />;
        case "login-recovery-authn-code-input.ftl":
            return <LoginRecoveryAuthnCodeInput kcContext={kcContext} {...rest} />;
        case "login-reset-otp.ftl":
            return <LoginResetOtp kcContext={kcContext} {...rest} />;
        case "login-x509-info.ftl":
            return <LoginX509Info kcContext={kcContext} {...rest} />;
        case "webauthn-error.ftl":
            return <WebauthnError kcContext={kcContext} {...rest} />;
        case "login-passkeys-conditional-authenticate.ftl":
            return (
                <LoginPasskeysConditionalAuthenticate kcContext={kcContext} {...rest} />
            );
        case "login-idp-link-confirm-override.ftl":
            return <LoginIdpLinkConfirmOverride kcContext={kcContext} {...rest} />;
    }
    assert<Equals<typeof kcContext, never>>(false);
}
