/* eslint-disable react-refresh/only-export-components */
import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase
/*
import { getKcContextMock } from "./login/PageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "register.ftl",
        overrides: {}
    });
}
*/

const KcLoginThemeApp = lazy(() => import("./login/KcApp"));
const KcAccountThemeApp = lazy(() => import("./account/KcApp"));

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense>
            {(() => {
                switch (window.kcContext?.themeType) {
                    case "login":
                        return <KcLoginThemeApp kcContext={window.kcContext} />;
                    case "account":
                        return <KcAccountThemeApp kcContext={window.kcContext} />;
                }
                return <h1>No Keycloak Context</h1>;
            })()}
        </Suspense>
    </StrictMode>
);

declare global {
    interface Window {
        kcContext?:
            | import("./login/KcContext").KcContext
            | import("./account/KcContext").KcContext;
    }
}
