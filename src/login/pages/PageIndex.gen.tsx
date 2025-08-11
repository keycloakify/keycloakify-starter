import { Suspense, lazy } from "react";
import { assert, type Equals } from "tsafe/assert";
import { useKcContext } from "../KcContext.gen";

const Page_login = lazy(() => import("./login"));
const Page_register = lazy(() => import("./register"));

export function PageIndex() {
    const { kcContext } = useKcContext();

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return <Page_login />;
                    case "register.ftl":
                        return <Page_register />;
                }
                assert<Equals<typeof kcContext, never>>;
            })()}
        </Suspense>
    );
}
