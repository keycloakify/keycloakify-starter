import {
  Alert,
  AlertIcon,
  AlertTitle,
  Center,
  Flex,
  Link,
  Text
} from "@chakra-ui/react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { assert } from "keycloakify/tools/assert";
import { HeaderNode } from "../components/header-node";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function LoginIdpLinkEmail(
  props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;


  assert(kcContext.message !== undefined);

  const {
    message,
    idpAlias
  } = kcContext;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={
        <HeaderNode title={`Link ${idpAlias}`} children={undefined}></HeaderNode>
      }
    >
      <div className="space-y-4">
        <Center flexDirection="column" mt={8}>
          <Alert status={message.type} flexDirection="column">
            <Flex direction="row">
              <AlertIcon />
              <AlertTitle>{message.summary}</AlertTitle>
            </Flex>
          </Alert>
        </Center>
        <Text fontSize='sm'>
          An email has been sent to link your {idpAlias} account {kcContext.brokerContext.username} with your {kcContext.realm.displayName} account.
        </Text>
        <Text fontSize='sm'>
          Didn't receive an email? <Link href={kcContext.url.loginAction} textColor='gray'>Click here to send another one</Link>
        </Text>
        <Text fontSize='sm'>
          Already verified? <Link href={kcContext.url.loginAction} textColor='gray'>Click here to continue</Link>
        </Text></div>
    </Template>
  );
}
