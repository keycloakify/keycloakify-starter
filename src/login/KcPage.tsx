import {lazy, Suspense} from "react";
import type {ClassKey} from "keycloakify/login";
import type {KcContext} from "./KcContext";
import {useI18n} from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import "./index.css";

const UserProfileFormFields = lazy(() => import("./UserProfileFormFields"));

const doMakeUserConfirmPassword = true;

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const LoginOtp = lazy(() => import("./pages/LoginOtp"));
const LoginConfigTotp = lazy(() => import("./pages/LoginConfigTotp"));
const WebauthnAuthenticate = lazy(() => import("./pages/WebauthnAuthenticate"));
const WebauthnRegister = lazy(() => import("./pages/WebauthnRegister"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));

export default function KcPage(props: { kcContext: KcContext }) {
    const {kcContext} = props;

    const {i18n} = useI18n({kcContext});

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                {...{kcContext, i18n, classes}}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-reset-password.ftl":
                        return (
                            <LoginResetPassword
                                {...{kcContext, i18n, classes}}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-verify-email.ftl":
                        return (
                            <LoginVerifyEmail
                                {...{kcContext, i18n, classes}}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "register.ftl":
                        return (
                            <Register
                                {...{kcContext, i18n, classes}}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                    case "login-otp.ftl":
                        return (
                            <LoginOtp
                                {...{kcContext, i18n, classes}}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-config-totp.ftl":
                        return (
                            <LoginConfigTotp
                                {...{kcContext, i18n, classes}}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "webauthn-authenticate.ftl":
                        return (
                            <WebauthnAuthenticate
                                {...{kcContext, i18n, classes}}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "webauthn-register.ftl":
                        return (
                            <WebauthnRegister
                                {...{kcContext, i18n, classes}}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );

                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {
    kcInputGroup: "relative",
    kcFormSocialAccountSectionClass: "",
    kcFormSocialAccountListClass: "",
    kcFormSocialAccountListGridClass: "",
    kcFormSocialAccountListButtonClass: "",
    kcFormSocialAccountGridItem: ""
} satisfies { [key in ClassKey]?: string };
