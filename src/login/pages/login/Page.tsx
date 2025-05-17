import { Info } from "./Info";
import { Template } from "../../components/Template";
import { Form } from "./Form";
import { SocialProviders } from "./SocialProviders";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";

export function Page() {
    const { kcContext } = useKcContext("login.ftl");

    const { msg } = useI18n();

    return (
        <Template
            displayMessage={
                !kcContext.messagesPerField.existsError("username", "password")
            }
            headerNode={msg("loginAccountTitle")}
            displayInfo={
                kcContext.realm.password &&
                kcContext.realm.registrationAllowed &&
                !kcContext.registrationDisabled
            }
            infoNode={<Info />}
            socialProvidersNode={
                kcContext.realm.password &&
                kcContext.social !== undefined && <SocialProviders />
            }
        >
            <Form />
        </Template>
    );
}
