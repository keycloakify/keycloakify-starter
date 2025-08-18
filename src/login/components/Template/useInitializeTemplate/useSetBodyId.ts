import { useLayoutEffect } from "react";

export function useSetBodyId() {
    useLayoutEffect(() => {
        document.body.setAttribute("id", "keycloak-bg");

        return () => {
            document.body.removeAttribute("id");
        };
    }, []);
}
