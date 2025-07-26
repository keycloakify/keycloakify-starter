import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";

type Props = React.ComponentProps<"button">;

export function Button(props: Props) {
  const { kcClsx } = useKcClsx();

  return (
    <button
      {...props}
      className={props.className || kcClsx("kcButtonPrimaryClass")}
    />
  );
}
