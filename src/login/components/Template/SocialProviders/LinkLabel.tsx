import { Logo } from "./Logo";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";

export function LinkLabel(props: {
    provider: {
        alias: string;
        displayName: string;
        iconClasses?: string;
    };
}) {
    const { provider } = props;

    const { kcClsx } = useKcClsx();

    if (provider.iconClasses) {
        return <span className={provider.iconClasses}>{provider.displayName}</span>;
    }

    return (
        <>
            <Logo providerAlias={provider.alias} />
            <span className={kcClsx("kcFormSocialAccountNameClass")}>{provider.displayName}</span>
        </>
    );
}
