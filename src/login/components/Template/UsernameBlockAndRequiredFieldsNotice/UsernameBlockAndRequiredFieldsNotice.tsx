import type { ReactNode } from "react";
import { RequiredFieldsNotice } from "./RequiredFieldsNotice";
import { UsernameBlockWrapper } from "./UsernameBlockWrapper";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";
import { useKcContext } from "../../../KcContext";

type Props = {
  showUsernameNode: ReactNode;
  displayRequiredFields: boolean;
};

export function UsernameBlockAndRequiredFieldsNotice(props: Props) {
  const { showUsernameNode, displayRequiredFields } = props;
  const { kcClsx } = useKcClsx();
  const { kcContext } = useKcContext();

  const requiredFieldsNoticeNode = !displayRequiredFields ? undefined : (
    <RequiredFieldsNotice />
  );

  const usernameNode = !(
    kcContext.auth?.showUsername && !kcContext.auth.showResetCredentials
  ) ? undefined : (
    <UsernameBlockWrapper>{showUsernameNode}</UsernameBlockWrapper>
  );

  if (usernameNode === undefined && requiredFieldsNoticeNode === undefined) {
    return null;
  }

  if (usernameNode === undefined && requiredFieldsNoticeNode !== undefined) {
    return (
      <div className={kcClsx("kcContentWrapperClass")}>
        {requiredFieldsNoticeNode}
      </div>
    );
  }

  if (usernameNode !== undefined && requiredFieldsNoticeNode === undefined) {
    return usernameNode;
  }

  return (
    <div className={kcClsx("kcContentWrapperClass")}>
      {requiredFieldsNoticeNode}
      {usernameNode}
    </div>
  );
}
