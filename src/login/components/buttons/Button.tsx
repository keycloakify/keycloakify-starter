import { useKcClsx } from "../../../@keycloakify/login-ui/useKcClsx";

type Props = React.ComponentProps<"button">;

// TODO: This component is very poorly designed, not consistent on how it works with className
// Plus we don't have kcButtonClass for some reason
export function Button(props: Props) {
    const { kcClsx } = useKcClsx();

    return <button {...props} className={props.className || kcClsx("kcButtonPrimaryClass")} />;
}
