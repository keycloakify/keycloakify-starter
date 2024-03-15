import { Input, Spacer } from "@chakra-ui/react";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { BackTo } from "../components/back-to-login";
import { HeaderNode } from "../components/header-node";
import { SubmitInput } from "../components/submit-input";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";
import { PasswordIcon } from "../components/icons/password";

export default function LoginResetPassword(
  props: PageProps<
    Extract<KcContext, { pageId: "login-reset-password.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { url, auth } = kcContext;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={
        <HeaderNode
          title="Forgot Password"
          subtitle="It happens to the best of us. Give us your email and we'll send you a reset link."
          asset={
            <div className="flex justify-center">
              <PasswordIcon w="60px" h="28px" />
            </div>
          }
        />
      }
    >
      <form
        id="kc-reset-password-form"
        className="space-y-4"
        action={url.loginAction}
        method="post"
      >
        <Input
          type="text"
          id="username"
          name="username"
          className={getClassName("kcInputClass")}
          autoFocus
          defaultValue={
            auth !== undefined && auth.showUsername
              ? auth.attemptedUsername
              : undefined
          }
          placeholder="Email Address"
        />
        <SubmitInput type="submit" value="Request Password Reset" />
        <Spacer h={10} />
        <BackTo loginUrl={url.loginUrl} target={"Login"} />
      </form>
    </Template>
  );
}
