import { memo } from "react";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";

type KcContext_MyExtraPage2 = Extract<KcContext, { pageId: "my-extra-page-2.ftl"; }>;

const MyExtraPage2 = memo(({ kcContext, i18n, ...props }: { kcContext: KcContext_MyExtraPage2; i18n: I18n; } & KcProps) => {

    console.log(`TODO: Do something with: ${kcContext.someCustomValue}`);

    return <>It is up to you to implement this page</>

});

export default MyExtraPage2;