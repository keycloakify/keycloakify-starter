import { RequiredFieldsNotice } from "./RequiredFieldsNotice";
import { UsernameBlock } from "./UsernameBlock";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";
import { useKcContext } from "../../../KcContext";

type Props = {
  displayRequiredFields: boolean;
};

export function UsernameBlockAndRequiredFieldsNotice(props: Props) {
  const { displayRequiredFields } = props;
  const { kcClsx } = useKcClsx();
  const { kcContext } = useKcContext();

  const node1 = !displayRequiredFields ? undefined : <RequiredFieldsNotice />;

  const node2 = !(
    kcContext.auth?.showUsername && !kcContext.auth.showResetCredentials
  ) ? undefined : (
    <UsernameBlock />
  );

  if (node1 === undefined && node2 === undefined) {
    return null;
  }

  if (node1 !== undefined && node2 === undefined) {
    return <div className={kcClsx("kcContentWrapperClass")}>{node1}</div>;
  }

  if (node1 === undefined && node2 !== undefined) {
    return node2;
  }

  return (
    <div className={kcClsx("kcContentWrapperClass")}>
      {node1}
      {node2}
    </div>
  );
}
