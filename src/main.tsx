import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { kcContext as kcAccountThemeContext } from "./keycloak-theme/account/kcContext";
import { kcContext as kcLoginThemeContext } from "./keycloak-theme/login/kcContext";
import "./main.css";

const KcLoginThemeApp = lazy(() => import("./keycloak-theme/login/KcApp"));
const KcAccountThemeApp = lazy(() => import("./keycloak-theme/account/KcApp"));
const App = lazy(() => import("./App"));
const theme = extendTheme({
    config: { initialColorMode: 'dark' }, components: {
        Alert: {
            parts: ['container'],
            baseStyle: {
                container: {
                    borderRadius: "8px"
                },
            },
        }
    }
})

createRoot(document.getElementById("root")!).render(
    <ChakraProvider theme={theme}>
        <StrictMode>
            <Suspense>
                {(() => {
                    if (kcLoginThemeContext !== undefined) {
                        return <KcLoginThemeApp kcContext={kcLoginThemeContext} />;
                    }
                    if (kcAccountThemeContext !== undefined) {
                        return <KcAccountThemeApp kcContext={kcAccountThemeContext} />;
                    }
                    return <App />;
                })()}
            </Suspense>
        </StrictMode>
    </ChakraProvider>
);

