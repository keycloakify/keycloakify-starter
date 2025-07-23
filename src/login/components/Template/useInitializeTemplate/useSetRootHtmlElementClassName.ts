import { useLayoutEffect } from "react";
import { useKcClsx } from "../../../../@keycloakify/login-ui/useKcClsx";

export function useSetRootHtmlElementClassName() {
  const { kcClsx } = useKcClsx();

  useLayoutEffect(() => {
    const className = kcClsx("kcHtmlClass");

    const tokens = className.split(" ");

    document.documentElement.classList.add(...tokens);

    return () => {
      document.documentElement.classList.remove(...tokens);
    };
  }, []);
}
