import { Flex, Text } from "@chakra-ui/react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { BackTo } from "../components/back-to-login";
import { HeaderNode } from "../components/header-node";
import { SubmitInput } from "../components/submit-input";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function LogoutConfirm(
  props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, client, logoutConfirm } = kcContext;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={<HeaderNode title="Log out" />}
    >
      <Flex direction="column">
        <Text>Are you sure you want to log out?</Text>
        <form
          className="form-actions"
          action={url.logoutConfirmAction}
          method="POST"
        >
          <input type="hidden" name="session_code" value={logoutConfirm.code} />
          <SubmitInput
            name="confirmLogout"
            id="kc-logout"
            type="submit"
            value={"Yes, Log Out"}
          />
        </form>
        {!logoutConfirm.skipLink && client.baseUrl && (
          <BackTo
            loginUrl={client.baseUrl}
            target="BuildBetter"
            className="mt-8"
          />
        )}
      </Flex>
    </Template>
  );
}
