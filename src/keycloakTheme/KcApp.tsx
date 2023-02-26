import "./KcApp.css";
import { lazy, Suspense } from "react";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import Fallback, { defaultKcProps, type KcProps, type PageProps } from "keycloakify";
// Here we have overloaded the default template, however you could use the default one with:  
//import Template from "keycloakify/lib/Template";
import Template from "./Template";

const Login = lazy(() => import("keycloakify/lib/pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Terms = lazy(() => import("./pages/Terms"));
const MyExtraPage1 = lazy(() => import("./pages/MyExtraPage1"));
const MyExtraPage2 = lazy(() => import("./pages/MyExtraPage2"));

// This is like editing the theme.properties 
// https://github.com/keycloak/keycloak/blob/11.0.3/themes/src/main/resources/theme/keycloak/login/theme.properties
const kcProps: KcProps = {
    ...defaultKcProps,
    // NOTE: The classes are defined in ./KcApp.css
    "kcHeaderWrapperClass": "my-color my-font",
    "kcHtmlClass": [...defaultKcProps.kcHtmlClass, "my-root-class"],
};

export default function App(props: { kcContext: KcContext; }) {

    const { kcContext } = props;

    const i18n = useI18n({ kcContext });

    //NOTE: Locales not yet downloaded
    if (i18n === null) {
        return null;
    }

    const pageProps: Omit<PageProps<any, typeof i18n>, "kcContext"> = {
        i18n,
        Template,
        doFetchDefaultThemeResources: true,
        ...kcProps,
    };

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl": return <Login {...{ kcContext, ...pageProps }} />;
                    case "register.ftl": return <Register {...{ kcContext, ...pageProps }} />;
                    case "terms.ftl": return <Terms {...{ kcContext, ...pageProps }} />;
                    case "my-extra-page-1.ftl": return <MyExtraPage1 {...{ kcContext, ...pageProps }} />;
                    case "my-extra-page-2.ftl": return <MyExtraPage2 {...{ kcContext, ...pageProps }} />;
                    default: return <Fallback {...{ kcContext, ...pageProps }} />;
                }
            })()}
        </Suspense>
    );

}
