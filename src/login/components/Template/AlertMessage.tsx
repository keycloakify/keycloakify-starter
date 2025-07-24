import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { useKcContext } from "../../KcContext";
import { clsx } from "../../../@keycloakify/login-ui/tools/clsx";
import { kcSanitize } from "../../../@keycloakify/login-ui/kcSanitize";

type Props = {
  displayMessage: boolean;
};

export function AlertMessage(props: Props) {
  const { displayMessage } = props;

  const { kcClsx } = useKcClsx();
  const { kcContext } = useKcContext();

  if (
    !(
      displayMessage &&
      kcContext.message !== undefined &&
      (kcContext.message.type !== "warning" || !kcContext.isAppInitiatedAction)
    )
  ) {
    return null;
  }

  return (
    <div
      className={clsx(
        kcClsx("kcAlertClass"),
        `pf-m-${
          kcContext.message.type === "error" ? "danger" : kcContext.message.type
        }`,
        `alert-${kcContext.message.type}`
      )}
    >
      <div className={kcClsx("kcAlertIconClass")}>
        {kcContext.message.type === "success" && (
          <span className={kcClsx("kcFeedbackSuccessIcon")} />
        )}
        {kcContext.message.type === "warning" && (
          <span className={kcClsx("kcFeedbackWarningIcon")} />
        )}
        {kcContext.message.type === "error" && (
          <span className={kcClsx("kcFeedbackErrorIcon")} />
        )}
        {kcContext.message.type === "info" && (
          <span className={kcClsx("kcFeedbackInfoIcon")} />
        )}
      </div>
      <span
        className={clsx(kcClsx("kcAlertTitleClass"), "kc-feedback-text")}
        dangerouslySetInnerHTML={{
          __html: kcSanitize(kcContext.message.summary),
        }}
      />
    </div>
  );
}
