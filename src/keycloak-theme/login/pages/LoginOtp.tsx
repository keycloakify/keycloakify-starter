import { Input, Spacer } from "@chakra-ui/react";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { BackTo } from "../components/back-to-login";
import { HeaderNode } from "../components/header-node";
import { SubmitInput } from "../components/submit-input";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";
import { PasswordIcon } from "../components/icons/password";

export default function LoginOtp(
  props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { otpLogin, url } = kcContext;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={
        <HeaderNode
          title="Two-Factor Authentication"
          subtitle="Enter the verification code from your authenticator app."
          asset={
            <div className="flex justify-center">
              <PasswordIcon w="60px" h="28px" />
            </div>
          }
        />
      }
    >
      <form
        id="kc-otp-login-form"
        className="space-y-4"
        action={url.loginAction}
        method="post"
      >
        {otpLogin.userOtpCredentials.length > 1 && (
          <div className="space-y-2">
            {otpLogin.userOtpCredentials.map((otpCredential, index) => (
              <label
                key={otpCredential.id}
                htmlFor={`kc-otp-credential-${index}`}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-600 cursor-pointer hover:border-purple-500 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-900/20"
              >
                <input
                  id={`kc-otp-credential-${index}`}
                  name="selectedCredentialId"
                  type="radio"
                  value={otpCredential.id}
                  defaultChecked={index === 0}
                  className="accent-purple-500"
                />
                <span className="text-white">{otpCredential.userLabel}</span>
              </label>
            ))}
          </div>
        )}
        <Input
          type="text"
          id="otp"
          name="otp"
          autoComplete="off"
          className={getClassName("kcInputClass")}
          autoFocus
          placeholder="Enter verification code"
        />
        <SubmitInput type="submit" value="Verify" />
        <Spacer h={10} />
        <BackTo loginUrl={url.loginUrl} target={"Login"} />
      </form>
    </Template>
  );
}
