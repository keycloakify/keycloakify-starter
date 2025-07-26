import { useReducer } from "react";
import { ActionGroup } from "./ActionGroup";
import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";
import { useI18n } from "../../i18n";
import { Button } from "./Button";

type Props = {
  className?: string;
};

export function LoginButton(props: Props) {
  const { className } = props;
  const { kcClsx } = useKcClsx();
  const { msg } = useI18n();
  const [hasBeenClicked, setClicked] = useReducer(() => true, false);

  return (
    <ActionGroup className={className}>
      <Button
        className={kcClsx("kcButtonPrimaryClass", "kcButtonBlockClass")}
        id="kc-login"
        name="login"
        disabled={hasBeenClicked}
        onClick={() => {
          setClicked();
        }}
      >
        {msg("doLogIn")}
      </Button>
    </ActionGroup>
  );
}
