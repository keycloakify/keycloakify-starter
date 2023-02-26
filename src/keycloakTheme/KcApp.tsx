import "./KcApp.css";
import { lazy, Suspense } from "react";
import type { KcContext } from "./kcContext";
import { useI18n, type I18n } from "./i18n";
import Fallback, { defaultKcProps, type PageProps } from "keycloakify";
import Template from "./Template";
import { KcContextBase } from "keycloakify/lib/getKcContext";
import type { I18nBase } from "keycloakify/lib/i18n";
import type { TemplateProps } from "keycloakify";

const Login = lazy(()=> import("keycloakify/lib/pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Terms = lazy(() => import("./pages/Terms"));
const MyExtraPage1 = lazy(() => import("./pages/MyExtraPage1"));
const MyExtraPage2 = lazy(() => import("./pages/MyExtraPage2"));

type Props = {
    kcContext: KcContext;
};

export default function App({ kcContext }: Props) {
    const i18n = useI18n({ kcContext });

    //NOTE: Locales not yet downloaded
    if (i18n === null) {
        return null;
    }

    const props = {
        i18n,
        Template,
        ...defaultKcProps,
        // NOTE: The classes are defined in ./KcApp.css
        "kcHeaderWrapperClass": "my-color my-font"
    } satisfies Omit<PageProps<any, I18n>, "kcContext">;



    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl": return <Login {...{kcContext, ...props }} />;
                    case "register.ftl": return <Register {...{ kcContext, ...props }} />;
                    case "terms.ftl": return <Terms {...{ kcContext, ...props }} />;
                    case "my-extra-page-1.ftl": return <MyExtraPage1 {...{ kcContext, ...props }} />;
                    case "my-extra-page-2.ftl": return <MyExtraPage2 {...{ kcContext, ...props }} />;
                    default:

                        //console.log(xxxx);

                        //const x: KcContextBase = kcContext;
                        //console.log(Template2, x);

                        //const y: I18nBase = i18n;

                        //const zz: TemplateProps<KcContextBase, I18nBase> = null as any as TemplateProps<KcContext, I18n>;
                        //const z: TemplateProps<KcContextBase, I18nBase> = null as any as TemplateProps<typeof kcContext, I18n>;
                        type XX = typeof kcContext;
                        const Template2: (props: TemplateProps<KcContextBase, I18nBase>) => JSX.Element | null= null as any as (( props: TemplateProps<XX, I18n>)=> JSX.Element | null);


                        //const Template3= (props: TemplateProps<typeof kcContext, I18n>)=> <Template {...props}/>;

                        /*
                        const xxxx: PageProps<KcContextBase, I18nBase> = {
                            "kcContext": kcContext,
                            ...defaultKcProps,
                            "Template": Template3,
                            "i18n": i18n
                        };
                        */

                        return <Fallback {...{ kcContext, ...props }} Template={Template3}  />;
                }
            })()}
        </Suspense>
    );

}
