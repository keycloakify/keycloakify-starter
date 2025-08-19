import { useLayoutEffect } from "react";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";
import { clsx } from "../../../../@keycloakify/account-multi-page-ui/tools/clsx";

export function useSetBodyClassName(params: { className: string | undefined }) {
    const { kcClsx } = useKcClsx();

    useLayoutEffect(() => {
        const className = clsx("admin-console", "user", kcClsx("kcBodyClass"), params.className);

        const tokens = className.split(" ");

        document.body.classList.add(...tokens);

        return () => {
            document.body.classList.remove(...tokens);
        };
    }, [params.className]);
}
