import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { KcPage } from "./kc.gen";

if (import.meta.env.DEV) {
    const { getKcContextMock } = await import("./login/KcPageStory");
    window.kcContext = getKcContextMock({
        pageId: "register.ftl",
        overrides: {}
    });
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {!window.kcContext ? (
            <h1>No Keycloak Context</h1>
        ) : (
            <KcPage kcContext={window.kcContext} />
        )}
    </StrictMode>
);
