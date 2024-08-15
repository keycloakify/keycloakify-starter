import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/account";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/account/DefaultPage";
import Template from "keycloakify/account/Template";
import { OidcProvider } from "./oidc";
const Password = lazy(() => import("./pages/Password"));
const Account = lazy(() => import("./pages/Account"));

export default function KcPage(props: { kcContext: KcContext }) {
    return (
        <OidcProvider>
            <ContextualizedKcPage {...props} />
        </OidcProvider>
    );
}

function ContextualizedKcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "account.ftl": return (
                        <Account
                            {...{ kcContext, i18n, classes }}
                            Template={Template}
                            doUseDefaultCss={true}
                        />
                    );
                    case "password.ftl": return (
                        <Password
                            {...{ kcContext, i18n, classes }}
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
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
