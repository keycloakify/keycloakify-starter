import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";
import { Info } from "./Info";
import { Form } from "./Form";

export function Page() {
  const { kcContext } = useKcContext();
  assert(kcContext.pageId === "login.ftl");

  const { msg } = useI18n();

  return (
    <Template
      displayMessage={
        !kcContext.messagesPerField.existsError("username", "password")
      }
      displaySocialProviders={kcContext.realm.password}
      slots={{
        header: msg("loginAccountTitle"),
        info: <Info />,
        form: <Form />,
      }}
    />
  );
}
