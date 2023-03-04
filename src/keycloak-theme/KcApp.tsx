import "./KcApp.css";
import { lazy, Suspense } from "react";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import Fallback, { defaultKcProps, type KcProps, type PageProps } from "keycloakify";
import Template from "./Template";
import DefaultTemplate from "keycloakify/lib/Template";
import { foo, bar } from "./valuesTransferredOverUrl";

console.log(`Values passed by the main app in the URL parameter:`, { foo, bar });

const Login = lazy(()=> import("./pages/Login"));
// If you can, favor register-user-profile.ftl over register.ftl, see: https://docs.keycloakify.dev/realtime-input-validation
const Register = lazy(() => import("./pages/Register"));
const Terms = lazy(() => import("./pages/Terms"));
const MyExtraPage1 = lazy(() => import("./pages/MyExtraPage1"));
const MyExtraPage2 = lazy(() => import("./pages/MyExtraPage2"));
const Info = lazy(()=> import("keycloakify/lib/pages/Info"));

// This is like editing the theme.properties 
// https://github.com/keycloak/keycloak/blob/11.0.3/themes/src/main/resources/theme/keycloak/login/theme.properties
const kcProps: KcProps = {
    ...defaultKcProps,
    // NOTE: The classes are defined in ./KcApp.css
    // You can add your classes alongside thoses that are present in the default Keycloak theme...
    "kcHtmlClass": [...defaultKcProps.kcHtmlClass, "my-root-class"],
    // ...or overwrite  
    "kcHeaderWrapperClass": "my-color my-font"
};

export default function App(props: { kcContext: KcContext; }) {

    const { kcContext } = props;

    const i18n = useI18n({ kcContext });

    if (i18n === null) {
        //NOTE: Locales not yet downloaded, we could as well display a loading progress but it's usually a matter of milliseconds.
        return null;
    }
    
    /* 
    * Examples assuming i18n.currentLanguageTag === "en":
    * i18n.msg("access-denied") === <span>Access denied</span>
    * i18n.msg("foo") === <span>foo in English</span>
    */

    const pageProps: Omit<PageProps<any, typeof i18n>, "kcContext"> = {
        i18n,
        // Here we have overloaded the default template, however you could use the default one with:  
        //Template: DefaultTemplate,
        Template,
        // Wether or not we should download the CSS and JS resources that comes with the default Keycloak theme.  
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
                    // We choose to use the default Template for the Info page and to download the theme resources.
                    case "info.ftl": return <Info {...{ kcContext, ...pageProps}} Template={DefaultTemplate} doFetchDefaultThemeResources={true} />;
                    default: return <Fallback {...{ kcContext, ...pageProps }} />;
                }
            })()}
        </Suspense>
    );

}
