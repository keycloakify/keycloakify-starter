import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";
import { Form } from "./Form";

export function Page() {
    const { kcContext } = useKcContext("login-reset-password.ftl");

    const { msg } = useI18n();

    return (
        <Template
            displayInfo
            displayMessage={!kcContext.messagesPerField.existsError("username")}
            infoNode={
                kcContext.realm.duplicateEmailsAllowed
                    ? msg("emailInstructionUsername")
                    : msg("emailInstruction")
            }
            headerNode={msg("emailForgotTitle")}
        >
            <Form kcContext={kcContext} />
        </Template>
    );
}
