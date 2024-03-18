import {
  Button,
  Center,
  Link,
  Text
} from "@chakra-ui/react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { assert } from "keycloakify/tools/assert";
import { HeaderNode } from "../components/header-node";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function LoginIdpLinkConfirm(
  props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;


  const {
    message,
    idpAlias
  } = kcContext;
  console.log(kcContext);
  assert(message !== undefined)
  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={
        <HeaderNode
          title={`Account already exists`}
          children={undefined}
        />
      }
    >
      <div className="space-y-4">
        <Center>
          <Text fontSize='md'>
            Confirm adding your {idpAlias} account as a login method to
            your {kcContext.realm.displayName} account
          </Text>
        </Center>
        <Center>
          <Link href={kcContext.url.loginAction}>
            <Button fontSize='md'
              bgColor="purple.700"
              _hover={{ bgColor: "purple.600" }}
            >
              Confirm
            </Button>
          </Link>
        </Center>
      </div>
    </Template>
  );
}
