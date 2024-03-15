import { Flex, Link, Text } from "@chakra-ui/react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { BackTo } from "../components/back-to-login";
import { HeaderNode } from "../components/header-node";
import { EmailInboxIcon } from "../components/icons/email-inbox";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function LoginVerifyEmail(
  props: PageProps<
    Extract<KcContext, { pageId: "login-verify-email.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, user } = kcContext;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={
        <HeaderNode
          title="Verification Sent"
          subtitle={`An email with instructions to verify your email address has been sent to your address${
            user?.email ? ` ${user.email}` : ""
          }.`}
          asset={
            <div className="flex justify-center">
              <EmailInboxIcon w="53px" h="48px" />
            </div>
          }
        />
      }
    >
      <Flex direction="column" className="space-y-4" justify="center">
        <Text justifyContent="center">
          Haven't received a verification code in your email?
          <br />
          <Link href={url.loginAction} color="gray">
            Click here to re-send the email.
          </Link>
        </Text>

        <BackTo loginUrl={url.loginUrl} target="Login" />
      </Flex>
    </Template>
  );
}
