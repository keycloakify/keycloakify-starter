import { Suspense } from "react";
import type { ClassKey } from "keycloakify/account";
import type { KcContext } from "./KcContext";
import Fallback from "keycloakify/account/Fallback";
import Template from "keycloakify/account/Template";

export default function KcApp(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    default:
                        return (
                            <Fallback
                                kcContext={kcContext}
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
