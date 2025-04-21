import { Info } from "./Info";
import { Template } from "../../components/Template";
import { Form } from "./Form";
import { SocialProviders } from "./SocialProviders";
import { useI18n } from "../../i18n";
import type { KcContext } from "../../KcContext";

export function Page(props: {
    kcContext: Extract<KcContext, { pageId: "login.ftl" }>;
}) {
    const { kcContext } = props;

    const { realm, registrationDisabled, messagesPerField } = kcContext;

    const { msg } = useI18n();

    return (
        <Template
            kcContext={kcContext}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={
                realm.password && realm.registrationAllowed && !registrationDisabled
            }
            infoNode={<Info kcContext={kcContext} />}
            socialProvidersNode={<SocialProviders kcContext={kcContext} />}
        >
            <Form kcContext={kcContext} />
        </Template>
    );
}
