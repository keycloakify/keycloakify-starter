import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { HeaderNode } from "../components/header-node";
import {
  Button,
  Center,
  Text,
  Select
} from "@chakra-ui/react";

export default function OrgSelectPage(
  props: PageProps<Extract<KcContext, { pageId: "org-select-form.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
  const organizations = Object.values(kcContext.organizations);

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode=''
    >
      <HeaderNode title='Select an organization' children={undefined}></HeaderNode>
      <Center>
        <Text fontSize='md'>
          Select one of the organizations available to you from the list below to be used in this integration
        </Text>
      </Center>
      <form action={kcContext.url.loginAction} method="post">
        <Center mt={2}>
          <Select name="selected_org">
            {organizations && organizations.map((org, i) => (
              <option value={org.segment_identifier} selected={i === 0}> {org.name}</option>
            ))}
          </Select>
        </Center>
        <Center mt={2}>
          <Button fontSize='md'
            bgColor="purple.700"
            _hover={{ bgColor: "purple.600" }}
            type="submit"
          >
            Confirm
          </Button>
        </Center>
      </form>

    </Template>
  );
}
