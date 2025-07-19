import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        options: {
            storySort: (a, b)=> {

                const orderedPagesPrefix = [
                    "Introduction",
                    "login/login.ftl",
                    "login/register.ftl",
                    "login/terms.ftl",
                    "login/error.ftl",
                    "login/code.ftl",
                    "login/delete-account-confirm.ftl",
                    "login/delete-credential.ftl",
                    "login/frontchannel-logout.ftl",
                    "login/idp-review-user-profile.ftl",
                    "login/info.ftl",
                    "login/login-config-totp.ftl",
                    "login/login-idp-link-confirm.ftl",
                    "login/login-idp-link-email.ftl",
                    "login/login-oauth-grant.ftl",
                    "login/login-otp.ftl",
                    "login/login-page-expired.ftl",
                    "login/login-password.ftl",
                    "login/login-reset-otp.ftl",
                    "login/login-reset-password.ftl",
                    "login/login-update-password.ftl",
                    "login/login-update-profile.ftl",
                    "login/login-username.ftl",
                    "login/login-verify-email.ftl",
                    "login/login-x509-info.ftl",
                    "login/logout-confirm.ftl",
                    "login/saml-post-form.ftl",
                    "login/select-authenticator.ftl",
                    "login/update-email.ftl",
                    "login/webauthn-authenticate.ftl",
                    "login/webauthn-error.ftl",
                    "login/webauthn-register.ftl",
                    "login/login-oauth2-device-verify-user-code.ftl",
                    "login/login-recovery-authn-code-config.ftl",
                    "login/login-recovery-authn-code-input.ftl",
                    "account/account.ftl",
                    "account/password.ftl",
                    "account/federatedIdentity.ftl",
                    "account/log.ftl",
                    "account/sessions.ftl",
                    "account/totp.ftl"
                ];

                function getHardCodedWeight(title) {
                    for (let i = 0; i < orderedPagesPrefix.length; i++) {
                        if (
                            title
                                .toLowerCase()
                                .startsWith(orderedPagesPrefix[i].toLowerCase())
                        ) {
                            return orderedPagesPrefix.length - i;
                        }
                    }

                    return 0;
                }

                return getHardCodedWeight(b.title) - getHardCodedWeight(a.title);

            }

        }
    }
};

export default preview;
