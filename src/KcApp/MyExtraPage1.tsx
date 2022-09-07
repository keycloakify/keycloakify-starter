import { memo } from "react";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";

type KcContext_MyExtraPage1 = Extract<KcContext, { pageId: "my-extra-page-1.ftl"; }>;

const MyExtraPage1 = memo(({ kcContext, i18n, ...props }: { kcContext: KcContext_MyExtraPage1; i18n: I18n; } & KcProps) => {

    return <>It is up to you to implement this page</>

});

export default MyExtraPage1;