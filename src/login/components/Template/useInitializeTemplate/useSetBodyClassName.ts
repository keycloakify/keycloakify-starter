import { useLayoutEffect } from "react";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";

export function useSetBodyClassName(){

    const { kcClsx } = useKcClsx();

    useLayoutEffect(()=> {

        const className = kcClsx("kcBodyClass");

        const tokens= className.split(" ");

        document.body.classList.add(...tokens);

        return ()=> {
            document.body.classList.remove(...tokens);
        };

    }, []);


}