import { Suspense, lazy } from "react";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";

const Fallback = lazy(() => import("keycloakify/account/Fallback"));
const Template = lazy(() => import("./Template"));

export default function KcApp(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const i18n = useI18n({ kcContext });

    if (i18n === null) {
        return null;
    }

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    default:
                        return <Fallback
                            {...{
                                kcContext,
                                i18n,
                                Template,
                            }}
                            doUseDefaultCss={true}
                        />
                }
            })()}
        </Suspense>
    );
}
