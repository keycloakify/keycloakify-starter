import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Center, Flex, Link } from "@chakra-ui/react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { assert } from "keycloakify/tools/assert";
import { HeaderNode } from "../components/header-node";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msgStr } = i18n;

    assert(kcContext.message !== undefined);

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={false}
            headerNode={
                <HeaderNode
                    title={messageHeader} children={undefined}
                ></HeaderNode>
            }
        >
            <Center flexDirection='column' mt={8}>
                <Alert status={message.type} flexDirection="column">
                    <Flex direction="row">
                        <AlertIcon />
                        <AlertTitle>{message.summary}</AlertTitle>
                    </Flex>

                    {requiredActions !== undefined && (
                        <AlertDescription>
                            <b>
                                {requiredActions.map(requiredAction => msgStr(`requiredAction.${requiredAction}` as const)).join(", ")}
                            </b>
                        </AlertDescription>
                    )}
                </Alert>
                <p className="instruction mt-3">
                    {!skipLink && pageRedirectUri !== undefined ? (
                        <Link href={pageRedirectUri}>
                            <Button size='sm' >
                                Back to BuildBetter
                            </Button>
                        </Link>
                    ) : actionUri !== undefined ? (
                        <Link href={actionUri}>
                            <Button size='sm' >
                                Continue
                            </Button>
                        </Link>
                    ) : (
                        client.baseUrl !== undefined && (
                            <Link href={client.baseUrl}>
                                <Button size='sm' >
                                    Back to BuildBetter
                                </Button>
                            </Link>
                        )
                    )}
                </p>
            </Center>
        </Template >
    );
}
