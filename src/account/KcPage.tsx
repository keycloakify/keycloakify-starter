import { useEffect, Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/account";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/account/DefaultPage";
import Template from "keycloakify/account/Template";
import { OidcProvider, useOidc } from "./oidc";
const Password = lazy(() => import("./pages/Password"));

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

    const { oidcTokens, params } = useOidc();

    useEffect(() => {

        if( import.meta.env.DEV ){
            return;
        }

        fetch(`${params.issuerUri}/account/?userProfileMetadata=true`, {
            headers: {
                Authorization: `Bearer ${oidcTokens.accessToken}`,
                "Content-Type": "application/json"
            },

        })
            .then(response => response.json())
            .then(console.log);

    }, []);


    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
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
