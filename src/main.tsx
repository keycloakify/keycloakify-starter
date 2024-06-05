/* eslint-disable react-refresh/only-export-components */
import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
//import { getKcContextMock } from "./login/PageStory";
//const kcContext = getKcContextMock({ pageId: "register.ftl", overrides: {} });
const { kcContext } = window;

const KcLoginThemeApp = lazy(() => import("./login/KcApp"));
const KcAccountThemeApp = lazy(() => import("./account/KcApp"));

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense>
            {(() => {
                switch (kcContext?.themeType) {
                    case "login": return <KcLoginThemeApp kcContext={kcContext} />;
                    case "account": return <KcAccountThemeApp kcContext={kcContext} />;
                    case undefined: return <h1>No Keycloak Context</h1>;
                }
            })()}
        </Suspense>
    </StrictMode>
);

