import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
import { kcContext as kcLoginThemeContext } from "./keycloak-theme/login/kcContext";

const App = lazy(() => import("./App"));
const KcLoginThemeApp = lazy(() => import("./keycloak-theme/login/KcApp"));

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense>
            {(()=>{

                if( kcLoginThemeContext !== undefined ){
                    return <KcLoginThemeApp kcContext={kcLoginThemeContext} />;
                }

                return <App />;

            })()}
        </Suspense>
    </StrictMode>
);
