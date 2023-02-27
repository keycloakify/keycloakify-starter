import type { PageProps } from "keycloakify";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function MyExtraPage1(props: PageProps<Extract<KcContext, { pageId: "my-extra-page-1.ftl"; }>, I18n>) {

    const { kcContext, i18n, doFetchDefaultThemeResources = true, Template, ...kcProps } = props;

    return (
        <Template
            {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}
            headerNode={<>Header <i>text</i></>}
            formNode={
                <form>
                    {/*...*/}
                </form>
            }
            infoNode={<span>footer</span> }
        />
    );

}
