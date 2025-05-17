import type { KcContext } from "./KcContext";
import { Template } from "../../components/Template";
import { useI18n } from "../../i18n";
import { Form } from "./Form";

export function Page(props: {
    kcContext: KcContext;
    doMakeUserConfirmPassword: boolean;
}) {
    const { kcContext, doMakeUserConfirmPassword } = props;

    const { msg, advancedMsg } = useI18n();

    return (
        <Template
            kcContext={kcContext}
            headerNode={
                kcContext.messageHeader !== undefined
                    ? advancedMsg(kcContext.messageHeader)
                    : msg("registerTitle")
            }
            displayMessage={kcContext.messagesPerField.exists("global")}
            displayRequiredFields
        >
            <Form
                kcContext={kcContext}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
            />
        </Template>
    );
}
