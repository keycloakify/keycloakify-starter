import { assert, type Equals } from "tsafe/assert";
import { Suspense, lazy } from "react";
import { useKcContext } from "../KcContext";

const Page_account = lazy(() => import("./account"));
const Page_applications = lazy(() => import("./applications"));
const Page_federatedIdentity = lazy(() => import("./federatedIdentity"));
const Page_log = lazy(() => import("./log"));
const Page_password = lazy(() => import("./password"));
const Page_sessions = lazy(() => import("./sessions"));
const Page_totp = lazy(() => import("./totp"));

export function PageIndex() {
    const { kcContext } = useKcContext();

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "account.ftl":
                        return <Page_account />;
                    case "applications.ftl":
                        return <Page_applications />;
                    case "federatedIdentity.ftl":
                        return <Page_federatedIdentity />;
                    case "log.ftl":
                        return <Page_log />;
                    case "password.ftl":
                        return <Page_password />;
                    case "sessions.ftl":
                        return <Page_sessions />;
                    case "totp.ftl":
                        return <Page_totp />;
                }

                assert<Equals<typeof kcContext, never>>;
            })()}
        </Suspense>
    );
}
