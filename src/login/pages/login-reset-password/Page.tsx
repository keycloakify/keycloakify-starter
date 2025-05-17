import type { KcContext } from "./KcContext";
import { useI18n } from "../../i18n";
import { Template } from "../../components/Template";
import { Form } from "./Form";

export function Page(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { msg } = useI18n();

    return (
        <Template
            kcContext={kcContext}
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
