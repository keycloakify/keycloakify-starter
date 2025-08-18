import { assert } from "tsafe/assert";
import { useKcContext } from "../../KcContext.gen";
import { Template } from "../../components/Template";
import { useI18n } from "../../i18n";
import { Form } from "./Form";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "register.ftl");

    const { msg, advancedMsg } = useI18n();

    return (
        <Template
            displayMessage={kcContext.messagesPerField.exists("global")}
            displayRequiredFields
            slots={{
                header:
                    kcContext.messageHeader !== undefined
                        ? advancedMsg(kcContext.messageHeader)
                        : msg("registerTitle"),
                form: <Form />
            }}
        />
    );
}
