/* eslint-disable react-refresh/only-export-components */
import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";

const KcLoginThemeApp = lazy(() => import("./login/KcApp"));
const KcAccountThemeApp = lazy(() => import("./account/KcApp"));

let { kcContext } = window;

// NOTE: This is just to test a specific page when you run `yarn dev`
// however the recommended way to develope is to use the Storybook
if (kcContext === undefined) {
    kcContext = (await import("./login/PageStory")).getKcContextMock({
        pageId: "register.ftl"
    });
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense>
            {(() => {
                switch (kcContext?.themeType) {
                    case "login":
                        return <KcLoginThemeApp kcContext={kcContext} />;
                    case "account":
                        return <KcAccountThemeApp kcContext={kcContext} />;
                    case undefined:
                        return <h1>No Keycloak Context</h1>;
                }
            })()}
        </Suspense>
    </StrictMode>
);
