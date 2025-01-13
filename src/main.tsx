import { createRoot } from "react-dom/client";
import {lazy, StrictMode, Suspense} from "react";

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase

import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "login.ftl",
        overrides: {}
    });
}

const KcLoginThemePage = lazy(()=>import("./login/KcPage"))


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense>
            {(() =>{
                switch (window.kcContext?.themeType){
                    case "login":
                        return <KcLoginThemePage kcContext={window.kcContext} />
                }
            })()}
        </Suspense>
    </StrictMode>
);