import { createRoot } from "react-dom/client";
import { lazy, StrictMode, Suspense } from "react";
import { kcEnvDefaults } from "./kc.gen.tsx";

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase
import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "login.ftl",
        overrides: {}
    });
}

const KcLoginThemePage = lazy(() => import("./login/KcPage"));

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense>
            {(() => {
                switch (window.kcContext?.themeType) {
                    case "login":
                        return <KcLoginThemePage kcContext={window.kcContext} />;
                }
            })()}
        </Suspense>
    </StrictMode>
);

const url: string = kcEnvDefaults.TAILCLOAKIFY_FAVICON_URL;
let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
}
link.href = url;
